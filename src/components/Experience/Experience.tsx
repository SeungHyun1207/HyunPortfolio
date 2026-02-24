import { Box, Container, Typography, Grid, Chip } from '@mui/material'
import { useScrollAnimation } from '@hooks'
import { useSettings } from '@/contexts/SettingsContext'

interface ExperienceItem {
  id: string
  type: 'work' | 'education'
  titleKey: string
  organizationKey: string
  periodKey: string
  descriptionKeys: string[]
  techStack?: string[]
}

const Experience = () => {
  const { t } = useSettings()
  const { ref, isVisible } = useScrollAnimation<HTMLElement>({ threshold: 0.1 })

  const experiences: ExperienceItem[] = [
    {
      id: '1',
      type: 'work',
      titleKey: 'experience.work1.title',
      organizationKey: 'experience.work1.org',
      periodKey: 'experience.work1.period',
      descriptionKeys: [
        'experience.work1.desc1',
        'experience.work1.desc2',
        'experience.work1.desc3',
        'experience.work1.desc4',
      ],
      techStack: ['React', 'TypeScript', 'Next.js', 'MUI'],
    },
    {
      id: '2',
      type: 'work',
      titleKey: 'experience.work2.title',
      organizationKey: 'experience.work2.org',
      periodKey: 'experience.work2.period',
      descriptionKeys: [
        'experience.work2.desc1',
        'experience.work2.desc2',
        'experience.work2.desc3',
        'experience.work2.desc4',
      ],
      techStack: ['React', 'Redux', 'Styled Components', 'Node.js'],
    },
    {
      id: '3',
      type: 'education',
      titleKey: 'experience.edu1.title',
      organizationKey: 'experience.edu1.org',
      periodKey: 'experience.edu1.period',
      descriptionKeys: [
        'experience.edu1.desc1',
        'experience.edu1.desc2',
        'experience.edu1.desc3',
      ],
    },
  ]

  const certifications = [
    { nameKey: 'experience.cert1.name', orgKey: 'experience.cert1.org', year: '2020' },
    { nameKey: 'experience.cert2.name', orgKey: 'experience.cert2.org', year: '2022' },
  ]

  const workExperiences = experiences.filter((e) => e.type === 'work')
  const educationExperiences = experiences.filter((e) => e.type === 'education')

  const SectionTitle = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 4 }}>
      <Box
        sx={{
          p: 1,
          borderRadius: 1.5,
          bgcolor: 'rgba(99,102,241,0.1)',
          color: 'primary.main',
          display: 'flex',
        }}
      >
        {icon}
      </Box>
      <Typography variant="h6" sx={{ fontWeight: 700 }}>{label}</Typography>
    </Box>
  )

  const TimelineItem = ({ exp }: { exp: ExperienceItem }) => (
    <Box sx={{ position: 'relative', pl: 4, mb: 4, '&:last-child': { mb: 0 } }}>
      {/* Timeline dot */}
      <Box
        sx={{
          position: 'absolute',
          left: 0,
          top: 8,
          width: 16,
          height: 16,
          borderRadius: '50%',
          bgcolor: 'primary.main',
          border: '4px solid',
          borderColor: 'background.default',
          zIndex: 1,
        }}
      />
      <Box
        sx={{
          p: 3,
          borderRadius: 3,
          bgcolor: 'background.paper',
          border: '1px solid',
          borderColor: 'divider',
          transition: 'border-color 0.3s ease',
          '&:hover': { borderColor: 'rgba(99,102,241,0.5)' },
        }}
      >
        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 1, mb: 1 }}>
          <Typography variant="body1" sx={{ fontWeight: 700 }}>{t(exp.titleKey)}</Typography>
          <Chip
            label={t(exp.periodKey)}
            size="small"
            sx={{
              fontSize: '0.7rem',
              bgcolor: 'rgba(99,102,241,0.1)',
              color: 'primary.main',
              border: 'none',
            }}
          />
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {t(exp.organizationKey)}
        </Typography>
        <Box component="ul" sx={{ pl: 0, m: 0, listStyle: 'none', mb: exp.techStack ? 2 : 0 }}>
          {exp.descriptionKeys.map((descKey, i) => (
            <Box
              key={i}
              component="li"
              sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, mb: 0.75 }}
            >
              <Typography color="primary" sx={{ mt: 0.3, lineHeight: 1 }}>•</Typography>
              <Typography variant="body2" color="text.secondary">{t(descKey)}</Typography>
            </Box>
          ))}
        </Box>
        {exp.techStack && (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
            {exp.techStack.map((tech) => (
              <Chip
                key={tech}
                label={tech}
                size="small"
                sx={{
                  fontSize: '0.7rem',
                  bgcolor: 'background.default',
                  border: '1px solid',
                  borderColor: 'divider',
                }}
              />
            ))}
          </Box>
        )}
      </Box>
    </Box>
  )

  return (
    <Box
      component="section"
      id="experience"
      ref={ref}
      sx={{ py: { xs: 10, md: 16 } }}
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
            {t('experience.label')}
          </Typography>
          <Typography
            variant="h3"
            sx={{ fontWeight: 700, mt: 2, mb: 3, fontSize: { xs: '1.75rem', md: '2.25rem', lg: '2.75rem' } }}
          >
            {t('experience.title1')}{' '}
            <Box component="span" className="gradient-text">{t('experience.title2')}</Box>
          </Typography>
          <Typography color="text.secondary" sx={{ maxWidth: 672, mx: 'auto' }}>
            {t('experience.description')}
          </Typography>
        </Box>

        <Grid container spacing={6}>
          {/* Work Experience */}
          <Grid
            size={{ xs: 12, lg: 6 }}
            sx={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(32px)',
              transition: 'opacity 0.7s ease, transform 0.7s ease',
              transitionDelay: '100ms',
            }}
          >
            <SectionTitle
              icon={
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                </svg>
              }
              label={t('experience.workTitle')}
            />
            <Box sx={{ position: 'relative' }}>
              {/* Timeline line */}
              <Box
                sx={{
                  position: 'absolute',
                  left: 7,
                  top: 8,
                  bottom: 8,
                  width: 2,
                  bgcolor: 'divider',
                }}
              />
              {workExperiences.map((exp) => (
                <TimelineItem key={exp.id} exp={exp} />
              ))}
            </Box>
          </Grid>

          {/* Education & Certifications */}
          <Grid
            size={{ xs: 12, lg: 6 }}
            sx={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(32px)',
              transition: 'opacity 0.7s ease, transform 0.7s ease',
              transitionDelay: '200ms',
            }}
          >
            <SectionTitle
              icon={
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                  <path d="M6 12v5c3 3 9 3 12 0v-5" />
                </svg>
              }
              label={t('experience.eduTitle')}
            />
            <Box sx={{ position: 'relative', mb: 6 }}>
              <Box
                sx={{
                  position: 'absolute',
                  left: 7,
                  top: 8,
                  bottom: 8,
                  width: 2,
                  bgcolor: 'divider',
                }}
              />
              {educationExperiences.map((exp) => (
                <TimelineItem key={exp.id} exp={exp} />
              ))}
            </Box>

            {/* Certifications */}
            <SectionTitle
              icon={
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="8" r="7" />
                  <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
                </svg>
              }
              label={t('experience.certTitle')}
            />
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {certifications.map((cert, index) => (
                <Box
                  key={index}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    p: 2,
                    borderRadius: 2,
                    bgcolor: 'background.paper',
                    border: '1px solid',
                    borderColor: 'divider',
                    transition: 'border-color 0.3s ease',
                    '&:hover': { borderColor: 'rgba(99,102,241,0.5)' },
                  }}
                >
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>{t(cert.nameKey)}</Typography>
                    <Typography variant="caption" color="text.secondary">{t(cert.orgKey)}</Typography>
                  </Box>
                  <Typography variant="body2" color="primary">{cert.year}</Typography>
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default Experience
