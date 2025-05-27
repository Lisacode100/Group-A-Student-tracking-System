import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteTsconfigPaths from 'vite-tsconfig-paths'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
    // base: '',
    plugins: [
      tailwindcss(),
      // react(),
      viteTsconfigPaths()
    ],
    // resolve: {
    //     alias: {
    //         '@': path.resolve(__dirname, './src'),
    //     },
    // },
    server: {    
        open: true,
        // port: 3000, 
        hmr: {
          protocol: 'ws',
          host: 'localhost',
        },
    },
    // esbuild: {
    //   loader: {
    //     '.js': 'jsx',
    //   },
    // },
})