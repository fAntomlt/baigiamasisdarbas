import React from 'react';
import styled from 'styled-components';
import QuestionFeed from '../components/organisms/QuestionFeed';
import UserSidebar from '../components/organisms/UserSidebar';

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Header = styled.header`
  background-color: #1877f2;
  color: white;
  padding: 1rem 2rem;
  font-size: 1.8rem;
  font-weight: bold;
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
      <Header>LifeBook</Header>

      <Content>
        <MainSection>
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
