/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        'premium-dark': '#2D1E2F',
        'premium-accent': '#4E2A4F',
        'premium-light': '#6B4C7A',
        'premium-lighter': '#8B6BA8',
        'status-safe': '#6DD5B8',
        'status-flagged': '#FF6B9D',
        'status-pending': '#FFB347',
      },
      backgroundImage: {
        'premium-gradient': 'linear-gradient(135deg, #2D1E2F 0%, #4E2A4F 100%)',
        'premium-gradient-light': 'linear-gradient(135deg, #4E2A4F 0%, #6B4C7A 100%)',
      },
      boxShadow: {
        'premium': '0 8px 32px rgba(0, 0, 0, 0.3)',
        'premium-sm': '0 4px 12px rgba(0, 0, 0, 0.2)',
        'premium-lg': '0 16px 48px rgba(0, 0, 0, 0.4)',
      },
      backdropBlur: {
        'premium': '10px',
      },
      fontFamily: {
        'premium': ['Inter', 'Poppins', 'SF Pro', 'system-ui', 'sans-serif'],
      },
      transitionDuration: {
        '300': '300ms',
      },
    },
  },
  plugins: [],
};
