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
        'neon-blue': 'var(--neon-blue)',
        'neon-pink': 'var(--neon-pink)',
        'neon-purple': 'var(--neon-purple)',
        'neon-cyan': 'var(--neon-cyan)',
        'neon-green': 'var(--neon-green)',
        'bg-dark': 'var(--bg-dark)',
        'bg-black': 'var(--bg-black)',
      },
      fontFamily: {
        header: 'var(--font-header)',
        body: 'var(--font-body)',
      },
      spacing: {
        xs: 'var(--spacing-xs)',
        sm: 'var(--spacing-sm)',
        md: 'var(--spacing-md)',
        lg: 'var(--spacing-lg)',
        xl: 'var(--spacing-xl)',
      }
    },
  },
  plugins: [],
}
