import { LeaderboardEntry } from './types';

// ============================================================================
// MongoDB Atlas Data API Configuration
// Replace these placeholders with your actual MongoDB Atlas Data API details.
// ============================================================================
export const MONGO_ENDPOINT = 'ENDPOINT_HERE';
export const MONGO_API_KEY = 'KEY_HERE';
export const DATA_SOURCE = 'Cluster0';
export const DATABASE_NAME = 'cookie_clicker_db';
export const COLLECTION_LEADERBOARD = 'leaderboard';

/**
 * Generic wrapper for MongoDB Atlas Data API requests.
 * @param action The API action (e.g., 'action/find', 'action/updateOne')
 * @param payload The request body payload
 */
async function mongoFetch(action: string, payload: Record<string, any>) {
  // Prevent actual fetch if placeholders are still in place
  if (MONGO_ENDPOINT === 'ENDPOINT_HERE' || MONGO_API_KEY === 'KEY_HERE') {
    console.warn('MongoDB Data API is not configured. Returning mock data.');
    return null;
  }

  const url = `${MONGO_ENDPOINT}/${action}`;
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Request-Headers': '*',
      'api-key': MONGO_API_KEY,
    },
    body: JSON.stringify({
      dataSource: DATA_SOURCE,
      database: DATABASE_NAME,
      collection: COLLECTION_LEADERBOARD,
      ...payload,
    }),
  });

  if (!response.ok) {
    throw new Error(`MongoDB API Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

/**
 * Fetches the top players from the global leaderboard.
 * @param limit Maximum number of entries to return (default: 10)
 * @returns Array of LeaderboardEntry objects
 */
export async function getLeaderboard(limit: number = 10): Promise<LeaderboardEntry[]> {
  try {
    const data = await mongoFetch('action/find', {
      sort: { score: -1 }, // Sort by score descending
      limit: limit,
    });

    // Return mock data if DB is not configured
    if (!data) {
      return [
        { username: 'Grandma', score: 1000000, timestamp: Date.now() },
        { username: 'CookieMonster', score: 500000, timestamp: Date.now() },
        { username: 'BakerBob', score: 25000, timestamp: Date.now() },
      ];
    }

    return data.documents as LeaderboardEntry[];
  } catch (error) {
    console.error('Failed to fetch leaderboard:', error);
    return [];
  }
}

/**
 * Submits a player's score to the global leaderboard.
 * Uses an upsert with $max to ensure we only keep their highest score.
 * @param username The player's display name
 * @param score The player's total cookies baked
 * @returns Boolean indicating success
 */
export async function submitScore(username: string, score: number): Promise<boolean> {
  if (!username || username.trim() === '') return false;

  try {
    const data = await mongoFetch('action/updateOne', {
      filter: { username: username.trim() },
      update: {
        // Only update the score if the new score is higher
        $max: { score: Math.floor(score) },
        // Always update the timestamp when they submit
        $set: { timestamp: Date.now() }
      },
      upsert: true, // Create a new document if the username doesn't exist
    });

    if (!data) {
      console.log(`Mock submission successful for ${username}: ${score}`);
      return true;
    }

    return true;
  } catch (error) {
    console.error('Failed to submit score:', error);
    return false;
  }
}