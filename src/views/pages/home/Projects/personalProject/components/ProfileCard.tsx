import { FlexBox } from '@/views/layouts/CommonLayoutComponents';
import ProfileImg from '@assets/img/Profile.jpg';
import { styled } from '@mui/material';
import useUserInfo from '@/stores/common/useUserInfo';

const ProfileCard = () => {
  const { currentUser: _currentUser } = useUserInfo();

  return (
    <ProfileWrap>
      <ProfileImage src={ProfileImg} alt="SeungHyun Profile" />
      <ProfileInfo></ProfileInfo>
    </ProfileWrap>
  );
};

export default ProfileCard;

const ProfileWrap = styled(FlexBox)({});

const ProfileInfo = styled(FlexBox)({});

const ProfileImage = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  display: 'block',
});
