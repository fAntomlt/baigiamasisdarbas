import React from 'react';
import styled from 'styled-components';

const Box = styled.div`
  width: 300px;
  padding: 2rem;
  background-color: #f3f3f3;
  border-radius: 10px;
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
  background-color: #333;
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

const LoginForm = () => {
  return (
    <Box>
      <Title>Prisijungti</Title>
      <Input type="text" placeholder="Slapyvardis" />
      <Input type="password" placeholder="Slaptažodis" />
      <Button>Prisijungti</Button>
      <RegisterText>Jei neesate prisiregistravę – spauskite čia</RegisterText>
    </Box>
  );
};

export default LoginForm;