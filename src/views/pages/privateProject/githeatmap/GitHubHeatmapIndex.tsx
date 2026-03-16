/**
 * GitHubHeatmapIndex
 * GitHub Contribution Heatmap Visualizer
 * Mock 데이터 기반 연간 기여도 히트맵
 */

import { useState, useMemo } from "react";

// ─── 타입 ──────────────────────────────────────────────────────────────────────

interface DayData {
  date: Date;
  dateStr: string;
  count: number;
}

interface WeekData {
  days: (DayData | null)[];
}

interface LangStat {
  lang: string;
  color: string;
  percent: number;
  commits: number;
}

// ─── 상수 ──────────────────────────────────────────────────────────────────────

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const DAYS   = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

const LANG_STATS: LangStat[] = [
  { lang: "TypeScript", color: "#3178c6", percent: 52, commits: 418 },
  { lang: "React/TSX",  color: "#61dafb", percent: 28, commits: 225 },
  { lang: "CSS",        color: "#1572b6", percent: 11, commits:  88 },
  { lang: "Other",      color: "#465a72", percent:  9, commits:  72 },
];

// ─── 색상 ──────────────────────────────────────────────────────────────────────

function getColor(count: number): string {
  if (count === 0) return "#1a2332";
  if (count <= 2)  return "#0d4020";
  if (count <= 5)  return "#0f6030";
  if (count <= 9)  return "#14a040";
  return "#00ff88";
}

// ─── 결정론적 난수 (seed 기반 — 페이지를 새로고침해도 같은 데이터) ───────────────

