/**
 * 클래스명 병합 유틸리티
 *
 * 조건부 클래스명을 깔끔하게 병합할 수 있습니다.
 *
 * @example
 * cn('btn', isActive && 'btn-active', isDisabled && 'btn-disabled')
 * // isActive=true, isDisabled=false → 'btn btn-active'
 *
 * cn(styles.container, className)
 * // CSS Module과 외부 className 병합
 */
export const cn = (
  ...classes: (string | boolean | undefined | null)[]
): string => {
  return classes.filter(Boolean).join(' ')
}

export default cn
