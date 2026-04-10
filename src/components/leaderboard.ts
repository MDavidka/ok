import { getLeaderboard, submitScore } from '../db';
import { LeaderboardEntry } from '../types';

/**
 * Renders the leaderboard component.
 * Fetches top scores from the database and provides a form to submit the current score.
 */
export async function renderLeaderboard(
  container: HTMLElement,
  currentScore: number
): Promise<void> {
  container.innerHTML = `
    <div class="card p-6 bg-[var(--color-surface)] rounded-xl border border-gray-700">
      <h2 class="text-2xl font-bold text-[var(--color-accent)] mb-4">Global Leaderboard</h2>
      
      <div id="leaderboard-content" class="space-y-4">
        <p class="text-[var(--color-text-muted)] italic">Loading rankings...</p>
      </div>

      <div class="mt-8 pt-6 border-t border-gray-700">
        <h3 class="text-lg font-semibold mb-3">Submit Your Score</h3>
        <div class="flex gap-2">
          <input 
            type="text" 
            id="player-name" 
            placeholder="Enter your name" 
            maxlength="15"
            class="flex-1 bg-[var(--color-bg)] border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:border-[var(--color-primary)]"
          />
          <button 
            id="submit-score-btn" 
            class="bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-bold py-2 px-4 rounded transition-colors"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  `;

  // Fetch and display scores
  const contentEl = container.querySelector('#leaderboard-content') as HTMLElement;
  try {
    const scores = await getLeaderboard();
    if (scores.length === 0) {
      contentEl.innerHTML = '<p class="text-[var(--color-text-muted)]">No scores yet. Be the first!</p>';
    } else {
      contentEl.innerHTML = `
        <ul class="space-y-2">
          ${scores
            .sort((a, b) => b.score - a.score)
            .slice(0, 10)
            .map((entry, i) => `
              <li class="flex justify-between items-center p-2 bg-[var(--color-bg)] rounded border border-gray-800">
                <span class="font-mono text-[var(--color-text-muted)]">#${i + 1}</span>
                <span class="font-bold">${entry.name}</span>
                <span class="text-[var(--color-primary)] font-bold">${Math.floor(entry.score).toLocaleString()}</span>
              </li>
            `).join('')}
        </ul>
      `;
    }
  } catch (err) {
    contentEl.innerHTML = '<p class="text-red-400">Failed to load leaderboard.</p>';
  }

  // Handle submission
  const submitBtn = container.querySelector('#submit-score-btn') as HTMLButtonElement;
  const nameInput = container.querySelector('#player-name') as HTMLInputElement;

  submitBtn.addEventListener('click', async () => {
    const name = nameInput.value.trim();
    if (!name) {
      alert('Please enter a name!');
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = 'Submitting...';

    const success = await submitScore({ name, score: currentScore });
    
    if (success) {
      alert('Score submitted!');
      renderLeaderboard(container, currentScore); // Refresh
    } else {
      alert('Failed to submit score.');
      submitBtn.disabled = false;
      submitBtn.textContent = 'Submit';
    }
  });
}