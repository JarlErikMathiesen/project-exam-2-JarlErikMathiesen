import { useEffect } from 'react';
import { getProfiles } from '../api/profiles';

export default function Profile() {
  useEffect(() => {
    async function loadProfiles() {
      try {
        const data = await getProfiles();
        console.log('Returned data:', data);
      } catch (error) {
        console.error(error);
      }
    }

    loadProfiles();
  }, []);

  return <h1>Profile Page</h1>;
}
