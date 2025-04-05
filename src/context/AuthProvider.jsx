import { useState, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import { getCurrentUser } from '../services/auth';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  const [tokens, setTokens] = useState(() => {
    const saved = localStorage.getItem('tokens');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (tokens) {
      localStorage.setItem('tokens', JSON.stringify(tokens));
    } else {
      localStorage.removeItem('tokens');
    }
  }, [tokens]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  // Fetch current user if tokens exist and user is not yet loaded
  useEffect(() => {
    async function fetchUser() {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch (err) {
        console.error('Failed to fetch current user:', err);
        logout(); // Invalid or expired token
      }
    }

    if (tokens && !user) {
      fetchUser();
    }
  }, [tokens, user]);

  const login = (userData, tokenData) => {
    setUser(userData);
    setTokens(tokenData);
  };

  const logout = () => {
    setUser(null);
    setTokens(null);
  };

  const value = {
    user,
    tokens,
    login,
    logout,
    isAuthenticated: !!tokens,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
