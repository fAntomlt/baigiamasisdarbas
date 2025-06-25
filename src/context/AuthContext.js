import { createContext, useReducer, useEffect } from 'react';

const AuthContext = createContext();

const initialState = {
  user: JSON.parse(localStorage.getItem('lifebook_user')) || null,
};

const authReducer = (state, action) => {
    switch (action.type){
        case 'LOGIN':
            localStorage.setItem('lifebook_user', JSON.stringify(action.payload));
            return {user: action.payload};
        case 'LOGOUT':
            localStorage.removeItem('lifebook_user');
            return {user: null};
        default:
            return state;
    }
};

const AuthProvider = ({children}) => {
    const [state, dispatch] = useReducer(authReducer, initialState);
    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            {children}
        </AuthContext.Provider>
    );
};

export {AuthContext, AuthProvider};