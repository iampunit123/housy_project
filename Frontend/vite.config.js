import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: "https://housing-project-78ns.onrender.com",
        changeOrigin: true,
      },
    },
  },
  css: {
    postcss: './postcss.config.js', // Remove this line if you deleted the file
  },
})