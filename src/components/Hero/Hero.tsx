import { useSettings } from '@/contexts/SettingsContext'
import { useEffect, useState } from 'react'

const Hero = () => {
  const { t } = useSettings()
  const [isVisible, setIsVisible] = useState(false)
  const roles = ['Frontend Developer', 'UI Engineer', 'React Specialist']
  const [currentRole, setCurrentRole] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

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
      {/* Grid Background */}
      <div className="grid-bg absolute inset-0 opacity-60 pointer-events-none" />

      {/* Gradient Orb */}
      <div
        className="absolute top-1/4 right-1/4 w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(99,102,241,0.3) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-8 w-full">
        <div
          className="text-center transition-all duration-1000"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
          }}
        >
          {/* Greeting */}
          <div className="flex items-center justify-center gap-1 mb-8">
            <span className="scroll-bounce inline-block text-3xl md:text-4xl font-semibold">
              {t('hero.greeting')}
            </span>
            <span className="text-3xl md:text-4xl font-semibold text-primary">.</span>
          </div>

          {/* Name */}
          <h1 className="font-extrabold leading-tight mb-8 text-5xl md:text-7xl lg:text-[7rem]">
            {t('hero.intro')}{' '}
            <span className="gradient-text">Hyun</span>
          </h1>

          {/* Typing Role */}
          <div className="h-12 md:h-16 mb-10 flex items-center justify-center">
            <span className="font-mono text-xl md:text-2xl text-[#4a4a5a] dark:text-[#a0a0b0] font-normal">
              {displayText}
              <span className="typing-cursor" />
            </span>
          </div>

          {/* Description */}
          <p className="max-w-lg mx-auto mb-14 text-[#4a4a5a] dark:text-[#a0a0b0] leading-relaxed whitespace-pre-line text-base md:text-lg font-normal">
            {t('hero.description')}
          </p>

          {/* CTA Buttons */}
          <div className="flex justify-center gap-4 mb-20 flex-wrap">
            <a
              href="#devinfo"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-xl font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(99,102,241,0.35)]"
              style={{ background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)' }}
            >
              {t('hero.aboutMe')}
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <a
              href="#contact"
              className="inline-flex items-center px-8 py-3 rounded-xl font-semibold border border-black/[0.08] dark:border-white/[0.08] text-[#1a1a2e] dark:text-white hover:border-primary transition-all duration-300"
            >
              {t('hero.contact')}
            </a>
          </div>

          {/* Scroll Indicator */}
          <div className="scroll-bounce flex flex-col items-center gap-2">
            <div className="w-6 h-10 rounded-full border-2 border-[#4a4a5a]/30 dark:border-[#a0a0b0]/30 flex justify-center pt-1.5">
              <div className="w-1 h-2 bg-[#4a4a5a]/40 dark:bg-[#a0a0b0]/40 rounded-full animate-pulse" />
            </div>
            <span className="text-xs text-[#4a4a5a]/50 dark:text-[#a0a0b0]/50 tracking-[0.2em] uppercase">
              {t('hero.scroll')}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
