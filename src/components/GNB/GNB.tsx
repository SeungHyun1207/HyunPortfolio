import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  AppBar, Toolbar, Box, Button, Typography, useScrollTrigger,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { useSettings } from '@/contexts/SettingsContext'
import FullMenu from './FullMenu'

export interface MenuItem {
  labelKey: string
  href: string
  descKey?: string
}

export const menuItems: MenuItem[] = [
  { labelKey: 'nav.devInfo', href: '#devinfo', descKey: 'nav.devInfoDesc' },
  { labelKey: 'nav.skills', href: '#skills', descKey: 'nav.skillsDesc' },
  { labelKey: 'nav.projects', href: '#projects', descKey: 'nav.projectsDesc' },
  { labelKey: 'nav.experience', href: '#experience', descKey: 'nav.experienceDesc' },
  { labelKey: 'nav.contact', href: '#contact', descKey: 'nav.contactDesc' },
]

const GNB = () => {
  const { t } = useSettings()
  const [isFullMenuOpen, setIsFullMenuOpen] = useState(false)
  const trigger = useScrollTrigger({ disableHysteresis: true, threshold: 50 })

  useEffect(() => {
    if (isFullMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isFullMenuOpen])

  return (
    <>
      <AppBar
        position="fixed"
        elevation={trigger ? 2 : 0}
        sx={{
          bgcolor: trigger ? 'background.paper' : 'transparent',
          backdropFilter: trigger ? 'blur(12px)' : 'none',
          borderBottom: trigger ? '1px solid' : 'none',
          borderColor: 'divider',
          transition: 'all 0.3s ease',
        }}
      >
        <Toolbar sx={{ maxWidth: 1200, mx: 'auto', width: '100%', px: { xs: 2, md: 4 } }}>
          {/* Logo */}
          <Box component={Link} to="/" sx={{ textDecoration: 'none', flexShrink: 0 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                fontSize: '1.4rem',
                background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                '&:hover': { opacity: 0.8 },
                transition: 'opacity 0.15s',
              }}
            >
              Hyun
            </Typography>
          </Box>

          {/* Center Menu (Desktop) */}
          <Box sx={{ flex: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center', gap: 1 }}>
            {menuItems.map((item) => (
              <Button
                key={item.href}
                href={item.href}
                component="a"
                sx={{
                  color: 'text.secondary',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  px: 2,
                  '&:hover': { color: 'text.primary', bgcolor: 'transparent' },
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: 4,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: 0,
                    height: 2,
                    bgcolor: 'primary.main',
                    transition: 'width 0.3s ease',
                  },
                  '&:hover::after': { width: '70%' },
                }}
              >
                {t(item.labelKey)}
              </Button>
            ))}
          </Box>

          {/* Right - Menu Button */}
          <Box sx={{ ml: 'auto' }}>
            <Button
              onClick={() => setIsFullMenuOpen(true)}
              endIcon={<MenuIcon sx={{ fontSize: 18 }} />}
              variant="outlined"
              size="small"
              sx={{
                color: 'text.secondary',
                borderColor: 'divider',
                fontSize: '0.8rem',
                '&:hover': { borderColor: 'primary.main', color: 'text.primary' },
              }}
            >
              <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
                {t('nav.menu')}
              </Box>
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <FullMenu
        isOpen={isFullMenuOpen}
        onClose={() => setIsFullMenuOpen(false)}
        menuItems={menuItems}
      />
    </>
  )
}

export default GNB
