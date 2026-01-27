import { useState, useEffect } from 'react'
import { cn } from '@utils'
import styles from './Header.module.css'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

/**
 * 헤더 컴포넌트
 * - 스크롤 시 배경 변경
 * - 반응형 네비게이션
 */
const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={cn(styles.header, isScrolled && styles.scrolled)}>
      <nav className={styles.nav}>
        <a href="/" className={styles.logo}>
          Hyun
        </a>

        {/* Desktop Navigation */}
        <ul className={styles.navList}>
          {navLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href} className={styles.navLink}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button
          className={styles.menuButton}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="메뉴 열기"
        >
          <span className={cn(styles.menuIcon, isMobileMenuOpen && styles.open)} />
        </button>

        {/* Mobile Navigation */}
        <div className={cn(styles.mobileMenu, isMobileMenuOpen && styles.open)}>
          <ul className={styles.mobileNavList}>
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={styles.mobileNavLink}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  )
}

export default Header
