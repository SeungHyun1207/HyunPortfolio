import { useScrollAnimation } from '@hooks'
import { useSettings } from '@/contexts/SettingsContext'
import { Box, Typography, Paper } from '@mui/material'
import Grid from '@mui/material/Grid'
import ProfileImg from '@assets/img/Profile.jpg'

const About = () => {
  const { t } = useSettings()
  const { ref, isVisible } = useScrollAnimation<HTMLElement>({ threshold: 0.2 })

  const stats = [
    { number: '3+', labelKey: 'about.yearsExp' },
    { number: '20+', labelKey: 'about.projects' },
    { number: '10+', labelKey: 'about.clients' },
  ]

  const highlights = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 24, height: 24 }}>
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5" />
          <path d="M2 12l10 5 10-5" />
        </svg>
      ),
      titleKey: 'about.cleanArchitecture',
      descKey: 'about.cleanArchitectureDesc',
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 24, height: 24 }}>
          <circle cx="12" cy="12" r="10" />
          <path d="M12 6v6l4 2" />
        </svg>
      ),
      titleKey: 'about.performanceFirst',
      descKey: 'about.performanceFirstDesc',
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 24, height: 24 }}>
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M3 9h18" />
          <path d="M9 21V9" />
        </svg>
      ),
      titleKey: 'about.responsiveDesign',
      descKey: 'about.responsiveDesignDesc',
    },
  ]

  return (
    <Box
      component="section"
      id="devinfo"
      ref={ref}
      sx={{ py: { xs: 10, md: 16 }, bgcolor: 'background.paper' }}
    >
      <Box sx={{ maxWidth: 1152, mx: 'auto', px: { xs: 2, md: 4 } }}>
        <Grid
          container
          spacing={{ xs: 6, md: 8 }}
          alignItems="center"
          sx={{
            transition: 'all 0.7s ease',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(32px)',
          }}
        >
          {/* Left - Image & Stats */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: { xs: 'center', md: 'flex-start' }, gap: 4 }}>
              {/* Profile Image Placeholder */}
              <Box sx={{ position: 'relative' }}>
                <Paper
                  elevation={0}
                  sx={{
                    width: { xs: 192, md: 256 },
                    height: { xs: 192, md: 256 },
                    borderRadius: 4,
                    border: '1px solid',
                    borderColor: 'divider',
                    overflow: 'hidden',
                    bgcolor: 'background.default',
                  }}
                >
                  <Box
                    component="img"
                    src={ProfileImg}
                    alt="SeungHyun Profile"
                    sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                </Paper>
                {/* Decorative border */}
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: -16,
                    right: -16,
                    width: '100%',
                    height: '100%',
                    borderRadius: 4,
                    border: '2px solid',
                    borderColor: 'primary.main',
                    opacity: 0.3,
                    zIndex: -1,
                  }}
                />
              </Box>

              {/* Stats */}
              <Box sx={{ display: 'flex', gap: { xs: 4, md: 5 } }}>
                {stats.map((stat, index) => (
                  <Box
                    key={index}
                    sx={{
                      textAlign: 'center',
                      transition: 'all 0.5s ease',
                      transitionDelay: `${200 + index * 100}ms`,
                    }}
                  >
                    <Typography className="gradient-text" sx={{ display: 'block', fontSize: { xs: '1.875rem', md: '2.25rem' }, fontWeight: 700 }}>
                      {stat.number}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {t(stat.labelKey)}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Grid>

          {/* Right - Content */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography
              variant="overline"
              sx={{ color: 'primary.main', fontWeight: 600, letterSpacing: '0.2em' }}
            >
              {t('about.label')}
            </Typography>

            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: '1.875rem', md: '2.25rem', lg: '3rem' },
                fontWeight: 700,
                mt: 1,
                mb: 3,
                lineHeight: 1.2,
              }}
            >
              {t('about.title1')}
              <br />
              <Box component="span" className="gradient-text">{t('about.title2')}</Box>
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 4 }}>
              <Typography color="text.secondary">{t('about.description1')}</Typography>
              <Typography color="text.secondary">{t('about.description2')}</Typography>
            </Box>

            {/* Highlights */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {highlights.map((item, index) => (
                <Paper
                  key={index}
                  elevation={0}
                  sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 2,
                    p: 2,
                    borderRadius: 3,
                    border: '1px solid',
                    borderColor: 'divider',
                    '&:hover': { borderColor: 'primary.main', opacity: 0.8 },
                    transition: 'all 0.3s ease',
                    bgcolor: 'background.default',
                  }}
                >
                  <Box
                    sx={{
                      p: 1,
                      borderRadius: 2,
                      bgcolor: 'primary.main',
                      color: '#fff',
                      flexShrink: 0,
                      display: 'flex',
                      opacity: 0.85,
                    }}
                  >
                    {item.icon}
                  </Box>
                  <Box>
                    <Typography variant="body2" fontWeight={600}>{t(item.titleKey)}</Typography>
                    <Typography variant="caption" color="text.secondary">{t(item.descKey)}</Typography>
                  </Box>
                </Paper>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export default About
