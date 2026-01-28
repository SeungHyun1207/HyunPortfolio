import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { SettingsProvider } from '@/contexts/SettingsContext'
import App from '@/App'
import '@styles/global.css'

/**
 * React 애플리케이션 진입점
 *
 * 설정:
 * - StrictMode: 개발 모드에서 잠재적 문제 감지
 * - BrowserRouter: HTML5 History API 기반 라우팅
 * - SettingsProvider: 테마/언어 전역 상태 관리
 *
 * 배포 옵션:
 * - basename="/portfolio" : 서브 디렉토리 배포 시 사용
 */
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SettingsProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </SettingsProvider>
  </StrictMode>,
)
