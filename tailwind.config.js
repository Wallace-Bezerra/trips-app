/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'bg-word': 'url(/worldMap.png)',
      },
      colors: {
        primary: '#DDD5EA',
        primaryLighter: '#590BD8',
        primaryDarker: '#312A4F',
        grayPrimary: '#717171',
        walterWhite: '#F5F5F5',
      },
    },
  },
  plugins: [],
}
