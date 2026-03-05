import { useScrollAnimation } from '@hooks'
import { useSettings } from '@/contexts/SettingsContext'

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
      className="py-20 md:py-32 bg-[#f8f9fa] dark:bg-[#12121a]"
    >
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center transition-all duration-700"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(32px)',
          }}
        >
          {/* Left - Image & Stats */}
          <div className="flex flex-col items-center md:items-start gap-8">
            {/* Profile Image Placeholder */}
            <div className="relative">
              <div className="w-48 h-48 md:w-64 md:h-64 rounded-2xl bg-white dark:bg-[#0a0a0f] border border-black/[0.08] dark:border-white/[0.08] flex items-center justify-center">
                <span className="gradient-text text-6xl md:text-8xl font-bold">H</span>
              </div>
              {/* Decorative border */}
              <div className="absolute -bottom-4 -right-4 w-full h-full rounded-2xl border-2 border-primary/30 -z-10" />
            </div>

            {/* Stats */}
            <div className="flex gap-8 md:gap-10">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="text-center transition-all duration-500"
                  style={{ transitionDelay: `${200 + index * 100}ms` }}
                >
                  <span className="gradient-text block text-3xl md:text-4xl font-bold">
                    {stat.number}
                  </span>
                  <span className="text-xs md:text-sm text-[#4a4a5a] dark:text-[#a0a0b0]">
                    {t(stat.labelKey)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Content */}
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
              {t('about.label')}
            </p>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-2 mb-6">
              {t('about.title1')}
              <br />
              <span className="gradient-text">{t('about.title2')}</span>
            </h2>

            <div className="flex flex-col gap-4 mb-8">
              <p className="text-[#4a4a5a] dark:text-[#a0a0b0]">{t('about.description1')}</p>
              <p className="text-[#4a4a5a] dark:text-[#a0a0b0]">{t('about.description2')}</p>
            </div>

            {/* Highlights */}
            <div className="flex flex-col gap-3">
              {highlights.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 rounded-xl bg-white dark:bg-[#0a0a0f] border border-black/[0.08] dark:border-white/[0.08] hover:border-primary/50 transition-all duration-300"
                >
                  <div className="p-2 rounded-xl bg-primary/10 text-primary flex-shrink-0 flex">
                    {item.icon}
                  </div>
                  <div>
                    <p className="font-semibold text-[#1a1a2e] dark:text-white">{t(item.titleKey)}</p>
                    <p className="text-sm text-[#4a4a5a] dark:text-[#a0a0b0]">{t(item.descKey)}</p>
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
