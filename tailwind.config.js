/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
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
        sans: ['Balsamiq Sans', 'Patrick Hand', 'sans-serif'],
        hand: ['Patrick Hand', 'cursive', 'sans-serif'],
        pencil: ['Balsamiq Sans', 'cursive', 'sans-serif'],
        display: ['DynaPuff', 'cursive', 'sans-serif'],
        dynapuff: ['DynaPuff', 'cursive', 'sans-serif'],
        mono: ['Balsamiq Sans', 'Consolas', 'monospace'],
      }
    }
  },
  plugins: [],
};
