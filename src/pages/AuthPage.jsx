import React from 'react';
import styled from 'styled-components';
import LoginForm from '../components/organisms/LoginForm';
import bookImage from '../assets/book.png';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color:rgb(205, 235, 253);
`;

const Header = styled.header`
  padding: 2rem 0;
  text-align: center;
  font-family: "Oswald", sans-serif;
  font-weight: bold;
  font-size: 6rem;
`;

const Content = styled.div`
  display: flex;
  flex: 1;
  padding: 2rem;
  justify-content: center;
  gap: 15rem;
  align-items: center;
`;

const Image = styled.img`
  width: 30%;
  object-fit: contain;
`;

const Subtext = styled.p`
  text-align: center;
  font-size: 1.2rem;
  margin-top: -1rem;
  color: #555;
  font-family: 'Poppins', sans-serif;
`;

const Divider = styled.div`
  height: 2px;
  width: 100%;
  background-color: white;
  margin: 5rem 0 auto;
  opacity: 50%;
`

const AuthPage = () => {
  return (
    <Wrapper>
      <Header>LifeBook</Header>
      <Subtext>Tavo nauja vieta įdėjų išpildymui ir generavimui.</Subtext>
      <Divider></Divider>
      <Content>
        <Image src={bookImage} alt="Book" />
        <LoginForm />
      </Content>
    </Wrapper>
  );
};

export default AuthPage;