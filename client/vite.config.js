import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// temporary comment to trigger commit

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
})
