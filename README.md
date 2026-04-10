# Cookie Clicker Pro

A high-performance, incremental "Cookie Clicker" game built with **Vite**, **TypeScript**, and **Tailwind CSS**. This project is designed for deployment on **Cloudflare Pages** and features a persistent local save system and a global leaderboard powered by the **MongoDB Atlas Data API**.

## 🚀 Features
- **Incremental Gameplay:** Click to earn cookies, purchase upgrades, and generate passive income (CPS).
- **Persistent Storage:** Automatically saves your progress to your browser's `localStorage`.
- **Global Leaderboard:** Compete with other players by submitting your high score to a cloud-hosted database.
- **Responsive Design:** Mobile-first UI built with Tailwind CSS.
- **High Performance:** Optimized game loop running at 10Hz for smooth updates.

## 🛠 Tech Stack
- **Framework:** Vite (Vanilla TypeScript)
- **Styling:** Tailwind CSS
- **Database:** MongoDB Atlas Data API
- **Deployment:** Cloudflare Pages

## 📦 Project Structure
- `src/main.ts`: The game engine and orchestration layer.
- `src/components/`: Modular UI components (Cookie, Upgrades, Leaderboard, Score).
- `src/db.ts`: API wrappers for MongoDB Atlas.
- `src/style.css`: Design system tokens and custom animations.

## 🎮 How to Play
1. **Click the Cookie:** Click the central cookie to earn your first batch of cookies.
2. **Buy Upgrades:** Once you have enough, purchase "Auto-Clickers" or "Grandma's Ovens" from the store to generate cookies automatically.
3. **Save Progress:** The game saves automatically every few seconds.
4. **Compete:** Submit your score to the global leaderboard to see how you rank against other players.

## 🚀 Deployment Steps
1. **Clone the repository.**
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Configure Database:**
   - Create a MongoDB Atlas cluster.
   - Enable the **Data API**.
   - Update `src/db.ts` with your `MONGO_ENDPOINT` and `MONGO_API_KEY`.
4. **Build for Production:**
   ```bash
   npm run build
   ```
5. **Deploy:**
   - Connect your GitHub repository to **Cloudflare Pages**.
   - Set the build command to `npm run build` and the output directory to `dist`.