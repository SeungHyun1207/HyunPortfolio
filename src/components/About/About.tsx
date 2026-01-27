import { useEffect, useRef, useState } from 'react'
import styles from './About.module.css'

const About = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const stats = [
    { number: '3+', label: 'Years Experience' },
    { number: '20+', label: 'Projects Completed' },
    { number: '10+', label: 'Happy Clients' },
  ]

  return (
    <section id="about" className={`section ${styles.about}`} ref={sectionRef}>
      <div className="container">
        <div className={`${styles.content} ${isVisible ? styles.visible : ''}`}>
          <div className={styles.left}>
            <div className={styles.imageWrapper}>
              <div className={styles.imagePlaceholder}>
                <span className={styles.initials}>H</span>
              </div>
              <div className={styles.imageDecor} />
            </div>

            <div className={styles.stats}>
              {stats.map((stat, index) => (
                <div key={index} className={styles.statItem}>
                  <span className={styles.statNumber}>{stat.number}</span>
                  <span className={styles.statLabel}>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.right}>
            <span className={styles.label}>About Me</span>
            <h2 className={styles.title}>
              열정을 코드로 표현하는<br />
              <span className="gradient-text">프론트엔드 개발자</span>
            </h2>

            <div className={styles.description}>
              <p>
                안녕하세요! 저는 사용자 중심의 웹 경험을 만드는 것에 열정을 가진
                프론트엔드 개발자입니다. React, TypeScript를 주력으로 사용하며,
                항상 최신 기술 트렌드를 학습하고 적용합니다.
              </p>
              <p>
                클린 코드와 최적화된 성능, 그리고 직관적인 UI/UX를 통해
                사용자와 비즈니스 모두에게 가치를 전달하는 것이 제 목표입니다.
              </p>
            </div>

            <div className={styles.highlights}>
              <div className={styles.highlight}>
                <div className={styles.highlightIcon}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2L2 7l10 5 10-5-10-5z" />
                    <path d="M2 17l10 5 10-5" />
                    <path d="M2 12l10 5 10-5" />
                  </svg>
                </div>
                <div>
                  <h4>Clean Architecture</h4>
                  <p>유지보수성과 확장성을 고려한 설계</p>
                </div>
              </div>

              <div className={styles.highlight}>
                <div className={styles.highlightIcon}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                </div>
                <div>
                  <h4>Performance First</h4>
                  <p>최적화된 렌더링과 빠른 로딩 속도</p>
                </div>
              </div>

              <div className={styles.highlight}>
                <div className={styles.highlightIcon}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <path d="M3 9h18" />
                    <path d="M9 21V9" />
                  </svg>
                </div>
                <div>
                  <h4>Responsive Design</h4>
                  <p>모든 디바이스에서 완벽한 경험</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
