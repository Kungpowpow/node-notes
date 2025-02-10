/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './index.html',
      './src/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
      extend: {
          fontFamily: {
              sans: ['Inter', 'system-ui', 'sans-serif'],
              display: ['Lexend', 'system-ui', 'sans-serif'],
          },
          fontWeight: {
              light: '300',
              normal: '400',
              medium: '500',
              semibold: '600',
              bold: '700',
          },
      },
    },
    plugins: [
        require('@tailwindcss/forms'),
    ],
  }