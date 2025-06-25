import React from 'react';
import styled from 'styled-components';

const Bar = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-start;
  padding: 1rem 0;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  background-color: #e0f4ff;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background-color: #b3e3ff;
  }
`;

const FilterBar = () => {
  return (
    <Bar>
      <Button>Popular</Button>
      <Button>Recent</Button>
      <Button>Answered</Button>
      <Button>Unanswered</Button>
      <Button>By Name</Button>
      <Button>By Theme</Button>
    </Bar>
  );
};

export default FilterBar;