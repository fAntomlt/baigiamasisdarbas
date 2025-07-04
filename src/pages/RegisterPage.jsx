import React from 'react';
import styled from 'styled-components';
import RegisterForm from '../components/organisms/RegisterForm';
import registerWallpaper from '../assets/wallpaper2.jpg'
import {Link} from 'react-router-dom';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 4rem 2rem;
  background-image: url(${registerWallpaper});
  background-size: cover;
  background-position: center;
  font-family: Arial, sans-serif;
  gap: 4rem;
`;

const LeftColumn = styled.div`
  max-width: 400px;
  color: #1c1e21;
`;

const Logo = styled.h1`
  font-size: 4.5rem;
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

const ContentBox = styled.div`
  display: flex;
  background: rgba(255, 255, 255, 0.85);
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  padding: 3rem;
  gap: 7rem;
`;

const BottomLink = styled(Link)`
  display: inline-block;
  margin-top: 1.5rem;
  text-align: center;
  color: #1877f2;
  font-weight: bold;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const RegisterPage = () => {
  return (
    <Wrapper>
        <ContentBox>
            <LeftColumn>
                <Logo>LifeBook</Logo>
                <Intro>LifeBook yra vieta, kuri jungia žmones.</Intro>
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
                <BottomLink to="/">← Grįžti į prisijungimo puslapį</BottomLink>
            </RightColumn>
        </ContentBox>
    </Wrapper>
  );
};

export default RegisterPage;