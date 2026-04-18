import { useState, useEffect } from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { amenities } from '../../utils/amenities';
import styled from 'styled-components';
import FormField from '../ui/FormField';
import CheckboxField from '../ui/CheckboxField';

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
        <FormField label="Name" id="name">
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name.."
          />
        </FormField>
        <FormField label="Image" id="image">
          <Input
            id="image"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="Enter image URL"
          />
        </FormField>
        <Row>
          <FormField label="Price" id="price">
            <Input
              id="price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Price"
            />
          </FormField>
          <FormField label="Guests" id="guests">
            <Input
              id="guests"
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
                <CheckboxField
                  label={key}
                  name={key}
                  checked={meta[key]}
                  onChange={() => handleAmenityChange(key)}
                  icon={<TrueIcon size={18} />}
                />
              </AmenityItem>
            ))}
          </AmenitiesGrid>
        </AmenitiesBox>
        <FormField label="Description" id="description">
          <Input
            id="description"
            as="textarea"
            rows={5}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
          />
        </FormField>
        <Row>
          <FormField label="City" id="city">
            <Input
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="City"
            />
          </FormField>
          <FormField label="Country" id="country">
            <Input
              id="country"
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

const AmenitiesTitle = styled.h2`
  margin-bottom: 0.5rem;
`;

const AmenitiesGrid = styled.div`
  display: grid;
  gap: 0.8rem 1rem;
  justify-self: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr 1fr;
    justify-self: normal;
  }
`;

const AmenityItem = styled.label`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
