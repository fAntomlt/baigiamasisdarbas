import React from 'react';
import styled from 'styled-components';

const LoginForm = () => {
  return (
    <Box>
      <Title>Login</Title>
      <Input type="text" placeholder="Username" />
      <Input type="password" placeholder="Password" />
      <Button>Prisijungti</Button>
      <RegisterText>Jei neesate prisiregistravę – spauskite čia</RegisterText>
    </Box>
  );
};

export default LoginForm;