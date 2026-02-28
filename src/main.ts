import './style.css';
import { Header } from './components/header';
import { Footer } from './components/footer';
import { WelcomeMessage } from './components/welcomeMessage';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  ${Header({ className: 'container mx-auto py-4' })}
  <main class="container mx-auto py-8">
    ${WelcomeMessage({ className: 'mb-8' })}
  </main>
  ${Footer({ className: 'container mx-auto py-4' })}
`;