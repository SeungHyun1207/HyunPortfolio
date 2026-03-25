/**
 * GitHubHeatmapIndex
 * GitHub Contribution Heatmap — 실제 GitHub API 연동
 */

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import {
  fetchContributions,
  fetchLanguageStats,
  type ContributionDay,
  type LangStat,
} from '@services/githubService'
import { usePageTranslation } from '@hooks/usePageTranslation'
import { translations } from './githeatmap.i18n'

const CELL = 13
const GAP = 2
const STEP = CELL + GAP

// ─── 유틸 ────────────────────────────────────────────────────────────────────

function getColor(count: number): string {
  if (count === 0) return '#1a2332'
  if (count <= 2) return '#0d4020'
  if (count <= 5) return '#0f6030'
  if (count <= 9) return '#14a040'
  return '#00ff88'
}

function calcStats(days: ContributionDay[]) {
  const sorted = [...days].sort((a, b) => a.date.localeCompare(b.date))
  const total = sorted.reduce((s, d) => s + d.contributionCount, 0)

  let longestStreak = 0, currentStreak = 0, tmpStreak = 0
  for (let i = sorted.length - 1; i >= 0; i--) {
    if (sorted[i].contributionCount > 0) currentStreak++
    else break
  }
  for (const d of sorted) {
    if (d.contributionCount > 0) { tmpStreak++; longestStreak = Math.max(longestStreak, tmpStreak) }
    else tmpStreak = 0
  }

  const dayCounts = [0, 0, 0, 0, 0, 0, 0]
  const monthCounts = new Array(12).fill(0)
  for (const d of sorted) {
    const dt = new Date(d.date)
    dayCounts[dt.getDay()] += d.contributionCount
    monthCounts[dt.getMonth()] += d.contributionCount
  }

  return {
    total,
    longestStreak,
    currentStreak,
    peakDayIdx: dayCounts.indexOf(Math.max(...dayCounts)),
    peakMonthIdx: monthCounts.indexOf(Math.max(...monthCounts)),
  }
}

import type { WeekRow } from '@models/vibeProject/githeatmap/GitHubHeatmapModel'

function getMonthLabels(weeks: WeekRow[], months: string[]) {
  const labels: { label: string; weekIdx: number }[] = []
  let lastMonth = -1
  weeks.forEach((week, i) => {
    const first = week.days.find((d) => d !== null)
    if (first) {
      const m = new Date(first.date).getMonth()
      if (m !== lastMonth) { labels.push({ label: months[m], weekIdx: i }); lastMonth = m }
    }
  })
  return labels
}

// ─── 로딩 스켈레톤 ────────────────────────────────────────────────────────────

const Skeleton = ({ w, h }: { w: number | string; h: number }) => (
  <div style={{
    width: w,
    height: h,
    borderRadius: 4,
    background: 'linear-gradient(90deg, #182030 25%, #253545 50%, #182030 75%)',
    backgroundSize: '200% 100%',
    animation: 'shimmer 1.4s infinite',
  }} />
)

// ─── 에러 뷰 ─────────────────────────────────────────────────────────────────

const ErrorView = ({ message, hint }: { message: string; hint: string }) => (
  <div style={{
    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
    height: 300, gap: 12, color: '#465a72',
  }}>
    <span style={{ fontSize: 32 }}>⚠️</span>
    <p style={{ fontSize: 13, margin: 0 }}>{message}</p>
    <p style={{ fontSize: 11, margin: 0, color: '#2a3a4a' }}>{hint}</p>
  </div>
)

// ─── Component ───────────────────────────────────────────────────────────────

