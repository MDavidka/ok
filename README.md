# SaaS Landing Page

This project is a modern, minimalist SaaS landing page built with Vite, TypeScript, and Tailwind CSS. It is designed to be performant, accessible, and easily deployable to Cloudflare Pages.

## Features

*   **Modern Design:** Clean and professional aesthetic.
*   **Responsive Layout:** Optimized for various screen sizes.
*   **Component-Based Architecture:** Modular and maintainable codebase.
*   **TypeScript:** Strict typing for enhanced code quality.
*   **Tailwind CSS:** Utility-first CSS framework for rapid development.
*   **Pricing Section:** Clear and concise pricing plans.
*   **FAQ Section:** Addresses common customer questions.
*   **Call to Action:** Encourages user engagement.
*   **Dark Mode Support:** Enhanced user experience.

## Technologies Used

*   **Vite:** A fast and lightweight build tool.
*   **TypeScript:** A superset of JavaScript that adds static typing.
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
│       ├── features.ts
│       ├── pricing.ts
│       ├── faq.ts
│       └── callToAction.ts
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

*   **Styling:** Modify the `src/style.css` file to customize the design system and global styles.
*   **Components:** Edit the files in the `src/components` directory to modify the individual components.
*   **Content:** Update the content in the component files to reflect your SaaS product.

## Contributing

Contributions are welcome! Please submit a pull request with your changes.

## License

[MIT](LICENSE)