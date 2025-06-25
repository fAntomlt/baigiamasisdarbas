import { createContext, useReducer, useEffect } from 'react';

const AuthContext = createContext();

const initialState = {
  user: JSON.parse(localStorage.getItem('lifebook_user')) || null,
};