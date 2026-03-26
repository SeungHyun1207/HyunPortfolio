import { Box, styled, Typography } from '@mui/material';

export const FlexBox = styled(Box)({
  display: 'flex',
});

export const AlignCenter = styled(FlexBox)({
  alignItems: 'center',
});

export const CenterBox = styled(AlignCenter)({
  justifyContent: 'center',
});

export const Title = styled(Typography)({
  fontSize: '22px',
  fontWeight: '700',
});

export const Description = styled(Typography)({
  fontSize: '11px',
});

export const SettingBox = styled(Box)({
  width: '50px',
  height: '50px',
});

/**
 * 진행중 뱃지 추후 뱃지 커스텀에 추가
 */
export const InProgressBadge = styled(CenterBox)({
  width: '100px',
  height: '40px',
  borderRadius: '50px',
  fontSize: '0.75rem',
  fontWeight: 700,
  color: '#fb923c',
  backgroundColor: 'rgba(251,146,60,0.12)',
  border: '1px solid rgba(251,146,60,0.3)',
  textAlign: 'center',
});
