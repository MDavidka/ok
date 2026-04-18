import { GameState } from './types';

// Configuration for MongoDB Atlas Data API
// In a production environment, these should be set in your .env file
export const MONGO_ENDPOINT = import.meta.env.VITE_MONGO_ENDPOINT || 'https://data.mongodb-api.com/app/data-xxxxx/endpoint/data/v1';
export const MONGO_API_KEY = import.meta.env.VITE_MONGO_API_KEY || 'YOUR_API_KEY_HERE';
export const DATA_SOURCE = import.meta.env.VITE_MONGO_DATA_SOURCE || 'Cluster0';
export const DATABASE_NAME = import.meta.env.VITE_MONGO_DATABASE || 'cookie_clicker_db';
export const COLLECTION_SAVES = 'game_saves';

/**
 * Generic function to find a single document in the MongoDB Atlas database
 * @param collection The name of the collection to query
 * @param filter The query filter object
 * @returns The found document or null
 */
export async function findOneDocument(collection: string, filter: Record<string, any> = {}) {
  try {
    const res = await fetch(`${MONGO_ENDPOINT}/action/findOne`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Request-Headers': '*',
        'api-key': MONGO_API_KEY
      },
      body: JSON.stringify({
        dataSource: DATA_SOURCE,
        database: DATABASE_NAME,
        collection,
        filter
      })
    });
    
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    
    const data = await res.json();
    return data.document;
  } catch (error) {
    console.error('Error finding document in MongoDB:', error);
    return null;
  }
}

/**
 * Generic function to update or insert a document in the MongoDB Atlas database
 * @param collection The name of the collection to update
 * @param filter The query filter object to find the document
 * @param update The update operations to apply
 * @param upsert Whether to insert a new document if no match is found (default: true)
 * @returns The result of the update operation or null
 */
export async function updateOneDocument(
  collection: string, 
  filter: Record<string, any>, 
  update: Record<string, any>, 
  upsert: boolean = true
) {
  try {
    const res = await fetch(`${MONGO_ENDPOINT}/action/updateOne`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Request-Headers': '*',
        'api-key': MONGO_API_KEY
      },
      body: JSON.stringify({
        dataSource: DATA_SOURCE,
        database: DATABASE_NAME,
        collection,
        filter,
        update,
        upsert
      })
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    
    return await res.json();
  } catch (error) {
    console.error('Error updating document in MongoDB:', error);
    return null;
  }
}

/**
 * Saves the user's game state to the cloud database
 * @param userId A unique identifier for the user (e.g., a generated UUID or username)
 * @param state The current GameState to save
 * @returns A boolean indicating success or failure
 */
export async function saveGameStateToCloud(userId: string, state: GameState): Promise<boolean> {
  if (!userId) {
    console.warn('Cannot save game state to cloud: No user ID provided');
    return false;
  }
  
  const result = await updateOneDocument(
    COLLECTION_SAVES,
    { userId },
    { 
      $set: { 
        userId,
        state,
        updatedAt: new Date().toISOString()
      } 
    },
    true
  );
  
  return !!result && (result.modifiedCount > 0 || result.upsertedId !== null || result.matchedCount > 0);
}

/**
 * Loads the user's game state from the cloud database
 * @param userId A unique identifier for the user
 * @returns The parsed GameState or null if not found/error
 */
export async function loadGameStateFromCloud(userId: string): Promise<GameState | null> {
  if (!userId) {
    console.warn('Cannot load game state from cloud: No user ID provided');
    return null;
  }
  
  const doc = await findOneDocument(COLLECTION_SAVES, { userId });
  
  if (doc && doc.state) {
    return doc.state as GameState;
  }
  
  return null;
}