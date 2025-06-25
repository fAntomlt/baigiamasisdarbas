import React from 'react';
import styled from 'styled-components';
import FilterBar from '../molecules/FilterBar';
import QuestionCard from '../molecules/QuestionCard';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const QuestionFeed = () => {
  // Dummy list of questions for now
  const questions = [
    {
      id: 1,
      question: 'Kaip pradėti mokytis React?',
      author: 'Jonas Petraitis',
      date: '2025-06-25',
      profilePic: '',
      comments: 3,
      likes: 5,
      dislikes: 0,
    },
    {
      id: 2,
      question: 'Kokie yra geriausi MongoDB praktikavimo šaltiniai?',
      author: 'Aistė Kazlauskaitė',
      date: '2025-06-24',
      profilePic: '',
      comments: 1,
      likes: 2,
      dislikes: 0,
    },
  ];

  return (
    <Wrapper>
      <FilterBar />

      {questions.map((q) => (
        <QuestionCard key={q.id} {...q} />
      ))}
    </Wrapper>
  );
};

export default QuestionFeed;