import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the 'VITE_' prefix.
  const env = loadEnv(mode, process.cwd(), '');

  // Prioritize the VITE_ prefixed variable
  const apiKey = env.VITE_GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY || '';

  return {
    base: process.env.BASE_PATH || '/',
    plugins: [react()],
    assetsInclude: ['**/*.glb'],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./"),
      },
    },
    define: {
      // Polyfill process.env.API_KEY so it works in the browser
      'process.env.API_KEY': JSON.stringify(apiKey)
    }
  }
})