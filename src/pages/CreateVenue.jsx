import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createVenue } from '../api/venues';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

export default function CreateVenue() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [maxGuests, setMaxGuests] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const venueData = {
      name,
      price: Number(price),
      maxGuests: Number(maxGuests),
      description,
    };

    try {
      await createVenue(venueData);
      navigate('/profile');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Create venue</h1>

      <Input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <Input
        placeholder="Price"
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <Input
        placeholder="Max guests"
        type="number"
        value={maxGuests}
        onChange={(e) => setMaxGuests(e.target.value)}
      />

      <Input
        placeholder="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Button type="submit">Create</Button>
    </form>
  );
}
