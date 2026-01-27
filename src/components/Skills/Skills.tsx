import { useEffect, useRef, useState } from 'react'
import styles from './Skills.module.css'

interface Skill {
  name: string
  level: number
  category: string
}

const Skills = () => {
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

  const skills: Skill[] = [
    { name: 'React', level: 90, category: 'frontend' },
    { name: 'TypeScript', level: 85, category: 'frontend' },
    { name: 'JavaScript', level: 95, category: 'frontend' },
    { name: 'Next.js', level: 80, category: 'frontend' },
    { name: 'HTML/CSS', level: 95, category: 'frontend' },
    { name: 'Tailwind CSS', level: 85, category: 'frontend' },
    { name: 'Node.js', level: 70, category: 'backend' },
    { name: 'Git', level: 85, category: 'tools' },
    { name: 'Figma', level: 75, category: 'tools' },
  ]

  const techStack = [
    { name: 'React', icon: '⚛️' },
    { name: 'TypeScript', icon: '🔷' },
    { name: 'Next.js', icon: '▲' },
    { name: 'Vite', icon: '⚡' },
    { name: 'Tailwind', icon: '🎨' },
    { name: 'Zustand', icon: '🐻' },
    { name: 'React Query', icon: '🔄' },
    { name: 'Framer Motion', icon: '✨' },
  ]

  return (
    <section id="skills" className={`section ${styles.skills}`} ref={sectionRef}>
      <div className="container">
        <div className={`${styles.header} ${isVisible ? styles.visible : ''}`}>
          <span className={styles.label}>Skills</span>
          <h2 className={styles.title}>
            기술 <span className="gradient-text">스택</span>
          </h2>
          <p className={styles.subtitle}>
            지속적인 학습과 실무 경험을 통해 다양한 기술을 습득했습니다
          </p>
        </div>

        <div className={`${styles.content} ${isVisible ? styles.visible : ''}`}>
          <div className={styles.skillsGrid}>
            {skills.map((skill, index) => (
              <div
                key={skill.name}
                className={styles.skillCard}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={styles.skillHeader}>
                  <span className={styles.skillName}>{skill.name}</span>
                  <span className={styles.skillLevel}>{skill.level}%</span>
                </div>
                <div className={styles.progressBar}>
                  <div
                    className={styles.progress}
                    style={{
                      width: isVisible ? `${skill.level}%` : '0%',
                      transitionDelay: `${index * 0.1 + 0.3}s`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className={styles.techStackSection}>
            <h3 className={styles.techStackTitle}>주로 사용하는 기술</h3>
            <div className={styles.techStack}>
              {techStack.map((tech, index) => (
                <div
                  key={tech.name}
                  className={styles.techItem}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <span className={styles.techIcon}>{tech.icon}</span>
                  <span className={styles.techName}>{tech.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.codeBlock}>
            <div className={styles.codeHeader}>
              <div className={styles.dots}>
                <span></span>
                <span></span>
                <span></span>
              </div>
              <span className={styles.fileName}>developer.ts</span>
            </div>
            <pre className={styles.code}>
              <code>
{`const developer = {
  name: "Hyun",
  role: "Frontend Developer",
  skills: ["React", "TypeScript", "Next.js"],
  passion: "Creating beautiful UIs",

  code: () => "Clean & Efficient",
  learn: () => "Never Stop",
  coffee: () => "Always ☕"
};`}
              </code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Skills
