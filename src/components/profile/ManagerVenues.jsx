import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button';
import { deleteVenue } from '../../api/venues';
import styled from 'styled-components';
import Card from '../ui/Card';
import List from '../ui/ProfileList';

const handleDelete = async (id) => {
  try {
    await deleteVenue(id);

    window.location.reload();
  } catch (error) {
    console.error(error);
  }
};

/* const List = styled.div`
  display: grid;
  gap: 1rem;
  padding: 1rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr 1fr 1fr;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`; */

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

const CreateButtonWrapper = styled.div`
  display: flex;
`;

export default function ManagerVenues({ venues }) {
  const navigate = useNavigate();

  return (
    <>
      <h2>My venues</h2>
      <CreateButtonWrapper>
        <Button onClick={() => navigate('/profile/create-venue')}>
          + Create new venue
        </Button>
      </CreateButtonWrapper>
      <List>
        {venues.map((venue) => (
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
        ))}
      </List>
    </>
  );
}
