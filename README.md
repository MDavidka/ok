# 🍪 Cookie Clicker

A modern, high-performance incremental game built with Vanilla TypeScript, Vite, and Tailwind CSS. 

This project demonstrates how to build a robust, state-driven web application without a heavy frontend framework. It features a custom game loop, real-time DOM updates, particle animations, and persistent local storage.

## ✨ Features

*   **Custom Game Engine:** Uses `requestAnimationFrame` for a smooth, high-performance game loop that calculates passive income (Cookies Per Second) accurately using delta time.
*   **Dynamic Economy:** Upgrade costs scale dynamically based on the number of items owned.
*   **Interactive UI:** Satisfying click animations and floating "+1" text particles spawned dynamically on interaction.
*   **Persistent State:** Automatically saves your progress to the browser's `localStorage` every 30 seconds, and allows manual saving/loading.
*   **Responsive Design:** A split-screen layout on desktop that gracefully collapses into a stacked view on mobile devices, styled entirely with Tailwind CSS.
*   **Zero Dependencies (Frontend):** Built with pure Vanilla TypeScript and DOM manipulation for maximum performance and minimal bundle size.

## 🛠️ Tech Stack

*   **Build Tool:** [Vite](https://vitejs.dev/)
*   **Language:** [TypeScript](https://www.typescriptlang.org/) (Strict Mode)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **Deployment:** Ready for [Cloudflare Pages](https://pages.cloudflare.com/)

## 🚀 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (v18+ recommended) and `npm` installed.

### Installation

1. Clone the repository and navigate to the project directory.
2. Install the dependencies:

```bash
npm install
```

### Development Server

Start the Vite development server with Hot Module Replacement (HMR):

```bash
npm run dev
```

Open your browser and navigate to `http://localhost:5173` (or the port specified in your terminal).

### Building for Production

To create a production-ready build:

```bash
npm run build
```

This will compile the TypeScript, process the Tailwind CSS, and output the optimized static assets into the `dist/` directory.

You can preview the production build locally using:

```bash
npm run preview
```

## 📂 Project Structure

```text
project/
├── index.html              # Main HTML entry point
├── src/
│   ├── main.ts             # Game initialization and main game loop
│   ├── types.ts            # Shared TypeScript interfaces (GameState, Upgrade, etc.)
│   ├── utils.ts            # Helper functions (math, formatting, save/load)
│   ├── style.css           # Global styles, Tailwind directives, and CSS animations
│   └── components/         # Modular UI components
│       ├── header.ts       # Top navigation and save controls
│       ├── cookieArea.ts   # The main clickable cookie and particle effects
│       ├── scoreBoard.ts   # Displays current cookies and CPS
│       └── upgradeStore.ts # Renders available upgrades and handles purchases
├── package.json            # Project metadata and scripts
├── tsconfig.json           # TypeScript configuration
└── vite.config.ts          # Vite bundler configuration
```

## ☁️ Deployment

This project is designed to be deployed as a static site. It is perfectly suited for **Cloudflare Pages**, Vercel, Netlify, or GitHub Pages.

**For Cloudflare Pages:**
1. Connect your GitHub repository to Cloudflare Pages.
2. Set the **Framework preset** to `None` or `Vite`.
3. Set the **Build command** to `npm run build`.
4. Set the **Build output directory** to `dist`.
5. Deploy!

## 📝 License

This project is open-source and available under the MIT License.