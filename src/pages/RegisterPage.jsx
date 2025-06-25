import React from 'react';
import styled from 'styled-components';
import RegisterForm from '../components/organisms/RegisterForm';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 100vh;
  padding: 4rem 2rem;
  background-color: #e9ebee;
  font-family: Arial, sans-serif;
  gap: 4rem;
`;

const LeftColumn = styled.div`
  max-width: 400px;
  color: #1c1e21;
`;

const Logo = styled.h1`
  font-size: 3rem;
  color:rgb(0, 0, 0);
  margin-bottom: 1rem;
`;

const Intro = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;
`;

const FeatureList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const Feature = styled.li`
  margin-bottom: 0.8rem;
  &::before {
    content: "✔️ ";
    margin-right: 0.5rem;
  }
`;

const RightColumn = styled.div`
  background-color: #fff;
  padding: 2rem;
  border-radius: 10px;
  width: 400px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
`;

const Heading = styled.h2`
  text-align: center;
  margin-bottom: 1rem;
`;

const RegisterPage = () => {
  return (
    <Wrapper>
      <LeftColumn>
        <Logo>LifeBook</Logo>
        <Intro>LifeBook yra socialinis tinklas, kuris jungia žmones.</Intro>
        <FeatureList>
          <Feature>Bendrauk su draugais ir šeima</Feature>
          <Feature>Dalinkis nuotraukomis ir mintimis</Feature>
          <Feature>Rask bendraminčių ir diskutuok</Feature>
          <Feature>Tvarkyk savo klausimus ir atsakymus</Feature>
        </FeatureList>
      </LeftColumn>

      <RightColumn>
        <Heading>Registracija</Heading>
        <RegisterForm />
      </RightColumn>
    </Wrapper>
  );
};

export default RegisterPage;