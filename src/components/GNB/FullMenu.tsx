import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  Box, Typography, Fade, Button,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { useSettings } from '@/contexts/SettingsContext'
import type { MenuItem } from './GNB'

interface FullMenuProps {
  isOpen: boolean
  onClose: () => void
  menuItems: MenuItem[]
}

const FullMenu = ({ isOpen, onClose, menuItems }: FullMenuProps) => {
  const { t } = useSettings()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  return (
    <Fade in={isOpen} timeout={400}>
      <Box
        sx={{
          position: 'fixed',
          inset: 0,
          zIndex: 1300,
          display: 'flex',
          flexDirection: 'column',
          bgcolor: 'background.default',
          opacity: isOpen ? 1 : 0,
          backdropFilter: 'blur(16px)',
        }}
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        {/* Header */}
        <Box
          sx={{
            borderBottom: '1px solid',
            borderColor: 'divider',
            px: { xs: 2, md: 4 },
          }}
        >
          <Box
            sx={{
              maxWidth: 1200,
              mx: 'auto',
              height: 64,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Box component={Link} to="/" onClick={onClose} sx={{ textDecoration: 'none' }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  fontSize: '1.4rem',
                  background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Hyun
              </Typography>
            </Box>

            <Typography variant="body2" color="text.secondary">
              {t('nav.fullMenu')}
            </Typography>

            <Button
              onClick={onClose}
              endIcon={<CloseIcon sx={{ fontSize: 18 }} />}
              variant="outlined"
              size="small"
              sx={{
                color: 'text.secondary',
                borderColor: 'divider',
                '&:hover': { borderColor: 'primary.main', color: 'text.primary' },
              }}
            >
              <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
                {t('nav.close')}
              </Box>
            </Button>
          </Box>
        </Box>

        {/* Menu Items */}
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            px: { xs: 2, md: 4 },
          }}
        >
          <Box
            component="ul"
            sx={{
              listStyle: 'none',
              p: 0,
              m: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: { xs: 3, md: 4 },
            }}
          >
            {menuItems.map((item, index) => (
              <Box
                component="li"
                key={item.href}
                sx={{
                  opacity: isOpen ? 1 : 0,
                  transform: isOpen ? 'translateY(0)' : 'translateY(30px)',
                  transition: `opacity 0.5s ease ${150 + index * 75}ms, transform 0.5s ease ${150 + index * 75}ms`,
                }}
              >
                <Box
                  component="a"
                  href={item.href}
                  onClick={onClose}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 0.5,
                    textDecoration: 'none',
                    '&:hover .menu-label': {
                      background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    },
                  }}
                >
                  <Typography
                    className="menu-label"
                    sx={{
                      fontSize: { xs: '2.5rem', md: '4rem', lg: '5rem' },
                      fontWeight: 700,
                      color: 'text.primary',
                      lineHeight: 1,
                      transition: 'all 0.3s ease',
                    }}
                  >
                    {t(item.labelKey)}
                  </Typography>
                  {item.descKey && (
                    <Typography variant="caption" color="text.secondary">
                      {t(item.descKey)}
                    </Typography>
                  )}
                </Box>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Footer */}
        <Box
          sx={{
            borderTop: '1px solid',
            borderColor: 'divider',
            py: 3,
            px: { xs: 2, md: 4 },
            opacity: isOpen ? 1 : 0,
            transform: isOpen ? 'translateY(0)' : 'translateY(16px)',
            transition: `opacity 0.5s ease ${150 + menuItems.length * 75 + 100}ms, transform 0.5s ease ${150 + menuItems.length * 75 + 100}ms`,
          }}
        >
          <Box
            sx={{
              maxWidth: 1200,
              mx: 'auto',
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 2,
            }}
          >
            <Typography variant="caption" color="text.secondary">
              &copy; {new Date().getFullYear()} Hyun. {t('footer.rights')}
            </Typography>
            <Box sx={{ display: 'flex', gap: 3 }}>
              {['GitHub', 'Email'].map((link) => (
                <Typography
                  key={link}
                  component="a"
                  href={link === 'GitHub' ? 'https://github.com/SeungHyun1207' : 'mailto:contact@example.com'}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="caption"
                  sx={{
                    color: 'text.secondary',
                    textDecoration: 'none',
                    '&:hover': { color: 'primary.main' },
                    transition: 'color 0.2s',
                  }}
                >
                  {link}
                </Typography>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </Fade>
  )
}

export default FullMenu
