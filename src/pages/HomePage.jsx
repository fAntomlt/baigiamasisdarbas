import React from 'react';
import styled from 'styled-components';
import QuestionCard from '../components/organisms/QuestionCard';
import SidebarUserPanel from '../components/molecules/SidebarUserPanel';
import SortFilterBar from '../components/molecules/SortFilterBar';

const PageWrapper = styled.div`
  font-family: Arial, sans-serif;
`;

const Header = styled.div`
  background-color: #1775ee;
  color: white;
  padding: 1rem 2rem;
  font-size: 2rem;
  font-weight: bold;
`;

const ContentArea = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  padding: 2rem;
`;

const QuestionsBlock = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Sidebar = styled.div`
  flex: 1;
`;

const HomePage = () => {
  return (
    <PageWrapper>
      <Header>LifeBook</Header>
      <ContentArea>
        <QuestionsBlock>
          <SortFilterBar />
          <QuestionCard />
          <QuestionCard />
        </QuestionsBlock>
        <Sidebar>
          <SidebarUserPanel />
        </Sidebar>
      </ContentArea>
    </PageWrapper>
  );
};

export default HomePage;
