# High-End Reservation System

This project is a high-end reservation system built with Vite, TypeScript, and Tailwind CSS. It is designed to be deployed on Cloudflare Pages.

## Features

*   **Modern Minimalist Design:** Clean and professional user interface.
*   **Responsive Layout:** Optimized for various screen sizes.
*   **Date and Time Selection:** Intuitive date and time pickers for reservation scheduling.
*   **Reservation Confirmation:** Clear feedback upon successful reservation.
*   **Reusable Components:** Modular design for easy maintenance and scalability.
*   **Consistent Design System:** Unified look and feel using CSS custom properties and Tailwind CSS.

## Technologies Used

*   **Vite:** A fast build tool for modern web development.
*   **TypeScript:** A typed superset of JavaScript for enhanced code quality.
*   **Tailwind CSS:** A utility-first CSS framework for rapid UI development.
*   **Cloudflare Pages:** A platform for deploying static websites.
*   **date-fns:** A modern JavaScript date utility library.

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
│       ├── button.ts
│       ├── card.ts
│       ├── hero.ts
│       ├── about.ts
│       ├── contactForm.ts
│       ├── date-picker.ts
│       ├── time-slot-selector.ts
│       └── reservation-form.ts
├── public/
├── package.json
├── tsconfig.json
├── vite.config.ts
├── .gitignore
└── README.md
```

## Getting Started

### Prerequisites

*   Node.js (version >= 16)
*   npm or yarn

### Installation

1.  Clone the repository:

    ```bash
    git clone <repository-url>
    ```

2.  Navigate to the project directory:

    ```bash
    cd high-end-reservation-system
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

    This will start the Vite development server, and you can access the application in your browser at `http://localhost:5173`.

### Building for Production

1.  Build the project:

    ```bash
    npm run build
    # or
    yarn build
    ```

    This will create a `dist` directory containing the production-ready files.

### Deployment to Cloudflare Pages

1.  Connect your Cloudflare account to your Git repository.
2.  Configure the build settings:

    *   **Framework preset:** `None`
    *   **Build command:** `npm run build`
    *   **Build output directory:** `dist`

3.  Deploy the site.

## Design System

The project uses a custom design system defined in `src/style.css` using CSS custom properties.

*   **Colors:**
    *   `--color-primary`: #f0ead6
    *   `--color-secondary`: #222222
    *   `--color-accent`: #b8860b (Gold)
    *   `--color-bg`: #121212
    *   `--color-text`: #ffffff
    *   `--color-muted`: #a3a3a3
*   **Typography:**
    *   `--font-heading`: 'Arial Black', sans-serif
    *   `--font-body`: 'Arial', sans-serif
*   **Spacing:**
    *   `--spacing-sm`: 0.5rem
    *   `--spacing-md`: 1rem
    *   `--spacing-lg`: 1.5rem

## Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues for any bugs or feature requests.

## License

[MIT](LICENSE)