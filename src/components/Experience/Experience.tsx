import { useScrollAnimation } from '@hooks'
import { useSettings } from '@/contexts/SettingsContext'
import { Box, Typography, Paper, Chip } from '@mui/material'
import Grid from '@mui/material/Grid'
import WorkIcon from '@mui/icons-material/Work'
import SchoolIcon from '@mui/icons-material/School'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import CelebrationIcon from '@mui/icons-material/Celebration'

interface ExperienceItem {
  id: string
  type: 'work' | 'education'
  titleKey: string
  organizationKey: string
  periodKey: string
  descriptionKeys: string[]
  techStack?: string[]
}

interface FestivalItem {
  nameKey: string
  orgKey: string
  yearKey: string
  descKey: string
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
      techStack: ['React', 'TypeScript', 'Java', 'JSP', 'QlikSense'],
    },
    {
      id: '2',
      type: 'education',
      titleKey: 'experience.edu2.title',
      organizationKey: 'experience.edu2.org',
      periodKey: 'experience.edu2.period',
      descriptionKeys: [
        'experience.edu2.desc1',
        'experience.edu2.desc2',
        'experience.edu2.desc3',
      ],
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
      ],
    },
  ]

  const festivals: FestivalItem[] = [
    {
      nameKey: 'experience.festival1.name',
      orgKey: 'experience.festival1.org',
      yearKey: 'experience.festival1.year',
      descKey: 'experience.festival1.desc',
    },
    {
      nameKey: 'experience.festival2.name',
      orgKey: 'experience.festival2.org',
      yearKey: 'experience.festival2.year',
      descKey: 'experience.festival2.desc',
    },
  ]

  const workExperiences = experiences.filter((e) => e.type === 'work')
  const educationExperiences = experiences.filter((e) => e.type === 'education')

  const SectionTitle = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
      <Box
        sx={{
          p: 1,
          borderRadius: 2,
          bgcolor: 'primary.main',
          color: '#fff',
          display: 'flex',
          opacity: 0.85,
        }}
      >
        {icon}
      </Box>
      <Typography variant="h6" fontWeight={700}>{label}</Typography>
    </Box>
  )

  const TimelineItem = ({ exp }: { exp: ExperienceItem }) => (
    <Box sx={{ position: 'relative', pl: 3, mb: 3, '&:last-child': { mb: 0 } }}>
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
          zIndex: 10,
        }}
      />
      <Paper
        elevation={0}
        sx={{
          p: 2.5,
          borderRadius: 3,
          border: '1px solid',
          borderColor: 'divider',
          '&:hover': { borderColor: 'primary.main', opacity: 0.9 },
          transition: 'all 0.3s ease',
          bgcolor: 'background.paper',
        }}
      >
        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'space-between', gap: 1, mb: 1 }}>
          <Typography variant="body2" fontWeight={700}>{t(exp.titleKey)}</Typography>
          <Chip
            label={t(exp.periodKey)}
            size="small"
            sx={{
              fontSize: '0.7rem',
              fontWeight: 500,
              color: 'primary.main',
              bgcolor: 'primary.main',
              opacity: 1,
              '& .MuiChip-label': { color: '#fff', px: 1 },
              background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
            }}
          />
        </Box>
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1.5 }}>
          {t(exp.organizationKey)}
        </Typography>
        <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0, mb: 1.5, display: 'flex', flexDirection: 'column', gap: 0.75 }}>
          {exp.descriptionKeys.map((descKey, i) => (
            <Box component="li" key={i} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
              <Box sx={{ color: 'primary.main', mt: 0.25, lineHeight: 1, flexShrink: 0 }}>•</Box>
              <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1.6 }}>{t(descKey)}</Typography>
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
                variant="outlined"
                sx={{ fontSize: '0.7rem', borderColor: 'divider', color: 'text.secondary', height: 20 }}
              />
            ))}
          </Box>
        )}
      </Paper>
    </Box>
  )

  return (
    <Box
      component="section"
      id="experience"
      ref={ref}
      sx={{ py: { xs: 10, md: 16 }, bgcolor: 'background.default' }}
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
            {t('experience.label')}
          </Typography>
          <Typography
            variant="h2"
            sx={{ fontSize: { xs: '1.875rem', md: '2.25rem', lg: '3rem' }, fontWeight: 700, mt: 1, mb: 2 }}
          >
            {t('experience.title1')}{' '}
            <Box component="span" className="gradient-text">{t('experience.title2')}</Box>
          </Typography>
          <Typography color="text.secondary" sx={{ maxWidth: 512, mx: 'auto' }}>
            {t('experience.description')}
          </Typography>
        </Box>

        <Grid container spacing={6}>
          {/* Work Experience */}
          <Grid
            size={{ xs: 12, lg: 6 }}
            sx={{
              transition: 'all 0.7s ease 100ms',
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(32px)',
            }}
          >
            <SectionTitle
              icon={<WorkIcon sx={{ fontSize: 20 }} />}
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

          {/* Education & Festivals */}
          <Grid
            size={{ xs: 12, lg: 6 }}
            sx={{
              transition: 'all 0.7s ease 200ms',
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(32px)',
            }}
          >
            <SectionTitle
              icon={<SchoolIcon sx={{ fontSize: 20 }} />}
              label={t('experience.eduTitle')}
            />
            <Box sx={{ position: 'relative', mb: 5 }}>
              <Box sx={{ position: 'absolute', left: 7, top: 8, bottom: 8, width: 2, bgcolor: 'divider' }} />
              {educationExperiences.map((exp) => (
                <TimelineItem key={exp.id} exp={exp} />
              ))}
            </Box>

            {/* Festivals / Events */}
            <SectionTitle
              icon={<CelebrationIcon sx={{ fontSize: 20 }} />}
              label={t('experience.festivalTitle')}
            />
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {festivals.map((festival, index) => (
                <Paper
                  key={index}
                  elevation={0}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    p: 2,
                    borderRadius: 3,
                    border: '1px solid',
                    borderColor: 'divider',
                    '&:hover': { borderColor: 'primary.main' },
                    transition: 'all 0.3s ease',
                    bgcolor: 'background.paper',
                    flexWrap: 'wrap',
                    gap: 1,
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Box
                      sx={{
                        p: 0.75,
                        borderRadius: 1.5,
                        bgcolor: 'primary.main',
                        color: '#fff',
                        display: 'flex',
                        opacity: 0.85,
                      }}
                    >
                      <EmojiEventsIcon sx={{ fontSize: 16 }} />
                    </Box>
                    <Box>
                      <Typography variant="body2" fontWeight={600}>{t(festival.nameKey)}</Typography>
                      <Typography variant="caption" color="text.secondary">{t(festival.descKey)}</Typography>
                    </Box>
                  </Box>
                  <Chip
                    label={t(festival.yearKey)}
                    size="small"
                    sx={{
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      color: 'primary.main',
                      '& .MuiChip-label': { color: 'inherit' },
                      bgcolor: 'transparent',
                      border: '1px solid',
                      borderColor: 'primary.main',
                    }}
                  />
                </Paper>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export default Experience
