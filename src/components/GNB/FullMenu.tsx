import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useSettings } from '@/contexts/SettingsContext'
import { cn } from '@utils'
import type { MenuItem } from './GNB'

interface FullMenuProps {
  isOpen: boolean
  onClose: () => void
  menuItems: MenuItem[]
}

/**
 * 전체 메뉴 컴포넌트
 * GNB와 동일한 구조 (로고 - 메뉴 - 닫기버튼)
 *
 * 애니메이션:
 * - 배경: 페이드 인/아웃
 * - 메뉴 아이템: 순차적 슬라이드 업
 */
const FullMenu = ({ isOpen, onClose, menuItems }: FullMenuProps) => {
  const { t } = useSettings()
  const menuRef = useRef<HTMLDivElement>(null)

  // ESC 키로 닫기
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown)
    }

    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  // 메뉴 외부 클릭 시 닫기
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div
      className={cn(
        'fixed inset-0 z-[100]',
        'transition-all duration-500',
        isOpen
          ? 'opacity-100 visible'
          : 'opacity-0 invisible pointer-events-none',
      )}
      onClick={handleBackdropClick}
      aria-hidden={!isOpen}
    >
      {/* Background Overlay */}
      <div
        className={cn(
          'absolute inset-0 bg-primary/95 backdrop-blur-xl',
          'transition-opacity duration-500',
          isOpen ? 'opacity-100' : 'opacity-0',
        )}
      />

      {/* Menu Container */}
      <div
        ref={menuRef}
        className="relative h-full flex flex-col"
      >
        {/* Header - GNB와 동일한 구조 */}
        <header className="border-b border-border">
          <nav className="max-w-[1200px] mx-auto px-4 md:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Logo - 좌측 */}
              <Link
                to="/"
                className="group flex items-center gap-2"
                onClick={onClose}
                aria-label={t('nav.goHome')}
              >
                <span className="text-2xl font-bold gradient-text transition-opacity duration-150 group-hover:opacity-80">
                  Hyun
                </span>
              </Link>

              {/* 타이틀 - 중앙 */}
              <span className="text-sm font-medium text-text-secondary">
                {t('nav.fullMenu')}
              </span>

              {/* Close Button - 우측 */}
              <button
                onClick={onClose}
                className={cn(
                  'flex items-center gap-2 px-4 py-2 rounded-lg',
                  'text-sm font-medium',
                  'text-text-secondary hover:text-text-primary',
                  'border border-border hover:border-border-light',
                  'transition-all duration-150',
                  'hover:bg-secondary',
                )}
                aria-label={t('nav.closeMenu')}
              >
                <span className="hidden sm:inline">{t('nav.close')}</span>
                {/* X Icon */}
                <div className="relative w-4 h-4">
                  <span className="absolute top-1/2 left-0 w-4 h-0.5 bg-current transform -translate-y-1/2 rotate-45" />
                  <span className="absolute top-1/2 left-0 w-4 h-0.5 bg-current transform -translate-y-1/2 -rotate-45" />
                </div>
              </button>
            </div>
          </nav>
        </header>

        {/* Menu Content */}
        <div className="flex-1 flex items-center justify-center">
          <div className="max-w-[1200px] w-full mx-auto px-4 md:px-8">
            <ul className="flex flex-col items-center gap-6 md:gap-8">
              {menuItems.map((item, index) => (
                <li
                  key={item.href}
                  className={cn(
                    'overflow-hidden',
                    'transition-all duration-500',
                    isOpen
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-8',
                  )}
                  style={{
                    transitionDelay: isOpen ? `${150 + index * 75}ms` : '0ms',
                  }}
                >
                  <a
                    href={item.href}
                    onClick={onClose}
                    className="group flex flex-col items-center gap-2"
                  >
                    <span
                      className={cn(
                        'text-4xl md:text-6xl lg:text-7xl font-bold',
                        'text-text-primary',
                        'transition-all duration-300',
                        'group-hover:gradient-text',
                      )}
                    >
                      {t(item.labelKey)}
                    </span>
                    {item.descKey && (
                      <span
                        className={cn(
                          'text-sm text-text-muted',
                          'transition-colors duration-300',
                          'group-hover:text-text-secondary',
                        )}
                      >
                        {t(item.descKey)}
                      </span>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer */}
        <footer
          className={cn(
            'border-t border-border py-6',
            'transition-all duration-500',
            isOpen
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-4',
          )}
          style={{
            transitionDelay: isOpen ? `${150 + menuItems.length * 75 + 100}ms` : '0ms',
          }}
        >
          <div className="max-w-[1200px] mx-auto px-4 md:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-sm text-text-muted">
                &copy; {new Date().getFullYear()} Hyun. {t('footer.rights')}
              </p>
              <div className="flex items-center gap-6">
                <a
                  href="https://github.com/SeungHyun1207"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-text-secondary hover:text-accent transition-colors"
                >
                  GitHub
                </a>
                <a
                  href="mailto:contact@example.com"
                  className="text-sm text-text-secondary hover:text-accent transition-colors"
                >
                  Email
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default FullMenu
