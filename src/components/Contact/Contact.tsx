import { useState } from 'react'
import { useScrollAnimation } from '@hooks'
import { cn } from '@utils'

/**
 * Contact 섹션 컴포넌트
 */
const Contact = () => {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>({ threshold: 0.1 })
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // 폼 제출 로직
    console.log('Form submitted:', formData)
    alert('메시지가 전송되었습니다! (데모)')
    setFormData({ name: '', email: '', message: '' })
  }

  const contactInfo = [
    {
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      ),
      label: 'Email',
      value: 'hyun@example.com',
      href: 'mailto:hyun@example.com',
    },
    {
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
        </svg>
      ),
      label: 'GitHub',
      value: 'github.com/SeungHyun1207',
      href: 'https://github.com/SeungHyun1207',
    },
    {
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
      label: 'LinkedIn',
      value: 'linkedin.com/in/hyun',
      href: 'https://linkedin.com/in/hyun',
    },
    {
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      ),
      label: 'Location',
      value: 'Seoul, South Korea',
      href: null,
    },
  ]

  return (
    <section id="contact" ref={ref} className="py-20 md:py-32 bg-secondary">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        {/* Header */}
        <div
          className={cn(
            'text-center mb-16',
            'transition-all duration-700',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
          )}
        >
          <span className="text-accent text-sm font-medium uppercase tracking-wider">
            Contact
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-6">
            함께 <span className="gradient-text">일해요</span>
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            프로젝트 협업이나 채용 관련 문의는 언제든지 환영합니다
          </p>
        </div>

        <div
          className={cn(
            'grid lg:grid-cols-2 gap-12',
            'transition-all duration-700 delay-100',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
          )}
        >
          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-6">연락처 정보</h3>

            <div className="space-y-4 mb-8">
              {contactInfo.map((info, index) => (
                <div
                  key={index}
                  className={cn(
                    'flex items-center gap-4 p-4 rounded-lg',
                    'bg-tertiary border border-border',
                    'transition-all duration-300',
                    info.href && 'hover:border-accent/50 cursor-pointer',
                  )}
                  onClick={() => info.href && window.open(info.href, '_blank')}
                >
                  <div className="p-2 rounded-lg bg-accent/10 text-accent">
                    {info.icon}
                  </div>
                  <div>
                    <p className="text-sm text-text-muted">{info.label}</p>
                    <p className="font-medium">{info.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-sm font-medium text-text-muted mb-4">Follow Me</h4>
              <div className="flex gap-3">
                {[
                  { name: 'GitHub', href: 'https://github.com/SeungHyun1207' },
                  { name: 'LinkedIn', href: '#' },
                  { name: 'Twitter', href: '#' },
                ].map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      'px-4 py-2 rounded-lg',
                      'bg-tertiary border border-border',
                      'text-sm text-text-secondary',
                      'transition-all duration-300',
                      'hover:border-accent hover:text-accent',
                    )}
                  >
                    {social.name}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h3 className="text-xl font-bold mb-6">메시지 보내기</h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  이름
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className={cn(
                    'w-full px-4 py-3 rounded-lg',
                    'bg-tertiary border border-border',
                    'text-text-primary placeholder:text-text-muted',
                    'transition-all duration-300',
                    'focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent',
                  )}
                  placeholder="홍길동"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  이메일
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className={cn(
                    'w-full px-4 py-3 rounded-lg',
                    'bg-tertiary border border-border',
                    'text-text-primary placeholder:text-text-muted',
                    'transition-all duration-300',
                    'focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent',
                  )}
                  placeholder="example@email.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  메시지
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={5}
                  className={cn(
                    'w-full px-4 py-3 rounded-lg resize-none',
                    'bg-tertiary border border-border',
                    'text-text-primary placeholder:text-text-muted',
                    'transition-all duration-300',
                    'focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent',
                  )}
                  placeholder="프로젝트에 대해 이야기해주세요..."
                />
              </div>

              <button
                type="submit"
                className={cn(
                  'w-full py-4 rounded-lg',
                  'bg-accent hover:bg-accent-hover',
                  'text-white font-medium',
                  'transition-all duration-300',
                  'hover:shadow-lg hover:shadow-accent/25',
                )}
              >
                메시지 보내기
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
