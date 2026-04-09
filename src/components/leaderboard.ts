import { LeaderboardEntry } from '../types';
import { formatNumber } from '../utils';
import { findDocuments, insertDocument, COLLECTION_LEADERBOARD } from '../db';

/**
 * Initializes the Leaderboard UI, fetches top scores, and handles new score submissions.
 * 
 * @param container The DOM element to mount the leaderboard into
 * @param getCurrentScore A function that returns the player's current cookie count
 */
export function initLeaderboard(
    container: HTMLElement,
    getCurrentScore: () => number
) {
    // Setup the main leaderboard container
    container.innerHTML = `
        <div class="bg-white/80 backdrop-blur-md rounded-2xl p-4 md:p-6 shadow-xl border border-white/40 h-full flex flex-col max-h-[calc(100vh-6rem)]">
            <div class="flex items-center justify-between mb-4">
                <h2 class="text-2xl font-heading font-black text-text flex items-center gap-2">
                    <span class="text-3xl drop-shadow-sm">🏆</span> Leaderboard
                </h2>
                <button id="refresh-leaderboard" class="p-2 hover:bg-gray-100 rounded-full transition-all active:scale-95" title="Refresh Leaderboard">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                </button>
            </div>

            <div id="leaderboard-list" class="flex-1 overflow-y-auto pr-2 space-y-2 pb-4 min-h-[200px] custom-scrollbar">
                <div class="flex justify-center items-center h-full text-gray-500 animate-pulse font-bold">
                    Loading top bakers...
                </div>
            </div>

            <div class="mt-4 pt-4 border-t border-gray-200/60 bg-white/50 rounded-xl p-3">
                <h3 class="text-sm font-bold text-gray-700 mb-2 flex items-center gap-1">
                    <span>📝</span> Submit Your Score
                </h3>
                <form id="submit-score-form" class="flex gap-2">
                    <input type="text" id="player-name" placeholder="Enter your name" required maxlength="15"
                        class="flex-1 px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent bg-white shadow-inner text-sm font-bold text-text placeholder-gray-400">
                    <button type="submit" id="submit-score-btn"
                        class="px-4 py-2 bg-accent text-white font-bold rounded-lg hover:bg-accent/90 hover:shadow-md transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1">
                        Submit
                    </button>
                </form>
                <p id="submit-message" class="text-xs mt-2 hidden text-center"></p>
            </div>
        </div>
    `;

    const listContainer = container.querySelector('#leaderboard-list') as HTMLElement;
    const refreshBtn = container.querySelector('#refresh-leaderboard') as HTMLButtonElement;
    const form = container.querySelector('#submit-score-form') as HTMLFormElement;
    const nameInput = container.querySelector('#player-name') as HTMLInputElement;
    const submitBtn = container.querySelector('#submit-score-btn') as HTMLButtonElement;
    const messageEl = container.querySelector('#submit-message') as HTMLElement;

    /**
     * Fetches the latest scores from the database and renders them.
     */
    async function loadLeaderboard() {
        listContainer.innerHTML = `
            <div class="flex justify-center items-center h-full text-gray-500 animate-pulse font-bold">
                Loading top bakers...
            </div>
        `;
        
        try {
            // Fetch documents from MongoDB Data API
            const response = await findDocuments(COLLECTION_LEADERBOARD, {});
            let entries: LeaderboardEntry[] = response.documents || [];

            // Sort descending by score in memory (ensures sorting even if DB wrapper doesn't pass sort params)
            entries.sort((a, b) => b.score - a.score);
            
            // Take top 50
            entries = entries.slice(0, 50);

            if (entries.length === 0) {
                listContainer.innerHTML = `
                    <div class="flex flex-col justify-center items-center h-full text-gray-400 gap-2">
                        <span class="text-4xl opacity-50">📭</span>
                        <span class="font-bold">No scores yet. Be the first!</span>
                    </div>
                `;
                return;
            }

            listContainer.innerHTML = entries.map((entry, index) => {
                let rankIcon = `<span class="text-gray-400 font-black w-8 text-center text-lg">${index + 1}</span>`;
                if (index === 0) rankIcon = `<span class="text-3xl w-8 text-center drop-shadow-sm" title="1st Place">🥇</span>`;
                if (index === 1) rankIcon = `<span class="text-3xl w-8 text-center drop-shadow-sm" title="2nd Place">🥈</span>`;
                if (index === 2) rankIcon = `<span class="text-3xl w-8 text-center drop-shadow-sm" title="3rd Place">🥉</span>`;

                return `
                    <div class="flex items-center justify-between p-3 bg-white rounded-xl shadow-sm border border-gray-100 hover:border-accent/40 hover:shadow-md transition-all group">
                        <div class="flex items-center gap-3">
                            ${rankIcon}
                            <span class="font-bold text-text truncate max-w-[120px] md:max-w-[160px] group-hover:text-accent transition-colors">
                                ${escapeHTML(entry.name)}
                            </span>
                        </div>
                        <div class="font-heading font-black text-cookie flex items-center gap-1.5 bg-orange-50 px-2 py-1 rounded-lg">
                            <span>${formatNumber(entry.score)}</span>
                            <span class="text-sm">🍪</span>
                        </div>
                    </div>
                `;
            }).join('');
        } catch (error) {
            console.error('Failed to load leaderboard:', error);
            listContainer.innerHTML = `
                <div class="flex flex-col justify-center items-center h-full text-red-400 gap-2 text-center">
                    <span class="text-3xl">⚠️</span>
                    <span class="font-bold text-sm">Failed to load leaderboard.<br>Please try again later.</span>
                </div>
            `;
        }
    }

    /**
     * Displays a temporary status message below the form.
     */
    function showMessage(msg: string, className: string) {
        messageEl.textContent = msg;
        messageEl.className = `text-xs mt-2 font-bold text-center ${className} animate-fade-in`;
        messageEl.classList.remove('hidden');
    }

    /**
     * Basic HTML escaping to prevent XSS from user names.
     */
    function escapeHTML(str: string): string {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    // Event Listeners
    refreshBtn.addEventListener('click', () => {
        const svg = refreshBtn.querySelector('svg');
        if (svg) svg.classList.add('animate-spin');
        
        loadLeaderboard().finally(() => {
            if (svg) setTimeout(() => svg.classList.remove('animate-spin'), 500);
        });
    });

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = nameInput.value.trim();
        const score = getCurrentScore();

        if (!name) return;
        
        if (score <= 0) {
            showMessage('You need more than 0 cookies to submit!', 'text-red-500');
            return;
        }

        // Disable form during submission
        submitBtn.disabled = true;
        nameInput.disabled = true;
        showMessage('Submitting score...', 'text-gray-500');

        try {
            await insertDocument(COLLECTION_LEADERBOARD, {
                name,
                score,
                date: new Date().toISOString()
            });
            
            showMessage('Score submitted successfully! 🎉', 'text-green-600');
            nameInput.value = '';
            
            // Refresh the board to show the new score
            await loadLeaderboard();
        } catch (error) {
            console.error('Failed to submit score:', error);
            showMessage('Failed to submit score. Try again.', 'text-red-500');
        } finally {
            // Re-enable form
            submitBtn.disabled = false;
            nameInput.disabled = false;
            
            // Hide message after a few seconds
            setTimeout(() => {
                messageEl.classList.add('hidden');
            }, 4000);
        }
    });

    // Initial load
    loadLeaderboard();
}