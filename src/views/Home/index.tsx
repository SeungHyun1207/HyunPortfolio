import Hero from '@components/Hero'
import About from '@components/About'
import Skills from '@components/Skills'

/**
 * Home 페이지
 * 랜딩 페이지로 사용되는 메인 뷰
 */
const Home = () => {
  return (
    <>
      <Hero />
      <About />
      <Skills />
    </>
  )
}

export default Home
