import React, { createContext, useReducer } from 'react';

const AuthContext = createContext();

const initialState = {
  user: JSON.parse(localStorage.getItem('lifebook_user')) || null,
  token: localStorage.getItem('lifebook_token') || null,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      localStorage.setItem('lifebook_user', JSON.stringify(action.payload.user));
      localStorage.setItem('lifebook_token', action.payload.token);
      return { user: action.payload.user, token: action.payload.token };

    case 'LOGOUT':
      localStorage.removeItem('lifebook_user');
      localStorage.removeItem('lifebook_token');
      return { user: null, token: null };

    default:
      return state;
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };