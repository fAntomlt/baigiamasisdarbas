import React, { useState } from 'react';
import styled from 'styled-components';
import Input from '../atoms/Input';
import Button from '../atoms/Button';
import axios from 'axios';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(3px);
  background-color: rgba(0, 0, 0, 0.45);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;

const ModalBox = styled.div`
  background: #fff;
  padding: 2.5rem 2rem;
  border-radius: 18px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.25);
  width: 100%;
  max-width: 420px;
  text-align: center;
  animation: fadeIn 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Checkmark = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const ModalTitle = styled.h2`
  font-size: 1.6rem;
  color:rgb(0, 0, 0);
  margin-bottom: 0.5rem;
`;

const ModalText = styled.p`
  font-size: 1rem;
  color: #555;
`;

const OkButton = styled.button`
  margin-top: 1.5rem;
  padding: 0.6rem 1.5rem;
  background-color:rgb(0, 0, 0);
  color: white;
  border: none;
  border-radius: 30px;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background-color:rgb(63, 63, 63);
  }
`;

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profilePic, setProfilePic] = useState('');

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
        const res = await axios.post('http://localhost:5000/api/auth/register', {
        username,
        email,
        password,
        profilePic,
        });
        console.log('Registracija sėkminga:', res.data);
        setSuccess(true);
        setTimeout(() => {
        window.location.href = '/';
        }, 10000);
    } catch (err) {
        console.error('Klaida registruojantis, del:', err.response?.data?.message || err.message);
        setLoading(false);
    }
};

  return (
    <>
      {success && (
  <ModalOverlay>
    <ModalBox>
      <Checkmark>✔️</Checkmark>
      <ModalTitle>Registracija sėkminga!</ModalTitle>
      <ModalText>
        Būsite nukreiptas į pagrindinį puslapį po 10 sekundžių.
      </ModalText>
      <OkButton onClick={() => window.location.href = '/'}>
        Grįžti dabar
      </OkButton>
    </ModalBox>
  </ModalOverlay>
)}

      <form onSubmit={handleRegister}>
        <Input
          type="text"
          placeholder="Slapyvardis"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <Input
          type="email"
          placeholder="El. paštas"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Slaptažodis"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Input
          type="text"
          placeholder="Nuotraukos URL (neprivaloma)"
          value={profilePic}
          onChange={(e) => setProfilePic(e.target.value)}
        />
        <Button type="submit">
          {loading ? '⏳' : 'Sukurti paskyrą'}
        </Button>
      </form>
    </>
  );
};

export default RegisterForm;
