import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { AuthContext } from '../../context/AuthContext';

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

const Input = styled.input`
  width: 100%;
  margin-bottom: 1rem;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  width: 100%;
  padding: 0.5rem;
  background-color: rgba(0, 0, 0, 0.77);
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const RegisterText = styled.p`
  text-align: center;
  margin-top: 1rem;
  font-size: 0.9rem;
`;

const Error = styled.p`
  color: red;
  font-size: 0.9rem;
  text-align: center;
`;

const LoginForm = () => {
  const { dispatch } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Login failed');
        return;
      }

      dispatch({ type: 'LOGIN', payload: data });
    } catch (err) {
      setError('Kažkas nepavyko. Bandykite dar kartą.');
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
        <Button type="submit">Prisijungti</Button>
      </form>
      {error && <Error>{error}</Error>}
      <RegisterText>Jei neesate prisiregistravę – spauskite čia</RegisterText>
    </Box>
  );
};

export default LoginForm;