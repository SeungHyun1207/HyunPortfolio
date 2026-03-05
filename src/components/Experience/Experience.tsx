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
      techStack: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS'],
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
    <div className="flex items-center gap-3 mb-8">
      <div className="p-2 rounded-xl bg-primary/10 text-primary flex">
        {icon}
      </div>
      <h3 className="text-lg font-bold text-[#1a1a2e] dark:text-white">{label}</h3>
    </div>
  )

  const TimelineItem = ({ exp }: { exp: ExperienceItem }) => (
    <div className="relative pl-8 mb-6 last:mb-0">
      {/* Timeline dot */}
      <div className="absolute left-0 top-2 w-4 h-4 rounded-full bg-primary border-4 border-white dark:border-[#0a0a0f] z-10" />
      <div className="p-5 rounded-2xl bg-[#f8f9fa] dark:bg-[#12121a] border border-black/[0.08] dark:border-white/[0.08] hover:border-primary/50 transition-all duration-300">
        <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
          <span className="font-bold text-[#1a1a2e] dark:text-white">{t(exp.titleKey)}</span>
          <span className="text-xs px-2 py-1 rounded-lg bg-primary/10 text-primary font-medium">
            {t(exp.periodKey)}
          </span>
        </div>
        <p className="text-sm text-[#4a4a5a] dark:text-[#a0a0b0] mb-3">
          {t(exp.organizationKey)}
        </p>
        <ul className="list-none p-0 m-0 mb-3 flex flex-col gap-1.5">
          {exp.descriptionKeys.map((descKey, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="text-primary mt-0.5 leading-none flex-shrink-0">•</span>
              <span className="text-sm text-[#4a4a5a] dark:text-[#a0a0b0] leading-relaxed">{t(descKey)}</span>
            </li>
          ))}
        </ul>
        {exp.techStack && (
          <div className="flex flex-wrap gap-1.5">
            {exp.techStack.map((tech) => (
              <span
                key={tech}
                className="text-xs px-2 py-0.5 rounded-md bg-white dark:bg-[#0a0a0f] border border-black/[0.08] dark:border-white/[0.08] text-[#4a4a5a] dark:text-[#a0a0b0]"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )

  return (
    <section
      id="experience"
      ref={ref}
      className="py-20 md:py-32 bg-white dark:bg-[#0a0a0f]"
    >
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div
          className="text-center mb-16 transition-all duration-700"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(32px)',
          }}
        >
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
            {t('experience.label')}
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-2 mb-4">
            {t('experience.title1')}{' '}
            <span className="gradient-text">{t('experience.title2')}</span>
          </h2>
          <p className="text-[#4a4a5a] dark:text-[#a0a0b0] max-w-2xl mx-auto">
            {t('experience.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Work Experience */}
          <div
            className="transition-all duration-700"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(32px)',
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
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-black/[0.08] dark:bg-white/[0.08]" />
              {workExperiences.map((exp) => (
                <TimelineItem key={exp.id} exp={exp} />
              ))}
            </div>
          </div>

          {/* Education & Certifications */}
          <div
            className="transition-all duration-700"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(32px)',
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
            <div className="relative mb-10">
              <div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-black/[0.08] dark:bg-white/[0.08]" />
              {educationExperiences.map((exp) => (
                <TimelineItem key={exp.id} exp={exp} />
              ))}
            </div>

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
            <div className="flex flex-col gap-3">
              {certifications.map((cert, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-xl bg-[#f8f9fa] dark:bg-[#12121a] border border-black/[0.08] dark:border-white/[0.08] hover:border-primary/50 transition-all duration-300"
                >
                  <div>
                    <p className="text-sm font-medium text-[#1a1a2e] dark:text-white">{t(cert.nameKey)}</p>
                    <p className="text-xs text-[#4a4a5a] dark:text-[#a0a0b0]">{t(cert.orgKey)}</p>
                  </div>
                  <span className="text-sm text-primary font-medium">{cert.year}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Experience
