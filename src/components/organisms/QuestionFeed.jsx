import React from 'react';
import styled from 'styled-components';
import FilterBar from '../molecules/FilterBar';
import QuestionCard from '../molecules/QuestionCard';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const QuestionFeed = ({ questions, onUpdate, onDelete }) => {
  return (
    <Wrapper>
      <FilterBar />
      {questions.map((q) => (
        <QuestionCard
          key={q._id}
          _id={q._id}
          question={q.question}
          author={q.author}
          createdAt={q.createdAt}
          updatedAt={q.updatedAt}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </Wrapper>
  );
};

export default QuestionFeed;