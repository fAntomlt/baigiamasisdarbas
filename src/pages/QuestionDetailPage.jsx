import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const Wrapper = styled.div`
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
`;

const BackButton = styled.button`
  margin-bottom: 1rem;
  padding: 0.5rem 1.2rem;
  background: #eee;
  border: 1px solid #ccc;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background: #ddd;
  }
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
  border-radius: 10px;
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
  font-size: 1.3rem;
  margin: 0 0 0.6rem 0;
`;

const AnswerMeta = styled.small`
  color: #666;
`;

const ActionBar = styled.div`
  margin-top: 0.5rem;
  display: flex;
  gap: 0.5rem;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  font-size: 0.85rem;
  color: #1877f2;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const QuestionDetailPage = () => {
  const { id } = useParams();
  const { token, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [newAnswer, setNewAnswer] = useState('');
  const [editingAnswerId, setEditingAnswerId] = useState(null);
  const [editingContent, setEditingContent] = useState('');

  useEffect(() => {
  const fetchData = async () => {
    try {
      const [questionRes, answersRes] = await Promise.all([
        axios.get(`http://localhost:5000/api/questions?page=1`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get(`http://localhost:5000/api/answers/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      const q = questionRes.data.questions.find((q) => q._id === id);
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

  const handleEdit = (answerId, currentContent) => {
    setEditingAnswerId(answerId);
    setEditingContent(currentContent);
  };

  const handleEditSubmit = async (answerId) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/answers/${answerId}`,
        { content: editingContent },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAnswers((prev) =>
        prev.map((a) => (a._id === answerId ? res.data : a))
      );
      setEditingAnswerId(null);
      setEditingContent('');
    } catch (err) {
      alert('Klaida redaguojant atsakymą');
    }
  };

  const handleDelete = async (answerId) => {
    if (!window.confirm('Ar tikrai norite ištrinti šį atsakymą?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/answers/${answerId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAnswers((prev) => prev.filter((a) => a._id !== answerId));
    } catch (err) {
      alert('Nepavyko ištrinti atsakymo');
    }
  };

  if (!question) return <Wrapper>Loading...</Wrapper>;

  return (
    <Wrapper>
      <BackButton onClick={() => navigate('/home')}>GRĮŽTI</BackButton>

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
          {answers.map((a) => {
            const isAuthor = user?._id === a.author?._id;
            const isEditing = editingAnswerId === a._id;

            return (
              <AnswerWrapper key={a._id}>
                <AnswerAvatar
                  src={a.author?.profilePic || 'https://ui-avatars.com/api/?name=User'}
                />
                <AnswerContent>
                  {isEditing ? (
                    <>
                      <TextArea
                        rows="3"
                        value={editingContent}
                        onChange={(e) => setEditingContent(e.target.value)}
                      />
                      <SubmitButton
                        type="button"
                        onClick={() => handleEditSubmit(a._id)}
                      >
                        Išsaugoti
                      </SubmitButton>
                    </>
                  ) : (
                    <>
                      <AnswerText>{a.content}</AnswerText>
                      <AnswerMeta>
                        by {a.author?.username || 'Nežinomas'}
                        {a.updatedAt && a.updatedAt !== a.createdAt && ' · redaguota'}
                      </AnswerMeta>
                      {isAuthor && (
                        <ActionBar>
                          <ActionButton onClick={() => handleEdit(a._id, a.content)}>
                            Redaguoti
                          </ActionButton>
                          <ActionButton onClick={() => handleDelete(a._id)}>
                            Ištrinti
                          </ActionButton>
                        </ActionBar>
                      )}
                    </>
                  )}
                </AnswerContent>
              </AnswerWrapper>
            );
          })}
        </AnswerList>
      )}
    </Wrapper>
  );
};

export default QuestionDetailPage;