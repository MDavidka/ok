# 🍪 Cookie Clicker

A modern, fast, and addictive incremental game built with Vite, TypeScript, and Tailwind CSS. 
Bake cookies, buy upgrades, and compete against players worldwide on the Global Leaderboard!

## ✨ Features

- **Classic Incremental Gameplay:** Click the giant cookie to earn cookies.
- **Upgrades & Automation:** Buy Cursors, Grandmas, Farms, and more to increase your Cookies Per Second (CPS).
- **Offline Progress:** Come back later and see how many cookies your bakery produced while you were away (capped at 24 hours).
- **Global Leaderboard:** Submit your high score and see how you rank against other bakers globally.
- **Responsive Design:** Play seamlessly on desktop, tablet, or mobile devices.
- **Modern Tech Stack:** Built for speed and maintainability using Vanilla TypeScript and Vite.

## 🚀 Quick Start (Local Development)

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to `http://localhost:5173` to start baking!

## 🗄️ Database Setup (Global Leaderboard)

To enable the Global Leaderboard functionality, this project uses the **MongoDB Atlas Data API**. You need to set up a free MongoDB cluster and connect it to the game.

### Step 1: Create a MongoDB Atlas Cluster
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and sign up/log in.
2. Create a new **Free Tier (M0)** cluster.
3. Once the cluster is provisioned, click **Browse Collections** and create a new Database and Collection:
   - **Database Name:** `cookie_clicker`
   - **Collection Name:** `leaderboard`

### Step 2: Enable the Data API
1. In the left sidebar of your MongoDB Atlas dashboard, under **Services**, click on **Data API**.
2. Click **Enable the Data API**.
3. Select your cluster and click **Enable**.
4. Copy your **URL Endpoint** (you will need this later).

### Step 3: Create an API Key
1. On the Data API page, go to the **API Keys** tab.
2. Click **Generate API Key**.
3. Give it a name (e.g., "Cookie Clicker App") and click **Generate API Key**.
4. **Copy the API Key immediately** (it will only be shown once).

### Step 4: Connect the Game
Open the `src/db.ts` file in your project and update the configuration constants with the values you just obtained:

```typescript
// src/db.ts
export const MONGO_ENDPOINT = 'YOUR_URL_ENDPOINT_HERE';
export const MONGO_API_KEY = 'YOUR_API_KEY_HERE';
export const DATA_SOURCE = 'Cluster0'; // Change if your cluster name is different
export const DATABASE_NAME = 'cookie_clicker';
export const COLLECTION_LEADERBOARD = 'leaderboard';
```

*Note: Because this is a client-side only application deployed to Cloudflare Pages, the API key is exposed to the client. For a true production environment, you should wrap the MongoDB Data API calls in Cloudflare Workers or another serverless function to hide the API key.*

## 🛠️ Building for Production

To build the project for production (e.g., deploying to Cloudflare Pages):

```bash
npm run build
```

This will generate a `dist/` directory containing the optimized, minified static files ready for deployment.

## 🌐 Deployment (Cloudflare Pages)

1. Push your code to a GitHub or GitLab repository.
2. Log in to the [Cloudflare Dashboard](https://dash.cloudflare.com/).
3. Go to **Workers & Pages** -> **Create application** -> **Pages** -> **Connect to Git**.
4. Select your repository.
5. Configure the build settings:
   - **Framework preset:** `Vite`
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
6. Click **Save and Deploy**.

Happy Baking! 🍪