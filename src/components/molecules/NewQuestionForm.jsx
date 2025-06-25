import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

const Container = styled.div`
  position: relative;
  background-color: #ffffff;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.05);
  margin-bottom: 2rem;
`;

const Title = styled.h3`
  margin: 0 0 1rem 0;
  font-size: 1.2rem;
  color: #003d66;
`;

const Row = styled.form`
  display: flex;
  gap: 1rem;
  align-items: flex-start;
`;

const Input = styled.textarea`
  flex: 1;
  padding: 0.8rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  resize: vertical;
  font-size: 1rem;
  min-height: 80px;
`;

const SubmitButton = styled.button`
  background-color: #1877f2;
  color: white;
  border: none;
  padding: 0.8rem 1.4rem;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  height: fit-content;

  &:hover {
    background-color: #145dbf;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 0.8rem;
  right: 0.8rem;
  background: transparent;
  border: none;
  font-size: 1.2rem;
  font-weight: bold;
  color: #888;
  cursor: pointer;

  &:hover {
    color: #333;
  }
`;

const ToggleButton = styled.button`
  padding: 0.7rem 1.2rem;
  background-color: #0077cc;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  margin-bottom: 1rem;

  &:hover {
    background-color: #005fa3;
  }
`;

const NewQuestionForm = ({ onQuestionCreated }) => {
  const [text, setText] = useState('');
  const [showForm, setShowForm] = useState(false);
  const { token } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    try {
      const response = await axios.post(
        'http://localhost:5000/api/questions/create',
        { question: text },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setText('');
      setShowForm(false);
      onQuestionCreated?.(response.data);
    } catch (err) {
      console.error('Klaida kuriant klausimą:', err);
      alert('Nepavyko pateikti klausimo.');
    }
  };

  if (!showForm) {
    return <ToggleButton onClick={() => setShowForm(true)}>Užduoti klausimą</ToggleButton>;
  }

  return (
    <Container>
      <CloseButton onClick={() => setShowForm(false)}>×</CloseButton>
      <Title>Užduoti klausimą</Title>
      <Row onSubmit={handleSubmit}>
        <Input
          placeholder="Pvz.: Kaip naudoti MongoDB su React?"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <SubmitButton type="submit">Pateikti</SubmitButton>
      </Row>
    </Container>
  );
};

export default NewQuestionForm;