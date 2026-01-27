import { useScrollAnimation } from '@hooks'
import { cn } from '@utils'

interface ExperienceItem {
  id: string
  type: 'work' | 'education'
  title: string
  organization: string
  period: string
  description: string[]
  techStack?: string[]
}

/**
 * Experience 섹션 컴포넌트
 * 경력 및 학력 사항
 */
const Experience = () => {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>({ threshold: 0.1 })

  const experiences: ExperienceItem[] = [
    {
      id: '1',
      type: 'work',
      title: 'Frontend Developer',
      organization: 'Tech Company',
      period: '2022.03 - Present',
      description: [
        'React, TypeScript를 활용한 대규모 웹 애플리케이션 개발',
        '성능 최적화를 통해 페이지 로딩 속도 40% 개선',
        'CI/CD 파이프라인 구축 및 자동화 테스트 도입',
        '주니어 개발자 멘토링 및 코드 리뷰 진행',
      ],
      techStack: ['React', 'TypeScript', 'Next.js', 'TailwindCSS'],
    },
    {
      id: '2',
      type: 'work',
      title: 'Web Developer',
      organization: 'Startup Inc.',
      period: '2020.06 - 2022.02',
      description: [
        '스타트업 초기 멤버로 서비스 런칭 참여',
        '반응형 웹 디자인 및 크로스 브라우저 호환성 구현',
        'RESTful API 연동 및 상태 관리 설계',
        '애자일 방법론 기반의 스프린트 개발 진행',
      ],
      techStack: ['React', 'Redux', 'Styled Components', 'Node.js'],
    },
    {
      id: '3',
      type: 'education',
      title: '컴퓨터공학과',
      organization: '서울대학교',
      period: '2016.03 - 2020.02',
      description: [
        '컴퓨터 과학 전공 학사 학위 취득',
        '알고리즘, 자료구조, 소프트웨어 공학 수강',
        '졸업 프로젝트: AI 기반 추천 시스템 개발',
      ],
    },
  ]

  const workExperiences = experiences.filter((e) => e.type === 'work')
  const educationExperiences = experiences.filter((e) => e.type === 'education')

  return (
    <section id="experience" ref={ref} className="py-20 md:py-32">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        {/* Header */}
        <div
          className={cn(
            'text-center mb-16',
            'transition-all duration-700',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
          )}
        >
          <span className="text-accent text-sm font-medium uppercase tracking-wider">
            Experience
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-6">
            경력 <span className="gradient-text">& 학력</span>
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            개발자로서 걸어온 길과 성장의 발자취입니다
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Work Experience */}
          <div
            className={cn(
              'transition-all duration-700 delay-100',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
            )}
          >
            <h3 className="flex items-center gap-2 text-xl font-bold mb-8">
              <span className="p-2 rounded-lg bg-accent/10 text-accent">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                </svg>
              </span>
              Work Experience
            </h3>

            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-border" />

              <div className="space-y-8">
                {workExperiences.map((exp) => (
                  <div key={exp.id} className="relative pl-8">
                    {/* Timeline Dot */}
                    <div className="absolute left-0 top-2 w-4 h-4 rounded-full bg-accent border-4 border-primary" />

                    <div
                      className={cn(
                        'p-6 rounded-xl',
                        'bg-secondary border border-border',
                        'transition-all duration-300',
                        'hover:border-accent/50',
                      )}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <h4 className="font-bold text-lg">{exp.title}</h4>
                        <span className="text-xs text-accent bg-accent/10 px-2 py-1 rounded">
                          {exp.period}
                        </span>
                      </div>
                      <p className="text-text-secondary mb-4">{exp.organization}</p>

                      <ul className="space-y-2 mb-4">
                        {exp.description.map((desc, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-text-secondary">
                            <span className="text-accent mt-1">•</span>
                            {desc}
                          </li>
                        ))}
                      </ul>

                      {exp.techStack && (
                        <div className="flex flex-wrap gap-2">
                          {exp.techStack.map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-1 text-xs rounded-md bg-tertiary text-text-muted"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Education */}
          <div
            className={cn(
              'transition-all duration-700 delay-200',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
            )}
          >
            <h3 className="flex items-center gap-2 text-xl font-bold mb-8">
              <span className="p-2 rounded-lg bg-accent/10 text-accent">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                  <path d="M6 12v5c3 3 9 3 12 0v-5" />
                </svg>
              </span>
              Education
            </h3>

            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-border" />

              <div className="space-y-8">
                {educationExperiences.map((exp) => (
                  <div key={exp.id} className="relative pl-8">
                    {/* Timeline Dot */}
                    <div className="absolute left-0 top-2 w-4 h-4 rounded-full bg-accent border-4 border-primary" />

                    <div
                      className={cn(
                        'p-6 rounded-xl',
                        'bg-secondary border border-border',
                        'transition-all duration-300',
                        'hover:border-accent/50',
                      )}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <h4 className="font-bold text-lg">{exp.title}</h4>
                        <span className="text-xs text-accent bg-accent/10 px-2 py-1 rounded">
                          {exp.period}
                        </span>
                      </div>
                      <p className="text-text-secondary mb-4">{exp.organization}</p>

                      <ul className="space-y-2">
                        {exp.description.map((desc, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-text-secondary">
                            <span className="text-accent mt-1">•</span>
                            {desc}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div className="mt-12">
              <h3 className="flex items-center gap-2 text-xl font-bold mb-8">
                <span className="p-2 rounded-lg bg-accent/10 text-accent">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="8" r="7" />
                    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
                  </svg>
                </span>
                Certifications
              </h3>

              <div className="space-y-4">
                {[
                  { name: '정보처리기사', org: '한국산업인력공단', year: '2020' },
                  { name: 'AWS Certified Developer', org: 'Amazon', year: '2022' },
                ].map((cert, index) => (
                  <div
                    key={index}
                    className={cn(
                      'flex items-center justify-between p-4 rounded-lg',
                      'bg-secondary border border-border',
                      'transition-all duration-300',
                      'hover:border-accent/50',
                    )}
                  >
                    <div>
                      <h4 className="font-medium">{cert.name}</h4>
                      <p className="text-sm text-text-muted">{cert.org}</p>
                    </div>
                    <span className="text-sm text-accent">{cert.year}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Experience
