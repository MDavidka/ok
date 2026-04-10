/**
 * src/db.ts
 * MongoDB Data API wrapper for the Cookie Clicker Leaderboard.
 * 
 * NOTE: Replace these placeholders with your actual MongoDB Atlas Data API credentials.
 */

import { LeaderboardEntry } from './types';

export const MONGO_ENDPOINT = 'https://data.mongodb-api.com/app/data-abcde/endpoint/data/v1';
export const MONGO_API_KEY = 'YOUR_API_KEY_HERE';
export const DATA_SOURCE = 'Cluster0';
export const DATABASE_NAME = 'cookie_clicker_db';
export const COLLECTION_LEADERBOARD = 'leaderboard';

/**
 * Fetches the top 10 scores from the leaderboard collection
 */
export async function getLeaderboard(): Promise<LeaderboardEntry[]> {
  try {
    const response = await fetch(`${MONGO_ENDPOINT}/action/find`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': MONGO_API_KEY,
      },
      body: JSON.stringify({
        dataSource: DATA_SOURCE,
        database: DATABASE_NAME,
        collection: COLLECTION_LEADERBOARD,
        sort: { score: -1 },
        limit: 10,
      }),
    });

    const data = await response.json();
    return data.documents || [];
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    return [];
  }
}

/**
 * Submits a new score to the leaderboard
 */
export async function submitScore(entry: LeaderboardEntry): Promise<boolean> {
  try {
    const response = await fetch(`${MONGO_ENDPOINT}/action/insertOne`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': MONGO_API_KEY,
      },
      body: JSON.stringify({
        dataSource: DATA_SOURCE,
        database: DATABASE_NAME,
        collection: COLLECTION_LEADERBOARD,
        document: entry,
      }),
    });

    const result = await response.json();
    return !!result.insertedId;
  } catch (error) {
    console.error('Error submitting score:', error);
    return false;
  }
}