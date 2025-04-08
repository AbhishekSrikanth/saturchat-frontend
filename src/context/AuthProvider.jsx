import { useState, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import { getCurrentUser, verifyToken } from '../services/auth';

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

  useEffect(() => {
    async function initAuth() {
      if (!tokens || user) return;

      try {
        // Step 1: Verify access token
        await verifyToken(tokens.access);

        // Step 2: If token is valid, fetch user
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch {
        logout();
      }
    }

    initAuth();
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
