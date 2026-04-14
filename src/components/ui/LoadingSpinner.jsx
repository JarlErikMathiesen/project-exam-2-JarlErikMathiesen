import styled, { keyframes } from 'styled-components';
import { theme } from '../../theme/theme';

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
  border-radius: 50%;
  border: 15px solid ${theme.colors.border};
  border-top-color: ${theme.colors.primary};
  animation: ${spin} 0.75s linear infinite;
`;

export default function LoadingSpinner() {
  return (
    <SpinnerWrapper role="status" aria-label="Loading">
      <Ring />
    </SpinnerWrapper>
  );
}
