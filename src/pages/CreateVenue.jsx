import { createVenue } from '../api/venues';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import VenueForm from '../components/venue/VenueForm';
import LoadingSpinner from '../components/ui/LoadingSpinner';

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
      <h1>Create venue</h1>
      <VenueForm
        onSubmit={handleCreate}
        onCancel={() => navigate('/profile')}
        loading={loading}
      />
    </>
  );
}
