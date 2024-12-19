/** @type {import('tailwindcss').Config} */
export default {
  content: ["*.html", "./src/**/*.jsx"],
  theme: {
    extend: {
      fontFamily: {
        mono: ['monospace', '"Roboto Mono"'],
      }
    },
  },
  plugins: [],
}

