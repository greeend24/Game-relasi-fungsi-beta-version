/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'sm': '0px',
      'md': '0px',
      'lg': '0px',
      'xl': '0px',
      '2xl': '0px',
    },
    extend: {
      colors: {
        detective: {
          dark: '#07090e',
          card: '#121824',
          border: '#1e293b',
          accent: '#00f0ff',
          neonYellow: '#020d25',
          neonAmber: '#ffaa00',
          crimson: '#ff0055',
          emerald: '#00ff88',
        }
      },
      fontFamily: {
        sans: ['Balsamiq Sans', 'sans-serif'],
        hand: ['Balsamiq Sans', 'cursive', 'sans-serif'],
        pencil: ['Balsamiq Sans', 'cursive', 'sans-serif'],
        daruma: ['Darumadrop One', 'cursive', 'sans-serif'],
        display: ['DynaPuff', 'cursive', 'sans-serif'],
        dynapuff: ['DynaPuff', 'cursive', 'sans-serif'],
        mono: ['Balsamiq Sans', 'Consolas', 'monospace'],
      }
    }
  },
  plugins: [],
};
