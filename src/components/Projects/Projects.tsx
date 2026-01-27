import { useState } from 'react'
import { useScrollAnimation } from '@hooks'
import { cn } from '@utils'

interface Project {
  id: string
  title: string
  description: string
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
  const { ref, isVisible } = useScrollAnimation<HTMLElement>({ threshold: 0.1 })
  const [activeFilter, setActiveFilter] = useState<'all' | 'web' | 'mobile' | 'other'>('all')

  const projects: Project[] = [
    {
      id: '1',
      title: 'E-Commerce Platform',
      description: '현대적인 UI/UX를 갖춘 풀스택 이커머스 플랫폼. 결제 시스템, 장바구니, 주문 관리 기능을 포함합니다.',
      techStack: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
      category: 'web',
      demoUrl: '#',
      githubUrl: '#',
    },
    {
      id: '2',
      title: 'Task Management App',
      description: '팀 협업을 위한 태스크 관리 애플리케이션. 실시간 동기화와 드래그 앤 드롭 기능을 지원합니다.',
      techStack: ['Next.js', 'Tailwind CSS', 'Prisma', 'Socket.io'],
      category: 'web',
      demoUrl: '#',
      githubUrl: '#',
    },
    {
      id: '3',
      title: 'Weather Dashboard',
      description: '날씨 정보를 시각적으로 보여주는 대시보드. 다양한 차트와 지도 기능을 포함합니다.',
      techStack: ['React', 'D3.js', 'OpenWeather API', 'Styled Components'],
      category: 'web',
      demoUrl: '#',
      githubUrl: '#',
    },
    {
      id: '4',
      title: 'Fitness Tracker',
      description: '운동 기록과 건강 데이터를 추적하는 모바일 앱. 목표 설정과 진행 상황 시각화 기능을 제공합니다.',
      techStack: ['React Native', 'TypeScript', 'Firebase', 'Redux'],
      category: 'mobile',
      demoUrl: '#',
      githubUrl: '#',
    },
    {
      id: '5',
      title: 'Portfolio Generator',
      description: '개발자를 위한 포트폴리오 자동 생성 도구. GitHub 데이터를 기반으로 포트폴리오를 생성합니다.',
      techStack: ['Vue.js', 'GitHub API', 'Vercel', 'TailwindCSS'],
      category: 'other',
      demoUrl: '#',
      githubUrl: '#',
    },
    {
      id: '6',
      title: 'Real-time Chat App',
      description: '실시간 채팅 애플리케이션. 1:1 채팅, 그룹 채팅, 파일 공유 기능을 지원합니다.',
      techStack: ['React', 'Socket.io', 'Express', 'MongoDB'],
      category: 'web',
      demoUrl: '#',
      githubUrl: '#',
    },
  ]

  const filters = [
    { label: 'All', value: 'all' as const },
    { label: 'Web', value: 'web' as const },
    { label: 'Mobile', value: 'mobile' as const },
    { label: 'Other', value: 'other' as const },
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
            Portfolio
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-6">
            주요 <span className="gradient-text">프로젝트</span>
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            다양한 기술 스택을 활용하여 구현한 프로젝트들입니다
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
              {filter.label}
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
                  {project.title}
                </h3>
                <p className="text-text-secondary text-sm mb-4 line-clamp-2">
                  {project.description}
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
