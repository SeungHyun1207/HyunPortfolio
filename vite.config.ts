import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    /**
     * Path Alias 설정
     *
     * 사용 예시:
     * - import App from '@/App'                      → src/App.tsx
     * - import Hero from '@components/Hero'          → src/components/Hero/index.ts
     * - import logo from '@assets/images/logo.png'   → src/assets/images/logo.png
     * - import HomePage from '@views/Home'           → src/views/Home/index.tsx
     * - import '@styles/global.css'                  → src/styles/global.css
     * - import { useScrollAnimation } from '@hooks'  → src/hooks/index.ts
     * - import { cn } from '@utils'                  → src/utils/index.ts
     * - import type { IconProps } from '@types'      → src/types/index.ts
     * - import MainLayout from '@layouts/MainLayout' → src/layouts/MainLayout/index.tsx
     */
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@views': path.resolve(__dirname, './src/views'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@types': path.resolve(__dirname, './src/types'),
      '@layouts': path.resolve(__dirname, './src/layouts'),
    },
  },
});
