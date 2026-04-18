# 🍪 Cookie Clicker (Hero UI Edition)

A modern, high-performance Cookie Clicker clone built with React, Vite, TypeScript, Tailwind CSS, and **Hero UI**. This project features a fully functional game loop, an upgrade shop, real-time statistics, and cloud save functionality using the **MongoDB Atlas Data API**.

## ✨ Features

- **Interactive Clicker:** Smooth, animated cookie clicking with floating "+1" effects using Framer Motion.
- **Upgrade Shop:** Purchase buildings and upgrades (Cursors, Grandmas, Farms, etc.) to increase your Cookies Per Second (CPS).
- **Real-time Stats:** Track your manual clicks, total buildings, and progress towards your next upgrade goal.
- **Cloud Saves:** Automatically save and load your game state to the cloud using MongoDB Atlas.
- **Modern UI:** Built entirely with Hero UI components for a sleek, accessible, and responsive dark-mode-first design.

## 🚀 Tech Stack

- **Frontend:** React 18, Vite, TypeScript
- **UI Library:** Hero UI (`@heroui/react`)
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Database:** MongoDB Atlas Data API (Serverless HTTP connection)

---

## 🛠️ Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository and navigate to the project directory.
2. Install the dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and visit `http://localhost:5173`.

---

## 🗄️ Database Configuration (MongoDB Atlas)

This game uses the **MongoDB Atlas Data API** to save and load player progress without needing a dedicated backend server. To enable cloud saves, follow these steps:

### 1. Set up MongoDB Atlas
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and create a free account/cluster.
2. Create a new Database named `cookie_game`.
3. Inside that database, create a Collection named `saves`.

### 2. Enable the Data API
1. In your Atlas dashboard, navigate to **Data API** (under Services) on the left sidebar.
2. Click **Enable Data API**.
3. Select your cluster and click **Create API Key**.
4. Copy the generated **API Key** and the **URL Endpoint** immediately (you won't be able to see the key again).

### 3. Configure the Game
Open `src/db.ts` in your code editor and update the exported constants with your specific Atlas details:

```typescript
// src/db.ts
export const MONGO_ENDPOINT = 'YOUR_DATA_API_ENDPOINT_URL'; // e.g., https://data.mongodb-api.com/app/data-xxxxx/endpoint/data/v1
export const MONGO_API_KEY = 'YOUR_GENERATED_API_KEY';
export const DATA_SOURCE = 'Cluster0'; // The name of your Atlas Cluster
export const DATABASE_NAME = 'cookie_game';
export const COLLECTION_SAVES = 'saves';
```

*Note: For a production deployment, you should move these sensitive keys to environment variables (e.g., `.env` and `import.meta.env.VITE_MONGO_API_KEY`).*

---

## 🚢 Deployment

This project is optimized for deployment on **Cloudflare Pages**, Vercel, or Netlify.

To build the project for production:

```bash
npm run build
```

The compiled static files will be located in the `dist/` directory, ready to be uploaded or continuously deployed via your Git repository.

## 📜 License

MIT License - feel free to modify and use this project for your own learning and development!