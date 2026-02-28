# Welcome Site

A simple welcome website built with Vite, TypeScript, and Tailwind CSS. This project provides a basic structure for a welcome page with a fade-in animation.

## Project Structure

```
welcome-site/
├── index.html         # Main HTML file
├── src/
│   ├── main.ts          # Entry point for the application
│   ├── style.css        # Global styles and CSS animations
│   ├── types.ts         # TypeScript interfaces
│   ├── utils.ts         # Utility functions
│   └── components/
│       ├── header.ts      # Header component
│       ├── footer.ts      # Footer component
│       ├── welcomeMessage.ts # Welcome message component with fade-in animation
├── vite.config.ts     # Vite configuration file
├── tsconfig.json      # TypeScript configuration file
├── package.json       # Project dependencies and scripts
├── .gitignore         # Specifies intentionally untracked files that Git should ignore
└── README.md          # Project documentation
```

## Key Technologies

*   **Vite:** A fast build tool for modern web development.
*   **TypeScript:** A typed superset of JavaScript that compiles to plain JavaScript.
*   **Tailwind CSS:** A utility-first CSS framework for rapid UI development.

## Getting Started

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd <project-directory>
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Run the development server:**

    ```bash
    npm run dev
    ```

    This will start the Vite development server, and you can view the website in your browser at `http://localhost:5173`.

4.  **Build for production:**

    ```bash
    npm run build
    ```

    This will create a `dist` directory containing the production-ready website files.

## Deployment to Cloudflare Pages

1.  **Connect your repository to Cloudflare Pages:**

    *   Log in to your Cloudflare account and navigate to the Pages section.
    *   Click "Create a project" and select your Git repository.

2.  **Configure the build settings:**

    *   **Production branch:** `main` (or your preferred branch)
    *   **Build command:** `npm run build`
    *   **Build output directory:** `dist`

3.  **Deploy the website:**

    *   Click "Save and Deploy". Cloudflare Pages will automatically build and deploy your website.

## Customization

*   **Styling:** Modify the CSS custom properties in `src/style.css` to customize the website's appearance.
*   **Content:** Update the content in `src/components/welcomeMessage.ts` and other component files to reflect your desired website content.
*   **Site Configuration:** Modify the `getSiteConfig` function in `src/utils.ts` to update the site title and description.

## Contributing

Contributions are welcome! Please submit a pull request with your changes.