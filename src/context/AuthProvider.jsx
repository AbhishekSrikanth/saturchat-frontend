import { useState, useEffect } from 'react';
import { AuthContext } from './AuthContext';

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
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