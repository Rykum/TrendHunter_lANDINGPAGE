/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        black: '#090909',
        red: '#C6534E',
        paper: '#F0E9DE',
        ink: '#151515',
        dust: '#817A72',
      },
      fontFamily: {
        serif: ['Switzer', 'sans-serif'],
        sans: ['Switzer', 'sans-serif'],
        mono: ['IBM Plex Mono', 'Courier New', 'monospace'],
      },
    },
  },
  plugins: [],
}