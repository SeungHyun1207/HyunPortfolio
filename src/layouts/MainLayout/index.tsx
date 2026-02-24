import { Outlet } from 'react-router-dom'
import { Box, Container, Typography } from '@mui/material'
import GNB from '@components/GNB'
import Settings from '@components/Settings'
import { useSettings } from '@/contexts/SettingsContext'

const MainLayout = () => {
  const { t } = useSettings()

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <GNB />
      <Settings />

      <Box component="main" sx={{ flex: 1, pt: 8 }}>
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
        <Container maxWidth="lg" sx={{ px: { xs: 2, md: 4 }, py: 4 }}>
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
                Hyun
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
                  transition: 'color 0.3s ease',
                  '&:hover': { color: 'primary.main' },
                }}
              >
                GitHub
              </Typography>
              <Typography
                component="a"
                href="mailto:contact@example.com"
                variant="body2"
                sx={{
                  color: 'text.secondary',
                  textDecoration: 'none',
                  transition: 'color 0.3s ease',
                  '&:hover': { color: 'primary.main' },
                }}
              >
                Email
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              mt: 4,
              pt: 3,
              borderTop: '1px solid',
              borderColor: 'divider',
              textAlign: 'center',
            }}
          >
            <Typography variant="caption" color="text.secondary">
              &copy; {new Date().getFullYear()} Hyun. {t('footer.rights')}
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  )
}

export default MainLayout
