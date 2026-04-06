# 🌿 Verdant Aura

Verdant Aura is a premium, high-performance e-commerce platform for indoor plant enthusiasts. Built with a focus on minimalist design and botanical elegance, it provides a seamless shopping experience from discovery to checkout.

## 🚀 Tech Stack

- **Framework:** [Vite](https://vitejs.dev/) (Vanilla TypeScript)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Language:** [TypeScript](https://www.typescript.org/) (Strict Mode)
- **Design System:** Custom "Evergreen Minimalist" tokens
- **Deployment:** Optimized for [Cloudflare Pages](https://pages.cloudflare.com/)

## 🛠️ Project Structure

```text
project/
├── index.html          # Main entry point & SEO metadata
├── src/
│   ├── main.ts         # Application orchestrator & Mesh Router
│   ├── types.ts        # Shared TypeScript interfaces
│   ├── utils.ts        # Cart logic & helper functions
│   ├── style.css       # Design system & Tailwind directives
│   └── components/     # Modular UI components
│       ├── header.ts
│       ├── footer.ts
│       ├── product-card.ts
│       ├── cart-overlay.ts
│       ├── home.ts
│       └── shop.ts
├── public/             # Static assets (images, icons)
├── package.json        # Dependencies & scripts
├── tsconfig.json       # TypeScript configuration
├── vite.config.ts      # Vite build settings
└── README.md           # Project documentation
```

## 🏗️ Architecture Overview

### Mesh Routing
This application uses a custom "Mesh Routing" system implemented in `src/main.ts`. Instead of a heavy framework router, it intercepts navigation events and dynamically re-renders components into the `#main-content` container. This ensures near-instant page transitions and a true Single Page Application (SPA) feel with zero framework overhead.

### State Management
- **Cart State:** Managed in `src/utils.ts` using a reactive pattern. It persists to `localStorage` to ensure user selections are saved across sessions.
- **UI State:** Component-level visibility (like the Cart Overlay) is handled via DOM event listeners and custom `CustomEvent` dispatches.

### Design System
The "Evergreen Minimalist" system uses a sophisticated palette:
- **Primary:** `#064e3b` (Deep Forest Green)
- **Secondary:** `#f0fdf4` (Soft Mint Mist)
- **Accent:** `#c2410c` (Terracotta Orange)
- **Typography:** Playfair Display (Headings) & Inter (Body)

## 🚦 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Development
Start the local development server with Hot Module Replacement (HMR):
```bash
npm run dev
```

### Production Build
Generate a highly optimized production bundle in the `dist/` folder:
```bash
npm run build
```

### Type Checking
Run the TypeScript compiler in no-emit mode to verify type safety:
```bash
npm run check
```

## 🌐 Deployment

This project is configured for easy deployment to **Cloudflare Pages**:
1. Connect your GitHub repository to Cloudflare Pages.
2. Set the **Build command** to `npm run build`.
3. Set the **Output directory** to `dist`.
4. Deploy!

## 📄 License
MIT © Verdant Aura