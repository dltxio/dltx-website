/** @type {import('tailwindcss').Config} */
export default {
  content: ["./dist/**/*.html", "./src/**/*.{js,jsx,ts,tsx}", "./*.html"],
  theme: {
    fontSize: {
      '2xs': ['0.625rem', { lineHeight: '0.85rem' }],
    },
    extend: {},
  },
  plugins: [],
}
