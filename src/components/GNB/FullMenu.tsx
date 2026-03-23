import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSettings } from '@/contexts/SettingsContext'
import { Box, Typography, Button } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import type { MenuItem } from './GNB'

interface FullMenuProps {
  isOpen: boolean
  onClose: () => void
  menuItems: MenuItem[]
  onSectionClick: (sectionId: string) => void
}

const FullMenu = ({ isOpen, onClose, menuItems, onSectionClick }: FullMenuProps) => {
  const { t } = useSettings()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  return (
    <Box
      sx={{
        position: 'fixed',
        inset: 0,
        zIndex: 1300,
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'background.default',
        opacity: isOpen ? 1 : 0,
        pointerEvents: isOpen ? 'auto' : 'none',
        transition: 'opacity 0.4s ease',
      }}
    >
      {/* Header */}
      <Box sx={{ borderBottom: '1px solid', borderColor: 'divider', px: { xs: 2, md: 4 } }}>
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
          <Link to="/" onClick={onClose} style={{ textDecoration: 'none' }}>
            <Typography className="gradient-text" sx={{ fontWeight: 700, fontSize: '1.5rem' }}>
              SeungHyun
            </Typography>
          </Link>

          <Typography variant="body2" color="text.secondary">
            {t('nav.fullMenu')}
          </Typography>

          <Button
            onClick={onClose}
            variant="outlined"
            startIcon={<CloseIcon sx={{ width: 16, height: 16 }} />}
            aria-label={t('nav.closeMenu')}
            sx={{
              color: 'text.secondary',
              borderColor: 'divider',
              fontSize: '0.875rem',
              fontWeight: 500,
              py: 0.75,
              px: 1.5,
              '&:hover': { borderColor: 'primary.main', color: 'text.primary', bgcolor: 'transparent' },
              minWidth: 'auto',
            }}
          >
            <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>{t('nav.close')}</Box>
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
            gap: { xs: 4, md: 5 },
          }}
        >
          {menuItems.map((item, index) => (
            <Box
              component="li"
              key={item.sectionId}
              sx={{
                opacity: isOpen ? 1 : 0,
                transform: isOpen ? 'translateY(0)' : 'translateY(30px)',
                transition: `opacity 0.5s ease ${150 + index * 75}ms, transform 0.5s ease ${150 + index * 75}ms`,
              }}
            >
              <Button
                onClick={() => onSectionClick(item.sectionId)}
                disableRipple
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 0.5,
                  bgcolor: 'transparent',
                  p: 0,
                  '&:hover': { bgcolor: 'transparent' },
                }}
              >
                <Typography
                  sx={{
                    fontSize: { xs: '3rem', md: '4.5rem', lg: '5rem' },
                    fontWeight: 700,
                    lineHeight: 1,
                    color: 'text.primary',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    },
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget
                    el.style.background = 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)'
                    el.style.webkitBackgroundClip = 'text'
                    el.style.webkitTextFillColor = 'transparent'
                    el.style.backgroundClip = 'text'
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget
                    el.style.background = ''
                    el.style.webkitBackgroundClip = ''
                    el.style.webkitTextFillColor = ''
                    el.style.backgroundClip = ''
                  }}
                >
                  {t(item.labelKey)}
                </Typography>
                {item.descKey && (
                  <Typography variant="caption" color="text.secondary">
                    {t(item.descKey)}
                  </Typography>
                )}
              </Button>
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
            &copy; {new Date().getFullYear()} SeungHyun. All rights reserved.
          </Typography>
          <Box sx={{ display: 'flex', gap: 3 }}>
            {[
              { name: 'GitHub', href: 'https://github.com/SeungHyun1207' },
              { name: 'Email', href: 'mailto:seunghyun_1207@naver.com' },
            ].map((link) => (
              <Typography
                key={link.name}
                component="a"
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                variant="caption"
                sx={{
                  color: 'text.secondary',
                  textDecoration: 'none',
                  '&:hover': { color: 'primary.main' },
                  transition: 'color 0.2s ease',
                }}
              >
                {link.name}
              </Typography>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default FullMenu
