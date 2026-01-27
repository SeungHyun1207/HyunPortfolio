import { Outlet } from 'react-router-dom'
import GNB from '@components/GNB'

/**
 * 메인 레이아웃
 * 모든 페이지에 공통으로 적용되는 레이아웃
 *
 * 구조:
 * - GNB: 글로벌 네비게이션 (로고, 메뉴, 전체메뉴)
 * - Main: 페이지 콘텐츠 (Outlet)
 * - Footer: 소셜 링크, 저작권
 */
const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <GNB />

      <main className="flex-1 pt-16">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-secondary">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-col items-center md:items-start gap-2">
              <span className="text-xl font-bold gradient-text">Hyun</span>
              <p className="text-sm text-text-muted">Frontend Developer</p>
            </div>

            <div className="flex items-center gap-6">
              <a
                href="https://github.com/SeungHyun1207"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-text-secondary hover:text-accent transition-colors"
              >
                GitHub
              </a>
              <a
                href="mailto:contact@example.com"
                className="text-sm text-text-secondary hover:text-accent transition-colors"
              >
                Email
              </a>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-border text-center">
            <p className="text-sm text-text-muted">
              &copy; {new Date().getFullYear()} Hyun. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default MainLayout
