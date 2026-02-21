# Modern Portfolio Website

This project is a modern, minimalist portfolio website built with Vite, TypeScript, and Tailwind CSS. It is designed to be deployed on Cloudflare Pages for optimal performance and scalability.

## Features

*   **Dark Mode:** A sleek dark theme for a modern and professional look.
*   **Responsive Design:** Fully responsive layout that adapts to different screen sizes.
*   **Clean and Minimalist:** Focuses on showcasing your work with a clean and uncluttered design.
*   **Fast Performance:** Built with Vite for fast development and optimized production builds.
*   **Type Safety:** TypeScript ensures code quality and maintainability.
*   **Easy Deployment:** Designed for easy deployment to Cloudflare Pages.

## Technologies Used

*   **Vite:** A fast and lightweight build tool.
*   **TypeScript:** A superset of JavaScript that adds static typing.
*   **Tailwind CSS:** A utility-first CSS framework.
*   **Cloudflare Pages:** A platform for building and deploying static websites.

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

*   **Styling:** Customize the look and feel of the website by modifying the `src/style.css` file. This file contains CSS custom properties for the design system and global Tailwind styles.
*   **Components:** Modify or add new components in the `src/components` directory.
*   **Content:** Update the content of the website by modifying the corresponding component files.

## Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues.

## License

[MIT](LICENSE)