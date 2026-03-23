import { useState, useEffect } from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { amenities } from '../../utils/amenities';

export default function VenueForm({ initialData = {}, onSubmit, loading }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [maxGuests, setMaxGuests] = useState('');

  const [imageUrl, setImageUrl] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');

  const [meta, setMeta] = useState({
    wifi: false,
    parking: false,
    breakfast: false,
    pets: false,
  });

  useEffect(() => {
    if (initialData.name) {
      setName(initialData.name || '');
      setDescription(initialData.description || '');
      setPrice(initialData.price || '');
      setMaxGuests(initialData.maxGuests || '');

      setImageUrl(initialData.media?.[0]?.url || '');
      setCity(initialData.location?.city || '');
      setCountry(initialData.location?.country || '');
      setMeta({
        wifi: initialData.meta?.wifi || false,
        parking: initialData.meta?.parking || false,
        breakfast: initialData.meta?.breakfast || false,
        pets: initialData.meta?.pets || false,
      });
    }
  }, [initialData]);

  const handleAmenityChange = (key) => {
    setMeta((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };
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

      meta,
    };

    console.log('Submitting:', venueData);

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

      <h3>Amenities</h3>

      <div>
        {amenities.map(({ key, TrueIcon }) => (
          <label
            key={key}
            style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <TrueIcon size={16} />

            <input
              type="checkbox"
              checked={meta[key]}
              onChange={() => handleAmenityChange(key)}
            />

            {key}
          </label>
        ))}
      </div>

      <Button type="submit" disabled={loading}>
        {loading ? 'Saving...' : 'Save venue'}
      </Button>
    </form>
  );
}
