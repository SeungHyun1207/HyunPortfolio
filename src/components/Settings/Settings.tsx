import { useState } from 'react'
import { Box, Typography, IconButton, Tooltip, Fade } from '@mui/material'
import SettingsIcon from '@mui/icons-material/Settings'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'
import { useSettings } from '@/contexts/SettingsContext'

const Settings = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { theme, language, setTheme, setLanguage, t } = useSettings()

  return (
    <Box sx={{ position: 'fixed', bottom: 24, right: 24, zIndex: 1300 }}>
      {/* Settings Popup */}
      <Fade in={isOpen}>
        <Box
          sx={{
            position: 'absolute',
            bottom: 64,
            right: 0,
            width: 280,
            p: 2.5,
            borderRadius: 3,
            bgcolor: 'background.paper',
            border: '1px solid',
            borderColor: 'divider',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
            transformOrigin: 'bottom right',
          }}
        >
          {/* Title */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2.5 }}>
            <SettingsIcon sx={{ color: 'primary.main', fontSize: 20 }} />
            <Typography variant="body1" sx={{ fontWeight: 700 }}>
              {t('settings.title')}
            </Typography>
          </Box>

          {/* Theme Toggle */}
          <Box sx={{ mb: 2 }}>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
              {t('settings.theme')}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Box
                onClick={() => setTheme('dark')}
                sx={{
                  flex: 1,
                  py: 1,
                  px: 1.5,
                  borderRadius: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 1,
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  transition: 'all 0.2s ease',
                  bgcolor: theme === 'dark' ? 'primary.main' : 'background.default',
                  color: theme === 'dark' ? 'white' : 'text.secondary',
                  border: '1px solid',
                  borderColor: theme === 'dark' ? 'primary.main' : 'divider',
                  '&:hover': theme !== 'dark' ? { color: 'text.primary', borderColor: 'primary.light' } : {},
                }}
              >
                <DarkModeIcon sx={{ fontSize: 16 }} />
                {t('settings.dark')}
              </Box>
              <Box
                onClick={() => setTheme('light')}
                sx={{
                  flex: 1,
                  py: 1,
                  px: 1.5,
                  borderRadius: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 1,
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  transition: 'all 0.2s ease',
                  bgcolor: theme === 'light' ? 'primary.main' : 'background.default',
                  color: theme === 'light' ? 'white' : 'text.secondary',
                  border: '1px solid',
                  borderColor: theme === 'light' ? 'primary.main' : 'divider',
                  '&:hover': theme !== 'light' ? { color: 'text.primary', borderColor: 'primary.light' } : {},
                }}
              >
                <LightModeIcon sx={{ fontSize: 16 }} />
                {t('settings.light')}
              </Box>
            </Box>
          </Box>

          {/* Language Toggle */}
          <Box>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
              {t('settings.language')}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Box
                onClick={() => setLanguage('ko')}
                sx={{
                  flex: 1,
                  py: 1,
                  px: 1.5,
                  borderRadius: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  transition: 'all 0.2s ease',
                  bgcolor: language === 'ko' ? 'primary.main' : 'background.default',
                  color: language === 'ko' ? 'white' : 'text.secondary',
                  border: '1px solid',
                  borderColor: language === 'ko' ? 'primary.main' : 'divider',
                  '&:hover': language !== 'ko' ? { color: 'text.primary', borderColor: 'primary.light' } : {},
                }}
              >
                {t('settings.korean')}
              </Box>
              <Box
                onClick={() => setLanguage('en')}
                sx={{
                  flex: 1,
                  py: 1,
                  px: 1.5,
                  borderRadius: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  transition: 'all 0.2s ease',
                  bgcolor: language === 'en' ? 'primary.main' : 'background.default',
                  color: language === 'en' ? 'white' : 'text.secondary',
                  border: '1px solid',
                  borderColor: language === 'en' ? 'primary.main' : 'divider',
                  '&:hover': language !== 'en' ? { color: 'text.primary', borderColor: 'primary.light' } : {},
                }}
              >
                {t('settings.english')}
              </Box>
            </Box>
          </Box>
        </Box>
      </Fade>

      {/* Backdrop */}
      {isOpen && (
        <Box
          sx={{ position: 'fixed', inset: 0, zIndex: -1 }}
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Settings Button */}
      <Tooltip title={t('settings.title')} placement="left">
        <IconButton
          onClick={() => setIsOpen(!isOpen)}
          sx={{
            width: 48,
            height: 48,
            background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
            color: 'white',
            boxShadow: '0 4px 20px rgba(99,102,241,0.4)',
            transition: 'all 0.3s ease',
            transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
            '&:hover': {
              background: 'linear-gradient(135deg, #4f46e5 0%, #9333ea 100%)',
              transform: isOpen ? 'rotate(45deg) scale(1.1)' : 'scale(1.1)',
              boxShadow: '0 6px 25px rgba(99,102,241,0.5)',
            },
          }}
        >
          <SettingsIcon />
        </IconButton>
      </Tooltip>
    </Box>
  )
}

export default Settings
