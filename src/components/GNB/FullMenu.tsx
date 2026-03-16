import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSettings } from '@/contexts/SettingsContext'
import type { MenuItem } from './GNB'

interface FullMenuProps {
  isOpen: boolean
  onClose: () => void
  menuItems: MenuItem[]
  onSectionClick: (sectionId: string) => void
}

const FullMenu = ({ isOpen, onClose, menuItems, onSectionClick }: FullMenuProps) => {
  const { t } = useSettings()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col bg-white dark:bg-[#0a0a0f] transition-all duration-400 ${
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
      style={{ transitionDuration: '400ms' }}
    >
      {/* Header */}
      <div className="border-b border-black/[0.08] dark:border-white/[0.08] px-4 md:px-8">
        <div className="max-w-[1200px] mx-auto h-16 flex items-center justify-between">
          <Link to="/" onClick={onClose} className="no-underline">
            <span className="gradient-text font-bold text-2xl">Hyun</span>
          </Link>

          <span className="text-sm text-[#4a4a5a] dark:text-[#a0a0b0]">
            {t('nav.fullMenu')}
          </span>

          <button
            onClick={onClose}
            className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-[#4a4a5a] dark:text-[#a0a0b0] border border-black/[0.08] dark:border-white/[0.08] rounded-lg hover:border-primary hover:text-[#1a1a2e] dark:hover:text-white transition-all duration-200"
            aria-label={t('nav.closeMenu')}
          >
            <span className="hidden sm:inline">{t('nav.close')}</span>
            {/* Close icon */}
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      </div>

      {/* Menu Items */}
      <div className="flex-1 flex items-center justify-center px-4 md:px-8">
        <ul className="list-none p-0 m-0 flex flex-col items-center gap-8 md:gap-10">
          {menuItems.map((item, index) => (
            <li
              key={item.sectionId}
              style={{
                opacity: isOpen ? 1 : 0,
                transform: isOpen ? 'translateY(0)' : 'translateY(30px)',
                transition: `opacity 0.5s ease ${150 + index * 75}ms, transform 0.5s ease ${150 + index * 75}ms`,
              }}
            >
              <button
                type="button"
                onClick={() => onSectionClick(item.sectionId)}
                className="flex flex-col items-center gap-1 bg-transparent border-none cursor-pointer group"
              >
                <span
                  className="text-5xl md:text-7xl lg:text-8xl font-bold leading-none text-[#1a1a2e] dark:text-white transition-all duration-300"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)'
                    e.currentTarget.style.webkitBackgroundClip = 'text'
                    e.currentTarget.style.webkitTextFillColor = 'transparent'
                    e.currentTarget.style.backgroundClip = 'text'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = ''
                    e.currentTarget.style.webkitBackgroundClip = ''
                    e.currentTarget.style.webkitTextFillColor = ''
                    e.currentTarget.style.backgroundClip = ''
                  }}
                >
                  {t(item.labelKey)}
                </span>
                {item.descKey && (
                  <span className="text-xs text-[#4a4a5a] dark:text-[#a0a0b0]">
                    {t(item.descKey)}
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Footer */}
      <div
        className="border-t border-black/[0.08] dark:border-white/[0.08] py-6 px-4 md:px-8"
        style={{
          opacity: isOpen ? 1 : 0,
          transform: isOpen ? 'translateY(0)' : 'translateY(16px)',
          transition: `opacity 0.5s ease ${150 + menuItems.length * 75 + 100}ms, transform 0.5s ease ${150 + menuItems.length * 75 + 100}ms`,
        }}
      >
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-xs text-[#4a4a5a] dark:text-[#a0a0b0]">
            &copy; {new Date().getFullYear()} Hyun. All rights reserved.
          </span>
          <div className="flex gap-6">
            {[
              { name: 'GitHub', href: 'https://github.com/SeungHyun1207' },
              { name: 'Email', href: 'mailto:contact@example.com' },
            ].map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#4a4a5a] dark:text-[#a0a0b0] no-underline hover:text-primary transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FullMenu
