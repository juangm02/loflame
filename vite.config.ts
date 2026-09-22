import path from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      // Only used by shadcn/ui components (their generator hard-codes this
      // convention) — the rest of the app keeps its existing relative
      // imports, both coexist fine.
      '@': path.resolve(__dirname, './src'),
    },
  },
})
