/**
 * DashboardIndex
 * 포트폴리오 Analytics 대시보드
 * localStorage 기반 실제 방문 기록 — 하드코딩 가짜 데이터 없음
 *
 * 동작 방식:
 * 1. 포트폴리오 내 다른 페이지(Home, 프로젝트 등)를 방문할 때마다
 *    localStorage에 VisitRecord가 쌓임
 * 2. 이 대시보드에서 쌓인 기록을 읽어 시각화
 * 3. 데이터가 0이면 빈 상태를 솔직하게 표시
 */

import { useState, useEffect, useCallback, useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { usePageTranslation } from '@hooks/usePageTranslation'
import { translations } from './dashboard.i18n'
import { useVibeTheme, type VibeColors } from '../_shared/useVibeTheme'
import type {
  TimeRange,
  VisitRecord,
  VisitorAction,
  DailyStat,
  SectionStat,
  ReferrerStat,
  PageRank,
  HeatmapCell,
} from '@models/vibe-project/dashboard/DashboardModel'

const STORAGE_KEY = 'hyun-portfolio-analytics'

// ─── localStorage 유틸 ──────────────────────────────────────────────────────

const TTL_MS = 7 * 24 * 60 * 60 * 1000 // 7일

/** 7일 지난 기록 자동 제거 후 반환 */
function loadRecords(): VisitRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const all = JSON.parse(raw) as VisitRecord[]
    const cutoff = Date.now() - TTL_MS
    const fresh = all.filter(r => new Date(r.timestamp).getTime() >= cutoff)
    // 만료된 레코드가 있었으면 정리 저장
    if (fresh.length !== all.length) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(fresh))
    }
    return fresh
  } catch { return [] }
}

function saveRecords(records: VisitRecord[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records))
}

// ─── UA 파싱 유틸 ───────────────────────────────────────────────────────────

function detectDevice(): 'desktop' | 'mobile' | 'tablet' {
  const ua = navigator.userAgent.toLowerCase()
  if (/ipad|tablet|playbook|silk/.test(ua)) return 'tablet'
  if (/mobile|iphone|ipod|android.*mobile|windows phone/.test(ua)) return 'mobile'
  return 'desktop'
}

function detectBrowser(): string {
  const ua = navigator.userAgent
  if (ua.includes('Arc')) return 'Arc'
  if (ua.includes('Edg/')) return 'Edge'
  if (ua.includes('OPR/') || ua.includes('Opera')) return 'Opera'
  if (ua.includes('Firefox/')) return 'Firefox'
  if (ua.includes('CriOS') || ua.includes('Chrome/')) return 'Chrome'
  if (ua.includes('Safari/') && !ua.includes('Chrome')) return 'Safari'
  return 'Other'
}

const SESSION_KEY = 'hyun-analytics-session'

/**
 * 세션 중복 방지: 같은 탭에서 같은 page+action 조합은 1회만 기록
 * - page_view: 새로고침해도 같은 페이지면 중복 기록 안 함
 * - section_scroll: 같은 섹션 스크롤은 1회만
 * - scroll_depth: 세션당 1회만
 * - duration 기록은 항상 허용 (체류시간은 나갈 때 기록되므로)
 */
function isDuplicate(page: string, action: VisitorAction, detail: string): boolean {
  // duration 기록은 항상 허용
  if (detail.includes('— duration')) return false

  try {
    const raw = sessionStorage.getItem(SESSION_KEY)
    const visited: string[] = raw ? JSON.parse(raw) : []
    const key = `${action}::${page}::${detail}`
    if (visited.includes(key)) return true
    visited.push(key)
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(visited))
    return false
  } catch { return false }
}

