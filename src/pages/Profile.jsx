import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../features/auth/useAuth';
import { getProfile } from '../api/profiles';

export default function Profile() {
  const { name } = useAuth();
  const [profile, setProfile] = useState(null);

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

  if (!profile) return <p>Loading...</p>;

  return (
    <Page>
      <Title>Profile</Title>

      <Avatar src={profile.avatar?.url} alt={profile.name} />

      <AvatarButton>Change Avatar</AvatarButton>

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

      <BookingsTitle>My bookings</BookingsTitle>
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

const AvatarButton = styled.button`
  background: #2f4f46;
  color: white;
  border: none;
  padding: 0.7rem 1.5rem;
  border-radius: 6px;
  font-size: 0.9rem;
  margin-bottom: 2rem;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
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
  color: #777;
  width: 60px;
`;

const Value = styled.span`
  font-weight: 500;
`;

const BookingsTitle = styled.h2`
  font-size: 1.6rem;
  margin-top: 1rem;
`;
