/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9f4',
          100: '#dcf2e3',
          200: '#bce5c9',
          300: '#8dd2a5',
          400: '#56b87d',
          500: '#2E8B57',
          600: '#1f6b45',
          700: '#1a5738',
          800: '#17452e',
          900: '#143927',
        },
        secondary: {
          50: '#fff5f2',
          100: '#ffe8e2',
          200: '#ffd5ca',
          300: '#ffb6a5',
          400: '#ff7e5f',
          500: '#fe5c3e',
          600: '#ec3a1c',
          700: '#c72b13',
          800: '#a42614',
          900: '#862416',
        },
        accent: {
          50: '#f0f7ff',
          100: '#e0effe',
          200: '#bae0fd',
          300: '#7dc7fc',
          400: '#4A90E2',
          500: '#1e74d8',
          600: '#135ab5',
          700: '#144892',
          800: '#163e78',
          900: '#173664',
        },
        nav: {
          bg: '#1a1a2e',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 5px 15px rgba(0, 0, 0, 0.08)',
        'card-hover': '0 10px 25px rgba(0, 0, 0, 0.15)',
      }
    },
  },
  plugins: [],
}