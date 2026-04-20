/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      lineHeight: {
        "extra-loose": "2.5",
        14: "3.5rem",
        16: "4.5rem"
      },
      height: {
        17: "4.5rem",
        18: "5rem"
      }
    }
  },
  plugins: []
};
