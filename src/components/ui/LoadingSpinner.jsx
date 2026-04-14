import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const SpinnerWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 2rem;
`;

const Ring = styled.div`
  width: 150px;
  height: 150px;
  border: 15px solid ${({ theme }) => theme.colors.border};
  border-top-color: ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  animation: ${spin} 0.75s linear infinite;

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 250px;
    height: 250px;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 400px;
    height: 400px;
    border-width: 25px;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    width: 520px;
    height: 520px;
  }
`;

export default function LoadingSpinner() {
  return (
    <SpinnerWrapper role="status" aria-label="Loading">
      <Ring />
    </SpinnerWrapper>
  );
}
