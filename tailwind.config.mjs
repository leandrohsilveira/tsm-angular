import aspectRatio from "@tailwindcss/aspect-ratio"
import containerQueries from "@tailwindcss/container-queries"
import typography from "@tailwindcss/typography"
import primeui from "tailwindcss-primeui"

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  plugins: [typography, containerQueries, aspectRatio, primeui]
}
