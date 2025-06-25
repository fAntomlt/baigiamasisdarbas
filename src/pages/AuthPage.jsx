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
  font-family: "Mouse Memoirs", sans-serif;
  font-weight: bold;
  font-size: 8rem;
`;

const Content = styled.div`
  display: flex;
  flex: 1;
  padding: 2rem;
  justify-content: space-around;
  align-items: center;
`;

const Image = styled.img`
  width: 35%;
  object-fit: contain;
`;

const AuthPage = () => {
  return (
    <Wrapper>
      <Header>LifeBook</Header>
      <Content>
        <Image src={bookImage} alt="Book" />
        <LoginForm />
      </Content>
    </Wrapper>
  );
};

export default AuthPage;