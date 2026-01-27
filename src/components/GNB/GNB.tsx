import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '@utils'
import FullMenu from './FullMenu'

/**
 * GNB 메뉴 아이템 타입
 */
export interface MenuItem {
  label: string
  href: string
  description?: string
}

/**
 * GNB 메뉴 데이터
 * 개발자 포트폴리오에 필요한 메뉴 구성
 */
export const menuItems: MenuItem[] = [
  { label: 'DevInfo', href: '#devinfo', description: '개발자 소개' },
  { label: 'Skills', href: '#skills', description: '기술 스택' },
  { label: 'Projects', href: '#projects', description: '프로젝트' },
  { label: 'Experience', href: '#experience', description: '경력 사항' },
  { label: 'Contact', href: '#contact', description: '연락처' },
]

/**
 * GNB (Global Navigation Bar) 컴포넌트
 *
 * 구조:
 * - 좌측: 로고 (클릭 시 메인으로 이동)
 * - 중앙: 메뉴 리스트
 * - 우측: 전체메뉴 버튼
 */
const GNB = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isFullMenuOpen, setIsFullMenuOpen] = useState(false)

  // 스크롤 감지
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // 전체메뉴 열릴 때 body 스크롤 방지
  useEffect(() => {
    if (isFullMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isFullMenuOpen])

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50',
          'transition-all duration-300',
          isScrolled
            ? 'glass border-b border-border'
            : 'bg-transparent',
        )}
      >
        <nav className="max-w-[1200px] mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo - 좌측 */}
            <Link
              to="/"
              className="group flex items-center gap-2"
              aria-label="홈으로 이동"
            >
              <span className="text-2xl font-bold gradient-text transition-opacity duration-150 group-hover:opacity-80">
                Hyun
              </span>
            </Link>

            {/* Menu - 중앙 (Desktop) */}
            <ul className="hidden md:flex items-center gap-8">
              {menuItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className={cn(
                      'relative text-sm font-medium',
                      'text-text-secondary hover:text-text-primary',
                      'transition-colors duration-150',
                      'after:absolute after:bottom-[-4px] after:left-0',
                      'after:w-0 after:h-0.5 after:bg-accent',
                      'after:transition-all after:duration-300',
                      'hover:after:w-full',
                    )}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* Full Menu Button - 우측 */}
            <button
              onClick={() => setIsFullMenuOpen(true)}
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-lg',
                'text-sm font-medium',
                'text-text-secondary hover:text-text-primary',
                'border border-border hover:border-border-light',
                'transition-all duration-150',
                'hover:bg-secondary',
              )}
              aria-label="전체 메뉴 열기"
            >
              <span className="hidden sm:inline">Menu</span>
              {/* Hamburger Icon */}
              <div className="flex flex-col gap-1">
                <span className="w-4 h-0.5 bg-current transition-all duration-150" />
                <span className="w-4 h-0.5 bg-current transition-all duration-150" />
              </div>
            </button>
          </div>
        </nav>
      </header>

      {/* Full Menu Overlay */}
      <FullMenu
        isOpen={isFullMenuOpen}
        onClose={() => setIsFullMenuOpen(false)}
        menuItems={menuItems}
      />
    </>
  )
}

export default GNB
