import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../features/auth/useAuth';
import { getProfile, updateProfileAvatar } from '../api/profiles';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import CustomerBookings from '../components/profile/CustomerBookings';
import ManagerVenues from '../components/profile/ManagerVenues';
import LoadingSpinner from '../components/ui/LoadingSpinner';

export default function Profile() {
  const { name } = useAuth();
  const [profile, setProfile] = useState(null);
  const [showInput, setShowInput] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState('');

  useEffect(() => {
    async function loadProfile() {
      try {
        const data = await getProfile(name);
        console.log('Profile data:', data);
        setProfile(data.data);
      } catch (error) {
        console.error(error);
      }
    }

    if (name) loadProfile();
  }, [name]);

  if (!profile) return <LoadingSpinner />;
  const isManager = profile.venueManager;
  console.log(isManager);

  const handleAvatarSubmit = async () => {
    const body = {
      avatar: {
        url: avatarUrl,
        alt: 'User avatar',
      },
    };

    console.log('body:', body);

    try {
      const updatedProfile = await updateProfileAvatar(name, body);

      setProfile((prev) => ({ ...prev, ...updatedProfile }));
      setShowInput(false);
      setAvatarUrl('');
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Page>
      <Title>Profile</Title>

      <Avatar src={profile.avatar?.url} alt={profile.name} />
      <AvatarButtons>
        <Button onClick={() => setShowInput(!showInput)}>Change Avatar</Button>
        {showInput && (
          <>
            <Input
              type="text"
              placeholder="Enter new avatar URL..."
              value={avatarUrl}
              onChange={(e) => setAvatarUrl(e.target.value)}
            />

            <Button onClick={handleAvatarSubmit}>Submit</Button>
          </>
        )}
      </AvatarButtons>
      <InfoBox>
        <InfoRow>
          <Label>Name</Label>
          <Value>{profile.name}</Value>
        </InfoRow>

        <InfoRow>
          <Label>Email</Label>
          <Value>{profile.email}</Value>
        </InfoRow>
      </InfoBox>

      {profile.venueManager ? (
        <>
          <ManagerVenues venues={profile.venues} />
          <CustomerBookings bookings={profile.bookings} />
        </>
      ) : (
        <CustomerBookings bookings={profile.bookings} />
      )}
    </Page>
  );
}

const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 1.5rem;
`;

const Avatar = styled.img`
  width: 110px;
  height: 110px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 1rem;
`;

const AvatarButtons = styled.div`
  flex-direction: column;
  display: flex;
  gap: 20px;
  margin: 20px;
  width: 250px;
`;

const InfoBox = styled.div`
  text-align: left;
  margin-bottom: 2rem;
`;

const InfoRow = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 0.5rem;
`;

const Label = styled.span`
  width: 60px;
`;

const Value = styled.span`
  font-weight: 500;
`;
