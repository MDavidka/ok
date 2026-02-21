# Modern Portfolio Website

This project is a modern, minimalist portfolio website built with Vite, TypeScript, and Tailwind CSS. It is designed to be deployed on Cloudflare Pages for optimal performance and scalability.

## Features

*   **Dark Mode:** A sleek dark theme for a modern and professional look.
*   **Responsive Design:** Fully responsive layout that adapts to different screen sizes.
*   **Modular Components:** Reusable components for easy maintenance and scalability.
*   **TypeScript:** Strict typing for enhanced code quality and maintainability.
*   **Tailwind CSS:** Utility-first CSS framework for rapid development and consistent styling.
*   **Vite:** Fast build tool for a smooth development experience.
*   **Cloudflare Pages Ready:** Optimized for deployment on Cloudflare Pages.

## Technologies Used

*   **Vite:** A fast, opinionated web build tool that serves your code during development and bundles it for production.
*   **TypeScript:** A superset of JavaScript that adds static typing.
*   **Tailwind CSS:** A utility-first CSS framework for rapidly building custom designs.

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
│       ├── projectCard.ts
│       ├── projectList.ts
│       ├── about.ts
│       └── contactForm.ts
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

2.  Open your browser and navigate to `http://localhost:5173` (or the port specified by Vite).

### Building for Production

1.  Build the project:

    ```bash
    npm run build
    # or
    yarn build
    ```

2.  The production-ready files will be located in the `dist` directory.

### Deployment to Cloudflare Pages

1.  Connect your Cloudflare account to your Git repository.
2.  Configure the build settings:
    *   **Framework preset:** `None`
    *   **Build command:** `npm run build`
    *   **Build output directory:** `dist`
3.  Deploy your site.

## Customization

*   **Styling:** Modify the `src/style.css` file to customize the design system and global styles. Tailwind CSS utility classes are used throughout the project for component styling.
*   **Components:** Add or modify components in the `src/components` directory. Ensure that you import and initialize the components in `src/main.ts`.
*   **Content:** Update the content of the components to reflect your personal information, skills, and projects.

## Contributing

Contributions are welcome! Please submit a pull request with your proposed changes.

## License

[MIT](LICENSE)