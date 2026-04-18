import { GameState, UserData, DbResponse } from './types';

/**
 * DATABASE CONNECTION STATUS
 * Currently set to false as no database integration is configured.
 * UI components should check this flag or handle the error responses
 * to prompt the user to connect a database.
 */
export const IS_DB_CONNECTED = false;

/**
 * Attempts to load user data from the database.
 * STUB: Returns an error response prompting database connection.
 * 
 * @param userId The unique identifier for the user.
 * @returns A promise resolving to a DbResponse containing either the UserData or an error.
 */
export async function loadUserData(userId: string): Promise<DbResponse<UserData>> {
  console.warn(`[DB Stub] Attempted to load data for user ${userId}, but no database is connected.`);
  
  // Simulate network delay for realistic UI loading states
  await new Promise(resolve => setTimeout(resolve, 500));

  return {
    error: "Database integration not connected. Please connect a database in the Integrations tab to enable cloud saving."
  };
}

/**
 * Attempts to save user data to the database.
 * STUB: Returns an error response prompting database connection.
 * 
 * @param userId The unique identifier for the user.
 * @param gameState The current game state to persist.
 * @returns A promise resolving to a DbResponse indicating success or failure.
 */
export async function saveUserData(userId: string, gameState: GameState): Promise<DbResponse<UserData>> {
  console.warn(`[DB Stub] Attempted to save data for user ${userId}, but no database is connected.`);
  
  // Simulate network delay for realistic UI loading states
  await new Promise(resolve => setTimeout(resolve, 500));

  return {
    error: "Database integration not connected. Please connect a database in the Integrations tab to enable cloud saving."
  };
}