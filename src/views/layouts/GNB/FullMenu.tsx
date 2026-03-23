import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSettings } from '@/contexts/SettingsContext'
import { Box, Typography, Button, Paper } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import PersonIcon from '@mui/icons-material/Person'
import CodeIcon from '@mui/icons-material/Code'
import WorkIcon from '@mui/icons-material/Work'
import EmailIcon from '@mui/icons-material/Email'
import FolderIcon from '@mui/icons-material/Folder'
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

  const sectionIcons: Record<string, React.ReactNode> = {
    devinfo:    <PersonIcon sx={{ fontSize: 28 }} />,
    skills:     <CodeIcon sx={{ fontSize: 28 }} />,
    projects:   <FolderIcon sx={{ fontSize: 28 }} />,
    experience: <WorkIcon sx={{ fontSize: 28 }} />,
    contact:    <EmailIcon sx={{ fontSize: 28 }} />,
  }

  const projectTabs = [
    { label: t('projects.careerTab'),   icon: '💼' },
    { label: t('projects.personalTab'), icon: '🛠️' },
    { label: t('projects.vibeTab'),     icon: '🌊' },
  ]

  // 프로젝트 제외한 나머지 4개
  const otherItems = menuItems.filter((m) => m.sectionId !== 'projects')
  const projectItem = menuItems.find((m) => m.sectionId === 'projects')

  const cardBase = {
    p: 3,
    borderRadius: 4,
    border: '1px solid',
    borderColor: 'divider',
    cursor: 'pointer',
    bgcolor: 'background.paper',
    transition: 'all 0.25s ease',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 1.5,
    '&:hover': {
      borderColor: 'primary.main',
      transform: 'translateY(-3px)',
      boxShadow: '0 12px 32px rgba(99,102,241,0.15)',
    },
  }

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
        transition: 'opacity 0.35s ease',
        overflowY: 'auto',
      }}
    >
      {/* ── Header ── */}
      <Box sx={{ borderBottom: '1px solid', borderColor: 'divider', px: { xs: 2, md: 4 }, flexShrink: 0 }}>
        <Box sx={{ maxWidth: 1200, mx: 'auto', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link to="/" onClick={onClose} style={{ textDecoration: 'none' }}>
            <Typography className="gradient-text" sx={{ fontWeight: 700, fontSize: '1.5rem' }}>
              SeungHyun
            </Typography>
          </Link>
          <Typography variant="body2" color="text.secondary">{t('nav.fullMenu')}</Typography>
          <Button
            onClick={onClose}
            variant="outlined"
            startIcon={<CloseIcon sx={{ width: 16, height: 16 }} />}
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

      {/* ── Grid Body ── */}
      <Box
        sx={{
          flex: 1,
          maxWidth: 1200,
          mx: 'auto',
          width: '100%',
          px: { xs: 2, md: 4 },
          py: 5,
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr', lg: '1fr 1fr 1.4fr' },
          gridTemplateRows: { lg: 'auto auto' },
          gap: 2,
        }}
      >
        {/* 4개 일반 섹션 */}
        {otherItems.map((item, index) => (
          <Paper
            key={item.sectionId}
            elevation={0}
            onClick={() => { onSectionClick(item.sectionId); onClose() }}
            sx={{
              ...cardBase,
              opacity: isOpen ? 1 : 0,
              transform: isOpen ? 'translateY(0)' : 'translateY(20px)',
              transition: `opacity 0.45s ease ${100 + index * 60}ms, transform 0.45s ease ${100 + index * 60}ms, border-color 0.25s ease, box-shadow 0.25s ease`,
            }}
          >
            <Box
              sx={{
                width: 52,
                height: 52,
                borderRadius: 3,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, rgba(99,102,241,0.15) 0%, rgba(168,85,247,0.15) 100%)',
                color: 'primary.main',
                flexShrink: 0,
              }}
            >
              {sectionIcons[item.sectionId]}
            </Box>
            <Box>
              <Typography variant="h6" fontWeight={700} sx={{ lineHeight: 1.2 }}>
                {t(item.labelKey)}
              </Typography>
              {item.descKey && (
                <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
                  {t(item.descKey)}
                </Typography>
              )}
            </Box>
            <Typography
              variant="caption"
              sx={{
                mt: 'auto',
                color: 'primary.main',
                fontWeight: 600,
                letterSpacing: '0.02em',
              }}
            >
              {t('nav.goHome') ? '바로가기 →' : 'Go →'}
            </Typography>
          </Paper>
        ))}

        {/* 프로젝트 섹션 — 3개 탭 포함 */}
        {projectItem && (
          <Paper
            elevation={0}
            sx={{
              ...cardBase,
              cursor: 'default',
              gridColumn: { lg: '3' },
              gridRow: { lg: '1 / 3' },
              '&:hover': {},
              opacity: isOpen ? 1 : 0,
              transform: isOpen ? 'translateY(0)' : 'translateY(20px)',
              transition: `opacity 0.45s ease 340ms, transform 0.45s ease 340ms`,
            }}
          >
            {/* 헤더 */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
              <Box
                sx={{
                  width: 52,
                  height: 52,
                  borderRadius: 3,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'linear-gradient(135deg, rgba(99,102,241,0.15) 0%, rgba(168,85,247,0.15) 100%)',
                  color: 'primary.main',
                  flexShrink: 0,
                }}
              >
                {sectionIcons['projects']}
              </Box>
              <Box>
                <Typography variant="h6" fontWeight={700}>{t(projectItem.labelKey)}</Typography>
                {projectItem.descKey && (
                  <Typography variant="caption" color="text.secondary">{t(projectItem.descKey)}</Typography>
                )}
              </Box>
            </Box>

            {/* 구분선 */}
            <Box sx={{ height: 1, bgcolor: 'divider', mx: -3 }} />

            {/* 탭 3개 */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, flex: 1 }}>
              {projectTabs.map((tab, i) => (
                <Box
                  key={tab.label}
                  onClick={() => { onSectionClick('projects'); onClose() }}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    p: 2,
                    borderRadius: 3,
                    border: '1px solid',
                    borderColor: 'divider',
                    cursor: 'pointer',
                    bgcolor: 'background.default',
                    transition: 'all 0.2s ease',
                    opacity: isOpen ? 1 : 0,
                    transform: isOpen ? 'translateX(0)' : 'translateX(20px)',
                    transitionDelay: `${400 + i * 80}ms`,
                    '&:hover': {
                      borderColor: 'primary.main',
                      bgcolor: 'rgba(99,102,241,0.05)',
                      transform: 'translateX(6px)',
                    },
                  }}
                >
                  <Typography sx={{ fontSize: '1.5rem', lineHeight: 1 }}>{tab.icon}</Typography>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" fontWeight={600}>{tab.label}</Typography>
                  </Box>
                  <Typography variant="caption" color="primary.main" fontWeight={600}>→</Typography>
                </Box>
              ))}
            </Box>
          </Paper>
        )}
      </Box>

      {/* ── Footer ── */}
      <Box
        sx={{
          borderTop: '1px solid',
          borderColor: 'divider',
          py: 3,
          px: { xs: 2, md: 4 },
          flexShrink: 0,
          opacity: isOpen ? 1 : 0,
          transition: `opacity 0.5s ease 500ms`,
        }}
      >
        <Box sx={{ maxWidth: 1200, mx: 'auto', display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
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
                sx={{ color: 'text.secondary', textDecoration: 'none', '&:hover': { color: 'primary.main' }, transition: 'color 0.2s ease' }}
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
