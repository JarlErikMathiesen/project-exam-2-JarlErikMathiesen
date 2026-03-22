import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getVenueById, updateVenue } from '../api/venues';
import VenueForm from '../components/venue/VenueForm';

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

  if (!venue) return <p>Loading...</p>;

  return (
    <>
      <h1>Edit venue</h1>
      <VenueForm
        initialData={venue}
        onSubmit={handleUpdate}
        loading={loading}
      />
    </>
  );
}
