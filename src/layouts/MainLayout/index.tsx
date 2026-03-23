import { Outlet } from 'react-router-dom'
import GNB from '@components/GNB'
import Settings from '@components/Settings'
import { useSettings } from '@/contexts/SettingsContext'
import { Box, Typography, Divider } from '@mui/material'

const MainLayout = () => {
  const { t } = useSettings()

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <GNB />
      <Settings />

      <Box component="main" sx={{ flex: 1, pt: '64px' }}>
        <Outlet />
      </Box>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          borderTop: '1px solid',
          borderColor: 'divider',
          bgcolor: 'background.paper',
        }}
      >
        <Box sx={{ maxWidth: 1152, mx: 'auto', px: { xs: 2, md: 4 }, py: 4 }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 2,
            }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: { xs: 'center', md: 'flex-start' }, gap: 0.5 }}>
              <Typography className="gradient-text" sx={{ fontSize: '1.25rem', fontWeight: 700 }}>
                SeungHyun
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {t('footer.role')}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              <Typography
                component="a"
                href="https://github.com/SeungHyun1207"
                target="_blank"
                rel="noopener noreferrer"
                variant="body2"
                sx={{
                  color: 'text.secondary',
                  textDecoration: 'none',
                  '&:hover': { color: 'primary.main' },
                  transition: 'color 0.3s ease',
                }}
              >
                GitHub
              </Typography>
              <Typography
                component="a"
                href="mailto:seunghyun_1207@naver.com"
                variant="body2"
                sx={{
                  color: 'text.secondary',
                  textDecoration: 'none',
                  '&:hover': { color: 'primary.main' },
                  transition: 'color 0.3s ease',
                }}
              >
                Email
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Typography variant="caption" color="text.secondary" display="block" textAlign="center">
            &copy; {new Date().getFullYear()} SeungHyun. {t('footer.rights')}
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default MainLayout
