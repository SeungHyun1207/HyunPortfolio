import { useScrollAnimation } from '@hooks'
import { useSettings } from '@/contexts/SettingsContext'
import { cn } from '@utils'

interface ExperienceItem {
  id: string
  type: 'work' | 'education'
  titleKey: string
  organizationKey: string
  periodKey: string
  descriptionKeys: string[]
  techStack?: string[]
}

/**
 * Experience 섹션 컴포넌트
 * 경력 및 학력 사항
 */
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
      techStack: ['React', 'TypeScript', 'Next.js', 'TailwindCSS'],
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
            {t('experience.label')}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-6">
            {t('experience.title1')} <span className="gradient-text">{t('experience.title2')}</span>
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            {t('experience.description')}
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
              {t('experience.workTitle')}
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
                        <h4 className="font-bold text-lg">{t(exp.titleKey)}</h4>
                        <span className="text-xs text-accent bg-accent/10 px-2 py-1 rounded">
                          {t(exp.periodKey)}
                        </span>
                      </div>
                      <p className="text-text-secondary mb-4">{t(exp.organizationKey)}</p>

                      <ul className="space-y-2 mb-4">
                        {exp.descriptionKeys.map((descKey, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-text-secondary">
                            <span className="text-accent mt-1">•</span>
                            {t(descKey)}
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
              {t('experience.eduTitle')}
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
                        <h4 className="font-bold text-lg">{t(exp.titleKey)}</h4>
                        <span className="text-xs text-accent bg-accent/10 px-2 py-1 rounded">
                          {t(exp.periodKey)}
                        </span>
                      </div>
                      <p className="text-text-secondary mb-4">{t(exp.organizationKey)}</p>

                      <ul className="space-y-2">
                        {exp.descriptionKeys.map((descKey, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-text-secondary">
                            <span className="text-accent mt-1">•</span>
                            {t(descKey)}
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
                {t('experience.certTitle')}
              </h3>

              <div className="space-y-4">
                {certifications.map((cert, index) => (
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
                      <h4 className="font-medium">{t(cert.nameKey)}</h4>
                      <p className="text-sm text-text-muted">{t(cert.orgKey)}</p>
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
