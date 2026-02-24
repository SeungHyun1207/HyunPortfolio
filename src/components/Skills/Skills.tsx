import { Box, Container, Typography, Grid, Chip } from '@mui/material'
import { useScrollAnimation } from '@hooks'
import { useSettings } from '@/contexts/SettingsContext'

interface Skill {
  name: string
  level: number
  category: string
}

const Skills = () => {
  const { t } = useSettings()
  const { ref, isVisible } = useScrollAnimation<HTMLElement>({ threshold: 0.2 })

  const skills: Skill[] = [
    { name: 'React', level: 90, category: 'frontend' },
    { name: 'TypeScript', level: 85, category: 'frontend' },
    { name: 'JavaScript', level: 95, category: 'frontend' },
    { name: 'Next.js', level: 80, category: 'frontend' },
    { name: 'HTML/CSS', level: 95, category: 'frontend' },
    { name: 'MUI', level: 85, category: 'frontend' },
    { name: 'Node.js', level: 70, category: 'backend' },
    { name: 'Git', level: 85, category: 'tools' },
    { name: 'Figma', level: 75, category: 'tools' },
  ]

  const techStack = [
    { name: 'React', icon: '⚛️' },
    { name: 'TypeScript', icon: '🔷' },
    { name: 'Next.js', icon: '▲' },
    { name: 'Vite', icon: '⚡' },
    { name: 'MUI', icon: '🎨' },
    { name: 'Zustand', icon: '🐻' },
    { name: 'React Query', icon: '🔄' },
    { name: 'Framer Motion', icon: '✨' },
  ]

  return (
    <Box
      component="section"
      id="skills"
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
            {t('skills.label')}
          </Typography>
          <Typography
            variant="h3"
            sx={{ fontWeight: 700, mt: 2, mb: 3, fontSize: { xs: '1.75rem', md: '2.25rem', lg: '2.75rem' } }}
          >
            {t('skills.title1')}{' '}
            <Box component="span" className="gradient-text">{t('skills.title2')}</Box>
          </Typography>
          <Typography color="text.secondary" sx={{ maxWidth: 672, mx: 'auto' }}>
            {t('skills.description')}
          </Typography>
        </Box>

        {/* Content */}
        <Box
          sx={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(32px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
            transitionDelay: '200ms',
          }}
        >
          {/* Skills Grid */}
          <Grid container spacing={2} sx={{ mb: 6 }}>
            {skills.map((skill, index) => (
              <Grid key={skill.name} size={{ xs: 12, md: 6, lg: 4 }}>
                <Box
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    bgcolor: 'background.paper',
                    border: '1px solid',
                    borderColor: 'divider',
                    transition: 'border-color 0.3s ease',
                    transitionDelay: `${index * 50}ms`,
                    '&:hover': { borderColor: 'rgba(99,102,241,0.5)' },
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>{skill.name}</Typography>
                    <Typography variant="body2" color="primary" sx={{ fontWeight: 500 }}>{skill.level}%</Typography>
                  </Box>
                  <Box
                    sx={{
                      height: 8,
                      bgcolor: 'background.default',
                      borderRadius: 4,
                      overflow: 'hidden',
                    }}
                  >
                    <Box
                      sx={{
                        height: '100%',
                        borderRadius: 4,
                        background: 'linear-gradient(90deg, #6366f1, #a855f7)',
                        width: isVisible ? `${skill.level}%` : '0%',
                        transition: 'width 1s ease-out',
                        transitionDelay: `${index * 100 + 300}ms`,
                      }}
                    />
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>

          {/* Tech Stack */}
          <Box sx={{ mb: 6 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, textAlign: 'center', mb: 3 }}>
              {t('skills.mainTech')}
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 1.5 }}>
              {techStack.map((tech, index) => (
                <Chip
                  key={tech.name}
                  icon={<span style={{ fontSize: '1.1rem', marginLeft: 8 }}>{tech.icon}</span>}
                  label={tech.name}
                  variant="outlined"
                  sx={{
                    borderColor: 'divider',
                    transitionDelay: `${index * 50}ms`,
                    '&:hover': {
                      borderColor: 'primary.main',
                      transform: 'scale(1.05)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                />
              ))}
            </Box>
          </Box>

          {/* Code Block */}
          <Box
            sx={{
              maxWidth: 672,
              mx: 'auto',
              borderRadius: 2,
              overflow: 'hidden',
              bgcolor: 'background.paper',
              border: '1px solid',
              borderColor: 'divider',
            }}
          >
            {/* Code Header */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                px: 2,
                py: 1.5,
                bgcolor: 'background.default',
                borderBottom: '1px solid',
                borderColor: 'divider',
              }}
            >
              <Box sx={{ display: 'flex', gap: 0.75 }}>
                <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: 'rgba(239,68,68,0.8)' }} />
                <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: 'rgba(234,179,8,0.8)' }} />
                <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: 'rgba(34,197,94,0.8)' }} />
              </Box>
              <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>developer.ts</Typography>
            </Box>
            {/* Code Content */}
            <Box
              component="pre"
              sx={{
                p: 2,
                fontSize: '0.875rem',
                fontFamily: 'monospace',
                overflowX: 'auto',
                m: 0,
              }}
            >
              <code>
                <span style={{ color: '#a855f7' }}>const</span>{' '}
                <span style={{ color: '#60a5fa' }}>developer</span>{' '}
                <span>=</span> {'{'}
                {'\n'}
                {'  '}<span style={{ color: '#4ade80' }}>name</span>:{' '}
                <span style={{ color: '#facc15' }}>"Hyun"</span>,{'\n'}
                {'  '}<span style={{ color: '#4ade80' }}>role</span>:{' '}
                <span style={{ color: '#facc15' }}>"Frontend Developer"</span>,{'\n'}
                {'  '}<span style={{ color: '#4ade80' }}>skills</span>:{' '}
                [<span style={{ color: '#facc15' }}>"React"</span>,{' '}
                <span style={{ color: '#facc15' }}>"TypeScript"</span>,{' '}
                <span style={{ color: '#facc15' }}>"Next.js"</span>],{'\n'}
                {'  '}<span style={{ color: '#4ade80' }}>passion</span>:{' '}
                <span style={{ color: '#facc15' }}>"Creating beautiful UIs"</span>,{'\n'}
                {'\n'}
                {'  '}<span style={{ color: '#60a5fa' }}>code</span>:{' '}
                <span style={{ color: '#a855f7' }}>{'() =>'}</span>{' '}
                <span style={{ color: '#facc15' }}>"Clean & Efficient"</span>,{'\n'}
                {'  '}<span style={{ color: '#60a5fa' }}>learn</span>:{' '}
                <span style={{ color: '#a855f7' }}>{'() =>'}</span>{' '}
                <span style={{ color: '#facc15' }}>"Never Stop"</span>,{'\n'}
                {'  '}<span style={{ color: '#60a5fa' }}>coffee</span>:{' '}
                <span style={{ color: '#a855f7' }}>{'() =>'}</span>{' '}
                <span style={{ color: '#facc15' }}>"Always ☕"</span>{'\n'}
                {'}'};
              </code>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default Skills
