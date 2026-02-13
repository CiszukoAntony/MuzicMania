/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./*.html",
    "./scripts/**/*.{js,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'neon-blue': '#00d4ff',
        'neon-pink': '#ff0080',
        'neon-purple': '#9146ff',
        'neon-cyan': '#00ffff',
      },
    },
  },
  plugins: [],
}
