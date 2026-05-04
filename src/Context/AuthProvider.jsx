import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProfile } from '../api/profileApi';
import { AuthContext } from './AuthContext';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('cb_token'));
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const navigate = useNavigate();

  const isAuthenticated = !!token;

  const logout = useCallback(async () => {
    try {
      if (token) {
        await fetch(`${BASE_URL}/auth/logout`, {
          method: 'POST',
          headers: { 
            'Authorization': `Bearer ${token}` 
          }
        });
      }
    } catch (err) {
      console.error("Backend logout failed", err);
    } finally {
      localStorage.removeItem('cb_token');
      setToken(null);
      setUser(null);
      navigate('/');
    }
  }, [token, navigate]);

  useEffect(() => {
    if (token) {
      setIsLoading(true);
      getProfile(token)
        .then(data => {
          setUser(data.user);
        })
        .catch(err => {
          console.error("Token validation failed", err);
          logout();
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [token, logout]);

  const login = useCallback((newToken) => {
    localStorage.setItem('cb_token', newToken);
    setToken(newToken);
  }, []);

  return (
    <AuthContext.Provider value={{ token, user, isLoading, isAuthenticated, login, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
