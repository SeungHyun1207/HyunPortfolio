import useUserInfo from '@/stores/common/useUserInfo'
import useIntranetStore from '@/stores/intranet/useIntranetStore'
import { AlignCenter, CenterBox, FlexBox } from '@/views/layouts/CommonLayoutComponents'
import ProfileImg from '@assets/img/Profile.jpg'
import {
  ArrowDownward as ArrowDownwardIcon,
  ArrowUpward as ArrowUpwardIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material'
import { keyframes } from '@emotion/react'
import {
  Button,
  Checkbox,
  Drawer,
  FormControlLabel,
  IconButton,
  styled,
  Typography,
} from '@mui/material'
import { useState } from 'react'
import { MOCK_APPROVALS, MOCK_MAILS, MOCK_SCHEDULES, MOCK_VACATION_BALANCE } from '../intranet/intranetMock'
import type { WorkCardId } from '@models/personal-project/intranet/IntranetModel'

// ==============================
// ProfileCard 컴포넌트
// ==============================
const ProfileCard = () => {
  const { currentUser } = useUserInfo()
  const { attendance, workCardSettings, checkIn, checkOut, toggleCardVisible, moveCardOrder } =
    useIntranetStore()
  const [drawerOpen, setDrawerOpen] = useState(false)

  const unreadMailCount = MOCK_MAILS.filter((m) => !m.isRead).length

  // ── 출퇴근 상태 계산 ──────────────────────────────
  const now = new Date()
  const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`
  const hour = now.getHours()

  const hasCheckedIn  = attendance.date === todayStr && attendance.checkIn  !== null
  const hasCheckedOut = attendance.date === todayStr && attendance.checkOut !== null
  const canCheckOut   = hour >= 11   // 11시 이후 퇴근 가능

  // ── WorkCard 컨텐츠 렌더링 ────────────────────────
  const renderWorkCardContent = (id: WorkCardId) => {
    switch (id) {
      case 'schedule':
        return <WorkDesc>{MOCK_SCHEDULES.length}건</WorkDesc>

      case 'attendance': {
        if (!attendance.checkIn) return <WorkDesc>-</WorkDesc>
        const [period, time] = attendance.checkIn.split(' ')
        return (
          <>
            <WorkDesc sx={{ fontSize: '13px', fontWeight: 600 }}>{period}</WorkDesc>
            <WorkDesc sx={{ fontSize: '13px' }}>{time}</WorkDesc>
          </>
        )
      }

      case 'vacation':
        return (
          <>
            <WorkDesc sx={{ fontSize: '14px' }}>{MOCK_VACATION_BALANCE.remainDays}일</WorkDesc>
            <WorkDesc sx={{ fontSize: '14px' }}>{MOCK_VACATION_BALANCE.remainHours}시간</WorkDesc>
          </>
        )

      case 'mail':
        return <WorkDesc>{unreadMailCount}건</WorkDesc>

      case 'approval':
        return <WorkDesc>{MOCK_APPROVALS.length}건</WorkDesc>

      default:
        return <WorkDesc>-</WorkDesc>
    }
  }

  // 카드별 알림 카운트 (1 이상이면 애니메이션)
  const getCardAlertCount = (id: WorkCardId): number => {
    switch (id) {
      case 'schedule': return MOCK_SCHEDULES.length
      case 'mail':     return unreadMailCount
      case 'approval': return MOCK_APPROVALS.length
      default:         return 0
    }
  }

  const visibleCards = [...workCardSettings]
    .filter((card) => card.visible)
    .sort((a, b) => a.order - b.order)

  const sortedAllCards = [...workCardSettings].sort((a, b) => a.order - b.order)

  return (
    <ProfileCardWrap>
      {/* ==============================
          프로필 정보 영역
      ============================== */}
      <ProfileInfoWrap>
        <ProfileImage src={ProfileImg} alt="프로필 이미지" />

        <ProfileInfo>
          <ProfileTitle>
            <NameWithPositionBox>
              <Typography sx={{ fontSize: '22px', fontWeight: 'bold' }}>
                {currentUser?.name}
              </Typography>
              <Typography sx={{ fontSize: '16px', color: 'text.secondary' }}>
                {currentUser?.position}
              </Typography>
            </NameWithPositionBox>

            {/* 출근/퇴근 + 설정 버튼 */}
            <ButtonGroup>
              {/* 퇴근 완료 → 출근하기 비활성 */}
              {hasCheckedOut && (
                <Button variant="contained" size="small" disabled>
                  출근하기
                </Button>
              )}

              {/* 출근 전 → 출근하기 활성 */}
              {!hasCheckedIn && !hasCheckedOut && (
                <Button variant="contained" size="small" onClick={checkIn} color="primary">
                  출근하기
                </Button>
              )}

              {/* 출근 후, 퇴근 전 → 퇴근하기 (11시 이후만 활성) */}
              {hasCheckedIn && !hasCheckedOut && (
                <Button
                  variant="outlined"
                  size="small"
                  onClick={checkOut}
                  color="error"
                  disabled={!canCheckOut}
                  title={!canCheckOut ? '11시 이후 퇴근 가능합니다' : ''}
                >
                  퇴근하기
                </Button>
              )}

              <IconButton size="small" onClick={() => setDrawerOpen(true)}>
                <SettingsIcon fontSize="small" />
              </IconButton>
            </ButtonGroup>
          </ProfileTitle>

          {/* 부서 / 이메일 / 입사일 */}
          <Typography sx={{ fontSize: '14px', color: 'text.secondary', mt: '4px' }}>
            {currentUser?.department}
          </Typography>
          <Typography sx={{ fontSize: '13px', color: 'text.secondary' }}>
            {currentUser?.email}
          </Typography>
          <Typography sx={{ fontSize: '13px', color: 'text.secondary' }}>
            입사일: {currentUser?.joinedAt}
          </Typography>
        </ProfileInfo>
      </ProfileInfoWrap>

      {/* ==============================
          WorkCard 요약 카드 목록
      ============================== */}
      <WorkList>
        {visibleCards.map((card) => (
          <WorkCard key={card.id} hasAlert={getCardAlertCount(card.id) >= 1}>
            <WorkTitle>{card.label}</WorkTitle>
            {renderWorkCardContent(card.id)}
          </WorkCard>
        ))}
      </WorkList>

      {/* ==============================
          카드 설정 Drawer
      ============================== */}
      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <DrawerContent>
          <Typography sx={{ fontSize: '18px', fontWeight: 'bold', mb: '16px' }}>
            카드 설정
          </Typography>

          {sortedAllCards.map((card) => (
            <DrawerCardRow key={card.id}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={card.visible}
                    onChange={() => toggleCardVisible(card.id as WorkCardId)}
                    size="small"
                  />
                }
                label={card.label}
                sx={{ flex: 1 }}
              />
              <IconButton
                size="small"
                onClick={() => moveCardOrder(card.id as WorkCardId, 'up')}
                disabled={card.order === 0}
              >
                <ArrowUpwardIcon fontSize="small" />
              </IconButton>
              <IconButton
                size="small"
                onClick={() => moveCardOrder(card.id as WorkCardId, 'down')}
                disabled={card.order === workCardSettings.length - 1}
              >
                <ArrowDownwardIcon fontSize="small" />
              </IconButton>
            </DrawerCardRow>
          ))}
        </DrawerContent>
      </Drawer>
    </ProfileCardWrap>
  )
}

export default ProfileCard

// ==============================
// Styled 컴포넌트 — MUI theme 토큰 사용
// ==============================

const ProfileCardWrap = styled(FlexBox)(({ theme }) => ({
  gap: '10px',
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: '10px',
  width: '100%',
  padding: '16px',
  flexDirection: 'column',
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
}))

const ProfileInfoWrap = styled(FlexBox)({ gap: '12px' })

const ProfileInfo  = styled(FlexBox)({ flexDirection: 'column', width: '100%' })

const ProfileImage = styled('img')({
  width: '100px',
  height: '120px',
  objectFit: 'cover',
  borderRadius: '5px',
})

const ProfileTitle = styled(FlexBox)({
  width: '100%',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
})

const NameWithPositionBox = styled(AlignCenter)({ gap: '8px' })

const ButtonGroup = styled(AlignCenter)({ gap: '4px' })

const WorkList = styled(FlexBox)({
  width: '100%',
  gap: '8px',
  flexWrap: 'nowrap',
})

// 테두리가 퍼졌다 사라지는 pulse ring
const pulseRing = keyframes`
  0%   { box-shadow: 0 0 0 0px rgba(99, 102, 241, 0.55); }
  60%  { box-shadow: 0 0 0 7px rgba(99, 102, 241, 0);    }
  100% { box-shadow: 0 0 0 0px rgba(99, 102, 241, 0);    }
`

const WorkCard = styled(CenterBox, {
  shouldForwardProp: (p) => p !== 'hasAlert',
})<{ hasAlert?: boolean }>(({ theme, hasAlert }) => ({
  flex: 1,
  border: `1px solid ${hasAlert ? theme.palette.primary.main : theme.palette.divider}`,
  padding: '10px 6px',
  flexDirection: 'column',
  borderRadius: '10px',
  minWidth: 0,
  minHeight: '78px',
  ...(hasAlert && {
    animation: `${pulseRing} 2s ease-out infinite`,
  }),
}))

const WorkTitle = styled(Typography)(({ theme }) => ({
  fontSize: '13px',
  fontWeight: 600,
  textAlign: 'center',
  wordBreak: 'keep-all',
  lineHeight: 1.3,
  marginBottom: '4px',
  color: theme.palette.text.secondary,
}))

const WorkDesc = styled(Typography)(({ theme }) => ({
  fontSize: '16px',
  fontWeight: 'bold',
  textAlign: 'center',
  lineHeight: 1.4,
  color: theme.palette.text.primary,
}))

const DrawerContent = styled(FlexBox)({
  flexDirection: 'column',
  padding: '24px',
  width: '280px',
  gap: '4px',
})

const DrawerCardRow = styled(AlignCenter)({
  gap: '4px',
  padding: '4px 0',
})
