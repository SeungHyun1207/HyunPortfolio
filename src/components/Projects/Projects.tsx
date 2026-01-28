import { useState } from 'react'
import { useScrollAnimation } from '@hooks'
import { useSettings } from '@/contexts/SettingsContext'
import { cn } from '@utils'

interface Project {
  id: string
  titleKey: string
  descKey: string
  techStack: string[]
  category: 'web' | 'mobile' | 'other'
  demoUrl?: string
  githubUrl?: string
  thumbnail?: string
}

/**
 * Projects 섹션 컴포넌트
 */
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
      techStack: ['Next.js', 'Tailwind CSS', 'Prisma', 'Socket.io'],
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
      techStack: ['Vue.js', 'GitHub API', 'Vercel', 'TailwindCSS'],
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
    <section id="projects" ref={ref} className="py-20 md:py-32 bg-secondary">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        {/* Header */}
        <div
          className={cn(
            'text-center mb-12',
            'transition-all duration-700',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
          )}
        >
          <span className="text-accent text-sm font-medium uppercase tracking-wider">
            {t('projects.label')}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-6">
            {t('projects.title1')} <span className="gradient-text">{t('projects.title2')}</span>
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            {t('projects.description')}
          </p>
        </div>

        {/* Filter Buttons */}
        <div
          className={cn(
            'flex justify-center gap-2 mb-12',
            'transition-all duration-700 delay-100',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
          )}
        >
          {filters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setActiveFilter(filter.value)}
              className={cn(
                'px-4 py-2 rounded-lg text-sm font-medium',
                'transition-all duration-300',
                activeFilter === filter.value
                  ? 'bg-accent text-white'
                  : 'bg-tertiary text-text-secondary hover:text-text-primary hover:bg-tertiary/80',
              )}
            >
              {t(filter.labelKey)}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div
          className={cn(
            'grid md:grid-cols-2 lg:grid-cols-3 gap-6',
            'transition-all duration-700 delay-200',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
          )}
        >
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className={cn(
                'group relative rounded-xl overflow-hidden',
                'bg-tertiary border border-border',
                'transition-all duration-300',
                'hover:border-accent/50 hover:-translate-y-1',
                'hover:shadow-xl hover:shadow-accent/10',
              )}
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              {/* Thumbnail Placeholder */}
              <div className="aspect-video bg-primary/50 flex items-center justify-center">
                <div className="text-4xl opacity-30">
                  {project.category === 'web' ? '🌐' : project.category === 'mobile' ? '📱' : '🔧'}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 group-hover:text-accent transition-colors">
                  {t(project.titleKey)}
                </h3>
                <p className="text-text-secondary text-sm mb-4 line-clamp-2">
                  {t(project.descKey)}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 text-xs rounded-md bg-primary text-text-muted"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-3">
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        'flex items-center gap-1 text-sm',
                        'text-text-secondary hover:text-accent',
                        'transition-colors',
                      )}
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                      Demo
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        'flex items-center gap-1 text-sm',
                        'text-text-secondary hover:text-accent',
                        'transition-colors',
                      )}
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                      </svg>
                      GitHub
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
