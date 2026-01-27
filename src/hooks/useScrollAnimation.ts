import { useEffect, useRef, useState } from 'react'

interface UseScrollAnimationOptions {
  /** 요소가 뷰포트에 얼마나 보여야 트리거할지 (0-1) */
  threshold?: number
  /** 루트 마진 (CSS 마진 형식) */
  rootMargin?: string
  /** 한 번만 트리거할지 여부 */
  triggerOnce?: boolean
}

/**
 * 스크롤 애니메이션을 위한 Intersection Observer 훅
 *
 * @example
 * const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 })
 *
 * return (
 *   <div ref={ref} className={isVisible ? 'fade-in' : 'fade-out'}>
 *     Content
 *   </div>
 * )
 */
export const useScrollAnimation = <T extends HTMLElement = HTMLDivElement>(
  options: UseScrollAnimationOptions = {},
) => {
  const { threshold = 0.1, rootMargin = '0px', triggerOnce = true } = options

  const ref = useRef<T>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (triggerOnce) {
            observer.unobserve(element)
          }
        } else if (!triggerOnce) {
          setIsVisible(false)
        }
      },
      { threshold, rootMargin },
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [threshold, rootMargin, triggerOnce])

  return { ref, isVisible }
}

export default useScrollAnimation
