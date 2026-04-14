# Cookie Clicker (No Database)

A simple, fun cookie-clicker game built with modern web technologies. Click the cookie to earn points, with progress saved in browser session storage (persists on refresh but not across devices/browsers).

![Cookie Clicker Screenshot](https://placehold.co/800x400.png?text=Cookie+Clicker+Game)

## ✨ Features

- **Click to Earn**: Click the cookie to increment your score
- **Session Persistence**: Progress saved in `sessionStorage` (survives page refresh)
- **Real-time Stats**: See your clicks per second (CPS) and total clicks
- **Visual Feedback**: Animated cookie press effect
- **Reset Option**: Clear your session and start fresh
- **Responsive Design**: Works on mobile and desktop
- **Modern UI**: Built with Hero UI components and Tailwind CSS
- **TypeScript**: Full type safety for better developer experience

## 🛠️ Tech Stack

- **Framework**: [Vite](https://vitejs.dev/) with React + TypeScript
- **UI Library**: [Hero UI](https://heroui.com/) (React component library)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (via Hero UI integration)
- **State Management**: Browser `sessionStorage` (no external database)
- **Icons**: Built-in Hero UI icons
- **Deployment**: Optimized for [Cloudflare Pages](https://pages.cloudflare.com/)

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/cookie-clicker.git
cd cookie-clicker

# Install dependencies
npm install
```

### Development

```bash
# Start the development server
npm run dev

# Open http://localhost:5173 in your browser
```

### Building for Production

```bash
# Create production build
npm run build

# Preview the build
npm run preview
```

## 🎮 How to Play

1. Click the large cookie in the center of the screen
2. Each click earns you 1 point
3. Your score, total clicks, and clicks per second (CPS) are displayed
4. Progress is automatically saved to your browser's session storage
5. To reset your game, click the "Reset Session" button at the bottom
6. Refreshing the page will restore your last session

## ☁️ Deployment to Cloudflare Pages

This project is ready for deployment to Cloudflare Pages:

1. Push your code to a GitHub/GitLab/Bitbucket repository
2. Go to [Cloudflare Pages](https://dash.cloudflare.com/pages)
3. Click "Create a project" and connect your repository
4. Configure the build settings:
   - **Framework preset**: Vite
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
5. Click "Save and Deploy"

Your site will be automatically deployed on every push to your connected branch.

## 📁 Project Structure

```
cookie-clicker/
├── public/                 # Static assets
├── src/
│   ├── main.tsx           # React entry point
│   ├── types.ts           # Shared TypeScript interfaces
│   ├── utils.ts           # Utility functions (sessionStorage helpers)
│   ├── style.css          # Design system tokens & global styles
│   └── components/
│       ├── header.tsx     # App header/navigation
│       ├── cookie-game.tsx # Main gameplay component
│       └── footer.tsx     # App footer
├── index.html             # HTML entry point
├── package.json           # Dependencies & scripts
├── tsconfig.json          # TypeScript configuration
├── vite.config.ts         # Vite configuration
├── .gitignore             # Git ignore rules
└── README.md              # This file
```

## 🔧 How It Works

### State Management

The game uses browser `sessionStorage` to persist state:
- State is saved automatically after each click
- On page load, the game attempts to restore state from sessionStorage
- State includes: score, timestamp of last click, and total click count
- Data is cleared when the browser tab/session ends

### Key Utilities (`src/utils.ts`)

- `loadState()`: Retrieves and parses game state from sessionStorage
- `saveState(state)`: Saves game state to sessionStorage
- `resetState()`: Resets to initial state and saves it
- `formatNumber(n)`: Formats large numbers for display

### Game Logic (`src/components/cookie-game.tsx`)

- Uses React hooks (`useState`, `useEffect`) for state management
- Implements click handling with visual feedback (scale animation)
- Calculates CPS based on time since first click
- Renders UI using Hero UI components (Button, Card, Chip, etc.)

## 🎨 Design System

The game uses a custom design system defined in `src/style.css`:

### Color Palette
- **Primary**: `#6366f1` (Indigo)
- **Secondary**: `#8b5cf6` (Violet)
- **Accent**: `#f43f5e` (Rose)
- **Background**: `#0f172a` (Dark Blue)
- **Text**: `#e2e8f0` (Light Slate)
- **Muted**: `#94a3b8` (Slate)

### Typography
- **Heading**: Inter, system-ui, sans-serif
- **Body**: Inter, system-ui, sans-serif

### Spacing & Radius
- Consistent 4px-based spacing scale
- 12px border radius for soft, modern feel

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [Hero UI](https://heroui.com/) for the beautiful component library
- [Vite](https://vitejs.dev/) for the blazing fast development experience
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [React](https://react.dev/) and [TypeScript](https://www.typescriptlang.org/) for the robust frontend stack

---

Made with ❤️ for cookie lovers everywhere. Happy clicking!