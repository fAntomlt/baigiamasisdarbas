import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const Wrapper = styled.div`
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
`;

const QuestionBox = styled.div`
  padding: 1.5rem;
  border-radius: 10px;
  background: #f9f9f9;
  margin-bottom: 2rem;
`;

const AnswerForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 2rem;
`;

const TextArea = styled.textarea`
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  resize: vertical;
`;

const SubmitButton = styled.button`
  align-self: flex-start;
  background: #1877f2;
  color: white;
  padding: 0.5rem 1.2rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background: #0f5ec5;
  }
`;

const AnswerList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const AnswerWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  background: white;
`;

const AnswerAvatar = styled.img`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  object-fit: cover;
`;

const AnswerContent = styled.div`
  flex-grow: 1;
`;

const AnswerText = styled.p`
  font-size: 1.4rem;
  margin: 0 0 0.5rem 0;
`;

const AnswerMeta = styled.small`
  color: #666;
`;

const QuestionDetailPage = () => {
  const { id } = useParams();
  const { token, user } = useContext(AuthContext);
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [newAnswer, setNewAnswer] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [questionRes, answersRes] = await Promise.all([
          axios.get(`http://localhost:5000/api/questions`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`http://localhost:5000/api/answers/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        const q = questionRes.data.find((q) => q._id === id);
        setQuestion(q);
        setAnswers(answersRes.data);
      } catch (err) {
        console.error('Klaida kraunant duomenis:', err);
      }
    };

    fetchData();
  }, [id, token]);

  const handleAnswerSubmit = async (e) => {
    e.preventDefault();
    if (!newAnswer.trim()) return;

    try {
      const res = await axios.post(
        `http://localhost:5000/api/answers/${id}`,
        { content: newAnswer },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAnswers((prev) => [res.data, ...prev]);
      setNewAnswer('');
    } catch (err) {
      console.error('Klaida siunčiant atsakymą:', err);
    }
  };

  if (!question) return <Wrapper>Loading...</Wrapper>;

  return (
    <Wrapper>
      <QuestionBox>
        <h2>{question.question}</h2>
        <p>Autorius: {question.author?.username || 'Nežinomas'}</p>
      </QuestionBox>

      <AnswerForm onSubmit={handleAnswerSubmit}>
        <TextArea
          rows="4"
          placeholder="Rašykite atsakymą..."
          value={newAnswer}
          onChange={(e) => setNewAnswer(e.target.value)}
        />
        <SubmitButton type="submit">Atsakyti</SubmitButton>
      </AnswerForm>

      {answers.length === 0 ? (
        <p>Nėra atsakymų.</p>
      ) : (
        <AnswerList>
          {answers.map((a) => (
            <AnswerWrapper key={a._id}>
              <AnswerAvatar src={a.author?.profilePic || 'https://ui-avatars.com/api/?name=User'} />
              <AnswerContent>
                <AnswerText>{a.content}</AnswerText>
                <AnswerMeta>
                  by {a.author?.username || 'Nežinomas'}
                </AnswerMeta>
              </AnswerContent>
            </AnswerWrapper>
          ))}
        </AnswerList>
      )}
    </Wrapper>
  );
};

export default QuestionDetailPage;