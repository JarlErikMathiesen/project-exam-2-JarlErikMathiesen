import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [accessToken, setAccessToken] = useState(null);
  const [name, setName] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const storedName = localStorage.getItem('profileName');

    if (token) {
      setAccessToken(token);
    }
    if (storedName) {
      setName(storedName);
    }
  }, []);

  const login = (token, name) => {
    localStorage.setItem('accessToken', token);
    setAccessToken(token);
    localStorage.setItem('profileName', name);
    setName(name);
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    setAccessToken(null);
    localStorage.removeItem('profileName');
    setName(null);
  };

  const value = {
    accessToken,
    name,
    isLoggedIn: !!accessToken,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
