import useUserInfo from '@/stores/common/useUserInfo'
import { AlignCenter, CenterBox, FlexBox, Title } from '@/views/layouts/CommonLayoutComponents'
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Groups as GroupsIcon,
  PersonOff as PersonOffIcon,
} from '@mui/icons-material'
import { Box, Chip, Divider, IconButton, styled, Tooltip, Typography } from '@mui/material'
import { useMemo, useState } from 'react'
import { MOCK_SCHEDULES, MOCK_TEAM_VACATIONS } from '../intranet/intranetMock'
import type {
  ScheduleCardSetting,
  ScheduleItem,
  TeamVacationItem,
  VacationViewScope,
} from '@models/personalProject/intranet/IntranetModel'

// ==============================
// 일정 타입 색상
// ==============================
const SCHEDULE_COLOR: Record<ScheduleItem['type'], string> = {
  meeting:  '#6366f1',
  deadline: '#ef4444',
  event:    '#f59e0b',
  personal: '#22c55e',
}

const SCHEDULE_LABEL: Record<ScheduleItem['type'], string> = {
  meeting:  '회의',
  deadline: '마감',
  event:    '이벤트',
  personal: '개인',
}

// ==============================
// 휴가 상태 색상
// ==============================
const VACATION_STATUS_COLOR: Record<TeamVacationItem['status'], string> = {
  approved: '#22c55e',
  pending:  '#f97316',
  rejected: '#ef4444',
}

const VACATION_STATUS_LABEL: Record<TeamVacationItem['status'], string> = {
  approved: '승인',
  pending:  '대기',
  rejected: '반려',
}

// ==============================
// 날짜 유틸리티
// ==============================

/** "YYYY.MM.DD" → Date */
const parseDate = (str: string): Date => {
  const [y, m, d] = str.split('.').map(Number)
  return new Date(y, m - 1, d)
}

/** Date → "YYYY.MM.DD" */
const toDateStr = (date: Date): string =>
  `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`

// ==============================
// Props
// ==============================
export interface ScheduleCardProps {
  setting?: Partial<ScheduleCardSetting>
}

