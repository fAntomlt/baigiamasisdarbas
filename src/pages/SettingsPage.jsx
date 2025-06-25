import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 2rem;
  max-width: 600px;
  margin: 2rem auto;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 1.5rem;
`;

const Placeholder = styled.p`
  text-align: center;
  font-size: 1rem;
  color: #555;
`;

const SettingsPage = () => {
  return (
    <Wrapper>
      <Title>Nustatymai</Title>
      <Placeholder>Čia galėsite keisti savo paskyros informaciją (ateityje).</Placeholder>
    </Wrapper>
  );
};

export default SettingsPage;