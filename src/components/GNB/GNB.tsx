import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSettings } from '@/contexts/SettingsContext'
import FullMenu from './FullMenu'

export interface MenuItem {
  labelKey: string
  href: string
  descKey?: string
}

export const menuItems: MenuItem[] = [
  { labelKey: 'nav.devInfo', href: '#devinfo', descKey: 'nav.devInfoDesc' },
  { labelKey: 'nav.skills', href: '#skills', descKey: 'nav.skillsDesc' },
  { labelKey: 'nav.projects', href: '#projects', descKey: 'nav.projectsDesc' },
  { labelKey: 'nav.experience', href: '#experience', descKey: 'nav.experienceDesc' },
  { labelKey: 'nav.contact', href: '#contact', descKey: 'nav.contactDesc' },
]

const GNB = () => {
  const { t } = useSettings()
  const [isFullMenuOpen, setIsFullMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isFullMenuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isFullMenuOpen])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-white/90 dark:bg-[#12121a]/90 backdrop-blur-xl border-b border-black/[0.08] dark:border-white/[0.08]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1200px] mx-auto px-4 md:px-8 h-16 flex items-center">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 no-underline">
            <span className="gradient-text font-bold text-2xl hover:opacity-80 transition-opacity duration-150">
              Hyun
            </span>
          </Link>

          {/* Center Nav (Desktop) */}
          <nav className="hidden md:flex flex-1 justify-center gap-1">
            {menuItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="relative px-4 py-2 text-sm font-medium text-[#4a4a5a] dark:text-[#a0a0b0] hover:text-[#1a1a2e] dark:hover:text-white transition-colors duration-200 group"
              >
                {t(item.labelKey)}
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary rounded-full transition-all duration-300 group-hover:w-[70%]" />
              </a>
            ))}
          </nav>

          {/* Right - Menu Button */}
          <div className="ml-auto">
            <button
              onClick={() => setIsFullMenuOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-[#4a4a5a] dark:text-[#a0a0b0] border border-black/[0.08] dark:border-white/[0.08] rounded-lg hover:border-primary hover:text-[#1a1a2e] dark:hover:text-white transition-all duration-200"
              aria-label={t('nav.openMenu')}
            >
              <span className="hidden sm:inline">{t('nav.menu')}</span>
              {/* Hamburger icon */}
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <FullMenu
        isOpen={isFullMenuOpen}
        onClose={() => setIsFullMenuOpen(false)}
        menuItems={menuItems}
      />
    </>
  )
}

export default GNB
