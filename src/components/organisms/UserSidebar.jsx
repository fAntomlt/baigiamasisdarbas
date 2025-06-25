import React, { useContext } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Sidebar = styled.div`
  width: 240px;
  padding: 2rem;
  background-color: #e0f4ff;
  border-radius: 10px;
  text-align: center;
`;

const Avatar = styled.img`
  width: 96px;
  height: 96px;
  border-radius: 50%;
  margin-bottom: 1rem;
  object-fit: cover;
`;

const Name = styled.h3`
  margin: 0 0 1rem 0;
`;

const SettingsButton = styled.button`
  padding: 0.5rem 1.2rem;
  background-color: #0077cc;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background-color: #005fa3;
  }
`;

const UserSidebar = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSettingsClick = () => {
    navigate('/settings');
  };

  return (
    <Sidebar>
      <Avatar
        src={user?.profilePic || 'https://ui-avatars.com/api/?name=User&background=random'}
        alt="profile"
      />
      <Name>{user?.username || 'Vartotojas'}</Name>
      <SettingsButton onClick={handleSettingsClick}>Nustatymai</SettingsButton>
    </Sidebar>
  );
};

export default UserSidebar;