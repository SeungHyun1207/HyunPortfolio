import { useScrollAnimation } from '@hooks'
import { useSettings } from '@/contexts/SettingsContext'
import { cn } from '@utils'

/**
 * About (DevInfo) 섹션 컴포넌트
 */
const About = () => {
  const { t } = useSettings()
  const { ref, isVisible } = useScrollAnimation<HTMLElement>({ threshold: 0.2 })

  const stats = [
    { number: '3+', labelKey: 'about.yearsExp' },
    { number: '20+', labelKey: 'about.projects' },
    { number: '10+', labelKey: 'about.clients' },
  ]

  const highlights = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5" />
          <path d="M2 12l10 5 10-5" />
        </svg>
      ),
      titleKey: 'about.cleanArchitecture',
      descKey: 'about.cleanArchitectureDesc',
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 6v6l4 2" />
        </svg>
      ),
      titleKey: 'about.performanceFirst',
      descKey: 'about.performanceFirstDesc',
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M3 9h18" />
          <path d="M9 21V9" />
        </svg>
      ),
      titleKey: 'about.responsiveDesign',
      descKey: 'about.responsiveDesignDesc',
    },
  ]

  return (
    <section
      id="devinfo"
      ref={ref}
      className="py-20 md:py-32 bg-secondary"
    >
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        <div
          className={cn(
            'grid md:grid-cols-2 gap-12 md:gap-16 items-center',
            'transition-all duration-700',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
          )}
        >
          {/* Left - Image & Stats */}
          <div className="flex flex-col items-center md:items-start gap-8">
            {/* Profile Image Placeholder */}
            <div className="relative">
              <div
                className={cn(
                  'w-48 h-48 md:w-64 md:h-64 rounded-2xl',
                  'bg-tertiary flex items-center justify-center',
                  'border border-border',
                )}
              >
                <span className="text-6xl md:text-8xl font-bold gradient-text">H</span>
              </div>
              {/* Decorative element */}
              <div
                className={cn(
                  'absolute -bottom-4 -right-4 w-full h-full rounded-2xl',
                  'border-2 border-accent/30 -z-10',
                )}
              />
            </div>

            {/* Stats */}
            <div className="flex gap-6 md:gap-8">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className={cn(
                    'text-center',
                    'transition-all duration-500',
                  )}
                  style={{ transitionDelay: `${200 + index * 100}ms` }}
                >
                  <span className="block text-3xl md:text-4xl font-bold gradient-text">
                    {stat.number}
                  </span>
                  <span className="text-xs md:text-sm text-text-muted">
                    {t(stat.labelKey)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Content */}
          <div>
            <span className="text-accent text-sm font-medium uppercase tracking-wider">
              {t('about.label')}
            </span>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-6">
              {t('about.title1')}
              <br />
              <span className="gradient-text">{t('about.title2')}</span>
            </h2>

            <div className="space-y-4 text-text-secondary mb-8">
              <p>{t('about.description1')}</p>
              <p>{t('about.description2')}</p>
            </div>

            {/* Highlights */}
            <div className="space-y-4">
              {highlights.map((item, index) => (
                <div
                  key={index}
                  className={cn(
                    'flex items-start gap-4 p-4 rounded-lg',
                    'bg-tertiary border border-border',
                    'transition-all duration-300',
                    'hover:border-accent/50 hover:bg-tertiary/80',
                  )}
                >
                  <div className="p-2 rounded-lg bg-accent/10 text-accent">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-text-primary">{t(item.titleKey)}</h4>
                    <p className="text-sm text-text-muted">{t(item.descKey)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
