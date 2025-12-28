/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#5b47db',
        secondary: '#10b981',
        danger: '#ef4444',
      },
    },
  },
  plugins: [],
};