// ==============================
// ScheduleCard 컴포넌트
// ==============================
const ScheduleCard = ({ setting }: ScheduleCardProps) => {
  const { currentUser } = useUserInfo()

  const allowAllScope = setting?.allowAllScope ?? true

  // 현재 표시 중인 월 (연도, 월 인덱스)
  const today = new Date()
  const [viewYear,  setViewYear]  = useState(today.getFullYear())
  const [viewMonth, setViewMonth] = useState(today.getMonth())

  // 선택된 날짜
  const [selectedDate, setSelectedDate] = useState<string>(toDateStr(today))

  // 휴가 조회 범위
  const [vacationScope, setVacationScope] = useState<VacationViewScope>('team')
  const effectiveScope: VacationViewScope = allowAllScope ? vacationScope : 'team'

  // ── 월 이동 ──
  const goPrev = () => {
    if (viewMonth === 0) { setViewYear((y) => y - 1); setViewMonth(11) }
    else setViewMonth((m) => m - 1)
  }
  const goNext = () => {
    if (viewMonth === 11) { setViewYear((y) => y + 1); setViewMonth(0) }
    else setViewMonth((m) => m + 1)
  }

  // ── 캘린더 날짜 배열 생성 ──
  const calendarDays = useMemo(() => {
    const firstDay = new Date(viewYear, viewMonth, 1).getDay() // 0=일
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate()
    const prevDays = new Date(viewYear, viewMonth, 0).getDate()

    const cells: { date: Date; isCurrentMonth: boolean }[] = []

    // 이전 달 빈칸
    for (let i = firstDay - 1; i >= 0; i--) {
      cells.push({ date: new Date(viewYear, viewMonth - 1, prevDays - i), isCurrentMonth: false })
    }
    // 이번 달
    for (let d = 1; d <= daysInMonth; d++) {
      cells.push({ date: new Date(viewYear, viewMonth, d), isCurrentMonth: true })
    }
    // 다음 달 빈칸 (6주 고정)
    const remaining = 42 - cells.length
    for (let d = 1; d <= remaining; d++) {
      cells.push({ date: new Date(viewYear, viewMonth + 1, d), isCurrentMonth: false })
    }
    return cells
  }, [viewYear, viewMonth])

  // ── 날짜별 일정 맵 ──
  const scheduleMap = useMemo(() => {
    const map: Record<string, ScheduleItem[]> = {}
    for (const s of MOCK_SCHEDULES) {
      if (!map[s.date]) map[s.date] = []
      map[s.date].push(s)
    }
    return map
  }, [])

  // ── 날짜별 휴가 맵 (범위 확장) ──
  const vacationMap = useMemo(() => {
    const map: Record<string, TeamVacationItem[]> = {}
    const filtered = MOCK_TEAM_VACATIONS.filter((v) => {
      if (v.status === 'rejected') return false
      if (effectiveScope === 'all') return true
      return v.department === currentUser?.department
    })
    for (const v of filtered) {
      const start = parseDate(v.startDate)
      const end   = parseDate(v.endDate)
      const cur   = new Date(start)
      while (cur <= end) {
        const key = toDateStr(cur)
        if (!map[key]) map[key] = []
        map[key].push(v)
        cur.setDate(cur.getDate() + 1)
      }
    }
    return map
  }, [effectiveScope, currentUser?.department])

  // ── 선택된 날짜의 일정 + 휴가 ──
  const selectedSchedules = scheduleMap[selectedDate] ?? []
  const selectedVacations  = vacationMap[selectedDate]  ?? []

  const monthLabel = `${viewYear}년 ${viewMonth + 1}월`
  const todayStr   = toDateStr(today)

  return (
    <ScheduleCardWrap>
      {/* ── 헤더 ── */}
      <CardHeader>
        <Title sx={{ fontSize: '18px' }}>📅 일정 / 휴가</Title>

        {/* 범위 토글 */}
        <AlignCenter sx={{ gap: '4px' }}>
          <ScopeChip
            label={<AlignCenter sx={{ gap: '3px' }}><GroupsIcon sx={{ fontSize: '12px' }} />소속팀</AlignCenter>}
            size="small"
            active={effectiveScope === 'team'}
            onClick={() => setVacationScope('team')}
          />
          <Tooltip
            title={!allowAllScope ? '관리자에 의해 전체 조회가 제한되었습니다.' : ''}
            arrow
            disableHoverListener={allowAllScope}
          >
            <span>
              <ScopeChip
                label={<AlignCenter sx={{ gap: '3px' }}><PersonOffIcon sx={{ fontSize: '12px' }} />전체</AlignCenter>}
                size="small"
                active={effectiveScope === 'all'}
                onClick={() => allowAllScope && setVacationScope('all')}
                disabled={!allowAllScope}
              />
            </span>
          </Tooltip>
        </AlignCenter>
      </CardHeader>

      {/* ── 월 네비게이션 ── */}
      <MonthNav>
        <IconButton size="small" onClick={goPrev}>
          <ChevronLeftIcon fontSize="small" />
        </IconButton>
        <Typography sx={{ fontSize: '14px', fontWeight: 700, minWidth: '90px', textAlign: 'center' }}>
          {monthLabel}
        </Typography>
        <IconButton size="small" onClick={goNext}>
          <ChevronRightIcon fontSize="small" />
        </IconButton>
      </MonthNav>

      {/* ── 요일 헤더 ── */}
      <DayOfWeekRow>
        {['일', '월', '화', '수', '목', '금', '토'].map((d, i) => (
          <DayOfWeekCell key={d} isSunday={i === 0} isSaturday={i === 6}>
            {d}
          </DayOfWeekCell>
        ))}
      </DayOfWeekRow>

      {/* ── 날짜 그리드 ── */}
      <CalendarGrid>
        {calendarDays.map(({ date, isCurrentMonth }, idx) => {
          const dateStr  = toDateStr(date)
          const isToday  = dateStr === todayStr
          const isSelected = dateStr === selectedDate
          const dayOfWeek  = date.getDay()
          const hasSchedule = Boolean(scheduleMap[dateStr]?.length)
          const hasVacation = Boolean(vacationMap[dateStr]?.length)

          return (
            <DateCell
              key={idx}
              isCurrentMonth={isCurrentMonth}
              isToday={isToday}
              isSelected={isSelected}
              isSunday={dayOfWeek === 0}
              isSaturday={dayOfWeek === 6}
              onClick={() => setSelectedDate(dateStr)}
            >
              <DateNumber
                isToday={isToday}
                isSelected={isSelected}
                isSunday={dayOfWeek === 0}
                isSaturday={dayOfWeek === 6}
                isCurrentMonth={isCurrentMonth}
              >
                {date.getDate()}
              </DateNumber>

              {/* 이벤트 닷 */}
              {(hasSchedule || hasVacation) && (
                <DotRow>
                  {hasSchedule && (
                    <EventDot color={SCHEDULE_COLOR[(scheduleMap[dateStr][0]).type]} />
                  )}
                  {hasVacation && (
                    <EventDot color="#94a3b8" />
                  )}
                </DotRow>
              )}
            </DateCell>
          )
        })}
      </CalendarGrid>

      <Divider />

      {/* ── 선택 날짜 상세 ── */}
      <DetailBox>
        <Typography sx={{ fontSize: '12px', fontWeight: 700, color: 'text.secondary', mb: '6px' }}>
          {selectedDate.replace(/\./g, '/')} 일정
        </Typography>

        {selectedSchedules.length === 0 && selectedVacations.length === 0 ? (
          <Typography sx={{ fontSize: '12px', color: 'text.disabled' }}>일정이 없습니다.</Typography>
        ) : (
          <FlexBox sx={{ flexDirection: 'column', gap: '4px' }}>
            {selectedSchedules.map((s) => (
              <DetailItem key={s.id} dotColor={SCHEDULE_COLOR[s.type]}>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography sx={{ fontSize: '13px', fontWeight: 600 }}>{s.title}</Typography>
                  {s.time && (
                    <Typography sx={{ fontSize: '11px', color: 'text.disabled' }}>{s.time}</Typography>
                  )}
                </Box>
                <Chip
                  label={SCHEDULE_LABEL[s.type]}
                  size="small"
                  sx={{
                    backgroundColor: SCHEDULE_COLOR[s.type],
                    color: '#fff',
                    fontWeight: 600,
                    fontSize: '10px',
                    height: '18px',
                    flexShrink: 0,
                  }}
                />
              </DetailItem>
            ))}

            {selectedVacations.map((v) => (
              <DetailItem key={v.id} dotColor={VACATION_STATUS_COLOR[v.status]}>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography sx={{ fontSize: '13px', fontWeight: 600 }}>
                    {v.employeeName} · {v.type}
                  </Typography>
                  <Typography sx={{ fontSize: '11px', color: 'text.disabled' }}>
                    {v.department}
                  </Typography>
                </Box>
                <Chip
                  label={VACATION_STATUS_LABEL[v.status]}
                  size="small"
                  sx={{
                    backgroundColor: VACATION_STATUS_COLOR[v.status],
                    color: '#fff',
                    fontWeight: 600,
                    fontSize: '10px',
                    height: '18px',
                    flexShrink: 0,
                  }}
                />
              </DetailItem>
            ))}
          </FlexBox>
        )}
      </DetailBox>
    </ScheduleCardWrap>
  )
}

