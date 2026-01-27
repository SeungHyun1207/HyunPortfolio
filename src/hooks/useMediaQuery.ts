import { useEffect, useState } from 'react'

/**
 * 미디어 쿼리 매칭 여부를 반환하는 훅
 *
 * @example
 * const isMobile = useMediaQuery('(max-width: 768px)')
 * const isDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
 *
 * return (
 *   <div>{isMobile ? '모바일' : '데스크톱'}</div>
 * )
 */
export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia(query).matches
    }
    return false
  })

  useEffect(() => {
    const mediaQuery = window.matchMedia(query)
    const handler = (event: MediaQueryListEvent) => setMatches(event.matches)

    // 초기값 설정
    setMatches(mediaQuery.matches)

    // 이벤트 리스너 등록
    mediaQuery.addEventListener('change', handler)

    return () => mediaQuery.removeEventListener('change', handler)
  }, [query])

  return matches
}

/** 자주 사용하는 브레이크포인트 */
export const breakpoints = {
  mobile: '(max-width: 480px)',
  tablet: '(max-width: 768px)',
  laptop: '(max-width: 1024px)',
  desktop: '(min-width: 1025px)',
} as const

export default useMediaQuery
