import { useState } from 'react';
import styled from 'styled-components';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Wrapper = styled.div`
  display: grid;
  gap: 0.5rem;

  @media (min-width: 768px) {
    grid-template-columns: 3fr 1fr;
  }
`;

const MainImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 350px;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radius.lg};
`;

const MainImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Arrow = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.4);
  border: none;
  color: white;
  padding: 0.4rem;
  cursor: pointer;

  ${({ left }) => left && 'left: 10px;'}
  ${({ right }) => right && 'right: 10px;'}

  @media (min-width: 768px) {
    display: none;
  }
`;

export default function VenueGallery({ media, name }) {
  const images = media?.map((m) => m.url) || [];
  const [index, setIndex] = useState(0);

  if (images.length === 0) return null;

  function next() {
    setIndex((prev) => (prev + 1) % images.length);
  }

  function prev() {
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  }

  return (
    <Wrapper>
      <MainImageWrapper>
        <MainImage src={images[index]} alt={name} />

        <Arrow left onClick={prev}>
          <ChevronLeft size={20} />
        </Arrow>

        <Arrow right onClick={next}>
          <ChevronRight size={20} />
        </Arrow>
      </MainImageWrapper>
    </Wrapper>
  );
}
