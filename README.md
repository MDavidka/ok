# Modern Portfolio Website

This project is a modern, minimalist portfolio website built with Vite, TypeScript, and Tailwind CSS. It is designed to be deployed to Cloudflare Pages for optimal performance and scalability.

## Features

*   **Modern Design:** Clean and professional design with a focus on readability and user experience.
*   **Dark Mode:** Implemented with Tailwind CSS for a sleek and accessible experience.
*   **Responsive Layout:** Optimized for various screen sizes, ensuring a consistent experience across devices.
*   **TypeScript:** Developed with TypeScript for type safety and maintainability.
*   **Vite:** Utilizes Vite for fast development and optimized production builds.
*   **Tailwind CSS:** Styled with Tailwind CSS for rapid and consistent styling.
*   **Cloudflare Pages Ready:** Designed to be easily deployed to Cloudflare Pages.

## Technologies Used

*   Vite
*   TypeScript
*   Tailwind CSS

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
│       ├── project-card.ts
│       ├── projects.ts
│       └── contact-form.ts
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

    This will start the Vite development server, and you can view the website in your browser at `http://localhost:5173`.

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
2.  Configure Cloudflare Pages to build from the `dist` directory.
3.  Deploy your website.

## Customization

*   **Styling:** Modify the `src/style.css` file to customize the design system and global styles. Tailwind CSS utility classes are used throughout the project for component-specific styling.
*   **Components:** Edit the files in the `src/components/` directory to modify the content and structure of individual components.
*   **Configuration:** Update the `src/types.ts` file to modify shared types and interfaces.

## Contributing

Contributions are welcome! Please submit a pull request with your changes.

## License

[MIT](LICENSE)