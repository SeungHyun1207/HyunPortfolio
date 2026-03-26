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
