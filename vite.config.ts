import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // If you deploy to https://Belilus.github.io/asaf-portfolio/, set base to '/asaf-portfolio/'.
  // For a custom domain or a user-page root deploy, leave it as '/'.
  base: '/',
  server: {
    // SwimEdge frontend uses 5173 — keep the portfolio on a different port.
    port: 5174,
    strictPort: true,
  },
  preview: {
    port: 4174,
    strictPort: true,
  },
})
