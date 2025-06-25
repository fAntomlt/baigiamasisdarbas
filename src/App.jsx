import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import {AuthContext} from './context/AuthContext';

const PrivateRoute = ({ element: Element }) => {
  const { user } = useContext(AuthContext);
  return user ? <Element /> : <Navigate to="/" />;
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={<PrivateRoute element={HomePage} />} />
      </Routes>
    </Router>
  );
};

export default App;