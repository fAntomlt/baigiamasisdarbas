import React, { createContext, useReducer } from 'react';

const AuthContext = createContext();

// Get user object from localStorage
const getUserFromStorage = () => {
  try {
    const stored = localStorage.getItem('lifebook_user');
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
};

const initialState = {
  user: getUserFromStorage(),
  token: localStorage.getItem('lifebook_token') || null,
};

// Reducer to handle auth state changes
const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      // Save user and token to localStorage
        localStorage.setItem('lifebook_user', JSON.stringify(action.payload.user));
        localStorage.setItem('lifebook_token', action.payload.token);
        return { user: action.payload.user, token: action.payload.token };
    case 'LOGOUT':
      // Clear user and token from localStorage
        localStorage.removeItem('lifebook_user');
        localStorage.removeItem('lifebook_token');
        return {user: null, token: null};
    default:
      return state;
  }
};

// AuthProvider: Wraps app and provides auth context
const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
        {children}
    </AuthContext.Provider>
  );
};

// Export context and provider
export {AuthContext, AuthProvider};