/** 현재 페이지 방문을 기록 (7일 보관, 세션 내 중복 방지) */
export function trackVisit(
  page: string,
  action: VisitorAction,
  detail: string,
  extra?: { duration?: number; scrollDepth?: number }
) {
  if (isDuplicate(page, action, detail)) return

  const records = loadRecords()
  const record: VisitRecord = {
    id: `v-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    timestamp: new Date().toISOString(),
    page,
    action,
    detail,
    referrer: document.referrer || 'direct',
    device: detectDevice(),
    browser: detectBrowser(),
    language: navigator.language || 'unknown',
    duration: extra?.duration,
    scrollDepth: extra?.scrollDepth,
  }
  records.push(record)
  saveRecords(records)
}

// ─── 집계 유틸 ──────────────────────────────────────────────────────────────

function getToday(): string { return new Date().toISOString().slice(0, 10) }

function filterByRange(records: VisitRecord[], range: TimeRange): VisitRecord[] {
  if (range === 'all') return records
  const now = Date.now()
  const ms: Record<string, number> = { today: 86400000, '7d': 7 * 86400000, '30d': 30 * 86400000 }
  return records.filter(r => new Date(r.timestamp).getTime() >= now - (ms[range] ?? 0))
}

function buildDailyStats(records: VisitRecord[]): DailyStat[] {
  const map = new Map<string, { visits: number; pageViews: number }>()
  for (const r of records) {
    const date = r.timestamp.slice(0, 10)
    const e = map.get(date) ?? { visits: 0, pageViews: 0 }
    e.pageViews++
    if (r.action === 'page_view') e.visits++
    map.set(date, e)
  }
  return Array.from(map.entries()).map(([date, s]) => ({ date, ...s })).sort((a, b) => a.date.localeCompare(b.date))
}

function buildSectionStats(records: VisitRecord[], t: (k: string) => string, C: VibeColors): SectionStat[] {
  const meta: [string, string, string][] = [
    ['hero', 'hero', C.accent], ['about', 'about', C.cyan], ['skills', 'skills', C.green],
    ['projects', 'projects', C.purple], ['experience', 'experience', C.indigo], ['contact', 'contact', C.red],
  ]
  const counts = new Map<string, number>()
  for (const r of records) {
    const d = r.detail.toLowerCase()
    for (const [key] of meta) { if (d.includes(key)) counts.set(key, (counts.get(key) ?? 0) + 1) }
  }
  return meta.map(([key, tKey, color]) => ({ section: t(tKey), views: counts.get(key) ?? 0, color }))
}

function buildReferrerStats(records: VisitRecord[], t: (k: string) => string, C: VibeColors): ReferrerStat[] {
  const map = new Map<string, number>()
  for (const r of records) {
    const ref = r.referrer.toLowerCase()
    const label = ref.includes('github') ? t('github') : ref.includes('linkedin') ? t('linkedin')
      : (ref.includes('google') || ref.includes('bing') || ref.includes('naver')) ? t('search')
      : (ref === 'direct' || ref === '') ? t('direct') : t('other')
    map.set(label, (map.get(label) ?? 0) + 1)
  }
  const cm: Record<string, string> = {}
  cm[t('direct')] = C.accent; cm[t('github')] = C.text; cm[t('linkedin')] = C.cyan
  cm[t('search')] = C.green; cm[t('other')] = C.purple
  return Array.from(map.entries()).map(([l, c]) => ({ label: l, count: c, color: cm[l] ?? C.textSec })).sort((a, b) => b.count - a.count)
}

function buildPageRanks(records: VisitRecord[]): PageRank[] {
  const views = new Map<string, number>()
  const durations = new Map<string, number[]>()
  for (const r of records) {
    if (r.action !== 'page_view') continue
    const p = r.detail.split(' — ')[0]
    views.set(p, (views.get(p) ?? 0) + 1)
    if (r.duration && r.duration > 1000) {
      const arr = durations.get(p) ?? []
      arr.push(r.duration)
      durations.set(p, arr)
    }
  }
  return Array.from(views.entries()).map(([page, v]) => {
    const durs = durations.get(page) ?? []
    const avg = durs.length > 0 ? durs.reduce((a, b) => a + b, 0) / durs.length : 0
    return { page, views: v, avgDuration: Math.round(avg / 1000) }
  }).sort((a, b) => b.views - a.views)
}

function buildHeatmap(records: VisitRecord[]): HeatmapCell[] {
  const grid: number[][] = Array.from({ length: 7 }, () => Array(24).fill(0))
  for (const r of records) {
    const d = new Date(r.timestamp)
    grid[d.getDay()][d.getHours()]++
  }
  const cells: HeatmapCell[] = []
  for (let day = 0; day < 7; day++) for (let hour = 0; hour < 24; hour++) cells.push({ day, hour, count: grid[day][hour] })
  return cells
}

function buildDeviceStats(records: VisitRecord[], C: VibeColors): { device: string; count: number; color: string }[] {
  const map = new Map<string, number>()
  for (const r of records) { map.set(r.device ?? 'desktop', (map.get(r.device ?? 'desktop') ?? 0) + 1) }
  const cm: Record<string, string> = { desktop: C.accent, mobile: C.cyan, tablet: C.purple }
  return Array.from(map.entries()).map(([d, c]) => ({ device: d, count: c, color: cm[d] ?? C.textSec })).sort((a, b) => b.count - a.count)
}

function buildBrowserStats(records: VisitRecord[], C: VibeColors): { browser: string; count: number; color: string }[] {
  const map = new Map<string, number>()
  for (const r of records) { map.set(r.browser ?? 'Other', (map.get(r.browser ?? 'Other') ?? 0) + 1) }
  const colors = [C.accent, C.cyan, C.green, C.purple, C.red, C.indigo]
  return Array.from(map.entries()).map(([b, c], i) => ({ browser: b, count: c, color: colors[i % colors.length] })).sort((a, b) => b.count - a.count)
}

function buildLangStats(records: VisitRecord[], C: VibeColors): { lang: string; count: number; color: string }[] {
  const map = new Map<string, number>()
  for (const r of records) {
    const lang = (r.language ?? 'unknown').slice(0, 2).toUpperCase()
    map.set(lang, (map.get(lang) ?? 0) + 1)
  }
  const cm: Record<string, string> = { KO: C.accent, EN: C.cyan, JA: C.green, ZH: C.red }
  return Array.from(map.entries()).map(([l, c]) => ({ lang: l, count: c, color: cm[l] ?? C.purple })).sort((a, b) => b.count - a.count)
}

function getMaxScrollDepth(records: VisitRecord[]): number {
  let max = 0
  for (const r of records) { if (r.scrollDepth && r.scrollDepth > max) max = r.scrollDepth }
  return max
}

// ─── 액션 정보 ──────────────────────────────────────────────────────────────

const actionIcons: Record<VisitorAction, string> = {
  page_view: '👁', section_scroll: '📜', project_click: '🖱️',
  contact_click: '📧', resume_download: '📄', github_click: '🔗', external_link: '↗️', scroll_depth: '📏',
}

function makeActionColors(C: VibeColors): Record<VisitorAction, string> {
  return {
    page_view: C.cyan, section_scroll: C.textSec, project_click: C.accent,
    contact_click: C.green, resume_download: C.purple, github_click: C.text, external_link: C.indigo, scroll_depth: C.accent,
  }
}

// ─── SVG Sub-components ─────────────────────────────────────────────────────

const SparklineSVG = ({ data, color, width = 80, height = 28 }: {
  data: number[]; color?: string; width?: number; height?: number
}) => {
  const C = useVibeTheme()
  color = color ?? C.accent
  if (data.length < 2) return <div style={{ width, height }} />
  const min = Math.min(...data), max = Math.max(...data), range = max - min || 1
  const gid = `sp-${color.replace('#', '')}`
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * width},${height - 3 - ((v - min) / range) * (height - 6)}`).join(' ')
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <defs><linearGradient id={gid} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={color} stopOpacity={0.25} /><stop offset="100%" stopColor={color} stopOpacity={0} /></linearGradient></defs>
      <polygon points={`0,${height} ${pts} ${width},${height}`} fill={`url(#${gid})`} />
      <polyline points={pts} fill="none" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const BarChart = ({ data, hoveredIdx, setHoveredIdx, labelKey }: { data: DailyStat[]; hoveredIdx: number | null; setHoveredIdx: (i: number | null) => void; labelKey: string }) => {
  const C = useVibeTheme()
  if (!data.length) return null
  const W = 600, H = 220, pad = { top: 16, right: 16, bottom: 30, left: 40 }
  const cw = W - pad.left - pad.right, ch = H - pad.top - pad.bottom
  const maxVal = Math.max(...data.map(d => d.pageViews), 1)
  const barW = Math.max(4, Math.min(20, (cw / data.length) * 0.7)), gap = cw / data.length
  const gridLines = Array.from({ length: 5 }, (_, i) => Math.round((maxVal / 4) * i))
  const labelStep = data.length > 20 ? Math.ceil(data.length / 8) : data.length > 10 ? 2 : 1
  return (
    <div style={{ position: 'relative' }}>
      <svg width="100%" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet">
        {gridLines.map(v => (<g key={v}><line x1={pad.left} y1={pad.top + ch - (v / maxVal) * ch} x2={W - pad.right} y2={pad.top + ch - (v / maxVal) * ch} stroke={C.border} strokeWidth={1} strokeDasharray="4 4" /><text x={pad.left - 6} y={pad.top + ch - (v / maxVal) * ch + 4} textAnchor="end" fill={C.textSec} fontSize={11} fontFamily="'IBM Plex Mono', monospace">{v}</text></g>))}
        {data.map((d, i) => { const x = pad.left + i * gap + (gap - barW) / 2, barH = (d.pageViews / maxVal) * ch; return (
          <g key={d.date}><rect x={x} y={pad.top + ch - barH} width={barW} height={barH} rx={2} fill={hoveredIdx === i ? C.accent : `${C.accent}88`} style={{ cursor: 'pointer', transition: 'fill 0.15s' }} onMouseEnter={() => setHoveredIdx(i)} onMouseLeave={() => setHoveredIdx(null)} />
          {d.visits > 0 && <circle cx={x + barW / 2} cy={pad.top + ch - (d.visits / maxVal) * ch} r={3} fill={C.cyan} stroke={C.card} strokeWidth={1} />}
          {i % labelStep === 0 && <text x={x + barW / 2} y={H - 6} textAnchor="middle" fill={C.textSec} fontSize={10} fontFamily="'IBM Plex Mono', monospace">{d.date.slice(5)}</text>}</g>)})}
      </svg>
      {hoveredIdx !== null && data[hoveredIdx] && (
        <div style={{ position: 'absolute', left: `${((pad.left + hoveredIdx * gap + gap / 2) / W) * 100}%`, top: 0, transform: 'translateX(-50%)', background: C.cardHover, border: `1px solid ${C.borderLight}`, borderRadius: 4, padding: '5px 12px', whiteSpace: 'nowrap', fontSize: 12, color: C.text, pointerEvents: 'none', zIndex: 10, fontFamily: "'IBM Plex Mono', monospace" }}>
          <div style={{ color: C.textSec, marginBottom: 2 }}>{data[hoveredIdx].date}</div>
          <span style={{ color: C.accent, fontWeight: 700 }}>{data[hoveredIdx].pageViews}</span><span style={{ color: C.textSec }}> PV</span>
          <span style={{ color: C.cyan, marginLeft: 8 }}>{data[hoveredIdx].visits}</span><span style={{ color: C.textSec }}> {labelKey}</span>
        </div>)}
    </div>)
}

const HBarChart = ({ items, labelWidth = 72 }: { items: { label: string; value: number; color: string; sub?: string }[]; labelWidth?: number }) => {
  const C = useVibeTheme()
  const maxV = Math.max(...items.map(i => i.value), 1)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
      {items.map(i => (
        <div key={i.label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 12, color: C.textSec, width: labelWidth, textAlign: 'right', flexShrink: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{i.label}</span>
          <div style={{ flex: 1, height: 22, background: C.border, borderRadius: 3, overflow: 'hidden', position: 'relative' }}>
            <div style={{ height: '100%', borderRadius: 3, width: i.value > 0 ? `${Math.max(2, (i.value / maxV) * 100)}%` : '0%', background: `linear-gradient(90deg, ${i.color}88, ${i.color})`, transition: 'width 0.6s ease' }} />
            {i.value > 0 && <span style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', fontSize: 11, color: C.text, fontWeight: 600 }}>{i.value}{i.sub ? ` · ${i.sub}` : ''}</span>}
          </div>
        </div>
      ))}
    </div>)
}

const DonutChart = ({ data }: { data: { label: string; count: number; color: string }[] }) => {
  const C = useVibeTheme()
  const total = data.reduce((s, d) => s + d.count, 0)
  if (!total) return null
  const R = 55, cx = 70, cy = 70, sw = 20, circ = 2 * Math.PI * R
  let cum = 0
  const segs = data.map(d => { const arc = (d.count / total) * circ, off = cum; cum += arc; return { ...d, arc, off } })
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <svg width={140} height={140} viewBox="0 0 140 140" style={{ flexShrink: 0 }}>
        {segs.map(s => <circle key={s.label} cx={cx} cy={cy} r={R} fill="none" stroke={s.color} strokeWidth={sw} strokeDasharray={`${s.arc} ${circ}`} strokeDashoffset={-s.off} transform={`rotate(-90 ${cx} ${cy})`} />)}
        <text x={cx} y={cy + 5} textAnchor="middle" fill={C.text} fontSize={20} fontWeight={700} fontFamily="'IBM Plex Mono', monospace">{total}</text>
      </svg>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {data.map(d => (<div key={d.label} style={{ display: 'flex', alignItems: 'center', gap: 7 }}><div style={{ width: 8, height: 8, borderRadius: '50%', background: d.color, flexShrink: 0 }} /><span style={{ fontSize: 12, color: C.text, fontWeight: 500 }}>{d.label}</span><span style={{ fontSize: 11, color: C.textSec }}>{d.count}</span></div>))}
      </div>
    </div>)
}

const HeatmapSVG = ({ cells, dayLabels }: { cells: HeatmapCell[]; dayLabels: string[] }) => {
  const C = useVibeTheme()
  const maxC = Math.max(...cells.map(c => c.count), 1)
  const sz = 16, gap = 2, lw = 28
  const getColor = (count: number) => count === 0 ? C.border : count <= maxC * 0.25 ? `${C.accent}40` : count <= maxC * 0.5 ? `${C.accent}80` : count <= maxC * 0.75 ? `${C.accent}bb` : C.accent
  return (
    <svg width={lw + 24 * (sz + gap)} height={7 * (sz + gap) + 20} style={{ display: 'block' }}>
      {/* Hour labels */}
      {[0, 3, 6, 9, 12, 15, 18, 21].map(h => <text key={h} x={lw + h * (sz + gap) + sz / 2} y={11} textAnchor="middle" fill={C.textSec} fontSize={10} fontFamily="'IBM Plex Mono', monospace">{h}h</text>)}
      {/* Day labels + cells */}
      {dayLabels.map((label, day) => (
        <g key={day}>
          <text x={lw - 4} y={18 + day * (sz + gap) + sz / 2 + 4} textAnchor="end" fill={C.textSec} fontSize={10} fontFamily="'IBM Plex Mono', monospace">{label}</text>
          {Array.from({ length: 24 }, (_, h) => {
            const cell = cells.find(c => c.day === day && c.hour === h)
            return <rect key={h} x={lw + h * (sz + gap)} y={18 + day * (sz + gap)} width={sz} height={sz} rx={2} fill={getColor(cell?.count ?? 0)}><title>{cell?.count ?? 0}</title></rect>
          })}
        </g>
      ))}
    </svg>)
}

const EmptyState = ({ message, hint }: { message: string; hint: string }) => {
  const C = useVibeTheme()
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '32px 16px', color: C.textSec, gap: 8 }}>
      <span style={{ fontSize: 32, opacity: 0.4 }}>📊</span>
      <span style={{ fontSize: 14 }}>{message}</span>
      {hint && <span style={{ fontSize: 12, color: C.textDim }}>{hint}</span>}
    </div>
  )
}

