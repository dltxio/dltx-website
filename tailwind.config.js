/** @type {import('tailwindcss').Config} */
export default {
  content: ["./dist/**/*.html", "./src/**/*.{js,jsx,ts,tsx}", "./*.html"],
  theme: {
    extend: {
      colors: {
        'dltx-green': '#E6FF02',
        'dltx-grey': '#818181',
      },
      fontSize: {
        'lg': ['1.125rem', { lineHeight: '1.5rem' }],
        '2xs': ['0.625rem', { lineHeight: '0.85rem' }],
        '3xs': ['0.5rem', { lineHeight: '0.75rem' }],
      },
    },
  },
  plugins: [],
}
