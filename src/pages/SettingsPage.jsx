import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { AuthContext } from '../context/AuthContext';

const PageWrapper = styled.div`
  display: flex;
  min-height: 100vh;
  padding: 2rem;
  background-color: #f5fbff;
`;

const Sidebar = styled.aside`
  width: 250px;
  background-color: #e0f4ff;
  border-radius: 12px;
  padding: 2rem 1.5rem;
  margin-right: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const TopSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;


const BackButton = styled.button`
  margin-top: auto;
  padding: 0.5rem 1.2rem;
  width: 100%;
  background-color: transparent;
  color: #0077cc;
  border: 2px solid #0077cc;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  margin-top: 3rem;

  &:hover {
    background-color: #d1eeff;
  }
`;

const Avatar = styled.img`
  width: 96px;
  height: 96px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 1rem;
`;

const Username = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 2rem;
`;

const NavList = styled.ul`
  list-style: none;
  padding: 0;
  width: 100%;
`;

const NavItem = styled.li`
  padding: 0.7rem 1rem;
  cursor: pointer;
  text-align: center;
  color: #0077cc;
  font-weight: 500;
  border-top: 1px solid rgb(9, 60, 97);
  padding-top: 2rem;

  &:hover {
    background-color: #d1eeff;
  }
`;

const FormWrapper = styled.div`
  flex: 1;
  background-color: #ffffff;
  border-radius: 12px;
  padding: 2.5rem;
  box-shadow: 0 0 10px rgba(0,0,0,0.05);
`;

const Title = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 2rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.3rem;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.7rem;
  margin-bottom: 1.2rem;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

const Button = styled.button`
  margin-top: 1rem;
  padding: 0.8rem 1.5rem;
  background-color: #0077cc;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: #005fa3;
  }
`;

const UserInfoBox = styled.div`
  background-color:rgb(183, 226, 255);
  padding: 1.5rem 1rem;
  border-radius: 10px;
  margin-bottom: 1.5rem;
  width: 100%;
  text-align: center;
`;

const SettingsPage = () => {
  const { user, dispatch } = useContext(AuthContext);
  const [username, setUsername] = useState(user?.username || '');
  const [email, setEmail] = useState(user?.email || '');
  const [profilePic, setProfilePic] = useState(user?.profilePic || '');
  const [newPassword, setNewPassword] = useState('');

  const handleSave = (e) => {
    e.preventDefault();
    console.log('Saving changes:', {username, email, profilePic, newPassword});
  };

  return (
    <PageWrapper>
        <Sidebar>
            <TopSection>
                <UserInfoBox>
                    <Avatar src={user?.profilePic || 'https://ui-avatars.com/api/?name=User&background=random'} />
                    <Username>{user?.username}</Username>
                    <NavList>
                        <NavItem
                        onClick={() => {
                            dispatch({ type: 'LOGOUT' });
                            window.location.href = '/';
                        }}>
                        Atsijungti
                        </NavItem>
                    </NavList>
                </UserInfoBox>
                <BackButton onClick={() => window.location.href = '/home'}>Grįžti</BackButton>
            </TopSection>
        </Sidebar>
        <FormWrapper>
            <Title>Profilio informacija</Title>
            <form onSubmit={handleSave}>
                <Label>Slapyvardis</Label>
                <Input value={username} onChange={(e) => setUsername(e.target.value)} />
                <Label>El. paštas</Label>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <Label>Nuotraukos URL</Label>
                <Input value={profilePic} onChange={(e) => setProfilePic(e.target.value)} />
                <Label>Naujas slaptažodis</Label>
                <Input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="(neprivaloma)"
                />
                <Button type="submit">Išsaugoti</Button>
            </form>
        </FormWrapper>
    </PageWrapper>
  );
};

export default SettingsPage;