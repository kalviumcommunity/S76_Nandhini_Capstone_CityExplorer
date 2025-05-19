/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3498db',
          dark: '#2980b9',
          light: '#5dade2',
        },
        secondary: {
          DEFAULT: '#e67e22',
          dark: '#d35400',
          light: '#f39c12',
        },
        accent: {
          DEFAULT: '#9b59b6',
          dark: '#8e44ad',
          light: '#a569bd',
        },
        gray: {
          light: '#f8f9fa',
          DEFAULT: '#e9ecef',
          dark: '#343a40',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
};