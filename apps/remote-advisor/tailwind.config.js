/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,ts,tsx,js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        'omni-blue': '#002b5c', 
        'omni-green': '#00ff41',
      }
    },
  },
  plugins: [],
}