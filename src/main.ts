import './style.css'
import { renderHeader } from './components/header'
import { renderFooter } from './components/footer'
import { renderHero } from './components/hero'
import { renderAbout } from './components/about'
import { renderProjects } from './components/projects'
import { renderContact } from './components/contact'

document.addEventListener('DOMContentLoaded', () => {
  const app = document.querySelector<HTMLDivElement>('#app')

  if (!app) {
    console.error('Root element with id "app" not found.')
    return
  }

  // Create container elements
  const headerContainer = document.createElement('header')
  const mainContainer = document.createElement('main')
  const footerContainer = document.createElement('footer')

  // Add Tailwind classes for layout
  headerContainer.classList.add('sticky', 'top-0', 'z-50', 'bg-zinc-900', 'bg-opacity-75', 'backdrop-blur', 'shadow-md')
  mainContainer.classList.add('container', 'mx-auto', 'py-8', 'px-4', 'md:px-6')
  footerContainer.classList.add('bg-zinc-900', 'text-zinc-400', 'py-6', 'text-center')

  // Append containers to the app
  app.appendChild(headerContainer)
  app.appendChild(mainContainer)
  app.appendChild(footerContainer)

  // Render components into their respective containers
  renderHeader(headerContainer)
  renderHero(mainContainer)
  renderAbout(mainContainer)
  renderProjects(mainContainer)
  renderContact(mainContainer)
  renderFooter(footerContainer)
})