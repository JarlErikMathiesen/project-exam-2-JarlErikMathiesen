import { useState } from 'react';
import styled from 'styled-components';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import placeholderImg from '../../assets/holidaze_placeholder_image.jpg';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 35px;
`;
const MainImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: clamp(250px, 40vw, 500px);
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radius.lg};
`;

const MainImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ThumbnailGrid = styled.div`
  display: none;
  min-height: 0;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: repeat(2, 1fr);
    gap: 0.5rem;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: repeat(2, 1fr);
  }
`;

const ThumbnailRow = styled.div`
  display: flex;
  gap: 0.5rem;
  overflow-x: auto;
  padding-bottom: 0.25rem;

  scroll-snap-type: x mandatory;

  &::-webkit-scrollbar {
    height: 6px;
  }
`;

const Thumbnail = styled.img`
  flex: 0 0 auto;
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.radius.sm};
  cursor: pointer;

  opacity: ${({ active }) => (active ? 1 : 0.6)};
  border: ${({ active, theme }) =>
    active ? `2px solid ${theme.colors.primary}` : 'none'};

  scroll-snap-align: start;
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

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;

export default function VenueGallery({ media, name }) {
  const images =
    media?.length > 0
      ? media.map((m) =>
          m.url && m.url.trim() !== '' ? m.url : placeholderImg,
        )
      : [placeholderImg];
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

        {images.length > 1 && (
          <>
            <Arrow left onClick={prev}>
              <ChevronLeft size={20} />
            </Arrow>
            <Arrow right onClick={next}>
              <ChevronRight size={20} />
            </Arrow>
          </>
        )}
      </MainImageWrapper>

      {images.length > 1 && (
        <ThumbnailRow>
          {images.map((img, i) => (
            <Thumbnail
              key={i}
              src={img}
              active={i === index}
              onClick={() => setIndex(i)}
            />
          ))}
        </ThumbnailRow>
      )}
    </Wrapper>
  );
}
