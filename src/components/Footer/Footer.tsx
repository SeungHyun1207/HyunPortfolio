import styles from './Footer.module.css'

const socialLinks = [
  { name: 'GitHub', url: 'https://github.com/SeungHyun1207', icon: 'github' },
  // 필요한 소셜 링크 추가
]

/**
 * 푸터 컴포넌트
 */
const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          {/* Logo & Description */}
          <div className={styles.brand}>
            <span className={styles.logo}>Hyun</span>
            <p className={styles.description}>
              Frontend Developer
            </p>
          </div>

          {/* Social Links */}
          <div className={styles.social}>
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label={link.name}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className={styles.copyright}>
          <p>&copy; {currentYear} Hyun. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
