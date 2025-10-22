/** @type {import('tailwindcss').Config} */
export const content = [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/tw-elements/dist/js/**/*.js",
  ];
  export const theme = {
    extend: {
      screens: {
        'smb': '360px',
        'mmb': '412px',
        'lg': '976px',
        'xl': '1440px',
      },
      colors: {
        'blue': '#1fb6ff',
        'black': '#000000',
        'l-black': '#0B090A',
        'l-wine': '#660808',
        'wine': '#9D0208',
        'purple': '#7e5bef',
        'pink': '#ff49db',
        'orange': '#ff7849',
        'green': '#13ce66',
        'yellow': '#ffc82c',
        'gray-dark': '#273444',
        'gray': '#8492a6',
        'gray-light': '#d3dce6',
        'l-gray': '#D3D3D3',
      },
      fontFamily: {
        sans: ['Eina, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'],
      },
    },
  };
  export const plugins = [
    require("./node_modules/tw-elements/dist/plugin.cjs")
  ];
  export const darkMode = "class";
    