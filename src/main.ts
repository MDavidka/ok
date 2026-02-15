import './style.css'
import { renderHeader } from './components/header';
import { renderFooter } from './components/footer';
import { renderWelcomeMessage } from './components/welcomeMessage';
import { renderWaveAnimation } from './components/waveAnimation';
import { renderLayout } from './components/layout';

document.addEventListener('DOMContentLoaded', () => {
  const app = document.querySelector<HTMLDivElement>('#app');

  if (!app) {
    console.error('Root element with id "app" not found.');
    return;
  }

  // Render the layout
  const layout = renderLayout();
  app.appendChild(layout);

  // Get the main content area from the layout
  const mainContent = layout.querySelector<HTMLElement>('#main-content');

  if (!mainContent) {
    console.error('Main content area with id "main-content" not found.');
    return;
  }

  // Render the header
  const header = renderHeader();
  layout.insertBefore(header, mainContent); // Insert header before main content

  // Render the welcome message
  const welcomeMessage = renderWelcomeMessage();
  mainContent.appendChild(welcomeMessage);

  // Render the wave animation
  const waveAnimation = renderWaveAnimation();
  mainContent.appendChild(waveAnimation);

  // Render the footer
  const footer = renderFooter();
  layout.appendChild(footer); // Append footer after main content
});