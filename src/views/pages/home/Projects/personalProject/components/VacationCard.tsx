import { AlignCenter, FlexBox, Title } from '@/views/layouts/CommonLayoutComponents'
import { Chip, LinearProgress, styled, Typography } from '@mui/material'
import { MOCK_VACATION_BALANCE, MOCK_VACATIONS } from '../intranet/intranetMock'
import type { VacationItem } from '@models/personalProject/intranet/IntranetModel'

// ==============================
// status badge 색상 매핑 (의미론적 색상 — 테마 무관)
// ==============================
const STATUS_COLOR: Record<VacationItem['status'], string> = {
  approved: '#22c55e',
  pending:  '#f97316',
  rejected: '#ef4444',
}

const STATUS_LABEL: Record<VacationItem['status'], string> = {
  approved: '승인완료',
  pending:  '대기중',
  rejected: '반려',
}

// ==============================
// VacationCard 컴포넌트
// ==============================
const VacationCard = () => {
  const { totalDays, usedDays, remainDays, remainHours } = MOCK_VACATION_BALANCE
  const usedPercent    = Math.round((usedDays / totalDays) * 100)
  const displayVacations = MOCK_VACATIONS.slice(0, 3)

  return (
    <VacationCardWrap>
      {/* ==============================
          휴가 현황 헤더
      ============================== */}
      <VacationCardHeader>
        <Title sx={{ fontSize: '18px' }}>🏖️ 휴가 현황</Title>
        <Typography sx={{ fontSize: '13px', color: 'text.secondary' }}>
          잔여 {remainDays}일 {remainHours}시간
        </Typography>
      </VacationCardHeader>

      {/* ==============================
          사용/잔여 프로그레스바
      ============================== */}
      <VacationBalanceSection>
        <LinearProgress
          variant="determinate"
          value={usedPercent}
          sx={{
            height: '8px',
            borderRadius: '4px',
            backgroundColor: 'action.disabledBackground',
            '& .MuiLinearProgress-bar': { backgroundColor: 'primary.main' },
          }}
        />
        <BalanceTextRow>
          <Typography sx={{ fontSize: '12px', color: 'primary.main' }}>
            사용 {usedDays}일
          </Typography>
          <Typography sx={{ fontSize: '12px', color: 'text.disabled' }}>
            잔여 {remainDays}일 {remainHours}시간
          </Typography>
        </BalanceTextRow>
      </VacationBalanceSection>

      {/* ==============================
          휴가 신청 목록 (최대 3개)
      ============================== */}
      <VacationList>
        {displayVacations.map((vacation) => (
          <VacationItemWrap key={vacation.id}>
            {/* 타입 + 상태 뱃지 */}
            <VacationItemHeader>
              <Typography sx={{ fontSize: '13px', fontWeight: 600 }}>
                {vacation.type}
              </Typography>
              <Chip
                label={STATUS_LABEL[vacation.status]}
                size="small"
                sx={{
                  backgroundColor: STATUS_COLOR[vacation.status],
                  color: '#fff',
                  fontWeight: 600,
                  fontSize: '11px',
                  height: '20px',
                }}
              />
            </VacationItemHeader>

            {/* 기간 */}
            <Typography sx={{ fontSize: '12px', color: 'text.secondary' }}>
              {vacation.startDate}
              {vacation.startDate !== vacation.endDate && ` ~ ${vacation.endDate}`}
            </Typography>

            {/* 사유 */}
            <Typography sx={{ fontSize: '12px', color: 'text.disabled' }}>
              {vacation.reason}
            </Typography>
          </VacationItemWrap>
        ))}
      </VacationList>
    </VacationCardWrap>
  )
}

export default VacationCard

// ==============================
// Styled 컴포넌트 — MUI theme 토큰 사용
// ==============================

const VacationCardWrap = styled(FlexBox)(({ theme }) => ({
  gap: '12px',
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: '10px',
  width: '100%',
  padding: '16px',
  flexDirection: 'column',
  backgroundColor: theme.palette.background.paper,
}))

const VacationCardHeader = styled(AlignCenter)(({ theme }) => ({
  justifyContent: 'space-between',
  paddingBottom: '8px',
  borderBottom: `1px solid ${theme.palette.divider}`,
}))

const VacationBalanceSection = styled(FlexBox)({ flexDirection: 'column', gap: '4px' })

const BalanceTextRow = styled(AlignCenter)({ justifyContent: 'space-between' })

const VacationList = styled(FlexBox)({ flexDirection: 'column', gap: '6px' })

const VacationItemWrap = styled(FlexBox)(({ theme }) => ({
  flexDirection: 'column',
  gap: '2px',
  padding: '8px 10px',
  borderRadius: '6px',
  backgroundColor: theme.palette.action.hover,
  border: `1px solid ${theme.palette.divider}`,
}))

const VacationItemHeader = styled(AlignCenter)({ justifyContent: 'space-between', gap: '8px' })
