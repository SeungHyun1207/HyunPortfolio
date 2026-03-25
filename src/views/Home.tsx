import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Hero from '@views/pages/home/hero'
import About from '@views/pages/home/about'
import Skills from '@views/pages/home/skills'
import Projects from '@views/pages/home/projects'
import Experience from '@views/pages/home/experience'
import Contact from '@views/pages/home/contact'

/**
 * Home 페이지
 * 포트폴리오 랜딩 페이지
 *
 * 섹션 구성:
 * 1. Hero - 인트로 및 타이핑 애니메이션
 * 2. About (DevInfo) - 개발자 소개
 * 3. Skills - 기술 스택
 * 4. Projects - 포트폴리오 프로젝트
 * 5. Experience - 경력 및 학력
 * 6. Contact - 연락처 및 폼
 */
const Home = () => {
  const location = useLocation()

  // 서브 페이지에서 navigate('/', { state: { scrollTo: 'sectionId' } })로
  // 돌아왔을 때 해당 섹션으로 스크롤
  useEffect(() => {
    const state = location.state as { scrollTo?: string } | null
    if (!state?.scrollTo) return
    const timer = setTimeout(() => {
      document.getElementById(state.scrollTo!)?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
    return () => clearTimeout(timer)
  }, [location.state])

  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Contact />
    </>
  )
}

export default Home
