# Sycostaurant Website

This is the website for Sycostaurant, a restaurant serving delicious breakfast at home.

## Technologies Used

-   Vite
-   TypeScript
-   Tailwind CSS
-   Cloudflare Pages

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
│       ├── menu.ts
│       ├── orderForm.ts
│       ├── reservationForm.ts
│       └── loginForm.ts
├── public/
├── package.json
├── tsconfig.json
├── vite.config.ts
├── .gitignore
└── README.md
```

## Development

1.  Install dependencies: `npm install`
2.  Run the development server: `npm run dev`
3.  Build for production: `npm run build`

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
*   **Content:** Update the content in the component files (e.g., `src/components/menu.ts`) to reflect your desired website content.
*   **Site Configuration:** Modify the `siteConfig` object in `src/main.ts` to update the site title, description, and navigation items.

## Placeholder Functionality

This project includes placeholder components for online ordering, reservations, and login functionality. To implement these features fully, you will need to integrate with a backend service and database.