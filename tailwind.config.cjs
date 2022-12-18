/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Patrick: ["Patrick Hand", "cursive"],
        Play: ["Play", "sans-serif"],
      },
    },
  },
  plugins: [],
};
