import { useState } from 'react'
import { useSettings } from '@/contexts/SettingsContext'
import { cn } from '@utils'

/**
 * Settings 컴포넌트
 * 우측 하단에 고정된 설정 버튼과 팝업
 * - 다크/라이트 모드 전환
 * - 한국어/영어 전환
 */
const Settings = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { theme, language, setTheme, setLanguage, t } = useSettings()

  const togglePopup = () => setIsOpen(!isOpen)

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Settings Button */}
      <button
        onClick={togglePopup}
        className={cn(
          'w-12 h-12 rounded-full',
          'bg-accent hover:bg-accent-hover',
          'flex items-center justify-center',
          'shadow-lg shadow-accent/25',
          'transition-all duration-300',
          'hover:scale-110',
          isOpen && 'rotate-90',
        )}
        aria-label={t('settings.title')}
      >
        <svg
          className="w-6 h-6 text-white"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      </button>

      {/* Settings Popup */}
      <div
        className={cn(
          'absolute bottom-16 right-0',
          'w-72 p-5 rounded-xl',
          'bg-secondary border border-border',
          'shadow-xl',
          'transition-all duration-300 origin-bottom-right',
          isOpen
            ? 'opacity-100 scale-100 translate-y-0'
            : 'opacity-0 scale-95 translate-y-2 pointer-events-none',
        )}
      >
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <svg
            className="w-5 h-5 text-accent"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
          </svg>
          {t('settings.title')}
        </h3>

        {/* Theme Toggle */}
        <div className="mb-4">
          <label className="text-sm text-text-secondary mb-2 block">
            {t('settings.theme')}
          </label>
          <div className="flex gap-2">
            <button
              onClick={() => setTheme('dark')}
              className={cn(
                'flex-1 py-2 px-3 rounded-lg',
                'flex items-center justify-center gap-2',
                'text-sm font-medium',
                'transition-all duration-200',
                theme === 'dark'
                  ? 'bg-accent text-white'
                  : 'bg-tertiary text-text-secondary hover:text-text-primary',
              )}
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
              {t('settings.dark')}
            </button>
            <button
              onClick={() => setTheme('light')}
              className={cn(
                'flex-1 py-2 px-3 rounded-lg',
                'flex items-center justify-center gap-2',
                'text-sm font-medium',
                'transition-all duration-200',
                theme === 'light'
                  ? 'bg-accent text-white'
                  : 'bg-tertiary text-text-secondary hover:text-text-primary',
              )}
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
          <label className="text-sm text-text-secondary mb-2 block">
            {t('settings.language')}
          </label>
          <div className="flex gap-2">
            <button
              onClick={() => setLanguage('ko')}
              className={cn(
                'flex-1 py-2 px-3 rounded-lg',
                'text-sm font-medium',
                'transition-all duration-200',
                language === 'ko'
                  ? 'bg-accent text-white'
                  : 'bg-tertiary text-text-secondary hover:text-text-primary',
              )}
            >
              {t('settings.korean')}
            </button>
            <button
              onClick={() => setLanguage('en')}
              className={cn(
                'flex-1 py-2 px-3 rounded-lg',
                'text-sm font-medium',
                'transition-all duration-200',
                language === 'en'
                  ? 'bg-accent text-white'
                  : 'bg-tertiary text-text-secondary hover:text-text-primary',
              )}
            >
              {t('settings.english')}
            </button>
          </div>
        </div>
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 -z-10"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  )
}

export default Settings
