import formsPlugin from '@tailwindcss/forms';
import typographyPlugin from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./app/**/*.{js,ts,jsx,tsx}'],
  plugins: [formsPlugin, typographyPlugin],
  theme: {
    extend: {
      colors: {
        // Custom colors
        primary: {
          100: '#00ab84',
          200: '#2d2a24',
          300: '#fdf9f3',
          400: '#e5e7eb',
          500: '#e8f8fa',
        },
      },
      // Extend other parts of the theme as needed
    },
  },
};
