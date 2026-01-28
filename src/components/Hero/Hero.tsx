import { useEffect, useState } from 'react'
import { useSettings } from '@/contexts/SettingsContext'
import { cn } from '@utils'

/**
 * Hero 섹션 컴포넌트
 * 타이핑 애니메이션과 그라디언트 배경 효과
 */
const Hero = () => {
  const { t } = useSettings()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  // 타이핑 애니메이션
  const roles = ['Frontend Developer', 'UI Engineer', 'React Specialist']
  const [currentRole, setCurrentRole] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const role = roles[currentRole]
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < role.length) {
          setDisplayText(role.slice(0, displayText.length + 1))
        } else {
          setTimeout(() => setIsDeleting(true), 2000)
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1))
        } else {
          setIsDeleting(false)
          setCurrentRole((prev) => (prev + 1) % roles.length)
        }
      }
    }, isDeleting ? 50 : 100)

    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, currentRole, roles])

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Grid */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Gradient Orb */}
      <div
        className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full blur-[120px] opacity-30"
        style={{
          background: 'radial-gradient(circle, var(--color-accent) 0%, transparent 70%)',
        }}
      />

      {/* Content */}
      <div
        className={cn(
          'relative z-10 max-w-[1200px] mx-auto px-4 md:px-8 text-center',
          'transition-all duration-1000',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
        )}
      >
        {/* Greeting */}
        <div className="flex items-center justify-center gap-1 mb-6">
          <span className="text-4xl md:text-5xl animate-bounce">
            {t('hero.greeting')}
          </span>
          <span className="text-4xl md:text-5xl text-accent">.</span>
        </div>

        {/* Title */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6">
          {t('hero.intro')} <span className="gradient-text">Hyun</span>
        </h1>

        {/* Role with typing effect */}
        <div className="h-12 md:h-16 mb-8">
          <span className="text-xl md:text-3xl text-text-secondary font-mono">
            {displayText}
            <span className="inline-block w-[2px] h-6 md:h-8 bg-accent ml-1 animate-pulse" />
          </span>
        </div>

        {/* Description */}
        <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-12 leading-relaxed whitespace-pre-line">
          {t('hero.description')}
        </p>

        {/* CTA Buttons */}
        <div className="flex items-center justify-center gap-4 mb-16">
          <a
            href="#devinfo"
            className={cn(
              'group flex items-center gap-2 px-6 py-3 rounded-lg',
              'bg-accent hover:bg-accent-hover',
              'text-white font-medium',
              'transition-all duration-300',
              'hover:shadow-lg hover:shadow-accent/25',
            )}
          >
            {t('hero.aboutMe')}
            <svg
              viewBox="0 0 24 24"
              className="w-5 h-5 transition-transform group-hover:translate-x-1"
            >
              <path
                d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"
                fill="currentColor"
              />
            </svg>
          </a>
          <a
            href="#contact"
            className={cn(
              'px-6 py-3 rounded-lg',
              'border border-border hover:border-accent',
              'text-text-primary font-medium',
              'transition-all duration-300',
              'hover:bg-secondary',
            )}
          >
            {t('hero.contact')}
          </a>
        </div>

        {/* Scroll Indicator */}
        <div className="flex flex-col items-center gap-2 text-text-muted animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-text-muted flex justify-center pt-2">
            <div className="w-1 h-2 bg-text-muted rounded-full animate-pulse" />
          </div>
          <span className="text-xs uppercase tracking-widest">{t('hero.scroll')}</span>
        </div>
      </div>
    </section>
  )
}

export default Hero
