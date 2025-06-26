import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import Input from '../atoms/Input';
import Button from '../atoms/Button';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Box = styled.div`
  width: 300px;
  padding: 2rem;
  background-color: rgba(224, 244, 255, 0.77);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 1rem;
`;

const RegisterText = styled.p`
  text-align: center;
  margin-top: 1rem;
  font-size: 0.9rem;
  color:rgb(0, 0, 0);
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const Error = styled.p`
  color: red;
  font-size: 0.9rem;
  text-align: center;
`;

const LoginForm = () => {
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });

      dispatch({
        type: 'LOGIN',
        payload: {
          user: {
            _id: res.data._id,
            username: res.data.username,
            email: res.data.email,
            profilePic: res.data.profilePic,
          },
          token: res.data.token,
        },
      });

      navigate('/home');
    } catch (err) {
      setError(
        err.response?.data?.message || 'Kažkas nepavyko. Bandykite dar kartą.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Title>Prisijungti</Title>
      <form onSubmit={handleLogin}>
        <Input
          type="email"
          placeholder="El. paštas"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Slaptažodis"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit">{loading ? '⏳' : 'Prisijungti'}</Button>
      </form>
      {error && <Error>{error}</Error>}
      <RegisterText onClick={() => navigate('/register')}>
        Jei neesate prisiregistravę – spauskite čia
      </RegisterText>
    </Box>
  );
};

export default LoginForm;