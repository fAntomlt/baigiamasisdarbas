import React from 'react';
import styled from 'styled-components';
import QuestionFeed from '../components/organisms/QuestionFeed';
import UserSidebar from '../components/organisms/UserSidebar';
import headerBg from '../assets/header-pattern.png';
import NewQuestionForm from '../components/molecules/NewQuestionForm';

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Header = styled.header`
  position: relative;
  background-color: #1877f2;
  color: white;
  padding: 1rem 2rem;
  font-size: 3rem;
  font-weight: bold;
  overflow: hidden; /* Ensures background won't be clipped */
    > * {
    position: relative;
    z-index: 1;
  }
  &::before {
    content: '';
    position: absolute;
    top: -40%;
    left: -50%;
    width: 200%;
    height: 200%;
    background-image: url(${headerBg});
    background-repeat: repeat;
    background-size: 16rem;
    opacity: 0.15;
    z-index: 0;
    transform: rotate(6deg);
    transform-origin: center;
  }
`;

const Content = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  padding: 2rem;
`;

const MainSection = styled.main`
  flex: 2;
  max-width: 700px;
`;

const SidebarSection = styled.aside`
  flex: 1;
  max-width: 250px;
`;

const HomePage = () => {
  return (
    <PageWrapper>
      <Header><span>LifeBook</span></Header>

      <Content>
        <MainSection>
          <NewQuestionForm />
          <QuestionFeed />
        </MainSection>

        <SidebarSection>
          <UserSidebar />
        </SidebarSection>
      </Content>
    </PageWrapper>
  );
};

export default HomePage;