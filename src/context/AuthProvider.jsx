import { useState, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import { getCurrentUser, verifyToken, refreshToken } from '../services/auth';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  const [tokens, setTokens] = useState(() => {
    const saved = localStorage.getItem('tokens');
    return saved ? JSON.parse(saved) : null;
  });

  // Persist tokens to localStorage
  useEffect(() => {
    if (tokens) {
      localStorage.setItem('tokens', JSON.stringify(tokens));
    } else {
      localStorage.removeItem('tokens');
    }
  }, [tokens]);

  // Persist user to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  // On mount or when tokens change: verify or refresh, then fetch user
  useEffect(() => {
    async function initAuth() {
      if (!tokens) return;

      try {
        // Attempt to verify current access token
        await verifyToken(tokens.access);
      } catch {
        // If verification fails, try to refresh
        try {
          const newTokens = await refreshToken(tokens.refresh);
          setTokens(newTokens);
        } catch {
          // Refresh failed: log out
          return logout();
        }
      }

      // Fetch and set current user
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch (err) {
        console.error('Failed to fetch user', err);
      }
    }

    initAuth();
  }, [tokens]);

  // Proactively refresh access token one minute before expiry
  useEffect(() => {
    if (!tokens?.access) return;

    let exp;
    try {
      const payload = JSON.parse(atob(tokens.access.split('.')[1]));
      exp = payload.exp * 1000;
    } catch {
      return;
    }

    const msUntilRefresh = exp - Date.now() - 60_000;
    if (msUntilRefresh <= 0) return;

    const timer = setTimeout(async () => {
      try {
        const newTokens = await refreshToken(tokens.refresh);
        setTokens(newTokens);
      } catch {
        logout();
      }
    }, msUntilRefresh);

    return () => clearTimeout(timer);
  }, [tokens]);

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
