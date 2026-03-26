import { useState } from 'react'
import { useScrollAnimation } from '@hooks'
import { usePageTranslation } from '@hooks/usePageTranslation'
import { translations } from './contact.i18n'
import type { ContactInfoItem } from '@models/home/contact/ContactModel'
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
} from '@mui/material'
import Grid from '@mui/material/Grid'
import EmailIcon from '@mui/icons-material/Email'
import GitHubIcon from '@mui/icons-material/GitHub'
import LocationOnIcon from '@mui/icons-material/LocationOn'

const Contact = () => {
  const { t } = usePageTranslation(translations)
  const { ref, isVisible } = useScrollAnimation<HTMLElement>({ threshold: 0.1 })
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert(t('submitAlert'))
    setFormData({ name: '', email: '', message: '' })
  }

  const contactInfo: ContactInfoItem[] = [
    {
      icon: <EmailIcon sx={{ fontSize: 20 }} />,
      label: t('emailLabel'),
      value: t('emailValue'),
      href: null,
    },
    {
      icon: <GitHubIcon sx={{ fontSize: 20 }} />,
      label: 'GitHub',
      value: 'github.com/SeungHyun1207',
      href: 'https://github.com/SeungHyun1207',
    },
    {
      icon: <LocationOnIcon sx={{ fontSize: 20 }} />,
      label: t('location'),
      value: t('locationValue'),
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
      <Box sx={{ maxWidth: 1152, mx: 'auto', px: { xs: 2, md: 4 } }}>
        {/* Header */}
        <Box
          sx={{
            textAlign: 'center',
            mb: 8,
            transition: 'all 0.7s ease',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(32px)',
          }}
        >
          <Typography variant="overline" sx={{ color: 'primary.main', fontWeight: 600, letterSpacing: '0.2em' }}>
            {t('label')}
          </Typography>
          <Typography
            variant="h2"
            sx={{ fontSize: { xs: '1.875rem', md: '2.25rem', lg: '3rem' }, fontWeight: 700, mt: 1, mb: 2 }}
          >
            {t('title1')}{' '}
            <Box component="span" className="gradient-text">{t('title2')}</Box>
          </Typography>
          <Typography color="text.secondary" sx={{ maxWidth: 512, mx: 'auto' }}>
            {t('description')}
          </Typography>
        </Box>

        <Grid
          container
          spacing={6}
          sx={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(32px)',
            transition: 'all 0.7s ease 100ms',
          }}
        >
          {/* Contact Info */}
          <Grid size={{ xs: 12, lg: 6 }}>
            <Typography variant="h6" fontWeight={700} mb={3}>
              {t('infoTitle')}
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mb: 4 }}>
              {contactInfo.map((info, index) => (
                <Paper
                  key={index}
                  elevation={0}
                  onClick={() => info.href && window.open(info.href, '_blank')}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    p: 2,
                    borderRadius: 3,
                    border: '1px solid',
                    borderColor: 'divider',
                    transition: 'all 0.3s ease',
                    cursor: info.href ? 'pointer' : 'default',
                    '&:hover': info.href ? { borderColor: 'primary.main' } : {},
                    bgcolor: 'background.default',
                  }}
                >
                  <Box
                    sx={{
                      p: 1,
                      borderRadius: 2,
                      bgcolor: 'primary.main',
                      color: '#fff',
                      display: 'flex',
                      flexShrink: 0,
                      opacity: 0.85,
                    }}
                  >
                    {info.icon}
                  </Box>
                  <Box>
                    <Typography variant="caption" color="text.secondary" display="block">{info.label}</Typography>
                    <Typography variant="body2" fontWeight={500}>{info.value}</Typography>
                  </Box>
                </Paper>
              ))}
            </Box>

            {/* Social Links */}
            <Box>
              <Typography variant="caption" color="text.secondary" mb={1.5} display="block">
                {t('followMe')}
              </Typography>
              <Box sx={{ display: 'flex', gap: 1.5 }}>
                {[
                  { name: 'GitHub', href: 'https://github.com/SeungHyun1207' },
                ].map((social) => (
                  <Button
                    key={social.name}
                    component="a"
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="outlined"
                    size="small"
                    sx={{
                      borderColor: 'divider',
                      color: 'text.secondary',
                      '&:hover': { borderColor: 'primary.main', color: 'primary.main', bgcolor: 'transparent' },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    {social.name}
                  </Button>
                ))}
              </Box>
            </Box>
          </Grid>

          {/* Contact Form */}
          <Grid size={{ xs: 12, lg: 6 }}>
            <Typography variant="h6" fontWeight={700} mb={3}>
              {t('formTitle')}
            </Typography>

            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box>
                <Typography variant="caption" color="text.secondary" mb={0.75} display="block">
                  {t('nameLabel')}
                </Typography>
                <TextField
                  id="name"
                  type="text"
                  placeholder={t('namePlaceholder')}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  fullWidth
                  size="small"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 3,
                      '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'primary.main' },
                    },
                  }}
                />
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary" mb={0.75} display="block">
                  {t('emailLabel')}
                </Typography>
                <TextField
                  id="email"
                  type="email"
                  placeholder={t('emailPlaceholder')}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  fullWidth
                  size="small"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 3,
                      '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'primary.main' },
                    },
                  }}
                />
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary" mb={0.75} display="block">
                  {t('messageLabel')}
                </Typography>
                <TextField
                  id="message"
                  placeholder={t('messagePlaceholder')}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  fullWidth
                  multiline
                  rows={5}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 3,
                      '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'primary.main' },
                    },
                  }}
                />
              </Box>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  py: 1.75,
                  borderRadius: 3,
                  fontWeight: 600,
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
                {t('submit')}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export default Contact
