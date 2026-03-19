import { useState } from 'react'
import { useScrollAnimation } from '@hooks'
import { useSettings } from '@/contexts/SettingsContext'

interface ContactInfoItem {
  icon: React.ReactNode
  label: string
  value: string
  href: string | null
}

const Contact = () => {
  const { t } = useSettings()
  const { ref, isVisible } = useScrollAnimation<HTMLElement>({ threshold: 0.1 })
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert(t('contact.submitAlert'))
    setFormData({ name: '', email: '', message: '' })
  }

  const contactInfo: ContactInfoItem[] = [
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      ),
      label: 'Email',
      value: 'seunghyun_1207@naver.com',
      href: 'mailto:hyun@example.com',
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
        </svg>
      ),
      label: 'GitHub',
      value: 'github.com/SeungHyun1207',
      href: 'https://github.com/SeungHyun1207',
    },
    // {
    //   icon: (
    //     <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    //       <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    //     </svg>
    //   ),
    //   label: 'LinkedIn',
    //   value: 'linkedin.com/in/hyun',
    //   href: 'https://linkedin.com/in/hyun',
    // },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      ),
      label: t('contact.location'),
      value: t('contact.locationValue'),
      href: null,
    },
  ]

  const inputClass = `w-full px-4 py-3 rounded-xl border border-black/[0.08] dark:border-white/[0.08] bg-white dark:bg-[#0a0a0f] text-[#1a1a2e] dark:text-white placeholder:text-[#4a4a5a]/50 dark:placeholder:text-[#a0a0b0]/50 focus:outline-none focus:border-primary transition-all duration-200 text-sm`

  return (
    <section
      id="contact"
      ref={ref}
      className="py-20 md:py-32 bg-[#f8f9fa] dark:bg-[#12121a]"
    >
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div
          className="text-center mb-16 transition-all duration-700"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(32px)',
          }}
        >
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
            {t('contact.label')}
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-2 mb-4">
            {t('contact.title1')}{' '}
            <span className="gradient-text">{t('contact.title2')}</span>
          </h2>
          <p className="text-[#4a4a5a] dark:text-[#a0a0b0] max-w-2xl mx-auto">
            {t('contact.description')}
          </p>
        </div>

        <div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 transition-all duration-700"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(32px)',
            transitionDelay: '100ms',
          }}
        >
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-[#1a1a2e] dark:text-white">
              {t('contact.infoTitle')}
            </h3>

            <div className="flex flex-col gap-3 mb-8">
              {contactInfo.map((info, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-[#0a0a0f] border border-black/[0.08] dark:border-white/[0.08] transition-all duration-300 ${
                    info.href ? 'cursor-pointer hover:border-primary/50' : ''
                  }`}
                  onClick={() => info.href && window.open(info.href, '_blank')}
                >
                  <div className="p-2 rounded-xl bg-primary/10 text-primary flex flex-shrink-0">
                    {info.icon}
                  </div>
                  <div>
                    <p className="text-xs text-[#4a4a5a] dark:text-[#a0a0b0]">{info.label}</p>
                    <p className="text-sm font-medium text-[#1a1a2e] dark:text-white">{info.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div>
              <p className="text-xs text-[#4a4a5a] dark:text-[#a0a0b0] mb-3">
                {t('contact.followMe')}
              </p>
              <div className="flex gap-3">
                {[
                  { name: 'GitHub', href: 'https://github.com/SeungHyun1207' },
                  // { name: 'LinkedIn', href: '#' },
                  // { name: 'Twitter', href: '#' },
                ].map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-xl bg-white dark:bg-[#0a0a0f] border border-black/[0.08] dark:border-white/[0.08] text-sm text-[#4a4a5a] dark:text-[#a0a0b0] no-underline hover:border-primary hover:text-primary transition-all duration-300"
                  >
                    {social.name}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-[#1a1a2e] dark:text-white">
              {t('contact.formTitle')}
            </h3>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label htmlFor="name" className="block text-xs text-[#4a4a5a] dark:text-[#a0a0b0] mb-1.5">
                  {t('contact.nameLabel')}
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder={t('contact.namePlaceholder')}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-xs text-[#4a4a5a] dark:text-[#a0a0b0] mb-1.5">
                  {t('contact.emailLabel')}
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="example@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-xs text-[#4a4a5a] dark:text-[#a0a0b0] mb-1.5">
                  {t('contact.messageLabel')}
                </label>
                <textarea
                  id="message"
                  placeholder={t('contact.messagePlaceholder')}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={5}
                  className={`${inputClass} resize-none`}
                />
              </div>
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(99,102,241,0.35)]"
                style={{ background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)' }}
              >
                {t('contact.submit')}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
