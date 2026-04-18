import { createContext, useContext, useState } from 'react';
import styled from 'styled-components';

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });

    setTimeout(() => {
      setToast(null);
    }, 2000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && <Toast type={toast.type}>{toast.message}</Toast>}
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}

const Toast = styled.div`
  position: fixed;
  top: 50%;
  right: 50%;
  background: ${({ type, theme }) =>
    type === 'error' ? theme.colors.error : theme.colors.primary};
  color: white;
  padding: 50px;
  border-radius: 8px;
  font-size: 14px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;

  animation: slideIn 0.3s ease;

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
