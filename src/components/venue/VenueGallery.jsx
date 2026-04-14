import { useState } from 'react';
import styled from 'styled-components';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import placeholderImg from '../../assets/holidaze_placeholder_image.jpg';

const Wrapper = styled.div`
  display: grid;
  gap: 0.5rem;
  height: 350px;
  margin-bottom: 35px;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 3fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 3fr 2fr;
  }
`;

const MainImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
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

const Thumbnail = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  min-height: 0;
  border-radius: ${({ theme }) => theme.radius.sm};
  cursor: pointer;

  opacity: ${({ active }) => (active ? 1 : 0.7)};

  @media (max-width: 1199px) {
    &:nth-child(n + 3) {
      display: none;
    }
  }
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

      <ThumbnailGrid>
        {images.slice(1, 5).map((img, i) => {
          const realIndex = i + 1;

          return (
            <Thumbnail
              key={realIndex}
              src={img}
              active={realIndex === index}
              onClick={() => setIndex(realIndex)}
            />
          );
        })}
      </ThumbnailGrid>
    </Wrapper>
  );
}
