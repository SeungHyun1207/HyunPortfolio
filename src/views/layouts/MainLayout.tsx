import { useEffect, useRef } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import GNB from './gnb'
import Settings from './settings'
import { Box } from '@mui/material'
import Footer from './Footer'
import { trackVisit } from '@views/pages/home/projects/vibe-project/dashboard/DashboardIndex'

/** 경로 → 페이지 이름 매핑 */
function getPageName(pathname: string): string {
  if (pathname === '/' || pathname === '') return 'Home'
  if (pathname.includes('/personalProject/intranet')) return 'Intranet'
  if (pathname.includes('/vibeProject/aiagent')) return 'AI Agent Dashboard'
  if (pathname.includes('/vibeProject/githeatmap')) return 'GitHub Heatmap'
  if (pathname.includes('/vibeProject/snippet')) return 'Code Snippet'
  if (pathname.includes('/vibeProject/dashboard')) return 'Portfolio Analytics'
  return pathname
}

const MainLayout = () => {
  const location = useLocation()
  const enterTimeRef = useRef<number>(Date.now())
  const prevPathRef = useRef<string>(location.pathname)

  // 페이지 이동 시마다 방문 기록 + 이전 페이지 체류시간 기록
  useEffect(() => {
    const now = Date.now()
    const prevPath = prevPathRef.current
    const duration = now - enterTimeRef.current

    // 이전 페이지 체류시간 기록 (최초 로드가 아닌 경우)
    if (prevPath !== location.pathname && duration > 1000) {
      trackVisit(prevPath, 'page_view', `${getPageName(prevPath)} — duration`, { duration })
    }

    // 새 페이지 방문 기록
    const pageName = getPageName(location.pathname)
    trackVisit(location.pathname, 'page_view', pageName)

    enterTimeRef.current = now
    prevPathRef.current = location.pathname
  }, [location.pathname])

  // 탭 닫기/새로고침 시 마지막 체류시간 기록
  useEffect(() => {
    const handleUnload = () => {
      const duration = Date.now() - enterTimeRef.current
      if (duration > 1000) {
        trackVisit(prevPathRef.current, 'page_view', `${getPageName(prevPathRef.current)} — duration`, { duration })
      }
    }
    window.addEventListener('beforeunload', handleUnload)
    return () => window.removeEventListener('beforeunload', handleUnload)
  }, [])

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <GNB />
      <Settings />

      <Box component="main" sx={{ flex: 1, pt: '64px' }}>
        <Outlet />
      </Box>

      {/* Footer */}
      <Footer />
    </Box>
  )
}

export default MainLayout
