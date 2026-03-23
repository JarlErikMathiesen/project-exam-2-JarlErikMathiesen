import { useState, useEffect } from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { amenities } from '../../utils/amenities';
import styled from 'styled-components';
import FormField from '../ui/FormField';

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
    <FormWrapper>
      <FormInner onSubmit={handleSubmit}>
        <FormField label="Name">
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name.."
          />
        </FormField>
        <FormField label="Image">
          <Input
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="Enter image URL"
          />
        </FormField>
        <Row>
          <FormField label="Price">
            <Input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Price"
            />
          </FormField>
          <FormField label="Guests">
            <Input
              type="number"
              value={maxGuests}
              onChange={(e) => setMaxGuests(e.target.value)}
              placeholder="Max guests"
            />
          </FormField>
        </Row>
        <AmenitiesTitle>Amenities</AmenitiesTitle>
        <AmenitiesBox>
          <AmenitiesGrid>
            {amenities.map(({ key, TrueIcon }) => (
              <AmenityItem key={key}>
                <Left>
                  <TrueIcon size={18} />
                  <span>{key}</span>
                </Left>

                <input
                  type="checkbox"
                  checked={meta[key]}
                  onChange={() => handleAmenityChange(key)}
                />
              </AmenityItem>
            ))}
          </AmenitiesGrid>
        </AmenitiesBox>
        <FormField label="Description">
          <Input
            as="textarea"
            rows={5}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
          />
        </FormField>
        <Row>
          <FormField label="City">
            <Input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="City"
            />
          </FormField>
          <FormField label="Country">
            <Input
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="Country"
            />
          </FormField>
        </Row>
        <Button type="submit" disabled={loading}>
          {loading ? 'Saving...' : 'Save venue'}
        </Button>
      </FormInner>
    </FormWrapper>
  );
}

const FormWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 2rem 1rem;
`;

const FormInner = styled.form`
  width: 100%;
  max-width: 420px;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const Row = styled.div`
  display: flex;
  gap: 1rem;
`;

const AmenitiesBox = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.sm};
  background: ${({ theme }) => theme.colors.white};
  padding: 1rem;
`;

const AmenitiesTitle = styled.h3`
  margin-bottom: 0.5rem;
`;

const AmenitiesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.8rem 1rem;
`;

const AmenityItem = styled.label`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;
