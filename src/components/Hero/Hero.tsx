import { useEffect, useState } from 'react'
import styles from './Hero.module.css'

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

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
    <section className={styles.hero}>
      <div className={styles.backgroundGrid} />
      <div className={styles.gradientOrb} />

      <div className={`container ${styles.content} ${isVisible ? styles.visible : ''}`}>
        <div className={styles.greeting}>
          <span className={styles.wave}>Hello</span>
          <span className={styles.dot}>.</span>
        </div>

        <h1 className={styles.title}>
          I'm <span className="gradient-text">Hyun</span>
        </h1>

        <div className={styles.roleWrapper}>
          <span className={styles.role}>
            {displayText}
            <span className={styles.cursor}>|</span>
          </span>
        </div>

        <p className={styles.description}>
          사용자 경험을 최우선으로 생각하며,<br />
          클린 코드와 모던 기술로 가치를 만드는 개발자입니다.
        </p>

        <div className={styles.cta}>
          <a href="#about" className={styles.primaryBtn}>
            About Me
            <svg viewBox="0 0 24 24" className={styles.arrow}>
              <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" fill="currentColor"/>
            </svg>
          </a>
          <a href="#contact" className={styles.secondaryBtn}>
            Contact
          </a>
        </div>

        <div className={styles.scrollIndicator}>
          <div className={styles.mouse}>
            <div className={styles.wheel} />
          </div>
          <span>Scroll</span>
        </div>
      </div>
    </section>
  )
}

export default Hero
