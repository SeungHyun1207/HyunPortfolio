import { useState, useEffect, useCallback } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useSettings } from '@/contexts/SettingsContext'
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  Typography,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import FullMenu from './FullMenu'

export interface MenuItem {
  labelKey: string
  sectionId: string
  descKey?: string
}

export const menuItems: MenuItem[] = [
  { labelKey: 'nav.devInfo',    sectionId: 'devinfo',    descKey: 'nav.devInfoDesc' },
  { labelKey: 'nav.skills',     sectionId: 'skills',     descKey: 'nav.skillsDesc' },
  { labelKey: 'nav.projects',   sectionId: 'projects',   descKey: 'nav.projectsDesc' },
  { labelKey: 'nav.experience', sectionId: 'experience', descKey: 'nav.experienceDesc' },
  { labelKey: 'nav.contact',    sectionId: 'contact',    descKey: 'nav.contactDesc' },
]

const GNB = () => {
  const { t } = useSettings()
  const navigate = useNavigate()
  const location = useLocation()
  const [isFullMenuOpen, setIsFullMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isFullMenuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isFullMenuOpen])

  const handleSectionClick = useCallback((sectionId: string) => {
    if (location.pathname === '/') {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate('/', { state: { scrollTo: sectionId } })
    }
  }, [location.pathname, navigate])

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          bgcolor: scrolled ? 'background.paper' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid' : 'none',
          borderColor: 'divider',
          transition: 'all 0.3s ease',
          backgroundImage: 'none',
        }}
      >
        <Toolbar sx={{ maxWidth: 1200, mx: 'auto', width: '100%', px: { xs: 2, md: 4 }, minHeight: 64 }}>
          {/* Logo */}
          <Link to="/" style={{ textDecoration: 'none', flexShrink: 0 }}>
            <Typography
              className="gradient-text"
              sx={{ fontWeight: 700, fontSize: '1.5rem', '&:hover': { opacity: 0.8 }, transition: 'opacity 0.15s' }}
            >
              SeungHyun
            </Typography>
          </Link>

          {/* Center Nav (Desktop) */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, flex: 1, justifyContent: 'center', gap: 0.5 }}>
            {menuItems.map((item) => (
              <Button
                key={item.sectionId}
                onClick={() => handleSectionClick(item.sectionId)}
                sx={{
                  position: 'relative',
                  color: 'text.secondary',
                  fontWeight: 500,
                  fontSize: '0.875rem',
                  px: 2,
                  py: 1,
                  '&:hover': { color: 'text.primary', bgcolor: 'transparent' },
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: 4,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: 0,
                    height: 2,
                    bgcolor: 'primary.main',
                    borderRadius: 1,
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
              variant="outlined"
              startIcon={<MenuIcon sx={{ width: 16, height: 16 }} />}
              aria-label={t('nav.openMenu')}
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
              <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>{t('nav.menu')}</Box>
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <FullMenu
        isOpen={isFullMenuOpen}
        onClose={() => setIsFullMenuOpen(false)}
        menuItems={menuItems}
        onSectionClick={(id) => { handleSectionClick(id); setIsFullMenuOpen(false) }}
      />
    </>
  )
}

export default GNB
