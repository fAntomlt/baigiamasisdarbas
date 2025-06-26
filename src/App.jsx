import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import {AuthContext} from './context/AuthContext';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import SettingsPage from './pages/SettingsPage';
import QuestionDetailPage from './pages/QuestionDetailPage';

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
        <Route path="/settings" element={<PrivateRoute element={SettingsPage} />} />
        <Route path="/questions/:id" element={<QuestionDetailPage />} />
      </Routes>
    </Router>
  );
};

export default App;