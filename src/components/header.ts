import { GameState, GameComponent } from '../types';

/**
 * Creates the header component containing the game title and global controls.
 * 
 * @param onForceSave Callback triggered when the user clicks the Save button
 * @param onHardReset Callback triggered when the user confirms a hard reset
 * @returns A GameComponent instance
 */
export function createHeader(
    onForceSave: () => void,
    onHardReset: () => void
): GameComponent {
    let statusText: HTMLElement | null = null;

    return {
        render(container: HTMLElement): void {
            const header = document.createElement('header');
            header.className = 'flex justify-between items-center p-3 md:p-4 bg-[var(--color-surface)] shadow-sm border-b border-[var(--color-surface-hover)] sticky top-0 z-40';

            // Left side: Logo and Title
            const titleGroup = document.createElement('div');
            titleGroup.className = 'flex items-center gap-2 md:gap-3';

            const logo = document.createElement('div');
            logo.textContent = '🍪';
            logo.className = 'text-2xl md:text-3xl drop-shadow-sm select-none';

            const title = document.createElement('h1');
            title.textContent = 'Cookie Clicker';
            title.className = 'text-lg md:text-2xl font-heading font-bold text-[var(--color-text)] tracking-tight select-none';

            titleGroup.appendChild(logo);
            titleGroup.appendChild(title);

            // Right side: Controls
            const controlsGroup = document.createElement('div');
            controlsGroup.className = 'flex items-center gap-2 md:gap-4';

            // Save confirmation toast text
            statusText = document.createElement('span');
            statusText.className = 'text-xs font-bold text-[var(--color-primary)] hidden md:inline-block transition-opacity duration-500 opacity-0 pointer-events-none';
            statusText.textContent = 'Game Saved!';

            // Manual Save Button
            const saveBtn = document.createElement('button');
            saveBtn.textContent = 'Save';
            saveBtn.className = 'btn-primary text-xs md:text-sm py-1.5 px-3 md:px-4';
            saveBtn.title = 'Manually save your progress';
            saveBtn.addEventListener('click', () => {
                onForceSave();
                
                // Show toast notification
                if (statusText) {
                    statusText.style.opacity = '1';
                    setTimeout(() => {
                        if (statusText) statusText.style.opacity = '0';
                    }, 2000);
                }
            });

            // Hard Reset Button
            const resetBtn = document.createElement('button');
            resetBtn.textContent = 'Reset';
            resetBtn.className = 'bg-red-100 text-red-700 hover:bg-red-200 hover:text-red-800 font-bold py-1.5 px-3 md:px-4 rounded-lg shadow-sm transition-colors active:scale-95 text-xs md:text-sm border border-red-200';
            resetBtn.title = 'Wipe all progress and start over';
            resetBtn.addEventListener('click', () => {
                const confirmed = window.confirm(
                    'Are you sure you want to wipe your save?\n\nThis will reset ALL your cookies and upgrades. This action CANNOT be undone!'
                );
                if (confirmed) {
                    onHardReset();
                }
            });

            controlsGroup.appendChild(statusText);
            controlsGroup.appendChild(saveBtn);
            controlsGroup.appendChild(resetBtn);

            header.appendChild(titleGroup);
            header.appendChild(controlsGroup);

            container.appendChild(header);
        },
        
        update(_state: GameState, _currentCps: number): void {
            // The header doesn't currently need to re-render on every game tick.
            // If we wanted to show a "Last saved X mins ago" timer, we would update it here.
        }
    };
}