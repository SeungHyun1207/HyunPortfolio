import { useState } from 'react'
import { useSettings } from '@/contexts/SettingsContext'
import {
  Box,
  Paper,
  Typography,
  Fab,
  Button,
} from '@mui/material'
import SettingsIcon from '@mui/icons-material/Settings'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'

const Settings = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { theme, language, setTheme, setLanguage, t } = useSettings()

  return (
    <Box sx={{ position: 'fixed', bottom: 24, right: 24, zIndex: 1200 }}>
      {/* Backdrop */}
      {isOpen && (
        <Box
          sx={{ position: 'fixed', inset: 0, zIndex: -1 }}
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Settings Popup */}
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
        {/* Title */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2.5 }}>
          <SettingsIcon sx={{ fontSize: 20, color: 'primary.main' }} />
          <Typography fontWeight={700}>{t('settings.title')}</Typography>
        </Box>

        {/* Theme Toggle */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="caption" color="text.secondary" mb={1} display="block">
            {t('settings.theme')}
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              onClick={() => setTheme('dark')}
              startIcon={<DarkModeIcon sx={{ fontSize: 14 }} />}
              variant={theme === 'dark' ? 'contained' : 'outlined'}
              size="small"
              fullWidth
              sx={{
                borderRadius: 3,
                fontSize: '0.8rem',
                ...(theme === 'dark'
                  ? { bgcolor: 'primary.main', color: '#fff', '&:hover': { bgcolor: 'primary.dark' } }
                  : { borderColor: 'divider', color: 'text.secondary', '&:hover': { borderColor: 'primary.main', bgcolor: 'transparent' } }
                ),
              }}
            >
              {t('settings.dark')}
            </Button>
            <Button
              onClick={() => setTheme('light')}
              startIcon={<LightModeIcon sx={{ fontSize: 14 }} />}
              variant={theme === 'light' ? 'contained' : 'outlined'}
              size="small"
              fullWidth
              sx={{
                borderRadius: 3,
                fontSize: '0.8rem',
                ...(theme === 'light'
                  ? { bgcolor: 'primary.main', color: '#fff', '&:hover': { bgcolor: 'primary.dark' } }
                  : { borderColor: 'divider', color: 'text.secondary', '&:hover': { borderColor: 'primary.main', bgcolor: 'transparent' } }
                ),
              }}
            >
              {t('settings.light')}
            </Button>
          </Box>
        </Box>

        {/* Language Toggle */}
        <Box>
          <Typography variant="caption" color="text.secondary" mb={1} display="block">
            {t('settings.language')}
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              onClick={() => setLanguage('ko')}
              variant={language === 'ko' ? 'contained' : 'outlined'}
              size="small"
              fullWidth
              sx={{
                borderRadius: 3,
                fontSize: '0.8rem',
                ...(language === 'ko'
                  ? { bgcolor: 'primary.main', color: '#fff', '&:hover': { bgcolor: 'primary.dark' } }
                  : { borderColor: 'divider', color: 'text.secondary', '&:hover': { borderColor: 'primary.main', bgcolor: 'transparent' } }
                ),
              }}
            >
              {t('settings.korean')}
            </Button>
            <Button
              onClick={() => setLanguage('en')}
              variant={language === 'en' ? 'contained' : 'outlined'}
              size="small"
              fullWidth
              sx={{
                borderRadius: 3,
                fontSize: '0.8rem',
                ...(language === 'en'
                  ? { bgcolor: 'primary.main', color: '#fff', '&:hover': { bgcolor: 'primary.dark' } }
                  : { borderColor: 'divider', color: 'text.secondary', '&:hover': { borderColor: 'primary.main', bgcolor: 'transparent' } }
                ),
              }}
            >
              {t('settings.english')}
            </Button>
          </Box>
        </Box>
      </Paper>

      {/* Settings FAB */}
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
