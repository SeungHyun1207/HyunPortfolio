import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';


export default defineConfig({
  plugins: [react()],
  base: '/HyunPortfolio/',
  server: {
    open: true,
    port: 999,
  },
  resolve: {
    /**
     * Path Alias 설정
     *
     * 사용 예시:
     * - import App from '@/App'                              → src/App.tsx
     * - import Spinner from '@components/LoadingSpinner'     → src/views/components/LoadingSpinner.tsx  (공통 UI)
     * - import Hero from '@pages/home/Hero'                  → src/views/pages/home/Hero/index.ts
     * - import logo from '@assets/images/logo.png'           → src/assets/images/logo.png
     * - import '@styles/global.css'                          → src/styles/global.css
     * - import { useScrollAnimation } from '@hooks'          → src/hooks/index.ts
     * - import { cn } from '@utils'                          → src/utils/index.ts
     * - import type { IconProps } from '@types'              → src/types/index.ts
     * - import MainLayout from '@layouts/MainLayout'         → src/views/layouts/MainLayout.tsx
     */
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/views/components'),
      '@pages': path.resolve(__dirname, './src/views/pages'),
      '@layouts': path.resolve(__dirname, './src/views/layouts'),
      '@views': path.resolve(__dirname, './src/views'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@types': path.resolve(__dirname, './src/types'),
    },
  },
});
