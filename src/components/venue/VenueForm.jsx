import { useState, useEffect } from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';

export default function VenueForm({ initialData = {}, onSubmit, loading }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [maxGuests, setMaxGuests] = useState('');

  const [imageUrl, setImageUrl] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');

  useEffect(() => {
    if (initialData.name) {
      setName(initialData.name || '');
      setDescription(initialData.description || '');
      setPrice(initialData.price || '');
      setMaxGuests(initialData.maxGuests || '');

      setImageUrl(initialData.media?.[0]?.url || '');
      setCity(initialData.location?.city || '');
      setCountry(initialData.location?.country || '');
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const venueData = {
      name,
      description,
      price: Number(price),
      maxGuests: Number(maxGuests),

      media: imageUrl ? [{ url: imageUrl, alt: name }] : [],

      location: {
        city: city || null,
        country: country || null,
      },
    };

    onSubmit(venueData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <Input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />
      <Input
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Price"
      />
      <Input
        type="number"
        value={maxGuests}
        onChange={(e) => setMaxGuests(e.target.value)}
        placeholder="Max guests"
      />

      <Input
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        placeholder="Image URL"
      />
      <Input
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="City"
      />
      <Input
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        placeholder="Country"
      />

      <Button type="submit" disabled={loading}>
        {loading ? 'Saving...' : 'Save venue'}
      </Button>
    </form>
  );
}
