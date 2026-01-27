import { Outlet } from 'react-router-dom'
import Header from '@components/Header'
import Footer from '@components/Footer'
import styles from './MainLayout.module.css'

/**
 * 메인 레이아웃
 * 모든 페이지에 공통으로 적용되는 레이아웃
 *
 * 구조:
 * - Header: 네비게이션, 로고, 모바일 메뉴
 * - Main: 페이지 콘텐츠 (Outlet)
 * - Footer: 소셜 링크, 저작권
 */
const MainLayout = () => {
  return (
    <div className={styles.layout}>
      <Header />

      <main className={styles.main}>
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}

export default MainLayout
