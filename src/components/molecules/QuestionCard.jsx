import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { FaRegComment, FaThumbsUp, FaThumbsDown, FaEdit, FaTrash } from 'react-icons/fa';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';

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

const QuestionText = styled.h3`
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

const Count = styled.span`
  font-size: 0.8rem;
  margin-left: 6px;
`;

const EditInput = styled.textarea`
  width: 100%;
  padding: 0.5rem;
  margin-top: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  resize: vertical;
  font-size: 1rem;
`;

const SaveButton = styled.button`
  margin-top: 0.5rem;
  padding: 0.4rem 1rem;
  background-color: #0077cc;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: #005fa3;
  }
`;

const QuestionCard = ({
  question,
  author,
  createdAt,
  updatedAt,
  likes = [],
  dislikes = [],
  _id,
  onUpdate,
  onDelete,
}) => {
  const { user, token } = useContext(AuthContext);
  const isAuthor = user?._id === author?._id;

  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(question);
  const [localLikes, setLocalLikes] = useState(likes.length);
  const [localDislikes, setLocalDislikes] = useState(dislikes.length);

  const handleUpdate = async () => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/questions/${_id}`,
        { question: editedText },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      onUpdate?.(res.data);
      setIsEditing(false);
    } catch (err) {
      alert('Nepavyko atnaujinti klausimo.');
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Ar tikrai norite ištrinti šį klausimą?')) return;

    try {
      await axios.delete(`http://localhost:5000/api/questions/${_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      onDelete?.(_id);
    } catch (err) {
      alert('Nepavyko ištrinti klausimo.');
    }
  };

  const handleLike = async () => {
    try {
      const res = await axios.patch(
        `http://localhost:5000/api/questions/${_id}/like`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setLocalLikes(res.data.likes.length);
      setLocalDislikes(res.data.dislikes.length);
      onUpdate?.(res.data);
    } catch (err) {
      console.error('Like klaida:', err);
    }
  };

  const handleDislike = async () => {
    try {
      const res = await axios.patch(
        `http://localhost:5000/api/questions/${_id}/dislike`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setLocalLikes(res.data.likes.length);
      setLocalDislikes(res.data.dislikes.length);
      onUpdate?.(res.data);
    } catch (err) {
      console.error('Dislike klaida:', err);
    }
  };

  return (
    <Card>
      <Avatar src={author?.profilePic || 'https://ui-avatars.com/api/?name=User'} />
      <Content>
        {isEditing ? (
          <>
            <EditInput value={editedText} onChange={(e) => setEditedText(e.target.value)} />
            <SaveButton onClick={handleUpdate}>Išsaugoti</SaveButton>
          </>
        ) : (
          <>
            <QuestionText>{question}</QuestionText>
            <Meta>
              Posted by {author?.username || 'Nežinomas'} ·{' '}
              {new Date(createdAt).toLocaleDateString('lt-LT', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
              {updatedAt && updatedAt !== createdAt && (
                <span title={`Atnaujinta: ${new Date(updatedAt).toLocaleString('lt-LT')}`}> · redaguota</span>
              )}
            </Meta>
          </>
        )}
      </Content>
      <Actions>
        <IconButton onClick={handleLike}>
          <FaThumbsUp />
          <Count>{localLikes}</Count>
        </IconButton>
        <IconButton onClick={handleDislike}>
          <FaThumbsDown />
          <Count>{localDislikes}</Count>
        </IconButton>
        <IconButton><FaRegComment /></IconButton>
        {isAuthor && (
          <>
            <IconButton onClick={() => setIsEditing(!isEditing)}><FaEdit /></IconButton>
            <IconButton onClick={handleDelete}><FaTrash /></IconButton>
          </>
        )}
      </Actions>
    </Card>
  );
};

export default QuestionCard;