const GitHubHeatmapIndex = () => {
  const { t } = usePageTranslation(translations)
  const MONTHS = t('months').split(',')
  const DAYS = t('days').split(',')
  const username = import.meta.env.VITE_GITHUB_USERNAME as string

  const {
    data: contributionData,
    isLoading: isContribLoading,
    isError: isContribError,
  } = useQuery({
    queryKey: ['github-contributions'],
    queryFn: fetchContributions,
    staleTime: 1000 * 60 * 30, // 30분 캐싱
    retry: 1,
  })

  const {
    data: langStats,
    isLoading: isLangLoading,
  } = useQuery({
    queryKey: ['github-languages'],
    queryFn: fetchLanguageStats,
    staleTime: 1000 * 60 * 30,
    retry: 1,
  })

  const [tooltip, setTooltip] = useState<{ text: string; x: number; y: number } | null>(null)

  // contribution days 평탄화
  const allDays: ContributionDay[] = contributionData?.weeks.flatMap((w) => w.contributionDays) ?? []
  const stats = allDays.length > 0 ? calcStats(allDays) : null

  // 주 단위 그리드 (API 응답은 이미 week 구조)
  const weeks: WeekRow[] = (contributionData?.weeks ?? []).map((w) => ({
    days: w.contributionDays as (ContributionDay | null)[],
  }))
  const monthLabels = getMonthLabels(weeks, MONTHS)

  const isLoading = isContribLoading || isLangLoading

  return (
    <div style={{
      minHeight: 'calc(100vh - 80px)',
      background: '#07090d',
      fontFamily: "'IBM Plex Mono', monospace",
      color: '#bfcfdf',
      padding: '32px',
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600;700&display=swap');
        @keyframes shimmer { 0% { background-position: 200% 0 } 100% { background-position: -200% 0 } }
      `}</style>

      {/* ── 페이지 타이틀 ────────────────────────────────────────────────── */}
      <div style={{ marginBottom: 32, borderBottom: '1px solid #182030', paddingBottom: 24 }}>
        <div style={{ fontSize: 22, fontWeight: 700, color: '#bfcfdf', marginBottom: 6 }}>
          {t('pageTitle')}
        </div>
        <div style={{ fontSize: 11, color: '#465a72', lineHeight: 1.6 }}>
          {t('pageDesc')}
        </div>
      </div>

      {/* ── 헤더 ─────────────────────────────────────────────────────────── */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
          <div style={{
            width: 22, height: 22, background: '#00ff88', borderRadius: 3,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ fontSize: 8, fontWeight: 800, color: '#07090d' }}>GIT</span>
          </div>
          <span style={{ fontSize: 18, fontWeight: 700, color: '#bfcfdf' }}>{username}</span>
          <span style={{
            fontSize: 10, padding: '2px 8px', borderRadius: 10,
            border: '1px solid #00ff8866', color: '#00ff88', background: '#00ff8818',
          }}>
            {t('contributionGraph')}
          </span>
          {!isLoading && !isContribError && (
            <span style={{
              fontSize: 10, padding: '2px 8px', borderRadius: 10,
              border: '1px solid #3178c644', color: '#3178c6', background: '#3178c618',
            }}>
              {t('live')}
            </span>
          )}
        </div>
        <p style={{ fontSize: 11, color: '#465a72', margin: 0 }}>
          {new Date(new Date().setFullYear(new Date().getFullYear() - 1)).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          {' — '}
          {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
        </p>
      </div>

      {isContribError ? (
        <ErrorView message={t('apiError')} hint={t('apiErrorHint')} />
      ) : (
        <>
          {/* ── 통계 카드 ──────────────────────────────────────────────────── */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 10, marginBottom: 28 }}>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <div key={i} style={{ background: '#0c1018', border: '1px solid #182030', borderRadius: 6, padding: '12px 14px' }}>
                  <Skeleton w="60%" h={22} />
                  <div style={{ marginTop: 6 }}><Skeleton w="80%" h={10} /></div>
                </div>
              ))
            ) : stats ? (
              [
                { label: t('totalCommits'),   value: stats.total.toLocaleString(), color: '#00ff88' },
                { label: t('longestStreak'),  value: `${stats.longestStreak}${t('dayUnit')}`,  color: '#00c8ff' },
                { label: t('currentStreak'),  value: `${stats.currentStreak}${t('dayUnit')}`,  color: '#f43f5e' },
                { label: t('peakDay'),        value: DAYS[stats.peakDayIdx],       color: '#ff8c00' },
                { label: t('peakMonth'),      value: MONTHS[stats.peakMonthIdx],   color: '#c084fc' },
              ].map((s) => (
                <div key={s.label} style={{
                  background: '#0c1018', border: '1px solid #182030', borderRadius: 6, padding: '12px 14px',
                }}>
                  <div style={{ fontSize: 18, fontWeight: 700, color: s.color, marginBottom: 2 }}>{s.value}</div>
                  <div style={{ fontSize: 9, color: '#465a72', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{s.label}</div>
                </div>
              ))
            ) : null}
          </div>

          {/* ── 히트맵 ─────────────────────────────────────────────────────── */}
          <div style={{
            background: '#0c1018', border: '1px solid #182030', borderRadius: 6,
            padding: '20px 20px 16px', marginBottom: 20, overflowX: 'auto', position: 'relative',
          }} data-heatmap="">
            {isLoading ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <Skeleton w="100%" h={14} />
                <Skeleton w="100%" h={112} />
              </div>
            ) : (
              <>
                {/* 월 레이블 */}
                <div style={{ position: 'relative', height: 16, marginLeft: 28, marginBottom: 4 }}>
                  {monthLabels.map(({ label, weekIdx }) => (
                    <span key={`${label}-${weekIdx}`} style={{
                      position: 'absolute', left: weekIdx * STEP, fontSize: 10, color: '#465a72',
                    }}>
                      {label}
                    </span>
                  ))}
                </div>

                <div style={{ display: 'flex', gap: 2 }}>
                  {/* 요일 레이블 */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: GAP, marginRight: 4 }}>
                    {DAYS.map((day, i) => (
                      <div key={day} style={{
                        height: CELL, fontSize: 9,
                        color: i % 2 === 1 ? '#465a72' : 'transparent',
                        display: 'flex', alignItems: 'center', width: 24, flexShrink: 0,
                      }}>
                        {day}
                      </div>
                    ))}
                  </div>

                  {/* 주 그리드 */}
                  <div style={{ display: 'flex', gap: GAP, position: 'relative' }}>
                    {weeks.map((week: WeekRow, wi: number) => (
                      <div key={wi} style={{ display: 'flex', flexDirection: 'column', gap: GAP }}>
                        {week.days.map((day: ContributionDay | null, di: number) => (
                          <div
                            key={di}
                            style={{
                              width: CELL, height: CELL, borderRadius: 2,
                              background: day ? getColor(day.contributionCount) : 'transparent',
                              cursor: day ? 'pointer' : 'default',
                              transition: 'transform 0.1s',
                              flexShrink: 0,
                            }}
                            onMouseEnter={(e) => {
                              if (!day) return
                              e.currentTarget.style.transform = 'scale(1.3)'
                              const rect = e.currentTarget.getBoundingClientRect()
                              const parentRect = (e.currentTarget.closest('[data-heatmap]') as HTMLElement)?.getBoundingClientRect()
                              setTooltip({
                                text: `${day.contributionCount} ${day.contributionCount !== 1 ? t('commits') : t('commit')} — ${day.date}`,
                                x: rect.left - (parentRect?.left ?? 0) + CELL / 2,
                                y: rect.top - (parentRect?.top ?? 0) - 28,
                              })
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.transform = 'scale(1)'
                              setTooltip(null)
                            }}
                          />
                        ))}
                      </div>
                    ))}

                    {tooltip && (
                      <div style={{
                        position: 'absolute', left: tooltip.x, top: tooltip.y,
                        transform: 'translateX(-50%)', background: '#182030',
                        border: '1px solid #253545', borderRadius: 4, padding: '4px 8px',
                        fontSize: 10, color: '#bfcfdf', whiteSpace: 'nowrap',
                        pointerEvents: 'none', zIndex: 10,
                      }}>
                        {tooltip.text}
                      </div>
                    )}
                  </div>
                </div>

                {/* 범례 */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 10, marginLeft: 28 }}>
                  <span style={{ fontSize: 9, color: '#465a72', marginRight: 4 }}>{t('less')}</span>
                  {[0, 2, 5, 9, 15].map((v) => (
                    <div key={v} style={{ width: CELL, height: CELL, borderRadius: 2, background: getColor(v) }} />
                  ))}
                  <span style={{ fontSize: 9, color: '#465a72', marginLeft: 4 }}>{t('more')}</span>
                </div>
              </>
            )}
          </div>

          {/* ── 언어 통계 ───────────────────────────────────────────────────── */}
          <div style={{
            background: '#0c1018', border: '1px solid #182030', borderRadius: 6, padding: '16px 20px',
          }}>
            <div style={{ fontSize: 11, color: '#465a72', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              {t('languageBreakdown')}
            </div>

            {isLangLoading || !langStats ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <Skeleton w="100%" h={8} />
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
                  {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} w="100%" h={36} />)}
                </div>
              </div>
            ) : (
              <>
                {/* 프로그레스 바 */}
                <div style={{ display: 'flex', borderRadius: 3, overflow: 'hidden', height: 8, marginBottom: 16 }}>
                  {langStats.map((s: LangStat) => (
                    <div key={s.lang} style={{ width: `${s.percent}%`, background: s.color }} />
                  ))}
                </div>

                {/* 언어 목록 */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
                  {langStats.map((s: LangStat) => (
                    <div key={s.lang} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: 10, height: 10, borderRadius: '50%', background: s.color, flexShrink: 0 }} />
                      <div>
                        <div style={{ fontSize: 11, color: '#bfcfdf', fontWeight: 600 }}>{s.lang}</div>
                        <div style={{ fontSize: 9, color: '#465a72' }}>{s.percent}%</div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default GitHubHeatmapIndex
