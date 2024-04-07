import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      // Configuration options for the PWA plugin
      manifest: {
        // Specify your manifest options here
        // Example:
        name: 'My Calendar App',
        short_name: 'Calendar App',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#000000',
        icons: [
          {
            src: '/cal_icon.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/logo_icon.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
  optimizeDeps: {
    exclude: ['firebase'],
  },
});
