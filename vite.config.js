import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import { VitePWA } from 'vite-plugin-pwa'
import tailwindcss from '@tailwindcss/vite'
import vueDevTools from 'vite-plugin-vue-devtools'
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),vueDevTools(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',//'autoUpdate',
      devOptions: {
        enabled: true
      },
      manifest: {
        name: 'Pepsa',
        short_name: 'Pepsa',
        description: 'Pepsa, Everyday shopping, Everyday delivery',
        theme_color: '#9d0208',
        background_color: '#ffffff',
        display: "standalone",
        icons: [
          {
            src: "/icons/pepsa-lcon-one.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any"
          }
        ],
        "gcm_sender_id": "304388260072" 
        
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,json,vue,txt,woff2}'],
        cleanupOutdatedCaches: true,
        sourcemap: true,
        skipWaiting: true,
        clientsClaim: true,
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/your-api-url\.com\//,
            handler: "NetworkFirst",
            options: {
              cacheName: "api-cache",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 86400, // 1 day
              },
            },
          },
        ],
        
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
