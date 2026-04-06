import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button';
import { deleteVenue } from '../../api/venues';
import styled from 'styled-components';
import Card from '../ui/Card';

const handleDelete = async (id) => {
  try {
    await deleteVenue(id);

    window.location.reload();
  } catch (error) {
    console.error(error);
  }
};

const List = styled.div`
  display: grid;
  gap: 1rem;
  padding: 1rem;

  @media (min-width: 480px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr;
  }

  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;

const CardGrid = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ButtonsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto auto;
  gap: 10px;
  margin: 10px;

  & > button:first-child {
    grid-column: 1 / -1;
  }
`;

export default function ManagerVenues({ venues }) {
  const navigate = useNavigate();

  return (
    <>
      <h2>My venues</h2>
      <List>
        <Button onClick={() => navigate('/profile/create-venue')}>
          + Create new venue
        </Button>

        {venues?.length > 0 ? (
          venues.map((venue) => (
            <Card key={venue.id} as="div">
              <CardGrid>
                {venue.media?.[0]?.url && (
                  <img src={venue.media[0].url} alt={venue.name} />
                )}

                <h3>{venue.name}</h3>
                <p>{venue.price}£ per night</p>
                <ButtonsGrid>
                  <Button
                    onClick={() =>
                      navigate(`/profile/venue/${venue.id}/bookings`)
                    }
                  >
                    View bookings
                  </Button>

                  <Button
                    onClick={() => navigate(`/profile/venue/${venue.id}/edit`)}
                  >
                    Edit
                  </Button>

                  <Button onClick={() => handleDelete(venue.id)}>Delete</Button>
                </ButtonsGrid>
              </CardGrid>
            </Card>
          ))
        ) : (
          <p>No venues yet.</p>
        )}
      </List>
    </>
  );
}
