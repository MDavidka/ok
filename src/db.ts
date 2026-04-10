// Database configuration constants
export const MONGO_ENDPOINT = 'YOUR_MONGODB_DATA_API_ENDPOINT';
export const MONGO_API_KEY = 'YOUR_MONGODB_DATA_API_KEY';
export const DATA_SOURCE = 'Cluster0';
export const DATABASE_NAME = 'cookie_clicker';
export const COLLECTION_LEADERBOARD = 'leaderboard';
export const COLLECTION_ACHIEVEMENTS = 'achievements';
export const COLLECTION_USERS = 'users';

/**
 * Generic function to make requests to the MongoDB Data API
 */
async function mongoRequest(action: string, data: Record<string, unknown>) {
  const url = `${MONGO_ENDPOINT}/action/${action}`;
  
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
      ...data
    })
  });

  if (!response.ok) {
    throw new Error(`MongoDB request failed: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Get leaderboard entries sorted by score
 */
export async function getLeaderboard(limit: number = 10): Promise<any[]> {
  try {
    const result = await mongoRequest('find', {
      collection: COLLECTION_LEADERBOARD,
      filter: {},
      sort: { score: -1 },
      limit: limit
    });
    
    return result.documents || [];
  } catch (error) {
    console.error('Failed to fetch leaderboard:', error);
    return [];
  }
}

/**
 * Submit a new score to the leaderboard
 */
export async function submitScore(username: string, score: number): Promise<boolean> {
  try {
    const result = await mongoRequest('insertOne', {
      collection: COLLECTION_LEADERBOARD,
      document: {
        username,
        score,
        timestamp: new Date().getTime()
      }
    });
    
    return result.insertedId ? true : false;
  } catch (error) {
    console.error('Failed to submit score:', error);
    return false;
  }
}

/**
 * Save user game state
 */
export async function saveUserState(userId: string, gameState: any): Promise<boolean> {
  try {
    // Try to update existing user state
    const updateResult = await mongoRequest('updateOne', {
      collection: COLLECTION_USERS,
      filter: { userId },
      update: {
        $set: {
          gameState,
          lastUpdated: new Date().getTime()
        }
      }
    });

    // If no document was modified, insert a new one
    if (updateResult.modifiedCount === 0) {
      await mongoRequest('insertOne', {
        collection: COLLECTION_USERS,
        document: {
          userId,
          gameState,
          createdAt: new Date().getTime(),
          lastUpdated: new Date().getTime()
        }
      });
    }

    return true;
  } catch (error) {
    console.error('Failed to save user state:', error);
    return false;
  }
}

/**
 * Load user game state
 */
export async function loadUserState(userId: string): Promise<any | null> {
  try {
    const result = await mongoRequest('findOne', {
      collection: COLLECTION_USERS,
      filter: { userId }
    });
    
    return result.document ? result.document.gameState : null;
  } catch (error) {
    console.error('Failed to load user state:', error);
    return null;
  }
}

/**
 * Get all achievements
 */
export async function getAchievements(): Promise<any[]> {
  try {
    const result = await mongoRequest('find', {
      collection: COLLECTION_ACHIEVEMENTS,
      filter: {}
    });
    
    return result.documents || [];
  } catch (error) {
    console.error('Failed to fetch achievements:', error);
    return [];
  }
}

/**
 * Unlock an achievement for a user
 */
export async function unlockAchievement(userId: string, achievementId: string): Promise<boolean> {
  try {
    // First, verify the achievement exists
    const achievementResult = await mongoRequest('findOne', {
      collection: COLLECTION_ACHIEVEMENTS,
      filter: { id: achievementId }
    });

    if (!achievementResult.document) {
      console.error('Achievement not found:', achievementId);
      return false;
    }

    // Add achievement to user's unlocked achievements
    const updateResult = await mongoRequest('updateOne', {
      collection: COLLECTION_USERS,
      filter: { userId },
      update: {
        $addToSet: { unlockedAchievements: achievementId },
        $setOnInsert: { userId }
      },
      upsert: true
    });

    return updateResult.upsertedId || updateResult.modifiedCount > 0;
  } catch (error) {
    console.error('Failed to unlock achievement:', error);
    return false;
  }
}