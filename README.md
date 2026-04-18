# 🍪 Cookie Clicker - HeroUI Edition

A modern, responsive, and accessible incremental game built with React, Vite, Tailwind CSS, and Hero UI. 

## ✨ Features

- **Classic Clicker Mechanics:** Click the giant cookie to earn cookies.
- **Upgrades & Shop:** Purchase cursors, grandmas, farms, and more to increase your Cookies Per Second (CPS).
- **Offline Progression:** Earn cookies even when you're away! The game calculates your offline earnings based on your CPS and time away.
- **Modern UI/UX:** Built entirely with **Hero UI** components for a polished, accessible, and responsive design.
- **Dark/Light Mode:** Fully themed with custom CSS variables and Tailwind classes.
- **Hybrid Saving:** Automatically saves your progress to `localStorage`. Ready to be connected to MongoDB Atlas Data API for cross-device cloud saves.

## 🛠️ Tech Stack

- **Framework:** [React 18](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **UI Library:** [Hero UI](https://heroui.com/) (`@heroui/react`)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Routing:** React Router DOM
- **Icons:** Lucide React

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm, yarn, or pnpm

### Installation

1. Clone the repository or download the source code.
2. Install the dependencies:

```bash
npm install
```

### Running Locally

Start the Vite development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

## 📦 Building for Production

To create a production-ready build:

```bash
npm run build
```

This will generate a `dist` folder containing the optimized static assets. You can preview the build locally using:

```bash
npm run preview
```

## 🗄️ Database Integration (Optional)

By default, the game runs in **Local Save Mode**, storing your progress in the browser's `localStorage`. 

To enable cloud saving across devices, you can connect a MongoDB Atlas database using the Data API:

1. Set up a MongoDB Atlas cluster.
2. Enable the Data API in your Atlas dashboard.
3. Update `src/db.ts` with your Data API endpoint, API key, Cluster Name, and Database Name.
4. Change `export const IS_DB_CONNECTED = false;` to `true` in `src/db.ts`.

*Note: Never commit your actual API keys to version control. Use environment variables (`import.meta.env.VITE_MONGO_API_KEY`) in a real-world scenario.*

## ☁️ Deployment

This project is optimized for deployment on **Cloudflare Pages**, Vercel, or Netlify.

### Cloudflare Pages Deployment Steps:

1. Push your code to a GitHub or GitLab repository.
2. Log in to the Cloudflare dashboard and navigate to **Pages**.
3. Click **Create a project** > **Connect to Git**.
4. Select your repository.
5. Configure the build settings:
   - **Framework preset:** Vite
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
6. Click **Save and Deploy**.

## 📄 License

MIT License - feel free to use this project for your own learning or commercial purposes.