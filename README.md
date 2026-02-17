# Modern Portfolio Website

This project is a modern, minimalist portfolio website built with Vite, TypeScript, and Tailwind CSS. It is designed to be deployed on Cloudflare Pages for optimal performance and scalability.

## Features

*   **Dark Mode:** A sleek dark theme for a modern and professional look.
*   **Responsive Design:** Fully responsive layout that adapts to different screen sizes.
*   **Clean and Minimalist:** Focuses on showcasing your work and skills effectively.
*   **Fast Performance:** Built with Vite for fast development and optimized production builds.
*   **Type Safety:** TypeScript ensures code quality and maintainability.
*   **Utility-First Styling:** Tailwind CSS provides a flexible and efficient way to style the website.

## Technologies Used

*   **Vite:** A fast build tool and development server.
*   **TypeScript:** A superset of JavaScript that adds static typing.
*   **Tailwind CSS:** A utility-first CSS framework.
*   **Cloudflare Pages:** A platform for deploying static websites.

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

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Run the development server:**

    ```bash
    npm run dev
    ```

4.  **Open your browser and navigate to `http://localhost:5173`.**

## Building for Production

1.  **Build the project:**

    ```bash
    npm run build
    ```

2.  **Deploy the `dist` directory to Cloudflare Pages.**

## Customization

*   **Styling:** Modify the `src/style.css` file to customize the design system and global styles. Tailwind CSS utility classes are used throughout the components for styling.
*   **Components:** The `src/components` directory contains reusable components that can be modified or extended.
*   **Content:** Update the content in the component files (e.g., `src/components/about.ts`, `src/components/projects.ts`) to reflect your own information and projects.
*   **Configuration:** Adjust the site configuration in `src/types.ts` to match your needs.

## Contributing

Contributions are welcome! Please submit a pull request with your changes.

## License

[MIT](LICENSE)