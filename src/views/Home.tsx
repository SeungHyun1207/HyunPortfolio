import { useEffect, useRef, useCallback } from 'react'
import { useLocation } from 'react-router-dom'
import Hero from '@views/pages/home/hero'
import About from '@views/pages/home/about'
import Skills from '@views/pages/home/skills'
import Projects from '@views/pages/home/projects'
import Experience from '@views/pages/home/experience'
import Contact from '@views/pages/home/contact'
import { trackVisit } from '@views/pages/home/projects/vibe-project/dashboard/DashboardIndex'

const SECTIONS = ['hero', 'about', 'skills', 'projects', 'experience', 'contact']

const Home = () => {
  const location = useLocation()
  const maxDepthRef = useRef(0)
  const lastRecordedRef = useRef(0)

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

  // 스크롤 깊이 추적: 어느 섹션까지 봤는지 기록
  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY
    const docHeight = document.documentElement.scrollHeight - window.innerHeight
    if (docHeight <= 0) return
    const depth = Math.round((scrollTop / docHeight) * 100)

    if (depth > maxDepthRef.current) {
      maxDepthRef.current = depth
    }

    // 각 섹션 진입 시 기록 (IntersectionObserver 대신 간단 체크)
    for (const section of SECTIONS) {
      const el = document.getElementById(section)
      if (!el) continue
      const rect = el.getBoundingClientRect()
      if (rect.top < window.innerHeight * 0.5 && rect.bottom > 0) {
        const idx = SECTIONS.indexOf(section)
        if (idx > lastRecordedRef.current) {
          lastRecordedRef.current = idx
          trackVisit('/', 'section_scroll', `${section}`, { scrollDepth: depth })
        }
      }
    }
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  // 페이지 떠날 때 최대 스크롤 깊이 기록
  useEffect(() => {
    return () => {
      if (maxDepthRef.current > 0) {
        trackVisit('/', 'scroll_depth', `max ${maxDepthRef.current}%`, { scrollDepth: maxDepthRef.current })
      }
    }
  }, [])

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
