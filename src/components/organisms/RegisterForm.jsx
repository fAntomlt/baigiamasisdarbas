import React, { useState } from 'react';
import Input from '../atoms/Input';
import Button from '../atoms/Button';
import axios from 'axios';

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profilePic, setProfilePic] = useState('');

  const handleRegister = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post('http://localhost:5000/api/auth/register', {
      username,
      email,
      password,
      profilePic,
    });
    console.log('Registracija sėkminga:', res.data);
  } catch (err) {
    console.error('Klaida registruojantis, del:', err.response?.data?.message || err.message);
  }
};

  return (
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
      <Button type="submit">Sukurti paskyrą</Button>
    </form>
  );
};

export default RegisterForm;
