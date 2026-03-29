# QuantumMug Landing Page

A lightning-fast, minimal landing page for the revolutionary **QuantumMug** — the only mug that lets you experience your coffee in multiple states simultaneously. 

Built with a focus on performance, simplicity, and modern web standards using **Vite**, **Vanilla TypeScript**, and **Tailwind CSS**. Designed to be instantly deployable to **Cloudflare Pages**.

## 🚀 Tech Stack

*   **Framework:** [Vite](https://vitejs.dev/) (Vanilla TS)
*   **Language:** [TypeScript](https://www.typescriptlang.org/) (Strict typing)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/) (Utility-first, custom design system tokens)
*   **Deployment:** Optimized for [Cloudflare Pages](https://pages.cloudflare.com/)

## 📦 Project Structure

```text
project/
├── index.html          # Main HTML entry point
├── src/
│   ├── main.ts         # Application orchestrator & entry point
│   ├── types.ts        # Shared TypeScript interfaces
│   ├── utils.ts        # Reusable helper functions
│   ├── style.css       # Tailwind directives & global CSS variables
│   └── components/     # UI Components (Hero, Header, Features, Footer)
├── public/             # Static assets
├── package.json        # Dependencies and scripts
├── tsconfig.json       # TypeScript compiler configuration
└── vite.config.ts      # Vite bundler configuration
```

## 🛠️ Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (v18+ recommended) installed on your machine.

### Installation

1. Clone the repository or download the source code.
2. Install the dependencies:

```bash
npm install
```

### Development

Start the local Vite development server with Hot Module Replacement (HMR):

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

### Building for Production

To create a production-ready build:

```bash
npm run build
```

This will compile the TypeScript, process the Tailwind CSS, and output the optimized static files into the `dist/` directory.

### Preview Production Build

To preview the built assets locally before deploying:

```bash
npm run preview
```

### Type Checking

To run the TypeScript compiler and check for type errors without emitting files:

```bash
npm run check
```

## 🎨 Design System

The project uses a custom design system built on top of Tailwind CSS. Global design tokens (colors, typography, spacing) are defined as CSS Custom Properties in `src/style.css`. 

*   **Primary:** Vibrant Purple (`#8b5cf6`)
*   **Secondary:** Cheerful Yellow (`#fbbf24`)
*   **Accent:** Hot Pink (`#ec4899`)
*   **Typography:** Inter / System UI

## ☁️ Deployment (Cloudflare Pages)

This project is pre-configured for seamless deployment to Cloudflare Pages.

1. Push your code to a GitHub or GitLab repository.
2. Log in to the Cloudflare Dashboard and navigate to **Pages**.
3. Create a new project and connect your repository.
4. Configure the build settings:
   *   **Framework preset:** `Vite`
   *   **Build command:** `npm run build`
   *   **Build output directory:** `dist`
5. Click **Save and Deploy**.

## 📄 License

This project is private and proprietary.