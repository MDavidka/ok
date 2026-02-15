# Restaurant Website

This project is a restaurant website built with Vite, TypeScript, and Tailwind CSS. It features a menu, reservation form, and other essential information for potential customers.

## Technologies Used

*   **Vite:** A fast build tool for modern web development.
*   **TypeScript:** A typed superset of JavaScript that enhances code quality and maintainability.
*   **Tailwind CSS:** A utility-first CSS framework for rapid UI development.
*   **Cloudflare Pages:** A platform for deploying static websites with ease.

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
│       ├── menu.ts
│       ├── menuItem.ts
│       ├── reservationForm.ts
│       ├── testimonials.ts
│       ├── hero.ts
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

4.  **Open your browser and navigate to `http://localhost:5173` (or the port Vite assigns).**

## Building for Production

1.  **Build the project:**

    ```bash
    npm run build
    ```

2.  **Deploy the `dist` directory to Cloudflare Pages or your preferred hosting provider.**

## Key Features

*   **Modern and Responsive Design:** The website is designed to be visually appealing and accessible on all devices.
*   **Menu Display:** A clear and organized display of the restaurant's menu items.
*   **Reservation Form:** An easy-to-use form for customers to make reservations.
*   **Testimonials:** Showcase positive customer feedback.
*   **Hero Section:** A visually engaging introduction to the restaurant.

## Design System

The project utilizes a minimalist design system with a focus on readability and user experience. Key design elements include:

*   **Typography:** Sans-serif fonts (Inter/system-ui) with clear hierarchy.
*   **Color Palette:** A professional and cohesive color palette defined in `src/style.css` using CSS custom properties.
*   **Tailwind CSS:** Extensive use of Tailwind CSS utility classes for styling.

## Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues to suggest improvements or report bugs.

## License

[Specify the license here]