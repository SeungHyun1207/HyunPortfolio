import { AlignCenter, FlexBox, Title } from '@/views/layouts/CommonLayoutComponents'
import { Assignment as AssignmentIcon } from '@mui/icons-material'
import { Box, Chip, styled, Typography } from '@mui/material'
import { MOCK_APPROVALS } from '../intranet/intranetMock'

// ==============================
// 결재 타입 색상
// ==============================
const TYPE_COLOR: Record<string, string> = {
  지출: '#6366f1',
  구매: '#f59e0b',
  휴가: '#22c55e',
  기타: '#94a3b8',
}

const getTypeColor = (type: string) => TYPE_COLOR[type] ?? TYPE_COLOR['기타']

// ==============================
// ApprovalCard 컴포넌트
// ==============================
const ApprovalCard = () => {
  const totalCount   = MOCK_APPROVALS.length
  const pendingCount = MOCK_APPROVALS.length // 전부 대기중

  return (
    <ApprovalCardWrap>
      {/* ── 헤더 ── */}
      <ApprovalCardHeader>
        <Title sx={{ fontSize: '18px' }}>📋 결재 대기</Title>
        <AlignCenter sx={{ gap: '6px' }}>
          <CountChip label={`전체 ${totalCount}건`} size="small" />
          <CountChip label={`대기 ${pendingCount}건`} size="small" isPending />
        </AlignCenter>
      </ApprovalCardHeader>

      {/* ── 결재 목록 ── */}
      <ApprovalList>
        {MOCK_APPROVALS.map((item) => (
          <ApprovalItem key={item.id}>
            {/* 아이콘 */}
            <Box sx={{ color: getTypeColor(item.type), flexShrink: 0 }}>
              <AssignmentIcon fontSize="small" />
            </Box>

            {/* 내용 */}
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography
                sx={{
                  fontSize: '13px',
                  fontWeight: 600,
                  color: 'text.primary',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {item.title}
              </Typography>
              <Typography sx={{ fontSize: '11px', color: 'text.secondary' }}>
                {item.requester} · {item.requestedAt}
              </Typography>
            </Box>

            {/* 타입 칩 */}
            <Chip
              label={item.type}
              size="small"
              sx={{
                backgroundColor: getTypeColor(item.type),
                color: '#fff',
                fontWeight: 600,
                fontSize: '11px',
                height: '20px',
                flexShrink: 0,
              }}
            />
          </ApprovalItem>
        ))}
      </ApprovalList>
    </ApprovalCardWrap>
  )
}

export default ApprovalCard

// ==============================
// Styled 컴포넌트
// ==============================

const ApprovalCardWrap = styled(FlexBox)(({ theme }) => ({
  gap: '10px',
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: '10px',
  width: '100%',
  padding: '16px',
  flexDirection: 'column',
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
}))

const ApprovalCardHeader = styled(AlignCenter)(({ theme }) => ({
  justifyContent: 'space-between',
  paddingBottom: '8px',
  borderBottom: `1px solid ${theme.palette.divider}`,
}))

const CountChip = styled(Chip, {
  shouldForwardProp: (p) => p !== 'isPending',
})<{ isPending?: boolean }>(({ theme, isPending }) => ({
  fontSize: '11px',
  height: '20px',
  fontWeight: 600,
  backgroundColor: isPending ? '#f97316' : theme.palette.action.hover,
  color: isPending ? '#fff' : theme.palette.text.secondary,
}))

const ApprovalList = styled(FlexBox)({
  flexDirection: 'column',
  gap: '6px',
})

const ApprovalItem = styled(AlignCenter)(({ theme }) => ({
  gap: '10px',
  padding: '10px 12px',
  borderRadius: '8px',
  backgroundColor: theme.palette.action.hover,
  border: `1px solid ${theme.palette.divider}`,
  cursor: 'pointer',
  transition: 'background-color 0.15s',
  '&:hover': {
    backgroundColor: theme.palette.action.selected,
  },
}))
