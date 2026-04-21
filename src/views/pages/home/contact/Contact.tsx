import { useState } from 'react'
import { useScrollAnimation } from '@hooks'
import { usePageTranslation } from '@hooks/usePageTranslation'
import { translations } from './contact.i18n'
import type { ContactInfoItem } from '@models/home/contact/ContactModel'
import {
  Box,
  Typography,
  Paper,
  Button,
  Chip,
} from '@mui/material'
import Grid from '@mui/material/Grid'
import EmailIcon from '@mui/icons-material/Email'
import GitHubIcon from '@mui/icons-material/GitHub'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import PublicIcon from '@mui/icons-material/Public'
import WorkOutlineIcon from '@mui/icons-material/WorkOutline'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import FavoriteIcon from '@mui/icons-material/Favorite'
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead'
import ContactMailIcon from '@mui/icons-material/ContactMail'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'

const Contact = () => {
  const { t } = usePageTranslation(translations)
  const { ref, isVisible } = useScrollAnimation<HTMLElement>({ threshold: 0.1 })
  const [copied, setCopied] = useState(false)

  const emailAddress = t('emailValue')

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(emailAddress)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      /* 클립보드 접근 실패 시 무시 */
    }
  }

  // 연락 가능한 채널 (클릭 가능한 링크)
  const contactInfo: ContactInfoItem[] = [
    {
      icon: <EmailIcon sx={{ fontSize: 20 }} />,
      label: t('emailLabel'),
      value: emailAddress,
      href: `mailto:${emailAddress}`,
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

  // 추가 프로필 정보 (표시 전용 배지)
  const profileMeta = [
    { icon: <CheckCircleIcon sx={{ fontSize: 16 }} />, label: t('availableLabel'),      value: t('availableValue'),        color: '#10b981' },
    { icon: <MarkEmailReadIcon sx={{ fontSize: 16 }} />, label: t('responseTimeLabel'), value: t('responseTimeValue') },
    { icon: <WorkOutlineIcon sx={{ fontSize: 16 }} />, label: t('careerLabel'),         value: t('careerValue') },
    { icon: <PublicIcon sx={{ fontSize: 16 }} />, label: t('timezoneLabel'),            value: t('timezoneValue') },
    { icon: <AccessTimeIcon sx={{ fontSize: 16 }} />, label: t('workingHoursLabel'),    value: t('workingHoursValue') },
    { icon: <ContactMailIcon sx={{ fontSize: 16 }} />, label: t('preferredContactLabel'), value: t('preferredContactValue') },
  ]

  const interests = t('interestsValue').split('·').map(s => s.trim())

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
          {/* ── Left: 연락처 정보 + 팔로우 ────────────────────────────── */}
          <Grid size={{ xs: 12, lg: 6 }}>
            <Typography variant="h6" fontWeight={700} mb={3}>
              {t('infoTitle')}
            </Typography>

            {/* 주요 연락 채널 */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mb: 3 }}>
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
                    '&:hover': info.href ? { borderColor: 'primary.main', transform: 'translateX(4px)' } : {},
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
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography variant="caption" color="text.secondary" display="block">{info.label}</Typography>
                    <Typography variant="body2" fontWeight={500} sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {info.value}
                    </Typography>
                  </Box>
                  {info.label === t('emailLabel') && (
                    <Button
                      size="small"
                      onClick={(e) => { e.stopPropagation(); handleCopyEmail() }}
                      startIcon={copied ? <CheckCircleIcon sx={{ fontSize: 14 }} /> : <ContentCopyIcon sx={{ fontSize: 14 }} />}
                      sx={{
                        flexShrink: 0,
                        minWidth: 'auto',
                        fontSize: '0.7rem',
                        color: copied ? '#10b981' : 'text.secondary',
                        borderColor: copied ? '#10b981' : 'divider',
                        '&:hover': { borderColor: 'primary.main', color: 'primary.main' },
                      }}
                      variant="outlined"
                    >
                      {copied ? t('copied') : t('copyEmail')}
                    </Button>
                  )}
                </Paper>
              ))}
            </Box>

            {/* Social Links */}
            <Typography variant="caption" color="text.secondary" mb={1.5} display="block" sx={{ fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              {t('followMe')}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1.5 }}>
              {[
                { name: 'GitHub', href: 'https://github.com/SeungHyun1207', icon: <GitHubIcon sx={{ fontSize: 16 }} /> },
              ].map((social) => (
                <Button
                  key={social.name}
                  component="a"
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outlined"
                  size="small"
                  startIcon={social.icon}
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
          </Grid>

          {/* ── Right: Profile + 관심 분야 ────────────────────────────── */}
          <Grid size={{ xs: 12, lg: 6 }}>
            <Typography variant="h6" fontWeight={700} mb={3}>
              Profile
            </Typography>

            {/* 프로필 메타 정보 */}
            <Paper
              elevation={0}
              sx={{
                p: 2,
                mb: 3,
                borderRadius: 3,
                border: '1px solid',
                borderColor: 'divider',
                bgcolor: 'background.default',
                display: 'flex',
                flexDirection: 'column',
                gap: 1.2,
              }}
            >
              {profileMeta.map((item, i) => (
                <Box
                  key={i}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5,
                    pb: i < profileMeta.length - 1 ? 1.2 : 0,
                    borderBottom: i < profileMeta.length - 1 ? '1px solid' : 'none',
                    borderColor: 'divider',
                  }}
                >
                  <Box sx={{ color: item.color ?? 'primary.main', display: 'flex', flexShrink: 0 }}>
                    {item.icon}
                  </Box>
                  <Typography variant="caption" color="text.secondary" sx={{ minWidth: 88 }}>
                    {item.label}
                  </Typography>
                  <Typography variant="body2" fontWeight={500} sx={{ color: item.color ?? 'text.primary' }}>
                    {item.value}
                  </Typography>
                </Box>
              ))}
            </Paper>

            {/* 관심 분야 태그 */}
            <Typography variant="caption" color="text.secondary" mb={1.5} display="block" sx={{ fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              <FavoriteIcon sx={{ fontSize: 12, mr: 0.5, verticalAlign: 'middle', color: '#ef4444' }} />
              {t('interestsLabel')}
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.8 }}>
              {interests.map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  size="small"
                  sx={{
                    fontSize: '0.72rem',
                    fontWeight: 500,
                    color: 'primary.main',
                    bgcolor: 'rgba(99,102,241,0.08)',
                    border: '1px solid',
                    borderColor: 'rgba(99,102,241,0.2)',
                  }}
                />
              ))}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export default Contact
