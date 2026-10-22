/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0f2230',
        glacier: '#e3f4fb',
        frost: '#f3fafd',
        fizz: '#ff5a1f',
        lime: '#b6e02d',
        sky: '#1e6bff',
      },
    },
  },
  plugins: [],
};
