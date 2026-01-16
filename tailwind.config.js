/** @type {import('tailwindcss').Config} */
export default {
  // En v4, 'selector' es el valor correcto para usar la clase .dark
  darkMode: 'selector', 
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Aquí puedes definir tu propio negro para que NO sea azul
        oscuro: "#0a0a0a",
      },
    },
  },
  plugins: [],
}