// ─── Card wrapper ───────────────────────────────────────────────────────────

const Card = ({ title, children, mounted, delay, maxHeight, className }: {
  title: string; children: React.ReactNode; mounted: boolean; delay: number; maxHeight?: number; className?: string
}) => {
  const C = useVibeTheme()
  return (
    <div className={className} style={{
      background: C.card, border: `1px solid ${C.border}`, borderRadius: 8,
      display: 'flex', flexDirection: 'column', maxHeight,
      opacity: mounted ? 1 : 0, transform: mounted ? 'translateY(0)' : 'translateY(10px)',
      transition: `all 0.5s ease ${delay}ms`,
    }}>
      <div style={{ padding: '12px 20px', borderBottom: `1px solid ${C.border}`, flexShrink: 0 }}>
        <span style={{ fontSize: 13, color: C.textSec, textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 }}>{title}</span>
      </div>
      <div style={{ padding: '14px 20px', flex: 1, overflow: 'auto' }} className="dash-scroll">{children}</div>
    </div>
  )
}

// ─── Main Component ─────────────────────────────────────────────────────────

const DashboardIndex = () => {
  const { t } = usePageTranslation(translations)
  const location = useLocation()
  const C = useVibeTheme()
  const actionColors = useMemo(() => makeActionColors(C), [C])

  const [records, setRecords] = useState<VisitRecord[]>(() => loadRecords())
  const [timeRange, setTimeRange] = useState<TimeRange>('all')
  const [hoveredChartIdx, setHoveredChartIdx] = useState<number | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setRecords(loadRecords()) }, [location.pathname])
  useEffect(() => { const fn = (e: StorageEvent) => { if (e.key === STORAGE_KEY) setRecords(loadRecords()) }; window.addEventListener('storage', fn); return () => window.removeEventListener('storage', fn) }, [])
  useEffect(() => { const id = setInterval(() => setRecords(loadRecords()), 5000); return () => clearInterval(id) }, [])
  useEffect(() => { requestAnimationFrame(() => setMounted(true)) }, [])

  const filtered = useMemo(() => filterByRange(records, timeRange), [records, timeRange])
  const dailyStats = useMemo(() => buildDailyStats(filtered), [filtered])
  const sectionStats = useMemo(() => buildSectionStats(filtered, t, C), [filtered, t, C])
  const referrerStats = useMemo(() => buildReferrerStats(filtered, t, C), [filtered, t, C])
  const pageRanks = useMemo(() => buildPageRanks(filtered), [filtered])
  const heatmapCells = useMemo(() => buildHeatmap(filtered), [filtered])
  const deviceStats = useMemo(() => buildDeviceStats(filtered, C), [filtered, C])
  const browserStats = useMemo(() => buildBrowserStats(filtered, C), [filtered, C])
  const langStats = useMemo(() => buildLangStats(filtered, C), [filtered, C])
  const maxScroll = useMemo(() => getMaxScrollDepth(filtered), [filtered])

  const totalVisits = filtered.filter(r => r.action === 'page_view').length
  const todayVisits = records.filter(r => r.timestamp.slice(0, 10) === getToday() && r.action === 'page_view').length
  const totalPV = filtered.length
  const uniqueDays = new Set(filtered.map(r => r.timestamp.slice(0, 10))).size

  const last7 = useMemo(() => {
    const days: number[] = []
    for (let i = 6; i >= 0; i--) { const d = new Date(Date.now() - i * 86400000).toISOString().slice(0, 10); days.push(records.filter(r => r.timestamp.slice(0, 10) === d).length) }
    return days
  }, [records])

  const handleClear = useCallback(() => { if (window.confirm(t('clearConfirm'))) { localStorage.removeItem(STORAGE_KEY); setRecords([]) } }, [t])

  const timeRanges: { key: TimeRange; label: string }[] = [
    { key: 'today', label: t('today') }, { key: '7d', label: t('days7') }, { key: 'all', label: t('all') },
  ]

  const actionLabel = (action: VisitorAction): string => {
    const m: Record<VisitorAction, string> = { page_view: t('pageView'), section_scroll: t('sectionScroll'), project_click: t('projectClick'), contact_click: t('contactClick'), resume_download: t('resumeDownload'), github_click: t('githubClick'), external_link: t('externalLink'), scroll_depth: 'Scroll Depth' }
    return m[action] ?? action
  }

  const hasData = records.length > 0
  const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  return (
    <div style={{ minHeight: '100vh', background: C.bg, fontFamily: "'IBM Plex Mono', monospace", color: C.text, padding: 24 }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600;700&display=swap');
        @keyframes pulse { 0%,100% { opacity:1 } 50% { opacity:0.4 } }
        @keyframes fadeSlideIn { from { opacity:0; transform:translateY(8px) } to { opacity:1; transform:translateY(0) } }
        .dash-scroll::-webkit-scrollbar { width: 3px; }
        .dash-scroll::-webkit-scrollbar-track { background: transparent; }
        .dash-scroll::-webkit-scrollbar-thumb { background: ${C.borderLight}; border-radius: 2px; }
      `}</style>

      {/* ── Header ────────────────────────────────────────────────────────── */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, paddingBottom: 16, borderBottom: `1px solid ${C.border}`, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
            <div style={{ width: 26, height: 26, background: C.accent, borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: 10, fontWeight: 800, color: C.bg }}>PTF</span>
            </div>
            <span style={{ fontSize: 22, fontWeight: 700 }}>{t('pageTitle')}</span>
            {hasData && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 12, padding: '3px 10px', borderRadius: 10, border: `1px solid ${C.green}66`, color: C.green, background: `${C.green}18`, fontWeight: 600 }}><span style={{ width: 7, height: 7, borderRadius: '50%', background: C.green, animation: 'pulse 2s infinite' }} />{records.length} records</span>}
          </div>
          <div style={{ fontSize: 13, color: C.textSec }}>{t('pageDesc')}</div>
        </div>
        <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
          {timeRanges.map(({ key, label }) => (
            <button key={key} type="button" onClick={() => setTimeRange(key)} style={{ padding: '7px 14px', borderRadius: 4, cursor: 'pointer', fontSize: 13, fontFamily: "'IBM Plex Mono', monospace", fontWeight: 600, border: '1px solid', background: timeRange === key ? `${C.accent}18` : 'transparent', borderColor: timeRange === key ? `${C.accent}66` : C.border, color: timeRange === key ? C.accent : C.textSec, transition: 'all 0.15s' }}>{label}</button>
          ))}
          {hasData && <button type="button" onClick={handleClear} style={{ padding: '7px 12px', borderRadius: 4, cursor: 'pointer', marginLeft: 8, fontSize: 12, fontFamily: "'IBM Plex Mono', monospace", fontWeight: 600, border: `1px solid ${C.red}44`, color: C.red, background: 'transparent' }}>{t('clearData')}</button>}
        </div>
      </div>

      {/* ── KPI Row ───────────────────────────────────────────────────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginBottom: 16 }}>
        {[
          { label: t('totalVisits'), value: totalVisits, icon: '👥', spark: last7, color: C.accent },
          { label: t('todayVisits'), value: todayVisits, icon: '📅', spark: null, color: C.cyan },
          { label: t('totalPageViews'), value: totalPV, icon: '📊', spark: last7, color: C.green },
          { label: t('uniqueDays'), value: uniqueDays, icon: '📆', spark: null, color: C.purple },
        ].map((kpi, idx) => (
          <div key={kpi.label} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: '14px 14px 10px', display: 'flex', flexDirection: 'column', gap: 6, opacity: mounted ? 1 : 0, transform: mounted ? 'translateY(0)' : 'translateY(10px)', transition: `all 0.4s ease ${idx * 60}ms` }}>
            <span style={{ fontSize: 11, color: C.textSec, textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 600 }}>{kpi.icon} {kpi.label}</span>
            <span style={{ fontSize: 28, fontWeight: 700, color: kpi.color, lineHeight: 1 }}>{kpi.value.toLocaleString()}</span>
            {kpi.spark && kpi.spark.some(v => v > 0) && <SparklineSVG data={kpi.spark} color={kpi.color} />}
          </div>
        ))}
      </div>

      {!hasData ? (
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, opacity: mounted ? 1 : 0, transition: 'all 0.5s ease 200ms' }}>
          <EmptyState message={t('noData')} hint={t('noDataHint')} />
        </div>
      ) : (<>
        {/* ── Row 1: Daily Trend + Traffic Sources ──────────────────────── */}
        <div style={{ display: 'grid', gridTemplateColumns: '7fr 3fr', gap: 12, marginBottom: 12 }}>
          <Card title={t('dailyTrend')} mounted={mounted} delay={200}>
            {dailyStats.length > 0 ? <BarChart data={dailyStats} hoveredIdx={hoveredChartIdx} setHoveredIdx={setHoveredChartIdx} labelKey={t('visits')} /> : <EmptyState message={t('noData')} hint="" />}
          </Card>
          <Card title={t('referrerStats')} mounted={mounted} delay={300}>
            {referrerStats.length > 0 ? <DonutChart data={referrerStats} /> : <EmptyState message={t('noData')} hint="" />}
          </Card>
        </div>

        {/* ── Row 2: Page Ranks + Section Hits ─────────────────────────── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
          <Card title="PAGE RANKING" mounted={mounted} delay={350}>
            {pageRanks.length > 0 ? <HBarChart items={pageRanks.map(p => ({ label: p.page, value: p.views, color: C.cyan, sub: p.avgDuration > 0 ? `${p.avgDuration}s` : undefined }))} labelWidth={120} /> : <EmptyState message={t('noData')} hint="" />}
          </Card>
          <Card title={t('sectionHits')} mounted={mounted} delay={400}>
            {sectionStats.some(s => s.views > 0) ? <HBarChart items={sectionStats.map(s => ({ label: s.section, value: s.views, color: s.color }))} /> : <EmptyState message={t('noData')} hint="" />}
          </Card>
        </div>

        {/* ── Row 3: Heatmap + Device/Browser/Language ─────────────────── */}
        <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: 12, marginBottom: 12 }}>
          <Card title="VISIT HEATMAP (Hour x Day)" mounted={mounted} delay={450}>
            <div style={{ overflowX: 'auto' }}><HeatmapSVG cells={heatmapCells} dayLabels={DAY_LABELS} /></div>
            <div style={{ display: 'flex', gap: 4, marginTop: 8, alignItems: 'center' }}>
              <span style={{ fontSize: 11, color: C.textSec }}>Less</span>
              {[C.border, `${C.accent}40`, `${C.accent}80`, `${C.accent}bb`, C.accent].map(c => <div key={c} style={{ width: 14, height: 14, borderRadius: 2, background: c }} />)}
              <span style={{ fontSize: 11, color: C.textSec }}>More</span>
            </div>
          </Card>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {/* Device & Browser */}
            <Card title="DEVICE / BROWSER" mounted={mounted} delay={500}>
              <div style={{ display: 'flex', gap: 16 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 11, color: C.textDim, marginBottom: 8, textTransform: 'uppercase', fontWeight: 600 }}>Device</div>
                  {deviceStats.map(d => (
                    <div key={d.device} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                      <div style={{ width: 6, height: 6, borderRadius: '50%', background: d.color }} />
                      <span style={{ fontSize: 12, color: C.text, flex: 1 }}>{d.device}</span>
                      <span style={{ fontSize: 12, color: C.textSec, fontWeight: 600 }}>{d.count}</span>
                    </div>
                  ))}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 11, color: C.textDim, marginBottom: 8, textTransform: 'uppercase', fontWeight: 600 }}>Browser</div>
                  {browserStats.map(b => (
                    <div key={b.browser} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                      <div style={{ width: 6, height: 6, borderRadius: '50%', background: b.color }} />
                      <span style={{ fontSize: 12, color: C.text, flex: 1 }}>{b.browser}</span>
                      <span style={{ fontSize: 12, color: C.textSec, fontWeight: 600 }}>{b.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Language + Scroll Depth */}
            <Card title="LANGUAGE / SCROLL DEPTH" mounted={mounted} delay={550}>
              <div style={{ display: 'flex', gap: 16 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 11, color: C.textDim, marginBottom: 8, textTransform: 'uppercase', fontWeight: 600 }}>Language</div>
                  {langStats.map(l => (
                    <div key={l.lang} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                      <div style={{ width: 6, height: 6, borderRadius: '50%', background: l.color }} />
                      <span style={{ fontSize: 12, color: C.text, flex: 1 }}>{l.lang}</span>
                      <span style={{ fontSize: 12, color: C.textSec, fontWeight: 600 }}>{l.count}</span>
                    </div>
                  ))}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 11, color: C.textDim, marginBottom: 8, textTransform: 'uppercase', fontWeight: 600 }}>Max Scroll</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
                    <div style={{ flex: 1, height: 12, background: C.border, borderRadius: 6, overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${maxScroll}%`, background: `linear-gradient(90deg, ${C.green}88, ${C.green})`, borderRadius: 6, transition: 'width 0.5s' }} />
                    </div>
                    <span style={{ fontSize: 18, fontWeight: 700, color: C.green }}>{maxScroll}%</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* ── Row 4: Visit Log ─────────────────────────────────────────── */}
        <Card title={t('visitLog')} mounted={mounted} delay={600} maxHeight={400}>
          {filtered.length === 0 ? <EmptyState message={t('noData')} hint="" /> : (
            [...filtered].reverse().map((rec, idx) => (
              <div key={rec.id} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, padding: '7px 0', borderBottom: idx < filtered.length - 1 ? `1px solid ${C.border}40` : 'none', animation: idx === 0 ? 'fadeSlideIn 0.3s ease' : 'none' }}>
                <span style={{ fontSize: 14, flexShrink: 0, marginTop: 1 }}>{actionIcons[rec.action]}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, color: actionColors[rec.action], lineHeight: 1.4, fontWeight: 500 }}>
                    {actionLabel(rec.action)}
                    {rec.detail && rec.detail !== actionLabel(rec.action) && <span style={{ color: C.textSec }}> — {rec.detail}</span>}
                    {rec.duration && rec.duration > 1000 && <span style={{ color: C.accent, marginLeft: 6 }}>{Math.round(rec.duration / 1000)}s</span>}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginTop: 3, fontSize: 11, color: C.textDim }}>
                    <span>{rec.page}</span>
                    <span>·</span>
                    <span>{rec.device ?? 'desktop'} / {rec.browser ?? '?'}</span>
                    <span>·</span>
                    <span>{(rec.language ?? '').slice(0, 2)}</span>
                    <span style={{ marginLeft: 'auto', color: C.textSec }}>{new Date(rec.timestamp).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </Card>
      </>)}
    </div>)
}

export default DashboardIndex
