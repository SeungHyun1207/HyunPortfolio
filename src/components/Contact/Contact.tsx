import { useState } from 'react'
import { Box, Container, Typography, Grid, TextField, Button } from '@mui/material'
import { useScrollAnimation } from '@hooks'
import { useSettings } from '@/contexts/SettingsContext'

const Contact = () => {
  const { t } = useSettings()
  const { ref, isVisible } = useScrollAnimation<HTMLElement>({ threshold: 0.1 })
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    alert(t('contact.submitAlert'))
    setFormData({ name: '', email: '', message: '' })
  }

  const contactInfo = [
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      ),
      label: 'Email',
      value: 'hyun@example.com',
      href: 'mailto:hyun@example.com',
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
        </svg>
      ),
      label: 'GitHub',
      value: 'github.com/SeungHyun1207',
      href: 'https://github.com/SeungHyun1207',
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
      label: 'LinkedIn',
      value: 'linkedin.com/in/hyun',
      href: 'https://linkedin.com/in/hyun',
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      ),
      labelKey: 'contact.location',
      valueKey: 'contact.locationValue',
      href: null,
    },
  ]

  return (
    <Box
      component="section"
      id="contact"
      ref={ref}
      sx={{ py: { xs: 10, md: 16 }, bgcolor: 'background.paper' }}
    >
      <Container maxWidth="lg">
        {/* Header */}
        <Box
          sx={{
            textAlign: 'center',
            mb: 8,
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(32px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}
        >
          <Typography
            color="primary"
            sx={{ fontSize: '0.875rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: 3 }}
          >
            {t('contact.label')}
          </Typography>
          <Typography
            variant="h3"
            sx={{ fontWeight: 700, mt: 2, mb: 3, fontSize: { xs: '1.75rem', md: '2.25rem', lg: '2.75rem' } }}
          >
            {t('contact.title1')}{' '}
            <Box component="span" className="gradient-text">{t('contact.title2')}</Box>
          </Typography>
          <Typography color="text.secondary" sx={{ maxWidth: 672, mx: 'auto' }}>
            {t('contact.description')}
          </Typography>
        </Box>

        <Grid
          container
          spacing={6}
          sx={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(32px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
            transitionDelay: '100ms',
          }}
        >
          {/* Contact Info */}
          <Grid size={{ xs: 12, lg: 6 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
              {t('contact.infoTitle')}
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 4 }}>
              {contactInfo.map((info, index) => (
                <Box
                  key={index}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    p: 2,
                    borderRadius: 2,
                    bgcolor: 'background.default',
                    border: '1px solid',
                    borderColor: 'divider',
                    transition: 'border-color 0.3s ease',
                    cursor: info.href ? 'pointer' : 'default',
                    '&:hover': info.href ? { borderColor: 'rgba(99,102,241,0.5)' } : {},
                  }}
                  onClick={() => info.href && window.open(info.href, '_blank')}
                >
                  <Box
                    sx={{
                      p: 1,
                      borderRadius: 1.5,
                      bgcolor: 'rgba(99,102,241,0.1)',
                      color: 'primary.main',
                      display: 'flex',
                      flexShrink: 0,
                    }}
                  >
                    {info.icon}
                  </Box>
                  <Box>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                      {(info as { labelKey?: string; label?: string }).labelKey
                        ? t((info as { labelKey: string }).labelKey)
                        : (info as { label: string }).label}
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {(info as { valueKey?: string; value?: string }).valueKey
                        ? t((info as { valueKey: string }).valueKey)
                        : (info as { value: string }).value}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>

            {/* Social Links */}
            <Box>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 2 }}>
                {t('contact.followMe')}
              </Typography>
              <Box sx={{ display: 'flex', gap: 1.5 }}>
                {[
                  { name: 'GitHub', href: 'https://github.com/SeungHyun1207' },
                  { name: 'LinkedIn', href: '#' },
                  { name: 'Twitter', href: '#' },
                ].map((social) => (
                  <Typography
                    key={social.name}
                    component="a"
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="body2"
                    sx={{
                      px: 2,
                      py: 1,
                      borderRadius: 2,
                      bgcolor: 'background.default',
                      border: '1px solid',
                      borderColor: 'divider',
                      color: 'text.secondary',
                      textDecoration: 'none',
                      transition: 'all 0.3s ease',
                      '&:hover': { borderColor: 'primary.main', color: 'primary.main' },
                    }}
                  >
                    {social.name}
                  </Typography>
                ))}
              </Box>
            </Box>
          </Grid>

          {/* Contact Form */}
          <Grid size={{ xs: 12, lg: 6 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
              {t('contact.formTitle')}
            </Typography>

            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                id="name"
                label={t('contact.nameLabel')}
                placeholder={t('contact.namePlaceholder')}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                fullWidth
                variant="outlined"
                size="medium"
              />
              <TextField
                id="email"
                type="email"
                label={t('contact.emailLabel')}
                placeholder="example@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                fullWidth
                variant="outlined"
                size="medium"
              />
              <TextField
                id="message"
                label={t('contact.messageLabel')}
                placeholder={t('contact.messagePlaceholder')}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                fullWidth
                multiline
                rows={5}
                variant="outlined"
              />
              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                sx={{
                  py: 1.75,
                  borderRadius: 2,
                  fontWeight: 600,
                  background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #4f46e5 0%, #9333ea 100%)',
                    boxShadow: '0 8px 30px rgba(99,102,241,0.35)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                {t('contact.submit')}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default Contact
