import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// GitHub Pages serves at /<repo-name>/, so set base accordingly in production.
const base = process.env.GITHUB_PAGES === 'true' ? '/polaris-creative/' : '/'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base,
  server: { port: 5177 },
})
