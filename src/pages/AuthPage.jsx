import React from 'react';
import styled from 'styled-components';
import bookImage from '../assets/book.jpg';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Header = styled.header`
  padding: 2rem 0;
  text-align: center;
  font-size: 3rem;
  font-weight: bold;
`;

const Content = styled.div`
  display: flex;
  flex: 1;
  padding: 2rem;
  justify-content: space-between;
  align-items: center;
`;

const Image = styled.img`
  width: 45%;
  max-height: 500px;
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