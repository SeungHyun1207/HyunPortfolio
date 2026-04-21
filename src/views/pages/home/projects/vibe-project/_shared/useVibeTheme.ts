/**
 * 바이브 프로젝트 공용 색상 테마 훅
 * SettingsContext의 theme 값에 따라 다크/라이트 색상을 반환
 */

import { useSettings } from '@/contexts/SettingsContext'

export interface VibeColors {
  bg: string
  card: string
  cardHover: string
  border: string
  borderLight: string
  text: string
  textSec: string
  textDim: string
  accent: string
  green: string
  red: string
  cyan: string
  purple: string
  indigo: string
  /** 현재 테마 모드 */
  isDark: boolean
}

const DARK: VibeColors = {
  bg:          '#07090d',
  card:        '#0c1018',
  cardHover:   '#111822',
  border:      '#182030',
  borderLight: '#253545',
  text:        '#ffffff',
  textSec:     '#94a3b8',
  textDim:     '#64748b',
  accent:      '#f59e0b',
  green:       '#00ff88',
  red:         '#f43f5e',
  cyan:        '#00c8ff',
  purple:      '#c084fc',
  indigo:      '#6366f1',
  isDark:      true,
}

const LIGHT: VibeColors = {
  bg:          '#f1f5f9',
  card:        '#ffffff',
  cardHover:   '#f8fafc',
  border:      '#cbd5e1',
  borderLight: '#94a3b8',
  text:        '#0f172a',
  textSec:     '#334155',  // 라벨/제목 (진한 회색)
  textDim:     '#64748b',  // 보조 텍스트
  accent:      '#b45309',  // 진한 amber (대비 ↑)
  green:       '#059669',
  red:         '#dc2626',
  cyan:        '#0284c7',
  purple:      '#7c3aed',
  indigo:      '#4f46e5',
  isDark:      false,
}

export function useVibeTheme(): VibeColors {
  const { theme } = useSettings()
  return theme === 'light' ? LIGHT : DARK
}
