import React from 'react';
import styled from 'styled-components';
import { FaRegComment, FaThumbsUp, FaThumbsDown } from 'react-icons/fa';

const Card = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem 1.2rem;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  margin-bottom: 1.2rem;
`;

const Avatar = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
`;

const Content = styled.div`
  flex-grow: 1;
`;

const Question = styled.h3`
  margin: 0;
  font-size: 1.07rem;
`;

const Meta = styled.p`
  margin-top: 0.4rem;
  font-size: 0.85rem;
  color: #666;
`;

const Actions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #444;
  font-size: 1rem;
  transition: color 0.2s;

  &:hover {
    color: #1877f2;
  }
`;

const QuestionCard = ({ question, user, date, avatar }) => {
  return (
    <Card>
      <Avatar src={avatar} alt={`${user}'s avatar`} />
      <Content>
        <Question>{question}</Question>
        <Meta>Posted by {user} · {date}</Meta>
      </Content>
      <Actions>
        <IconButton><FaRegComment /></IconButton>
        <IconButton><FaThumbsUp /></IconButton>
        <IconButton><FaThumbsDown /></IconButton>
      </Actions>
    </Card>
  );
};

export default QuestionCard;