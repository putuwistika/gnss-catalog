// tailwind.config.js
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      animation: {
        'float-slow': 'float-slow 6s ease-in-out infinite',
        'float-slow-reverse': 'float-slow-reverse 7s ease-in-out infinite',
        'ping-slow': 'ping-slow 3s cubic-bezier(0, 0, 0.2, 1) infinite',
      },
    },
  },
  plugins: [],
}