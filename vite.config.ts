import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    TanStackRouterVite({ target: 'react', autoCodeSplitting: true }),
    tailwindcss()
  ],
  server: {
    port: 4000,
    open: true,
    proxy: {
      '/api': 'http://localhost:4001'
    }
  }
})
