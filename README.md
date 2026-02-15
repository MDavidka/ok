# Modern Portfolio Website

This project is a modern portfolio website built with Vite, TypeScript, and Tailwind CSS. It features a dark theme and is designed to showcase projects, skills, and contact information. It is designed to be deployed to Cloudflare Pages.

## Features

*   **Modern Design:** Clean and minimalist design using Tailwind CSS with a dark theme.
*   **Responsive Layout:** Designed for optimal viewing on various screen sizes.
*   **TypeScript:** Written in TypeScript for type safety and maintainability.
*   **Vite:** Fast build times and excellent development experience with Vite.
*   **Cloudflare Pages Ready:** Optimized for deployment on Cloudflare Pages.
*   **Dark Mode First:** Styles are designed with dark mode as the primary theme.
*   **Sections:** Hero, About, Projects, Contact

## Technologies Used

*   **Vite:** A fast build tool for modern web development.
*   **TypeScript:** A superset of JavaScript that adds static typing.
*   **Tailwind CSS:** A utility-first CSS framework.
*   **GSAP:** Animation library

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
│       ├── project-list.ts
│       ├── contact-form.ts
│       └── layout.ts
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

2.  Open your browser and navigate to `http://localhost:5173`.

### Building for Production

1.  Build the project:

    ```bash
    npm run build
    # or
    yarn build
    ```

2.  The built files will be in the `dist` directory.

### Deployment to Cloudflare Pages

1.  Connect your Cloudflare account to your Git repository.
2.  Configure the build settings:
    *   **Framework preset:** `Vite`
    *   **Build command:** `npm run build` or `yarn build`
    *   **Build output directory:** `dist`
3.  Deploy your site.

## Customization

*   **Styling:** Modify the `src/style.css` file to change the design system tokens and global styles.
*   **Components:** Customize the components in the `src/components` directory to modify the content and behavior of the website.
*   **Configuration:** Update the `src/types.ts` file to modify the site configuration.

## License

[MIT](LICENSE)