// tailwind.config.js
module.exports = {
  content: ["./index.html", "./components/**/*.html", "./js/**/*.js"],
  theme: {
    extend: {
      colors: {
        cta: '#947e17',
        ctaHover: '#7c6b13',
        dark: '#1C1C1C',
        accent: '#6D9A2B',
        brown: '#A47C6B',
        rose: '#EABFB9',
      },
      fontFamily: {
        title: ['"Playfair Display"', 'serif'],
        body: ['"Quicksand"', 'sans-serif'],
        script: ['"Dancing Script"', 'cursive'],
      },
    },
  },
  plugins: [],
};
