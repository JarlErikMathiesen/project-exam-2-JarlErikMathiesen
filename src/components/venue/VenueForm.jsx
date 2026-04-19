import { useState, useEffect } from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { amenities } from '../../utils/amenities';
import styled from 'styled-components';
import FormField from '../ui/FormField';
import CheckboxField from '../ui/CheckboxField';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object({
  name: yup
    .string()
    .trim()
    .required('Name is required')
    .min(3, 'Name must be at least 3 characters'),

  description: yup
    .string()
    .required('Description is required')
    .min(10, 'Description must be at least 10 characters'),

  price: yup
    .number()
    .typeError('Price must be a number')
    .required('Price is required')
    .min(1, 'Price must be at least 1'),

  maxGuests: yup
    .number()
    .typeError('Guests must be a number')
    .required('Max guests is required')
    .min(1, 'At least 1 guest'),

  imageUrl: yup.string().url('Must be a valid URL').nullable(),

  city: yup
    .string()
    .required('city location is required')
    .min(1, 'city must have at least one character'),
  country: yup
    .string()
    .required('country location is required')
    .min(1, 'country must have at least one character'),
});

export default function VenueForm({
  initialData = {},
  onSubmit,
  onCancel,
  loading,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: {
      name: initialData.name || '',
      description: initialData.description || '',
      price: initialData.price || '',
      maxGuests: initialData.maxGuests || '',
      imageUrl: initialData.media?.[0]?.url || '',
      city: initialData.location?.city || '',
      country: initialData.location?.country || '',
    },
  });

  const [meta, setMeta] = useState({
    wifi: false,
    parking: false,
    breakfast: false,
    pets: false,
  });

  const handleAmenityChange = (key) => {
    setMeta((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };
  const onFormSubmit = (data) => {
    const venueData = {
      name: data.name,
      description: data.description,
      price: Number(data.price),
      maxGuests: Number(data.maxGuests),

      media: data.imageUrl ? [{ url: data.imageUrl, alt: data.name }] : [],

      location: {
        city: data.city || null,
        country: data.country || null,
      },

      meta,
    };

    onSubmit(venueData);
  };

  return (
    <FormWrapper>
      <FormInner onSubmit={handleSubmit(onFormSubmit)}>
        <FormField label="Name" id="name" error={errors.name?.message}>
          <Input id="name" placeholder="Enter name.." {...register('name')} />
        </FormField>
        <FormField label="Image" id="image" error={errors.imageUrl?.message}>
          <Input
            id="image"
            placeholder="Enter image URL"
            {...register('imageUrl')}
          />
        </FormField>
        <Row>
          <FormField label="Price" id="price" error={errors.price?.message}>
            <Input type="number" id="price" {...register('price')} />
          </FormField>
          <FormField
            label="Guests"
            id="guests"
            error={errors.maxGuests?.message}
          >
            <Input type="number" id="guests" {...register('maxGuests')} />
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
        <FormField
          label="Description"
          id="description"
          error={errors.description?.message}
        >
          <Input
            id="description"
            as="textarea"
            rows={5}
            {...register('description')}
          />
        </FormField>
        <Row>
          <FormField label="City" id="city" error={errors.city?.message}>
            <Input id="city" {...register('city')} />
          </FormField>
          <FormField
            label="Country"
            id="country"
            error={errors.country?.message}
          >
            <Input id="country" {...register('country')} />
          </FormField>
        </Row>
        <Button type="submit" disabled={loading}>
          {loading ? 'Saving...' : 'Save venue'}
        </Button>
        <Button type="button" onClick={onCancel}>
          Cancel
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