export default ScheduleCard

// ==============================
// Styled 컴포넌트
// ==============================

const ScheduleCardWrap = styled(FlexBox)(({ theme }) => ({
  gap: 0,
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: '10px',
  width: '100%',
  flexDirection: 'column',
  backgroundColor: theme.palette.background.paper,
  overflow: 'hidden',
}))

const CardHeader = styled(AlignCenter)(({ theme }) => ({
  justifyContent: 'space-between',
  padding: '16px 16px 12px',
  borderBottom: `1px solid ${theme.palette.divider}`,
}))

const MonthNav = styled(AlignCenter)({
  justifyContent: 'center',
  gap: '8px',
  padding: '10px 16px 6px',
})

const DayOfWeekRow = styled(AlignCenter)({
  display: 'grid',
  gridTemplateColumns: 'repeat(7, 1fr)',
  padding: '0 8px',
})

const DayOfWeekCell = styled(CenterBox, {
  shouldForwardProp: (p) => p !== 'isSunday' && p !== 'isSaturday',
})<{ isSunday?: boolean; isSaturday?: boolean }>(({ theme, isSunday, isSaturday }) => ({
  fontSize: '11px',
  fontWeight: 600,
  padding: '4px 0',
  color: isSunday
    ? '#ef4444'
    : isSaturday
    ? '#3b82f6'
    : theme.palette.text.disabled,
}))

