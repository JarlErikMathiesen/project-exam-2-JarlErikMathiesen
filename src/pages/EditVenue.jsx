import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getVenueById, updateVenue } from '../api/venues';
import VenueForm from '../components/venue/VenueForm';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import styled from 'styled-components';
import MainHeading from '../components/ui/MainHeading';

export default function EditVenue() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [venue, setVenue] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchVenue() {
      try {
        const data = await getVenueById(id);
        setVenue(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchVenue();
  }, [id]);

  const handleUpdate = async (data) => {
    try {
      setLoading(true);
      await updateVenue(id, data);
      navigate('/profile');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (!venue) return <LoadingSpinner />;

  return (
    <>
      <MainHeading>Edit venue</MainHeading>
      <VenueForm
        initialData={venue}
        onCancel={() => navigate('/profile')}
        onSubmit={handleUpdate}
        loading={loading}
      />
    </>
  );
}
