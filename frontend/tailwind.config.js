/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        gray: {
          750: '#2d374d',
        },
        indigo: {
          50: '#f0ebff',
          100: '#e1d7ff',
          200: '#c3afff',
          300: '#a587ff',
          400: '#875fff',
          500: '#6937ff',
          600: '#6633ee', // Primary
          700: '#5229be',
          800: '#3d1f8f',
          900: '#29145f',
          950: '#140a2f',
        }
      },
      animation: {
        'gradient': 'gradient 8s linear infinite',
      },
      keyframes: {
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        },
      },
    },
  },
  plugins: [],
}