const CalendarGrid = styled(Box)({
  display: 'grid',
  gridTemplateColumns: 'repeat(7, 1fr)',
  padding: '4px 8px 8px',
  gap: '2px',
})

const DateCell = styled(FlexBox, {
  shouldForwardProp: (p) =>
    !['isCurrentMonth', 'isToday', 'isSelected', 'isSunday', 'isSaturday'].includes(p as string),
})<{
  isCurrentMonth: boolean
  isToday: boolean
  isSelected: boolean
  isSunday: boolean
  isSaturday: boolean
}>(({ theme, isSelected }) => ({
  flexDirection: 'column',
  alignItems: 'center',
  padding: '3px 2px',
  borderRadius: '6px',
  cursor: 'pointer',
  minHeight: '38px',
  backgroundColor: isSelected ? theme.palette.primary.main + '20' : 'transparent',
  transition: 'background-color 0.12s',
  '&:hover': {
    backgroundColor: isSelected
      ? theme.palette.primary.main + '30'
      : theme.palette.action.hover,
  },
}))

const DateNumber = styled(CenterBox, {
  shouldForwardProp: (p) =>
    !['isCurrentMonth', 'isToday', 'isSelected', 'isSunday', 'isSaturday'].includes(p as string),
})<{
  isCurrentMonth: boolean
  isToday: boolean
  isSelected: boolean
  isSunday: boolean
  isSaturday: boolean
}>(({ theme, isCurrentMonth, isToday, isSelected, isSunday, isSaturday }) => ({
  width: '24px',
  height: '24px',
  borderRadius: '50%',
  fontSize: '12px',
  fontWeight: isToday || isSelected ? 700 : 400,
  backgroundColor: isToday
    ? theme.palette.primary.main
    : 'transparent',
  color: isToday
    ? '#fff'
    : !isCurrentMonth
    ? theme.palette.text.disabled
    : isSunday
    ? '#ef4444'
    : isSaturday
    ? '#3b82f6'
    : theme.palette.text.primary,
}))

const DotRow = styled(AlignCenter)({
  gap: '2px',
  marginTop: '1px',
  justifyContent: 'center',
})

const EventDot = styled(Box, {
  shouldForwardProp: (p) => p !== 'color',
})<{ color: string }>(({ color }) => ({
  width: '5px',
  height: '5px',
  borderRadius: '50%',
  backgroundColor: color,
  flexShrink: 0,
}))

const DetailBox = styled(FlexBox)({
  flexDirection: 'column',
  padding: '12px 16px 16px',
})

const DetailItem = styled(AlignCenter, {
  shouldForwardProp: (p) => p !== 'dotColor',
})<{ dotColor: string }>(({ theme, dotColor }) => ({
  gap: '10px',
  padding: '8px 10px',
  borderRadius: '6px',
  backgroundColor: theme.palette.action.hover,
  border: `1px solid ${theme.palette.divider}`,
  borderLeft: `3px solid ${dotColor}`,
}))

const ScopeChip = styled(Chip, {
  shouldForwardProp: (p) => p !== 'active',
})<{ active?: boolean }>(({ theme, active }) => ({
  cursor: 'pointer',
  fontWeight: active ? 700 : 500,
  fontSize: '11px',
  height: '24px',
  backgroundColor: active ? theme.palette.primary.main : theme.palette.action.hover,
  color: active ? '#fff' : theme.palette.text.secondary,
  border: `1px solid ${active ? theme.palette.primary.main : theme.palette.divider}`,
  '& .MuiChip-label': { padding: '0 8px' },
  '&:hover': {
    backgroundColor: active ? theme.palette.primary.dark : theme.palette.action.selected,
  },
  '&.Mui-disabled': {
    opacity: 0.45,
    cursor: 'not-allowed',
    pointerEvents: 'auto',
  },
}))
