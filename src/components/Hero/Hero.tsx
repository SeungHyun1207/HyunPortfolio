import { useEffect, useState } from 'react'
import { Box, Typography, Button, Container } from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { useSettings } from '@/contexts/SettingsContext'

const Hero = () => {
  const { t } = useSettings()
  const [isVisible, setIsVisible] = useState(false)
  const roles = ['Frontend Developer', 'UI Engineer', 'React Specialist']
  const [currentRole, setCurrentRole] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => { setIsVisible(true) }, [])

  useEffect(() => {
    const role = roles[currentRole]
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < role.length) {
          setDisplayText(role.slice(0, displayText.length + 1))
        } else {
          setTimeout(() => setIsDeleting(true), 2000)
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1))
        } else {
          setIsDeleting(false)
          setCurrentRole((prev) => (prev + 1) % roles.length)
        }
      }
    }, isDeleting ? 50 : 100)
    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, currentRole, roles])

  return (
    <Box
      component="section"
      id="hero"
      sx={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Grid Background */}
      <Box
        className="grid-bg"
        sx={{ position: 'absolute', inset: 0, opacity: 0.6, pointerEvents: 'none' }}
      />

      {/* Gradient Orb */}
      <Box
        sx={{
          position: 'absolute',
          top: '20%',
          right: '20%',
          width: { xs: 300, md: 500 },
          height: { xs: 300, md: 500 },
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99,102,241,0.3) 0%, transparent 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
        }}
      />

      {/* Content */}
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box
          sx={{
            textAlign: 'center',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 1s ease, transform 1s ease',
          }}
        >
          {/* Greeting */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5, mb: 3 }}>
            <Typography
              variant="h4"
              sx={{ fontWeight: 600, display: 'inline-block', animation: 'scrollBounce 2s infinite',
                '@keyframes scrollBounce': {
                  '0%,100%': { transform: 'translateY(0)' },
                  '50%': { transform: 'translateY(-6px)' },
                },
              }}
            >
              {t('hero.greeting')}
            </Typography>
            <Typography variant="h4" color="primary" sx={{ fontWeight: 600 }}>.</Typography>
          </Box>

          {/* Name */}
          <Typography
            variant="h1"
            sx={{
              fontWeight: 800,
              fontSize: { xs: '3rem', md: '5rem', lg: '7rem' },
              lineHeight: 1.1,
              mb: 3,
            }}
          >
            {t('hero.intro')}{' '}
            <Box component="span" className="gradient-text">Hyun</Box>
          </Typography>

          {/* Typing Role */}
          <Box sx={{ height: { xs: 48, md: 64 }, mb: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography
              variant="h5"
              color="text.secondary"
              sx={{ fontFamily: 'monospace', fontWeight: 400 }}
            >
              {displayText}
              <Box component="span" className="typing-cursor" />
            </Typography>
          </Box>

          {/* Description */}
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{
              maxWidth: 600,
              mx: 'auto',
              mb: 6,
              lineHeight: 1.8,
              fontWeight: 400,
              whiteSpace: 'pre-line',
              fontSize: { xs: '1rem', md: '1.1rem' },
            }}
          >
            {t('hero.description')}
          </Typography>

          {/* CTA Buttons */}
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 8, flexWrap: 'wrap' }}>
            <Button
              href="#devinfo"
              component="a"
              variant="contained"
              size="large"
              endIcon={<ArrowForwardIcon />}
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: 2,
                fontWeight: 600,
                background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #4f46e5 0%, #9333ea 100%)',
                  boxShadow: '0 8px 30px rgba(99,102,241,0.35)',
                  transform: 'translateY(-2px)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              {t('hero.aboutMe')}
            </Button>
            <Button
              href="#contact"
              component="a"
              variant="outlined"
              size="large"
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: 2,
                fontWeight: 600,
                borderColor: 'divider',
                color: 'text.primary',
                '&:hover': { borderColor: 'primary.main', bgcolor: 'action.hover' },
              }}
            >
              {t('hero.contact')}
            </Button>
          </Box>

          {/* Scroll Indicator */}
          <Box
            className="scroll-bounce"
            sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}
          >
            <Box
              sx={{
                width: 24,
                height: 40,
                borderRadius: 10,
                border: '2px solid',
                borderColor: 'text.disabled',
                display: 'flex',
                justifyContent: 'center',
                pt: 0.5,
              }}
            >
              <Box
                sx={{
                  width: 4,
                  height: 8,
                  bgcolor: 'text.disabled',
                  borderRadius: 2,
                  animation: 'pulse 1.5s infinite',
                  '@keyframes pulse': {
                    '0%,100%': { opacity: 1 },
                    '50%': { opacity: 0.2 },
                  },
                }}
              />
            </Box>
            <Typography variant="caption" color="text.disabled" sx={{ letterSpacing: 3, textTransform: 'uppercase' }}>
              {t('hero.scroll')}
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default Hero
