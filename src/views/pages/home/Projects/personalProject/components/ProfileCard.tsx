import useUserInfo from '@/stores/common/useUserInfo';
import { FlexBox, SettingBox } from '@/views/layouts/CommonLayoutComponents';
import ProfileImg from '@assets/img/Profile.jpg';
import { Button, styled, Typography } from '@mui/material';

const ProfileCard = () => {
  const { currentUser: _currentUser } = useUserInfo();

  return (
    <ProfileWrap>
      <ProfileImage src={ProfileImg} alt="SeungHyun Profile" />
      <ProfileInfo>
        <ProfileTitle>
          <NameWithPostionBox>
            <Typography>{_currentUser?.name}</Typography>
            <Typography>{_currentUser?.position}</Typography>
          </NameWithPostionBox>
          <SettingBox>
            <Button>설정</Button>
          </SettingBox>
        </ProfileTitle>

        <Typography>{_currentUser?.department}</Typography>
        <Typography>{_currentUser?.email}</Typography>
        <Typography>{_currentUser?.joinedAt}</Typography>
      </ProfileInfo>
    </ProfileWrap>
  );
};

export default ProfileCard;

const ProfileWrap = styled(FlexBox)({
  gap: '10px',
  border: '1px solid black',
  borderRadius: '10px',
  width: '33.33%',
  padding: '10px',
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
