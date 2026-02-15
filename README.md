# Simple Greeting Website

This project is a simple website built with Vite, TypeScript, and Tailwind CSS. It displays a greeting message and a wave animation.

## Technologies Used

*   Vite
*   TypeScript
*   Tailwind CSS

## Project Structure

```
project/
├── index.html
├── src/
│   ├── main.ts
│   ├── types.ts
│   ├── utils.ts
│   ├── style.css
│   └── components/
│       ├── header.ts
│       ├── footer.ts
│       ├── greeting.ts
│       ├── wave.ts
├── public/
├── package.json
├── tsconfig.json
├── vite.config.ts
├── .gitignore
└── README.md
```

## Setup

1.  Clone the repository:

    ```bash
    git clone <repository-url>
    ```

2.  Install dependencies:

    ```bash
    npm install
    ```

## Development

1.  Start the development server:

    ```bash
    npm run dev
    ```

    This will start the Vite development server, and you can view the website in your browser at the address provided (usually `http://localhost:5173`).

## Building for Production

1.  Build the project:

    ```bash
    npm run build
    ```

    This will create a `dist` directory containing the production-ready files.

## Deployment to Cloudflare Pages

1.  Connect your Cloudflare account to your Git repository.
2.  Configure the build settings in Cloudflare Pages:

    *   **Production branch:** `main` (or your main branch name)
    *   **Build command:** `npm run build`
    *   **Build output directory:** `dist`

3.  Save the settings and deploy your website.

## Customization

*   **Content:** Modify the greeting message in `src/components/greeting.ts`.
*   **Styling:** Customize the appearance of the website by modifying the Tailwind CSS classes in the component files or by adding new styles in `src/style.css`.
*   **Configuration:** Update the site configuration in `src/types.ts` to change the author and description.

## License

[Optional: Add a license, e.g., MIT]