import './style.css'
import { renderHeader } from './components/header';
import { renderFooter } from './components/footer';
import { renderHero } from './components/hero';
import { renderFeatures } from './components/features';
import { renderPricing } from './components/pricing';
import { renderFaq } from './components/faq';
import { renderCallToAction } from './components/callToAction';

document.addEventListener('DOMContentLoaded', () => {
  const app = document.querySelector<HTMLDivElement>('#app');

  if (!app) {
    console.error('Root element with id "app" not found.');
    return;
  }

  // Render components
  const header = renderHeader();
  const hero = renderHero();
  const features = renderFeatures();
  const pricing = renderPricing();
  const faq = renderFaq();
  const callToAction = renderCallToAction();
  const footer = renderFooter();

  // Append components to the app
  app.appendChild(header);
  app.appendChild(hero);
  app.appendChild(features);
  app.appendChild(pricing);
  app.appendChild(faq);
  app.appendChild(callToAction);
  app.appendChild(footer);
});