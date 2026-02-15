import './style.css';
import { renderHero } from './components/hero';
import { renderAbout } from './components/about';
import { SiteConfig } from './types';

document.addEventListener('DOMContentLoaded', () => {
  const app = document.querySelector<HTMLDivElement>('#app');
  if (!app) {
    console.error('Root element with id "app" not found.');
    return;
  }

  const siteConfig: SiteConfig = {
    author: 'Your Name',
    description: 'A simple website to say hello and wave!',
  };

  renderHero(app, siteConfig);
  renderAbout(app);
});