import { useState } from 'react'
import { Box, Container, Typography, Grid, Button, Chip } from '@mui/material'
import { useScrollAnimation } from '@hooks'
import { useSettings } from '@/contexts/SettingsContext'

interface Project {
  id: string
  titleKey: string
  descKey: string
  techStack: string[]
  category: 'web' | 'mobile' | 'other'
  demoUrl?: string
  githubUrl?: string
}

const Projects = () => {
  const { t } = useSettings()
  const { ref, isVisible } = useScrollAnimation<HTMLElement>({ threshold: 0.1 })
  const [activeFilter, setActiveFilter] = useState<'all' | 'web' | 'mobile' | 'other'>('all')

  const projects: Project[] = [
    {
      id: '1',
      titleKey: 'projects.ecommerce.title',
      descKey: 'projects.ecommerce.desc',
      techStack: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
      category: 'web',
      demoUrl: '#',
      githubUrl: '#',
    },
    {
      id: '2',
      titleKey: 'projects.taskManagement.title',
      descKey: 'projects.taskManagement.desc',
      techStack: ['Next.js', 'MUI', 'Prisma', 'Socket.io'],
      category: 'web',
      demoUrl: '#',
      githubUrl: '#',
    },
    {
      id: '3',
      titleKey: 'projects.weather.title',
      descKey: 'projects.weather.desc',
      techStack: ['React', 'D3.js', 'OpenWeather API', 'Styled Components'],
      category: 'web',
      demoUrl: '#',
      githubUrl: '#',
    },
    {
      id: '4',
      titleKey: 'projects.fitness.title',
      descKey: 'projects.fitness.desc',
      techStack: ['React Native', 'TypeScript', 'Firebase', 'Redux'],
      category: 'mobile',
      demoUrl: '#',
      githubUrl: '#',
    },
    {
      id: '5',
      titleKey: 'projects.portfolio.title',
      descKey: 'projects.portfolio.desc',
      techStack: ['Vue.js', 'GitHub API', 'Vercel', 'MUI'],
      category: 'other',
      demoUrl: '#',
      githubUrl: '#',
    },
    {
      id: '6',
      titleKey: 'projects.chat.title',
      descKey: 'projects.chat.desc',
      techStack: ['React', 'Socket.io', 'Express', 'MongoDB'],
      category: 'web',
      demoUrl: '#',
      githubUrl: '#',
    },
  ]

  const filters = [
    { labelKey: 'projects.filterAll', value: 'all' as const },
    { labelKey: 'projects.filterWeb', value: 'web' as const },
    { labelKey: 'projects.filterMobile', value: 'mobile' as const },
    { labelKey: 'projects.filterOther', value: 'other' as const },
  ]

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter((p) => p.category === activeFilter)

  return (
    <Box
      component="section"
      id="projects"
      ref={ref}
      sx={{ py: { xs: 10, md: 16 }, bgcolor: 'background.paper' }}
    >
      <Container maxWidth="lg">
        {/* Header */}
        <Box
          sx={{
            textAlign: 'center',
            mb: 6,
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(32px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}
        >
          <Typography
            color="primary"
            sx={{ fontSize: '0.875rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: 3 }}
          >
            {t('projects.label')}
          </Typography>
          <Typography
            variant="h3"
            sx={{ fontWeight: 700, mt: 2, mb: 3, fontSize: { xs: '1.75rem', md: '2.25rem', lg: '2.75rem' } }}
          >
            {t('projects.title1')}{' '}
            <Box component="span" className="gradient-text">{t('projects.title2')}</Box>
          </Typography>
          <Typography color="text.secondary" sx={{ maxWidth: 672, mx: 'auto' }}>
            {t('projects.description')}
          </Typography>
        </Box>

        {/* Filter Buttons */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: 1,
            mb: 6,
            flexWrap: 'wrap',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(32px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
            transitionDelay: '100ms',
          }}
        >
          {filters.map((filter) => (
            <Button
              key={filter.value}
              onClick={() => setActiveFilter(filter.value)}
              variant={activeFilter === filter.value ? 'contained' : 'outlined'}
              size="small"
              sx={{
                borderRadius: 2,
                fontSize: '0.875rem',
                fontWeight: 500,
                transition: 'all 0.3s ease',
                ...(activeFilter === filter.value
                  ? {
                      background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
                      border: 'none',
                    }
                  : {
                      borderColor: 'divider',
                      color: 'text.secondary',
                      '&:hover': { borderColor: 'primary.main', color: 'text.primary' },
                    }),
              }}
            >
              {t(filter.labelKey)}
            </Button>
          ))}
        </Box>

        {/* Projects Grid */}
        <Grid
          container
          spacing={3}
          sx={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(32px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
            transitionDelay: '200ms',
          }}
        >
          {filteredProjects.map((project, index) => (
            <Grid key={project.id} size={{ xs: 12, md: 6, lg: 4 }}>
              <Box
                sx={{
                  borderRadius: 3,
                  overflow: 'hidden',
                  bgcolor: 'background.default',
                  border: '1px solid',
                  borderColor: 'divider',
                  transition: 'all 0.3s ease',
                  transitionDelay: `${index * 50}ms`,
                  '&:hover': {
                    borderColor: 'rgba(99,102,241,0.5)',
                    transform: 'translateY(-4px)',
                    boxShadow: '0 20px 40px rgba(99,102,241,0.1)',
                  },
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {/* Thumbnail */}
                <Box
                  sx={{
                    aspectRatio: '16/9',
                    bgcolor: 'rgba(99,102,241,0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Typography sx={{ fontSize: '2.5rem', opacity: 0.3 }}>
                    {project.category === 'web' ? '🌐' : project.category === 'mobile' ? '📱' : '🔧'}
                  </Typography>
                </Box>

                {/* Content */}
                <Box sx={{ p: 3, flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      mb: 1,
                      transition: 'color 0.3s ease',
                      '&:hover': { color: 'primary.main' },
                    }}
                  >
                    {t(project.titleKey)}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      mb: 2,
                      overflow: 'hidden',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                    }}
                  >
                    {t(project.descKey)}
                  </Typography>

                  {/* Tech Stack */}
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75, mb: 2 }}>
                    {project.techStack.map((tech) => (
                      <Chip
                        key={tech}
                        label={tech}
                        size="small"
                        sx={{
                          fontSize: '0.7rem',
                          bgcolor: 'background.paper',
                          border: '1px solid',
                          borderColor: 'divider',
                        }}
                      />
                    ))}
                  </Box>

                  {/* Links */}
                  <Box sx={{ display: 'flex', gap: 2, mt: 'auto' }}>
                    {project.demoUrl && (
                      <Typography
                        component="a"
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="body2"
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 0.5,
                          color: 'text.secondary',
                          textDecoration: 'none',
                          transition: 'color 0.3s ease',
                          '&:hover': { color: 'primary.main' },
                        }}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                          <polyline points="15 3 21 3 21 9" />
                          <line x1="10" y1="14" x2="21" y2="3" />
                        </svg>
                        Demo
                      </Typography>
                    )}
                    {project.githubUrl && (
                      <Typography
                        component="a"
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="body2"
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 0.5,
                          color: 'text.secondary',
                          textDecoration: 'none',
                          transition: 'color 0.3s ease',
                          '&:hover': { color: 'primary.main' },
                        }}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                        </svg>
                        GitHub
                      </Typography>
                    )}
                  </Box>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}

export default Projects
