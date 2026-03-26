import {
  Description,
  FlexBox,
  InProgressBadge,
  Title,
} from '@/views/layouts/CommonLayoutComponents';
import { Button, styled } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ProfileCard from '../components/ProfileCard';

const IntranetIndex = () => {
  const navigate = useNavigate();

  return (
    <IntranetWrap>
      <FlexBox>
        <InProgressBadge>개발중</InProgressBadge>
        <Button variant="outlined" onClick={() => navigate(-1)}>
          ← 돌아가기
        </Button>
      </FlexBox>

      <IntranetPageTitle>
        <Title>🏢사내관리시스템</Title>
        <Description>사내 통합 관리 시스템입니다.</Description>
      </IntranetPageTitle>

      {/* Profile Card */}
      <ProfileCard />

      {/* Vacation Card */}
    </IntranetWrap>
  );
};

export default IntranetIndex;

const IntranetWrap = styled(FlexBox)({
  minHeight: 'calc(100vh - 80px)',
  padding: '32px',
  flexDirection: 'column',
  gap: '10px',
});

const IntranetPageTitle = styled(FlexBox)({
  marginBottom: '20px',
  borderBottom: '1px solid #182030',
  flexDirection: 'column',
  gap: '10px',
});
