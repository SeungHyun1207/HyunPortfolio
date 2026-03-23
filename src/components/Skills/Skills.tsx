import { useScrollAnimation } from '@hooks'
import { useSettings } from '@/contexts/SettingsContext'
import {
  Box,
  Typography,
  Paper,
  LinearProgress,
  Chip,
} from '@mui/material'
import Grid from '@mui/material/Grid'

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
    { name: 'Tailwind CSS', level: 85, category: 'frontend' },
    { name: 'Node.js', level: 70, category: 'backend' },
    { name: 'Git', level: 85, category: 'tools' },
    { name: 'Figma', level: 75, category: 'tools' },
  ]

  const techStack = [
    { name: 'React', icon: '⚛️' },
    { name: 'TypeScript', icon: '🔷' },
    { name: 'Next.js', icon: '▲' },
    { name: 'Vite', icon: '⚡' },
    { name: 'Tailwind CSS', icon: '🎨' },
    { name: 'Zustand', icon: '🐻' },
    { name: 'React Query', icon: '🔄' },
    { name: 'Framer Motion', icon: '✨' },
  ]

  return (
    <Box
      component="section"
      id="skills"
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
            {t('skills.label')}
          </Typography>
          <Typography
            variant="h2"
            sx={{ fontSize: { xs: '1.875rem', md: '2.25rem', lg: '3rem' }, fontWeight: 700, mt: 1, mb: 2 }}
          >
            {t('skills.title1')}{' '}
            <Box component="span" className="gradient-text">{t('skills.title2')}</Box>
          </Typography>
          <Typography color="text.secondary" sx={{ maxWidth: 512, mx: 'auto' }}>
            {t('skills.description')}
          </Typography>
        </Box>

        {/* Content */}
        <Box
          sx={{
            transition: 'all 0.7s ease',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(32px)',
            transitionDelay: '200ms',
          }}
        >
          {/* Skills Grid */}
          <Grid container spacing={2} sx={{ mb: 6 }}>
            {skills.map((skill, index) => (
              <Grid size={{ xs: 12, md: 6, lg: 4 }} key={skill.name}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    borderRadius: 3,
                    border: '1px solid',
                    borderColor: 'divider',
                    '&:hover': { borderColor: 'primary.main', opacity: 0.85 },
                    transition: 'all 0.3s ease',
                    transitionDelay: `${index * 50}ms`,
                    bgcolor: 'background.paper',
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography variant="body2" fontWeight={500}>{skill.name}</Typography>
                    <Typography variant="body2" fontWeight={500} color="primary.main">{skill.level}%</Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={isVisible ? skill.level : 0}
                    sx={{
                      bgcolor: 'background.default',
                      '& .MuiLinearProgress-bar': {
                        background: 'linear-gradient(90deg, #6366f1, #a855f7)',
                        borderRadius: 4,
                        transition: 'transform 1s ease-out',
                        transitionDelay: `${index * 100 + 300}ms`,
                      },
                    }}
                  />
                </Paper>
              </Grid>
            ))}
          </Grid>

          {/* Tech Stack */}
          <Box sx={{ mb: 6 }}>
            <Typography variant="h6" fontWeight={600} textAlign="center" mb={3}>
              {t('skills.mainTech')}
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 1.5 }}>
              {techStack.map((tech, index) => (
                <Chip
                  key={tech.name}
                  label={`${tech.icon} ${tech.name}`}
                  variant="outlined"
                  sx={{
                    borderColor: 'divider',
                    color: 'text.secondary',
                    fontSize: '0.875rem',
                    transitionDelay: `${index * 50}ms`,
                    '&:hover': {
                      borderColor: 'primary.main',
                      transform: 'scale(1.05)',
                    },
                    transition: 'all 0.3s ease',
                    bgcolor: 'background.paper',
                  }}
                />
              ))}
            </Box>
          </Box>

          {/* Code Block */}
          <Paper
            elevation={0}
            sx={{
              maxWidth: 512,
              mx: 'auto',
              borderRadius: 3,
              overflow: 'hidden',
              border: '1px solid',
              borderColor: 'divider',
              bgcolor: 'background.paper',
            }}
          >
            {/* Code Header */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                px: 2,
                py: 1.5,
                bgcolor: 'background.default',
                borderBottom: '1px solid',
                borderColor: 'divider',
              }}
            >
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#f87171', opacity: 0.8 }} />
                <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#facc15', opacity: 0.8 }} />
                <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#4ade80', opacity: 0.8 }} />
              </Box>
              <Typography variant="caption" color="text.secondary" sx={{ ml: 0.5 }}>developer.ts</Typography>
            </Box>
            {/* Code Content */}
            <Box
              component="pre"
              sx={{
                p: 2,
                fontSize: '0.875rem',
                fontFamily: "'Fira Code', monospace",
                overflowX: 'auto',
                m: 0,
                color: 'text.primary',
              }}
            >
              <code>
                <span style={{ color: '#a855f7' }}>const</span>{' '}
                <span style={{ color: '#60a5fa' }}>developer</span>{' '}
                <span>=</span> {'{'}
                {'\n'}
                {'  '}<span style={{ color: '#4ade80' }}>name</span>:{' '}
                <span style={{ color: '#facc15' }}>"SeungHyun"</span>,{'\n'}
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
          </Paper>
        </Box>
      </Box>
    </Box>
  )
}

export default Skills
