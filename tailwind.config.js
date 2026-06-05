/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1677ff',
        'primary-dark': '#0d6efd',
        background: '#f5f5f5',
        card: '#ffffff',
        'text-main': '#1c1c1c',
        'text-secondary': '#666',
        success: '#22c55e',
        warning: '#ff9900',
        danger: '#ef4444',
        border: '#e8e8e8',
        star: '#fbbf24',

        
        brand: 'oklch(78.9% 0.154 211.53)',
      },
      maxWidth: {
        'screen-xl': '1280px',
      },
      borderRadius: {
        card: '8px',
      },
    },
  },
  plugins: [],
}