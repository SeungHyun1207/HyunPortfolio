import { useState } from 'react'
import { useSettings } from '@/contexts/SettingsContext'

const Settings = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { theme, language, setTheme, setLanguage, t } = useSettings()

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[-1]"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Settings Popup */}
      <div
        className={`absolute bottom-16 right-0 w-72 p-5 rounded-2xl bg-[#f8f9fa] dark:bg-[#12121a] border border-black/[0.08] dark:border-white/[0.08] shadow-[0_20px_60px_rgba(0,0,0,0.3)] transition-all duration-300 origin-bottom-right ${
          isOpen ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'
        }`}
      >
        {/* Title */}
        <div className="flex items-center gap-2 mb-5">
          <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
          </svg>
          <span className="font-bold text-[#1a1a2e] dark:text-white">{t('settings.title')}</span>
        </div>

        {/* Theme Toggle */}
        <div className="mb-4">
          <p className="text-xs text-[#4a4a5a] dark:text-[#a0a0b0] mb-2">{t('settings.theme')}</p>
          <div className="flex gap-2">
            <button
              onClick={() => setTheme('dark')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-sm font-medium transition-all duration-200 border ${
                theme === 'dark'
                  ? 'bg-primary text-white border-primary'
                  : 'bg-white dark:bg-[#0a0a0f] text-[#4a4a5a] dark:text-[#a0a0b0] border-black/[0.08] dark:border-white/[0.08] hover:border-primary hover:text-[#1a1a2e] dark:hover:text-white'
              }`}
            >
              {/* Moon icon */}
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
              {t('settings.dark')}
            </button>
            <button
              onClick={() => setTheme('light')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-sm font-medium transition-all duration-200 border ${
                theme === 'light'
                  ? 'bg-primary text-white border-primary'
                  : 'bg-white dark:bg-[#0a0a0f] text-[#4a4a5a] dark:text-[#a0a0b0] border-black/[0.08] dark:border-white/[0.08] hover:border-primary hover:text-[#1a1a2e] dark:hover:text-white'
              }`}
            >
              {/* Sun icon */}
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
              {t('settings.light')}
            </button>
          </div>
        </div>

        {/* Language Toggle */}
        <div>
          <p className="text-xs text-[#4a4a5a] dark:text-[#a0a0b0] mb-2">{t('settings.language')}</p>
          <div className="flex gap-2">
            <button
              onClick={() => setLanguage('ko')}
              className={`flex-1 py-2 px-3 rounded-xl text-sm font-medium transition-all duration-200 border ${
                language === 'ko'
                  ? 'bg-primary text-white border-primary'
                  : 'bg-white dark:bg-[#0a0a0f] text-[#4a4a5a] dark:text-[#a0a0b0] border-black/[0.08] dark:border-white/[0.08] hover:border-primary hover:text-[#1a1a2e] dark:hover:text-white'
              }`}
            >
              {t('settings.korean')}
            </button>
            <button
              onClick={() => setLanguage('en')}
              className={`flex-1 py-2 px-3 rounded-xl text-sm font-medium transition-all duration-200 border ${
                language === 'en'
                  ? 'bg-primary text-white border-primary'
                  : 'bg-white dark:bg-[#0a0a0f] text-[#4a4a5a] dark:text-[#a0a0b0] border-black/[0.08] dark:border-white/[0.08] hover:border-primary hover:text-[#1a1a2e] dark:hover:text-white'
              }`}
            >
              {t('settings.english')}
            </button>
          </div>
        </div>
      </div>

      {/* Settings Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        title={t('settings.title')}
        className="w-12 h-12 rounded-full text-white flex items-center justify-center shadow-[0_4px_20px_rgba(99,102,241,0.4)] transition-all duration-300 hover:shadow-[0_6px_25px_rgba(99,102,241,0.5)] hover:scale-110"
        style={{
          background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
          transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        }}
      >
        {/* Settings cog icon */}
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      </button>
    </div>
  )
}

export default Settings
