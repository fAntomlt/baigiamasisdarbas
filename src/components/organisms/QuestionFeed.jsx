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
      {questions.map((q) => (
        <QuestionCard
  key={q._id}
  question={q.question}
  author={q.author}
  createdAt={q.createdAt}
  updatedAt={q.updatedAt}
  likes={q.likes}
  dislikes={q.dislikes}
  comments={q.comments}
  _id={q._id}
  onUpdate={onUpdate}
  onDelete={onDelete}
/>
      ))}
    </Wrapper>
  );
};

export default QuestionFeed;