import useUserInfo from '@/stores/common/useUserInfo';
import { CenterBox, FlexBox, SettingBox } from '@/views/layouts/CommonLayoutComponents';
import ProfileImg from '@assets/img/Profile.jpg';
import { Button, styled, Typography } from '@mui/material';

const ProfileCard = () => {
  const { currentUser: _currentUser } = useUserInfo();

  return (
    <ProfileCardWrap>
      <ProfileInfoWrap>
        <ProfileImage src={ProfileImg} alt="SeungHyun Profile" />
        <ProfileInfo>
          <ProfileTitle>
            <NameWithPostionBox>
              <Typography>{_currentUser?.name}</Typography>
              <Typography>{_currentUser?.position}</Typography>
            </NameWithPostionBox>
            <SettingBox>
              {/* 각종 컨텐츠 있어야 함 */}
              <Button>설정</Button>
            </SettingBox>
          </ProfileTitle>

          <Typography>{_currentUser?.department}</Typography>
          <Typography>{_currentUser?.email}</Typography>
          <Typography>{_currentUser?.joinedAt}</Typography>
        </ProfileInfo>
      </ProfileInfoWrap>

      <WorkList>
        {/* workList && workList.map((item)) */}
        {/* 애니메이션 추가 예정 0건 이상일 경우 */}
        <WorkCard>
          <WorkTitle>일정</WorkTitle>
          <WorkDesc>0 건</WorkDesc>
        </WorkCard>

        <WorkCard>
          <WorkTitle>휴가</WorkTitle>
          <WorkDesc>10 일</WorkDesc>
          <WorkDesc>4 시간</WorkDesc>
        </WorkCard>

        <WorkCard>
          <WorkTitle>안 읽은 메일</WorkTitle>
          <WorkDesc>0 건</WorkDesc>
        </WorkCard>

        <WorkCard>
          <WorkTitle>결재 대기</WorkTitle>
          <WorkDesc>0 건</WorkDesc>
        </WorkCard>
      </WorkList>
    </ProfileCardWrap>
  );
};

export default ProfileCard;

const ProfileCardWrap = styled(FlexBox)({
  gap: '10px',
  border: '1px solid black',
  borderRadius: '10px',
  width: '33.33%',
  padding: '10px',
  flexDirection: 'column',
});

const ProfileInfoWrap = styled(FlexBox)({
  gap: '10px',
});

const ProfileInfo = styled(FlexBox)({
  flexDirection: 'column',
  width: '100%',
});

const ProfileImage = styled('img')({
  width: '100px',
  height: '120px',
  objectFit: 'cover',
  display: 'block',
  borderRadius: '5px',
});

const ProfileTitle = styled(FlexBox)({
  width: '100%',
  justifyContent: 'space-between',
});

const NameWithPostionBox = styled(FlexBox)({
  gap: '10px',
  '& .MuiTypography-root': {
    fontSize: '22px',
    fontWeight: 'bold',
  },
});

const WorkList = styled(FlexBox)({
  width: '100%',
  gap: '10px',
});

const WorkCard = styled(CenterBox)({
  width: '100%',
  border: '1px solid black',
  padding: '10px',
  flexDirection: 'column',
  borderRadius: '10px',
});

const WorkTitle = styled(Typography)({
  fontSize: '17px',
  fontWeight: 600,
});

const WorkDesc = styled(Typography)({
  fontSize: '20px',
  fontWeight: 'bold',
});
