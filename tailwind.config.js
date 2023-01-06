/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,tsx,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        gotham: ["Gotham"],
        gotham_bold: ["Gotham-Bold"],
        gotham_medium: ["Gotham-Medium"],
      },
    },
  },
  plugins: [],
};
