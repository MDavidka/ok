# Cookie Clicker

A simple and fun idle game where you click a cookie to earn points and buy upgrades that increase your cookie production rate over time.

## 🚀 Features

- **Click to earn cookies**: Click the big cookie to increase your cookie count.
- **Buy upgrades**: Use your cookies to purchase upgrades that increase your cookie production rate.
- **Auto-click**: Some upgrades will generate cookies automatically over time.
- **Save progress**: Your game progress is saved in the browser using `localStorage`.

## 🛠️ Tech Stack

- **Framework**: [Vite](https://vitejs.dev/) (Vanilla TypeScript)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Deployment**: [Cloudflare Pages](https://pages.cloudflare.com/)

## 📦 Project Structure

```
project/
├── index.html
├── src/
│   ├── main.ts          (entry point - imports all components)
│   ├── types.ts         (shared TypeScript interfaces & types)
│   ├── utils.ts         (shared helper functions)
│   ├── style.css        (design-system tokens & global styles)
│   └── components/
│       ├── Cookie.ts    (clickable cookie component)
│       ├── UpgradeList.ts (list of available upgrades)
│       └── StatsDisplay.ts (display of current cookie count and game stats)
├── public/
├── package.json
├── tsconfig.json
├── vite.config.ts
├── .gitignore
└── README.md
```

## 📝 Design System

- **Colors**:
  - `--color-bg`: `#1a1a1a` (Dark background)
  - `--color-text`: `#ffffff` (White text)
  - `--color-primary`: `#ffcc00` (Yellow accent)
  - `--color-upgrade`: `#00cc99` (Cyan for upgrades)
  - `--color-button`: `#333333` (Dark gray for buttons)
- **Fonts**:
  - `--font-body`: `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif`
- **Spacing**:
  - `--spacing-xs`: `0.5rem`
  - `--spacing-sm`: `1rem`
  - `--spacing-md`: `1.5rem`
  - `--spacing-lg`: `2.5rem`
  - `--spacing-xl`: `4rem`
- **Border Radius**:
  - `--border-radius-sm`: `0.375rem`
  - `--border-radius-md`: `0.5rem`
  - `--border-radius-lg`: `0.75rem`
- **Shadows**:
  - `--shadow-sm`: `0 1px 2px 0 rgba(0, 0, 0, 0.05)`
  - `--shadow-md`: `0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)`
  - `--shadow-lg`: `0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)`

## 🧪 How to Run Locally

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/cookie-clicker.git
   cd cookie-clicker
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser**:
   Visit `http://localhost:5173` to play the game.

5. **Build for production**:
   ```bash
   npm run build
   ```

6. **Preview the production build**:
   ```bash
   npm run preview
   ```

## 🧠 Game Mechanics

- **Cookie Count**: The number of cookies you've collected.
- **Click Value**: The number of cookies you get per click.
- **Auto Click Value**: The number of cookies generated automatically per second.
- **Upgrades**: Special items you can buy to increase your cookie production rate.

## 📚 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 📧 Contact

If you have any questions or suggestions, feel free to reach out to me at [your-email@example.com](mailto:your-email@example.com).

## 🌟 Contributing

Contributions are welcome! Please read the [CONTRIBUTING.md](CONTRIBUTING.md) file for details on how to contribute to this project.

## 📸 Screenshots

![Cookie Clicker Screenshot](https://placehold.co/800x600.png)

## 📈 Roadmap

- [ ] Add more upgrades with different effects
- [ ] Add a leaderboard (if needed)
- [ ] Add achievements and milestones
- [ ] Add a dark/light mode toggle
- [ ] Add sound effects and background music

## 📌 Notes

- The game state is saved in the browser's `localStorage`, so your progress will be preserved even if you close the browser.
- The game is designed to be simple and fun, with a focus on core mechanics and a clean UI.
- The code is written in TypeScript for type safety and better developer experience.
- The project uses Vite for fast development and build times.