# Randomify - Embrace the Unexpected 🎲

A playful, modern, and energetic landing page built to celebrate randomness. This project is a lightning-fast Single Page Application (SPA) designed with a clean, minimalist aesthetic and vibrant colors.

## 🚀 Features

- **Modern Minimalist Design:** Clean, breathable layouts with a playful vibe.
- **Responsive:** Mobile-first approach ensuring it looks great on all devices.
- **Component-Based Architecture:** Modular TypeScript components for Header, Hero, Features, and Footer.
- **High Performance:** Built with Vite and Vanilla TypeScript for maximum speed and minimal overhead.
- **Tailwind CSS:** Utility-first styling with a custom design system (CSS variables).

## 🛠️ Tech Stack

- **Framework:** [Vite](https://vitejs.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/) (Strict typing)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Deployment:** Ready for [Cloudflare Pages](https://pages.cloudflare.com/)

## 📂 Project Structure

```text
project/
├── index.html          # Main HTML entry point
├── src/
│   ├── main.ts         # Application entry point (orchestrator)
│   ├── types.ts        # Shared TypeScript interfaces & types
│   ├── utils.ts        # Shared helper functions
│   ├── style.css       # Design-system tokens & global Tailwind styles
│   └── components/     # UI Components
│       ├── header.ts
│       ├── hero.ts
│       ├── features.ts
│       └── footer.ts
├── package.json        # Dependencies and scripts
├── tsconfig.json       # TypeScript configuration
└── vite.config.ts      # Vite build configuration
```

## 🚦 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- npm (or pnpm/yarn)

### Installation

1. Clone the repository or download the source code.
2. Install the dependencies:

```bash
npm install
```

### Development Server

Start the local development server with Hot Module Replacement (HMR):

```bash
npm run dev
```

Open your browser and navigate to `http://localhost:5173`.

### Building for Production

To create a production-ready build:

```bash
npm run build
```

The compiled assets will be generated in the `dist/` directory.

### Type Checking

To run TypeScript compiler checks without emitting files:

```bash
npm run check
```

## ☁️ Deployment

This project is optimized for deployment on **Cloudflare Pages**.

1. Push your code to a GitHub/GitLab repository.
2. Log in to the Cloudflare Dashboard and navigate to **Pages**.
3. Create a new project and connect your repository.
4. Configure the build settings:
   - **Framework preset:** Vite
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
5. Click **Save and Deploy**.

## 🎨 Design System

The project uses a custom design system defined in `src/style.css` using CSS variables. These variables are mapped to Tailwind utility classes for consistent styling across the application.

- **Primary:** Vibrant Purple (`#8B5CF6`)
- **Secondary:** Cheerful Yellow (`#FBBF24`)
- **Accent:** Hot Pink (`#EC4899`)
- **Background:** Off-white (`#F9FAFB`)
- **Text:** Dark Slate (`#1E293B`)