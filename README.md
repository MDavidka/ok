# 🍪 Cookie Clicker - Hero UI Edition

A modern, responsive, and highly interactive Cookie Clicker game built with **React**, **TypeScript**, **Tailwind CSS**, and **Hero UI**. 

This project is designed to be a lightweight, serverless application that runs entirely in the browser, utilizing `sessionStorage` to save your progress.

## ✨ Features

- **Click to Bake:** Click the giant cookie to earn cookies. Features satisfying animations powered by Framer Motion.
- **Upgrade Shop:** Spend your hard-earned cookies on upgrades like Auto-Cursors, Grandmas, Farms, and more to increase your Cookies Per Second (CPS).
- **Idle Progression:** The game calculates your CPS and automatically generates cookies over time.
- **Offline Progress:** If you close the tab and come back later in the same session, the game calculates how many cookies you baked while you were away!
- **Session Persistence:** Your game state is automatically saved to your browser's `sessionStorage`.
- **Modern UI:** Built with [Hero UI](https://heroui.com/) for beautiful, accessible, and responsive components.
- **Dark Mode:** Fully supports dark mode out of the box.

## 🛠️ Tech Stack

- **Framework:** [Vite](https://vitejs.dev/) + [React](https://react.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **UI Components:** [Hero UI](https://heroui.com/) (`@heroui/react`)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/)

## 🚀 Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) (v18 or newer recommended) installed on your machine.

### Installation

1. Clone the repository or download the source code.
2. Navigate to the project directory in your terminal.
3. Install the dependencies using your preferred package manager:

```bash
npm install
# or
yarn install
# or
pnpm install
```

### Running Locally

Start the Vite development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open your browser and navigate to `http://localhost:5173` to start baking!

## 🏗️ Building for Production

To create a production-ready build, run:

```bash
npm run build
```

This will compile your TypeScript, bundle your assets, and output the optimized static files into the `dist` directory.

## ☁️ Deployment (Cloudflare Pages)

This project is perfectly suited for deployment on **Cloudflare Pages** as a static site.

1. Push your code to a GitHub or GitLab repository.
2. Log in to the [Cloudflare Dashboard](https://dash.cloudflare.com/) and navigate to **Workers & Pages** > **Pages**.
3. Click **Connect to Git** and select your repository.
4. Configure your build settings:
   - **Framework preset:** Vite
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
5. Click **Save and Deploy**.

Cloudflare will automatically build and deploy your Cookie Clicker game to a global CDN!

## 📁 Project Structure

```text
├── index.html              # Main HTML entry point
├── package.json            # Project dependencies and scripts
├── vite.config.ts          # Vite configuration
├── tsconfig.json           # TypeScript configuration
└── src/
    ├── main.tsx            # React entry point & Game Loop logic
    ├── types.ts            # Shared TypeScript interfaces
    ├── utils.ts            # Helper functions (math, formatting)
    ├── style.css           # Global Tailwind styles & CSS variables
    └── components/         # Hero UI React components
        ├── header.tsx      # Navigation bar
        ├── footer.tsx      # Page footer
        ├── cookie-button.tsx # Interactive cookie clicker
        ├── shop.tsx        # Upgrade purchasing interface
        └── stats-display.tsx # CPS and total cookies metrics
```

## 📝 License

This project is open-source and available under the MIT License.