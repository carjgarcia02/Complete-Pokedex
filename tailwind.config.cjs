/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Patrick: ["Patrick Hand", "cursive"],
        Play: ["Play", "sans-serif"],
      },
      colors: {
        Normal: "#bbbbb0",
        Grass: "#89d750",
        Fire: "#fb5441",
        Water: "#59abf9",
        Fighting: "#a55746",
        Flying: "#7a9ef5",
        Poison: "#965891",
        Ground: "#eac75b",
        Rock: "#cebe73",
        Bug: "#c1d020",
        Ghost: "#7770ce",
        Electric: "#fce83c",
        Psychic: "#fb64b4",
        Ice: "#95f1fe",
        Dragon: "#8975f2",
        Dark: "#8c6753",
        Steel: "#c4c2da",
        Fairy: "#f8adff",
      },
    },
  },
  plugins: [],
};
