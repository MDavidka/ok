import React from 'react';
import { HeroUIProvider } from '@heroui/react';
import Header from './components/header';
import CookieGame from './components/cookie-game';
import Footer from './components/footer';
import './style.css';

export default function App() {
  return (
    <HeroUIProvider>
      <Header />
      <CookieGame />
      <Footer />
    </HeroUIProvider>
  );
}