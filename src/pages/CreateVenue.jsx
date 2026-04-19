import { createVenue } from '../api/venues';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import VenueForm from '../components/venue/VenueForm';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import MainHeading from '../components/ui/MainHeading';

export default function CreateVenue() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleCreate = async (data) => {
    try {
      setLoading(true);
      await createVenue(data);
      navigate('/profile');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <>
      <MainHeading>Create venue</MainHeading>
      <VenueForm
        onSubmit={handleCreate}
        onCancel={() => navigate('/profile')}
        loading={loading}
      />
    </>
  );
}
