# Modern Portfolio Website

This project is a modern, minimalist portfolio website built with Vite, TypeScript, and Tailwind CSS. It is designed to be deployed on Cloudflare Pages for optimal performance and scalability.

## Features

*   **Modern Design:** Clean and professional design with a dark theme.
*   **Responsive Layout:** Fully responsive design that adapts to different screen sizes.
*   **Fast Performance:** Built with Vite for fast development and optimized production builds.
*   **TypeScript:** Type-safe code with TypeScript.
*   **Tailwind CSS:** Utility-first CSS framework for rapid development and consistent styling.
*   **Cloudflare Pages Deployment:** Easy deployment to Cloudflare Pages.

## Technologies Used

*   **Vite:** A fast build tool and development server.
*   **TypeScript:** A typed superset of JavaScript.
*   **Tailwind CSS:** A utility-first CSS framework.

## Project Structure

```
project/
├── index.html
├── src/
│   ├── main.ts          (entry point - imports all components)
│   ├── types.ts          (shared TypeScript interfaces & types)
│   ├── utils.ts          (shared helper functions)
│   ├── style.css         (design-system tokens & global styles)
│   └── components/
│       ├── header.ts
│       ├── footer.ts
│       ├── hero.ts
│       ├── about.ts
│       ├── projects.ts
│       └── contact.ts
├── public/
├── package.json
├── tsconfig.json
├── vite.config.ts
├── .gitignore
└── README.md
```

## Getting Started

### Prerequisites

*   Node.js (>=16)
*   npm or yarn

### Installation

1.  Clone the repository:

    ```bash
    git clone <repository-url>
    ```

2.  Navigate to the project directory:

    ```bash
    cd <project-directory>
    ```

3.  Install dependencies:

    ```bash
    npm install
    # or
    yarn install
    ```

### Development

1.  Start the development server:

    ```bash
    npm run dev
    # or
    yarn dev
    ```

    This will start the Vite development server and open the website in your browser.

### Building for Production

1.  Build the project for production:

    ```bash
    npm run build
    # or
    yarn build
    ```

    This will create a `dist` directory containing the optimized production build.

### Deployment to Cloudflare Pages

1.  Connect your Cloudflare account to your Git repository.
2.  Configure Cloudflare Pages to build the project from the `dist` directory.
3.  Deploy your website.

## Customization

*   **Styling:** Customize the website's appearance by modifying the `src/style.css` file. This file contains CSS custom properties and global Tailwind styles.
*   **Components:** Modify the components in the `src/components` directory to change the content and structure of the website.
*   **Configuration:** Update the `src/types.ts` file to modify site-wide configurations.

## License

[MIT](LICENSE)