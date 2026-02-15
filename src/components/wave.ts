export function renderWave(container: HTMLElement): void {
  const waveElement = document.createElement('div');
  waveElement.className = 'wave-container';

  waveElement.innerHTML = `
    <svg viewBox="0 24 150 28" preserveAspectRatio="none" class="wave" style="height: 50px; width: 100%;">
      <defs>
        <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
      </defs>
      <g class="parallax">
        <use xlinkHref="#gentle-wave" x="48" y="0" fill="rgba(var(--color-primary-rgb),0.7)" />
        <use xlinkHref="#gentle-wave" x="48" y="3" fill="rgba(var(--color-primary-rgb),0.5)" />
        <use xlinkHref="#gentle-wave" x="48" y="5" fill="rgba(var(--color-primary-rgb),0.3)" />
        <use xlinkHref="#gentle-wave" x="48" y="7" fill="var(--color-primary)" />
      </g>
    </svg>
  `;

  container.appendChild(waveElement);
}