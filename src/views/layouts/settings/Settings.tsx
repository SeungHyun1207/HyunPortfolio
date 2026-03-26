import { useSettings } from '@/contexts/SettingsContext'
import useIntranetSettings from '@/stores/intranet/useIntranetSettings'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'
import SettingsIcon from '@mui/icons-material/Settings'
import { Box, Button, Fab, Paper, Typography } from '@mui/material'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'

// ==============================
// 경로별 설정 패널 매핑 배열
// — pathPrefix가 현재 URL과 일치하면 해당 패널을 렌더링
// — 새 경로 추가 시 이 배열에만 추가하면 됨
// ==============================
const SETTINGS_ROUTES: { pathPrefix: string; label: string }[] = [
  { pathPrefix: '/personalProject/intranet', label: '사내관리시스템 설정' },
]

// ==============================
// 공통 버튼 스타일 헬퍼
// ==============================
const btnSx = (active: boolean) => ({
  borderRadius: 3,
  fontSize: '0.8rem',
  ...(active
    ? { bgcolor: 'primary.main', color: '#fff', '&:hover': { bgcolor: 'primary.dark' } }
    : { borderColor: 'divider', color: 'text.secondary', '&:hover': { borderColor: 'primary.main', bgcolor: 'transparent' } }),
})

// ==============================
// 포트폴리오 기본 설정 패널
// ==============================
const PortfolioPanel = () => {
  const { theme, language, setTheme, setLanguage, t } = useSettings()
  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2.5 }}>
        <SettingsIcon sx={{ fontSize: 20, color: 'primary.main' }} />
        <Typography fontWeight={700}>{t('settings.title')}</Typography>
      </Box>

      {/* 테마 */}
      <Box sx={{ mb: 2 }}>
        <Typography variant="caption" color="text.secondary" mb={1} display="block">
          {t('settings.theme')}
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button onClick={() => setTheme('dark')} startIcon={<DarkModeIcon sx={{ fontSize: 14 }} />}
            variant={theme === 'dark' ? 'contained' : 'outlined'} size="small" fullWidth sx={btnSx(theme === 'dark')}>
            {t('settings.dark')}
          </Button>
          <Button onClick={() => setTheme('light')} startIcon={<LightModeIcon sx={{ fontSize: 14 }} />}
            variant={theme === 'light' ? 'contained' : 'outlined'} size="small" fullWidth sx={btnSx(theme === 'light')}>
            {t('settings.light')}
          </Button>
        </Box>
      </Box>

      {/* 언어 */}
      <Box>
        <Typography variant="caption" color="text.secondary" mb={1} display="block">
          {t('settings.language')}
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button onClick={() => setLanguage('ko')} variant={language === 'ko' ? 'contained' : 'outlined'}
            size="small" fullWidth sx={btnSx(language === 'ko')}>
            {t('settings.korean')}
          </Button>
          <Button onClick={() => setLanguage('en')} variant={language === 'en' ? 'contained' : 'outlined'}
            size="small" fullWidth sx={btnSx(language === 'en')}>
            {t('settings.english')}
          </Button>
        </Box>
      </Box>
    </>
  )
}

// ==============================
// 사내관리시스템 전용 설정 패널
// ==============================
const IntranetPanel = () => {
  const { theme, setTheme } = useIntranetSettings()
  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2.5 }}>
        <SettingsIcon sx={{ fontSize: 20, color: 'primary.main' }} />
        <Typography fontWeight={700}>사내관리시스템 설정</Typography>
      </Box>

      {/* 인트라넷 전용 다크모드 */}
      <Box>
        <Typography variant="caption" color="text.secondary" mb={1} display="block">
          화면 테마
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button onClick={() => setTheme('dark')} startIcon={<DarkModeIcon sx={{ fontSize: 14 }} />}
            variant={theme === 'dark' ? 'contained' : 'outlined'} size="small" fullWidth sx={btnSx(theme === 'dark')}>
            다크
          </Button>
          <Button onClick={() => setTheme('light')} startIcon={<LightModeIcon sx={{ fontSize: 14 }} />}
            variant={theme === 'light' ? 'contained' : 'outlined'} size="small" fullWidth sx={btnSx(theme === 'light')}>
            라이트
          </Button>
        </Box>
      </Box>
    </>
  )
}

// ==============================
// Settings FAB + Popup
// ==============================
const Settings = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { t } = useSettings()
  const { pathname } = useLocation()

  // 현재 경로가 SETTINGS_ROUTES 배열에 등록된 경로인지 확인
  const matchedRoute = SETTINGS_ROUTES.find((r) => pathname.startsWith(r.pathPrefix))

  return (
    <Box sx={{ position: 'fixed', bottom: 24, right: 24, zIndex: 1200 }}>
      {isOpen && (
        <Box sx={{ position: 'fixed', inset: 0, zIndex: -1 }} onClick={() => setIsOpen(false)} />
      )}

      <Paper
        elevation={8}
        sx={{
          position: 'absolute',
          bottom: 64,
          right: 0,
          width: 280,
          p: 2.5,
          borderRadius: 4,
          border: '1px solid',
          borderColor: 'divider',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
          transition: 'all 0.3s ease',
          transformOrigin: 'bottom right',
          opacity: isOpen ? 1 : 0,
          transform: isOpen ? 'scale(1)' : 'scale(0.95)',
          pointerEvents: isOpen ? 'auto' : 'none',
          bgcolor: 'background.paper',
        }}
      >
        {/* 경로에 따라 패널 분기 */}
        {matchedRoute ? <IntranetPanel /> : <PortfolioPanel />}
      </Paper>

      <Fab
        onClick={() => setIsOpen(!isOpen)}
        title={t('settings.title')}
        size="medium"
        sx={{
          background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
          color: '#fff',
          boxShadow: '0 4px 20px rgba(99,102,241,0.4)',
          transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          '&:hover': {
            boxShadow: '0 6px 25px rgba(99,102,241,0.5)',
            transform: isOpen ? 'rotate(45deg) scale(1.1)' : 'scale(1.1)',
            background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
          },
        }}
      >
        <SettingsIcon />
      </Fab>
    </Box>
  )
}

export default Settings
