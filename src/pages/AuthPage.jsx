import React from 'react';
import styled from 'styled-components';
import LoginForm from '../components/organisms/LoginForm';
import bookImage from '../assets/book.png';
import topSectionBg from '../assets/topsectionpic.jpg';
import wallpaper from '../assets/wallpaper.jpg'

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  min-height: 100vh;
  background-image: url(${wallpaper});
  background-size: cover;
  background-position: center;
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
  justify-content: center;
  align-items: center;
  gap: 15rem;
`;

const Subtext = styled.p`
  text-align: center;
  font-size: 1.2rem;
  margin-top: -1rem;
  color: rgb(4, 8, 10);
  font-family: 'Poppins', sans-serif;
`;

const LeftSide = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-right: 2rem;
`;

const RightSide = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const VerticalDivider = styled.div`
  width: 2px;
  background-color: white;
  height: 100%;
`;

const AuthPage = () => {
  return (
    <Wrapper>
      <Content>
        <LeftSide>
          <Header>LifeBook</Header>
          <Subtext>Tavo nauja vieta įdėjų išpildymui ir generavimui.</Subtext>
        </LeftSide>
        <VerticalDivider />
        <RightSide>
          <LoginForm />
        </RightSide>
      </Content>
    </Wrapper>
  );
};

export default AuthPage;