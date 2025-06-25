import React from 'react';
import styled from 'styled-components';
import { FaRegComment, FaThumbsUp, FaThumbsDown } from 'react-icons/fa';

const Card = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  margin-bottom: 1rem;
`;

const Avatar = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
`;

const Content = styled.div`
  flex-grow: 1;
`;

const Question = styled.h3`
  margin: 0 0 0.5rem 0;
`;

const Meta = styled.p`
  font-size: 0.85rem;
  color: #555;
  margin: 0;
`;

const Actions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.6rem;
`;

const QuestionCard = ({ question, user, date, avatar }) => {
  return (
    <Card>
      <Avatar src={avatar} alt="avatar" />
      <Content>
        <Question>{question}</Question>
        <Meta>Posted by {user} · {date}</Meta>
      </Content>
      <Actions>
        <FaRegComment />
        <FaThumbsUp />
        <FaThumbsDown />
      </Actions>
    </Card>
  );
};

export default QuestionCard;