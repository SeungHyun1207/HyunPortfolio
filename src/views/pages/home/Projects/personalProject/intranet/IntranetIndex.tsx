import useIntranetSettings from '@/stores/intranet/useIntranetSettings'
import { createIntranetTheme } from '@/theme/intranetTheme'
import { FlexBox } from '@/views/layouts/CommonLayoutComponents'
import { styled, ThemeProvider } from '@mui/material'
import Grid from '@mui/material/Grid'
import { useMemo } from 'react'
import ApprovalCard from '../components/ApprovalCard'
import IntranetGNB from '../components/IntranetGNB'
import MailCard from '../components/MailCard'
import ProfileCard from '../components/ProfileCard'
import ScheduleCard from '../components/ScheduleCard'
import VacationCard from '../components/VacationCard'

// ==============================
// IntranetIndex 페이지
// — 하이웍스 스타일 3컬럼 레이아웃
//   좌(3): ProfileCard
//   중(5): MailCard + ApprovalCard
//   우(4): VacationCard + ScheduleCard
// ==============================
const IntranetIndex = () => {
  const { theme: intranetMode } = useIntranetSettings()
  const intranetTheme = useMemo(() => createIntranetTheme(intranetMode), [intranetMode])

  return (
    <ThemeProvider theme={intranetTheme}>
      <IntranetWrap>
        {/* ── 사내 전용 GNB ── */}
        <IntranetGNB />

        {/* ── 콘텐츠 영역 ── */}
        <ContentArea>
          <Grid container spacing={2} alignItems="flex-start">

            {/* ── 좌측 컬럼: 프로필 ── */}
            <Grid size={{ xs: 12, md: 3 }}>
              <ProfileCard />
            </Grid>

            {/* ── 중앙 컬럼: 메일 + 결재 ── */}
            <Grid size={{ xs: 12, md: 5 }}>
              <ColumnStack>
                <MailCard />
                <ApprovalCard />
              </ColumnStack>
            </Grid>

            {/* ── 우측 컬럼: 휴가 + 일정 캘린더 ── */}
            <Grid size={{ xs: 12, md: 4 }}>
              <ColumnStack>
                <VacationCard />
                <ScheduleCard />
              </ColumnStack>
            </Grid>

          </Grid>
        </ContentArea>
      </IntranetWrap>
    </ThemeProvider>
  )
}

export default IntranetIndex

// ==============================
// Styled 컴포넌트
// ==============================

const IntranetWrap = styled(FlexBox)(({ theme }) => ({
  minHeight: 'calc(100vh - 64px)',
  flexDirection: 'column',
  backgroundColor: theme.palette.background.default,
}))

const ContentArea = styled(FlexBox)({
  flex: 1,
  flexDirection: 'column',
  padding: '24px',
  gap: '16px',
})

/** 컬럼 내 카드를 수직으로 쌓는 래퍼 */
const ColumnStack = styled(FlexBox)({
  flexDirection: 'column',
  gap: '16px',
  width: '100%',
})
