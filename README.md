# PickMyTrade - Development Guide

This project uses **Tailwind CSS** for styling. Since we have removed the Tailwind CDN for performance reasons, you must compile the CSS during development if you add new Tailwind classes.

## Tailwind CSS Commands

### 1. Development (Auto-rebuild)
Run this command while you are coding. It will watch for changes in your HTML files and update `output.css` automatically.

```bash
npx tailwindcss -i ./style.css -o ./output.css --watch
```

### 2. Production Build (Minified)
Run this command before deploying to production to ensure the CSS is optimized and small.

```bash
npx tailwindcss -i ./style.css -o ./output.css --minify
```

## Project Structure
- `index.html`: Main landing page.
- `style.css`: Input CSS file with Tailwind directives and custom styles.
- `output.css`: Generated CSS file used by the HTML pages (do not edit manually).
- `assets/`: Image and SVG assets.
- `public/`: Publicly accessible static files (like the logo).
- `components/`: Reusable HTML snippets (navbar, footer).
