import { useNavigate } from 'react-router-dom';
import Button from './Button';

export default function BackButton({ fallback = '/' }) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate(fallback);
    }
  };

  return <Button onClick={handleBack}>← Back</Button>;
}
