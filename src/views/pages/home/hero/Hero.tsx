import { useEffect, useState } from 'react'
import { Box, Typography, Button } from '@mui/material'
import { usePageTranslation } from '@hooks/usePageTranslation'
import { translations } from './hero.i18n'

const Hero = () => {
  const { t } = usePageTranslation(translations)
  const [isVisible, setIsVisible] = useState(false)
  const roles = ['Frontend Developer', 'UI Engineer', 'React Specialist']
  const [currentRole, setCurrentRole] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

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
      <div className="grid-bg absolute inset-0 opacity-60 pointer-events-none" />

      {/* Gradient Orb */}
      <Box
        sx={{
          position: 'absolute',
          top: '25%',
          right: '25%',
          width: { xs: 300, md: 500 },
          height: { xs: 300, md: 500 },
          borderRadius: '50%',
          pointerEvents: 'none',
          background: 'radial-gradient(circle, rgba(99,102,241,0.3) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      {/* Content */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '1152px',
          mx: 'auto',
          px: { xs: 2, md: 4 },
          width: '100%',
        }}
      >
        <Box
          sx={{
            textAlign: 'center',
            transition: 'opacity 1s ease, transform 1s ease',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
          }}
        >
          {/* Greeting */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0, mb: 4 }}>
            <Typography
              component="span"
              className="scroll-bounce"
              sx={{
                display: 'inline-block',
                fontSize: { xs: '1.875rem', md: '2.25rem' },
                fontWeight: 600,
                color: 'text.primary',
              }}
            >
              {t('greeting')}
              <Box component="span" sx={{ color: 'primary.main' }}>!</Box>
            </Typography>
          </Box>

          {/* Name */}
          <Typography
            variant="h1"
            sx={{
              fontWeight: 800,
              lineHeight: 1.1,
              mb: 4,
              fontSize: { xs: '1rem', md: '4.5rem', lg: '3.5rem' },
            }}
          >
            {t('intro')}{' '}
            <Box component="span" className="gradient-text">  {t('introName')}</Box>
            {t('introSuffix')}
          </Typography>

          {/* Typing Role */}
          <Box
            sx={{
              height: { xs: 48, md: 64 },
              mb: 3.5,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography
              component="span"
              sx={{
                fontFamily: "'Fira Code', monospace",
                fontSize: { xs: '1.125rem', md: '1.25rem' },
                color: 'text.secondary',
                fontWeight: 400,
              }}
            >
              {displayText}
              <span className="typing-cursor" />
            </Typography>
          </Box>

          {/* Description */}
          <Typography
            sx={{
              maxWidth: 480,
              mx: 'auto',
              mb: 5,
              color: 'text.secondary',
              lineHeight: 1.75,
              whiteSpace: 'pre-line',
              fontSize: { xs: '1rem', md: '1.125rem' },
              fontWeight: 400,
            }}
          >
            {t('description')}
          </Typography>

          {/* CTA Buttons */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              gap: 2,
              mb: 8,
              flexWrap: 'wrap',
            }}
          >
            <Button
              component="a"
              href="#devinfo"
              variant="contained"
              endIcon={
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              }
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: 3,
                background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
                color: '#fff',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 30px rgba(99,102,241,0.35)',
                  background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              {t('aboutMe')}
            </Button>
            <Button
              component="a"
              href="#contact"
              variant="outlined"
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: 3,
                borderColor: 'divider',
                color: 'text.primary',
                '&:hover': {
                  borderColor: 'primary.main',
                  backgroundColor: 'transparent',
                },
                transition: 'all 0.3s ease',
              }}
            >
              {t('contact')}
            </Button>
          </Box>

          {/* Scroll Indicator */}
          <Box className="scroll-bounce" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
            <Box
              sx={{
                width: 24,
                height: 40,
                borderRadius: 10,
                border: '2px solid',
                borderColor: 'text.secondary',
                opacity: 0.3,
                display: 'flex',
                justifyContent: 'center',
                pt: 0.75,
              }}
            >
              <Box
                sx={{
                  width: 4,
                  height: 8,
                  bgcolor: 'text.secondary',
                  opacity: 0.4,
                  borderRadius: 2,
                  animation: 'pulse 2s infinite',
                }}
              />
            </Box>
            <Typography
              variant="caption"
              sx={{
                color: 'text.secondary',
                opacity: 0.5,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
              }}
            >
              {t('scroll')}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Hero