function seededRand(seed: number): number {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

// ─── Mock 기여도 데이터 생성 ────────────────────────────────────────────────────

function generateContributions(): Map<string, number> {
  const map = new Map<string, number>();
  const today = new Date();

  // 364일 전부터 오늘까지
  for (let i = 364; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const key  = d.toISOString().split("T")[0];
    const seed = d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
    const r    = seededRand(seed);
    const isWeekday = d.getDay() > 0 && d.getDay() < 6;

    let count = 0;
    // 주말은 활동 낮음
    if (isWeekday) {
      if (r > 0.25) count = Math.floor(seededRand(seed + 1) * 14) + 1;
    } else {
      if (r > 0.65) count = Math.floor(seededRand(seed + 2) * 6) + 1;
    }

    // 스프린트 기간 — 활동량 부스트 (특정 seed 구간)
    const sprintBoost = seededRand(seed * 3);
    if (sprintBoost > 0.92 && count > 0) count = Math.min(count + 6, 15);

    map.set(key, count);
  }
  return map;
}

// ─── 주 단위 그리드 생성 ────────────────────────────────────────────────────────

function buildWeeks(contributions: Map<string, number>): WeekData[] {
  const today = new Date();
  const start = new Date(today);
  start.setDate(start.getDate() - 364);
  // 가장 가까운 일요일로 이동
  while (start.getDay() !== 0) start.setDate(start.getDate() - 1);

  const weeks: WeekData[] = [];
  const cur = new Date(start);

  while (cur <= today) {
    const days: (DayData | null)[] = [];
    for (let d = 0; d < 7; d++) {
      if (cur > today) {
        days.push(null);
      } else {
        const dateStr = cur.toISOString().split("T")[0];
        days.push({ date: new Date(cur), dateStr, count: contributions.get(dateStr) ?? 0 });
      }
      cur.setDate(cur.getDate() + 1);
    }
    weeks.push({ days });
  }
  return weeks;
}

// ─── 통계 계산 ─────────────────────────────────────────────────────────────────

function calcStats(contributions: Map<string, number>) {
  const entries = Array.from(contributions.entries()).sort(([a], [b]) => a.localeCompare(b));
  const total   = entries.reduce((s, [, v]) => s + v, 0);

  let longestStreak = 0, currentStreak = 0, tmpStreak = 0;
  for (let i = entries.length - 1; i >= 0; i--) {
    if (entries[i][1] > 0) { currentStreak++; }
    else break;
  }
  for (const [, v] of entries) {
    if (v > 0) { tmpStreak++; longestStreak = Math.max(longestStreak, tmpStreak); }
    else tmpStreak = 0;
  }

  const dayCounts = [0, 0, 0, 0, 0, 0, 0];
  for (const [dateStr, v] of entries) {
    const day = new Date(dateStr).getDay();
    dayCounts[day] += v;
  }
  const peakDayIdx = dayCounts.indexOf(Math.max(...dayCounts));

  const monthCounts = new Array(12).fill(0);
  for (const [dateStr, v] of entries) {
    monthCounts[new Date(dateStr).getMonth()] += v;
  }
  const peakMonthIdx = monthCounts.indexOf(Math.max(...monthCounts));

  return { total, longestStreak, currentStreak, peakDay: DAYS[peakDayIdx], peakMonth: MONTHS[peakMonthIdx] };
}

// ─── 월 레이블 위치 계산 ────────────────────────────────────────────────────────

function getMonthLabels(weeks: WeekData[]): { label: string; weekIdx: number }[] {
  const labels: { label: string; weekIdx: number }[] = [];
  let lastMonth = -1;
  weeks.forEach((week, i) => {
    const firstDay = week.days.find((d) => d !== null);
    if (firstDay) {
      const m = firstDay.date.getMonth();
      if (m !== lastMonth) { labels.push({ label: MONTHS[m], weekIdx: i }); lastMonth = m; }
    }
  });
  return labels;
}

// ─── Component ────────────────────────────────────────────────────────────────

const GitHubHeatmapIndex = () => {
  const contributions = useMemo(() => generateContributions(), []);
  const weeks         = useMemo(() => buildWeeks(contributions), [contributions]);
  const stats         = useMemo(() => calcStats(contributions), [contributions]);
  const monthLabels   = useMemo(() => getMonthLabels(weeks), [weeks]);

  const [tooltip, setTooltip] = useState<{ text: string; x: number; y: number } | null>(null);

  const CELL = 13;   // px
  const GAP  = 2;    // px
  const STEP = CELL + GAP;

  return (
    <div style={{
      minHeight: "calc(100vh - 80px)",
      background: "#07090d",
      fontFamily: "'IBM Plex Mono', monospace",
      color: "#bfcfdf",
      padding: "32px 32px",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600;700&display=swap');
      `}</style>

      {/* ── 헤더 ────────────────────────────────────────────────────────────── */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
          <div style={{
            width: 22, height: 22, background: "#00ff88", borderRadius: 3,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <span style={{ fontSize: 8, fontWeight: 800, color: "#07090d" }}>GIT</span>
          </div>
          <span style={{ fontSize: 18, fontWeight: 700, color: "#bfcfdf" }}>
            SeungHyun1207
          </span>
          <span style={{
            fontSize: 10, padding: "2px 8px", borderRadius: 10,
            border: "1px solid #00ff8866", color: "#00ff88", background: "#00ff8818",
          }}>
            Contribution Graph
          </span>
        </div>
        <p style={{ fontSize: 11, color: "#465a72", margin: 0 }}>
          {new Date(new Date().setDate(new Date().getDate() - 364)).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
          {" — "}
          {new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
        </p>
      </div>

      {/* ── 통계 카드 ────────────────────────────────────────────────────────── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 10, marginBottom: 28 }}>
        {[
          { label: "Total Commits",    value: stats.total.toLocaleString(), color: "#00ff88" },
          { label: "Longest Streak",   value: `${stats.longestStreak}d`,    color: "#00c8ff" },
          { label: "Current Streak",   value: `${stats.currentStreak}d`,    color: "#f43f5e" },
          { label: "Peak Day",         value: stats.peakDay,                color: "#ff8c00" },
          { label: "Peak Month",       value: stats.peakMonth,              color: "#c084fc" },
        ].map((s) => (
          <div key={s.label} style={{
            background: "#0c1018",
            border: "1px solid #182030",
            borderRadius: 6,
            padding: "12px 14px",
          }}>
            <div style={{ fontSize: 18, fontWeight: 700, color: s.color, marginBottom: 2 }}>
              {s.value}
            </div>
            <div style={{ fontSize: 9, color: "#465a72", textTransform: "uppercase", letterSpacing: "0.06em" }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* ── 히트맵 ───────────────────────────────────────────────────────────── */}
      <div style={{
        background: "#0c1018",
        border: "1px solid #182030",
        borderRadius: 6,
        padding: "20px 20px 16px",
        marginBottom: 20,
        overflowX: "auto",
        position: "relative",
      }}>
        {/* 월 레이블 */}
        <div style={{ position: "relative", height: 16, marginLeft: 28, marginBottom: 4 }}>
          {monthLabels.map(({ label, weekIdx }) => (
            <span key={`${label}-${weekIdx}`} style={{
              position: "absolute",
              left: weekIdx * STEP,
              fontSize: 10,
              color: "#465a72",
            }}>
              {label}
            </span>
          ))}
        </div>

        <div style={{ display: "flex", gap: 2 }}>
          {/* 요일 레이블 */}
          <div style={{ display: "flex", flexDirection: "column", gap: GAP, marginRight: 4 }}>
            {DAYS.map((day, i) => (
              <div key={day} style={{
                height: CELL,
                fontSize: 9,
                color: i % 2 === 1 ? "#465a72" : "transparent",
                display: "flex",
                alignItems: "center",
                width: 24,
                flexShrink: 0,
              }}>
                {day}
              </div>
            ))}
          </div>

          {/* 주 그리드 */}
          <div style={{ display: "flex", gap: GAP, position: "relative" }}>
            {weeks.map((week, wi) => (
              <div key={wi} style={{ display: "flex", flexDirection: "column", gap: GAP }}>
                {week.days.map((day, di) => (
                  <div
                    key={di}
                    style={{
                      width: CELL,
                      height: CELL,
                      borderRadius: 2,
                      background: day ? getColor(day.count) : "transparent",
                      cursor: day ? "pointer" : "default",
                      transition: "transform 0.1s",
                      flexShrink: 0,
                    }}
                    onMouseEnter={(e) => {
                      if (!day) return;
                      e.currentTarget.style.transform = "scale(1.3)";
                      const rect = e.currentTarget.getBoundingClientRect();
                      const parentRect = (e.currentTarget.closest("[data-heatmap]") as HTMLElement)?.getBoundingClientRect();
                      setTooltip({
                        text: `${day.count} commit${day.count !== 1 ? "s" : ""} — ${day.dateStr}`,
                        x: rect.left - (parentRect?.left ?? 0) + CELL / 2,
                        y: rect.top  - (parentRect?.top  ?? 0) - 28,
                      });
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "scale(1)";
                      setTooltip(null);
                    }}
                  />
                ))}
              </div>
            ))}

            {/* 툴팁 */}
            {tooltip && (
              <div style={{
                position: "absolute",
                left: tooltip.x,
                top: tooltip.y,
                transform: "translateX(-50%)",
                background: "#182030",
                border: "1px solid #253545",
                borderRadius: 4,
                padding: "4px 8px",
                fontSize: 10,
                color: "#bfcfdf",
                whiteSpace: "nowrap",
                pointerEvents: "none",
                zIndex: 10,
              }}>
                {tooltip.text}
              </div>
            )}
          </div>
        </div>

        {/* 범례 */}
        <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 10, marginLeft: 28 }}>
          <span style={{ fontSize: 9, color: "#465a72", marginRight: 4 }}>Less</span>
          {[0, 2, 5, 9, 15].map((v) => (
            <div key={v} style={{ width: CELL, height: CELL, borderRadius: 2, background: getColor(v) }} />
          ))}
          <span style={{ fontSize: 9, color: "#465a72", marginLeft: 4 }}>More</span>
        </div>
      </div>

      {/* ── 언어 통계 ────────────────────────────────────────────────────────── */}
      <div style={{
        background: "#0c1018",
        border: "1px solid #182030",
        borderRadius: 6,
        padding: "16px 20px",
      }}>
        <div style={{ fontSize: 11, color: "#465a72", marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.06em" }}>
          Language Breakdown
        </div>

        {/* 프로그레스 바 */}
        <div style={{ display: "flex", borderRadius: 3, overflow: "hidden", height: 8, marginBottom: 16 }}>
          {LANG_STATS.map((s) => (
            <div key={s.lang} style={{ width: `${s.percent}%`, background: s.color }} />
          ))}
        </div>

        {/* 언어 목록 */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
          {LANG_STATS.map((s) => (
            <div key={s.lang} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: s.color, flexShrink: 0 }} />
              <div>
                <div style={{ fontSize: 11, color: "#bfcfdf", fontWeight: 600 }}>{s.lang}</div>
                <div style={{ fontSize: 9, color: "#465a72" }}>{s.percent}% · {s.commits} commits</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GitHubHeatmapIndex;
