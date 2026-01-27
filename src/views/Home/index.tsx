import Hero from '@components/Hero'
import About from '@components/About'
import Skills from '@components/Skills'
import Projects from '@components/Projects'
import Experience from '@components/Experience'
import Contact from '@components/Contact'

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
