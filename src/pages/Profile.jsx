import { useEffect } from 'react';
import { useAuth } from '../features/auth/useAuth';
import { getProfile } from '../api/profiles';

export default function Profile() {
  const { name } = useAuth();

  useEffect(() => {
    async function loadProfile() {
      const data = await getProfile(name);
      console.log(data);
    }

    if (name) {
      loadProfile();
    }
  }, [name]);

  return <h1>Profile Page</h1>;
}
