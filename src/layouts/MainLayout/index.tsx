import { Outlet } from 'react-router-dom'
import GNB from '@components/GNB'
import Settings from '@components/Settings'
import { useSettings } from '@/contexts/SettingsContext'

const MainLayout = () => {
  const { t } = useSettings()

  return (
    <div className="flex flex-col min-h-screen">
      <GNB />
      <Settings />

      <main className="flex-1 pt-20">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-black/[0.08] dark:border-white/[0.08] bg-[#f8f9fa] dark:bg-[#12121a]">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-col items-center md:items-start gap-1">
              <span className="gradient-text text-xl font-bold">
                Hyun
              </span>
              <span className="text-xs text-[#4a4a5a] dark:text-[#a0a0b0]">
                {t('footer.role')}
              </span>
            </div>

            <div className="flex items-center gap-6">
              <a
                href="https://github.com/SeungHyun1207"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[#4a4a5a] dark:text-[#a0a0b0] no-underline hover:text-primary transition-colors duration-300"
              >
                GitHub
              </a>
              <a
                href="mailto:contact@example.com"
                className="text-sm text-[#4a4a5a] dark:text-[#a0a0b0] no-underline hover:text-primary transition-colors duration-300"
              >
                Email
              </a>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-black/[0.08] dark:border-white/[0.08] text-center">
            <span className="text-xs text-[#4a4a5a] dark:text-[#a0a0b0]">
              &copy; {new Date().getFullYear()} Hyun. {t('footer.rights')}
            </span>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default MainLayout
