import React from 'react';
import styled from 'styled-components';
import FilterBar from '../molecules/FilterBar';
import QuestionCard from '../molecules/QuestionCard';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const QuestionFeed = ({ questions }) => {
  return (
    <Wrapper>
      <FilterBar />

      {questions.map((q) => (
        <QuestionCard
          key={q._id}
          question={q.question}
          author={q.author?.username || 'Nežinomas'}
          date={new Date(q.createdAt).toLocaleDateString()}
          profilePic={q.author?.profilePic}
        />
      ))}
    </Wrapper>
  );
};

export default QuestionFeed;