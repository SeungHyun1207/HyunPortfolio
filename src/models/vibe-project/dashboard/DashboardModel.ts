export type TimeRange = 'today' | '7d' | '30d' | 'all'

export type VisitorAction =
  | 'page_view'
  | 'section_scroll'
  | 'project_click'
  | 'contact_click'
  | 'resume_download'
  | 'github_click'
  | 'external_link'
  | 'scroll_depth'

/** 한 번의 방문/이벤트 기록 */
export interface VisitRecord {
  id: string
  timestamp: string
  page: string
  action: VisitorAction
  detail: string
  referrer: string
  /** 디바이스 타입 */
  device: 'desktop' | 'mobile' | 'tablet'
  /** 브라우저 이름 */
  browser: string
  /** 사용자 언어 (navigator.language) */
  language: string
  /** 체류시간 (ms) — page_view 이벤트에서 이전 페이지 체류시간을 기록 */
  duration?: number
  /** 스크롤 깊이 (0~100%) — scroll_depth 이벤트 전용 */
  scrollDepth?: number
}

/** 일별 집계 */
export interface DailyStat {
  date: string
  visits: number
  pageViews: number
}

/** 섹션별 조회 집계 */
export interface SectionStat {
  section: string
  views: number
  color: string
}

/** 유입 경로 집계 */
export interface ReferrerStat {
  label: string
  count: number
  color: string
}

/** 페이지별 인기 순위 */
export interface PageRank {
  page: string
  views: number
  avgDuration: number
}

/** 시간대별 히트맵 셀 */
export interface HeatmapCell {
  day: number   // 0(일)~6(토)
  hour: number  // 0~23
  count: number
}
