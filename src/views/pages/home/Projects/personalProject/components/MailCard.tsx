import { AlignCenter, FlexBox, Title } from '@/views/layouts/CommonLayoutComponents'
import { Chip, styled, Typography } from '@mui/material'
import { MOCK_MAILS } from '../intranet/intranetMock'

// ==============================
// MailCard 컴포넌트
// ==============================
const MailCard = () => {
  const unreadCount  = MOCK_MAILS.filter((m) => !m.isRead).length
  const displayMails = MOCK_MAILS.slice(0, 5)

  return (
    <MailCardWrap>
      {/* ==============================
          메일함 헤더
      ============================== */}
      <MailCardHeader>
        <Title sx={{ fontSize: '18px' }}>📬 메일함</Title>
        <Chip
          label={`미읽음 ${unreadCount}건`}
          size="small"
          color="primary"
          sx={{ fontWeight: 600, fontSize: '12px' }}
        />
      </MailCardHeader>

      {/* ==============================
          메일 목록 (최대 5개)
      ============================== */}
      <MailList>
        {displayMails.map((mail) => (
          <MailItemWrap key={mail.id} isRead={mail.isRead}>
            {/* 발신자 + 시간 */}
            <MailMeta>
              <Typography sx={{ fontSize: '13px', fontWeight: 600 }}>
                {mail.sender}
                {mail.isImportant && <ImportantStar>★</ImportantStar>}
              </Typography>
              <Typography sx={{ fontSize: '11px', color: 'text.disabled' }}>
                {mail.receivedAt}
              </Typography>
            </MailMeta>

            {/* 제목 */}
            <Typography
              sx={{
                fontSize: '13px',
                fontWeight: mail.isRead ? 400 : 700,
                color: mail.isRead ? 'text.secondary' : 'text.primary',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {mail.title}
            </Typography>

            {/* 미리보기 */}
            <Typography
              sx={{
                fontSize: '12px',
                color: 'text.disabled',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {mail.preview}
            </Typography>
          </MailItemWrap>
        ))}
      </MailList>
    </MailCardWrap>
  )
}

export default MailCard

// ==============================
// Styled 컴포넌트 — MUI theme 토큰 사용
// ==============================

const MailCardWrap = styled(FlexBox)(({ theme }) => ({
  gap: '10px',
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: '10px',
  width: '100%',
  padding: '16px',
  flexDirection: 'column',
  backgroundColor: theme.palette.background.paper,
}))

const MailCardHeader = styled(AlignCenter)(({ theme }) => ({
  justifyContent: 'space-between',
  paddingBottom: '8px',
  borderBottom: `1px solid ${theme.palette.divider}`,
}))

const MailList = styled(FlexBox)({
  flexDirection: 'column',
  gap: '4px',
})

const MailItemWrap = styled(FlexBox, {
  shouldForwardProp: (prop) => prop !== 'isRead',
})<{ isRead: boolean }>(({ theme, isRead }) => ({
  flexDirection: 'column',
  gap: '2px',
  padding: '8px 10px',
  borderLeft: isRead
    ? '3px solid transparent'
    : `3px solid ${theme.palette.primary.main}`,
  borderRadius: '4px',
  cursor: 'pointer',
  transition: 'background-color 0.15s ease',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}))

const MailMeta = styled(AlignCenter)({
  justifyContent: 'space-between',
  gap: '8px',
})

const ImportantStar = styled('span')({
  color: '#f59e0b',
  marginLeft: '4px',
  fontSize: '13px',
})
