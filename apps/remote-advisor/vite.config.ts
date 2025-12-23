import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation'

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "remoteAdvisor",
      filename: "remoteEntry.js",
      exposes: {
        "./AiAdvisor": "./src/components/AiAdvisor.tsx",
      },
      shared: ["react", "react-dom"],
    }),
  ],
  build: {
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
  server: {
    port: 4300,
    cors: true, 
  },
  preview: {
    port: 4300,
    cors: true, 
  }
})