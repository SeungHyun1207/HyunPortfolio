import { CenterBox } from '@/views/layouts/CommonLayoutComponents';
import { Box, Button, styled, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ProfileCard from '../components/ProfileCard';

const IntranetIndex = () => {
  const navigate = useNavigate();

  return (
    <IntranetWrap>
      <ProfileCard />
      <Typography sx={{ fontSize: '4rem' }}>🏢</Typography>

      <Typography
        variant="h3"
        fontWeight={800}
        sx={{ textAlign: 'center', fontSize: { xs: '1.75rem', md: '2.5rem' } }}
      >
        사내관리시스템
      </Typography>

      <Typography
        variant="body1"
        color="text.secondary"
        sx={{ textAlign: 'center', maxWidth: 480 }}
      >
        직원 및 관리자가 사용하는 사내 통합 관리 시스템입니다.
        <br />
        현재 개발 진행 중입니다.
      </Typography>

      <Box
        sx={{
          px: 2.5,
          py: 1,
          borderRadius: 2,
          fontSize: '0.75rem',
          fontWeight: 700,
          color: '#fb923c',
          bgcolor: 'rgba(251,146,60,0.12)',
          border: '1px solid rgba(251,146,60,0.3)',
        }}
      >
        개발중
      </Box>

      <Button variant="outlined" onClick={() => navigate(-1)} sx={{ mt: 2, borderRadius: 3 }}>
        ← 돌아가기
      </Button>
    </IntranetWrap>
  );
};

export default IntranetIndex;

const IntranetWrap = styled(CenterBox)({
  minHeight: '100vh',
  backgroundColor: 'background.default',
  flexDirection: 'column',
  gap: 3,
  px: 2,
});
