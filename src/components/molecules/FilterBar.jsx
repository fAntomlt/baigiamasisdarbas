import React, { useState } from 'react';
import styled from 'styled-components';
import { FaSortAmountUp, FaSortAmountDown } from 'react-icons/fa';

const Bar = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  position: relative;
  flex-wrap: wrap;
`;

const FilterButton = styled.button`
  background-color: ${({ active }) => (active ? '#1877f2' : '#f0f2f5')};
  color: ${({ active }) => (active ? 'white' : 'black')};
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: background 0.2s;

  &:hover {
    background-color: ${({ active }) => (active ? '#166fe5' : '#e2e6ea')};
  }
`;

const NameInput = styled.input`
  padding: 0.4rem 0.6rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 0.9rem;
  margin-left: 0.5rem;
`;

const FilterBar = ({
  sortField,
  sortOrder,
  setSortField,
  setSortOrder,
  filterType,
  setFilterType,
  nameSearch,
  setNameSearch,
}) => {
  const [showNameInput, setShowNameInput] = useState(false);

  const toggleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  return (
    <Bar>
      <FilterButton
        onClick={() => toggleSort('comments')}
        active={sortField === 'comments'}
      >
        Most Answered
        {sortField === 'comments' &&
          (sortOrder === 'asc' ? <FaSortAmountUp /> : <FaSortAmountDown />)}
      </FilterButton>

      <FilterButton
        onClick={() => toggleSort('recent')}
        active={sortField === 'recent'}
      >
        Recent
        {sortField === 'recent' &&
          (sortOrder === 'asc' ? <FaSortAmountUp /> : <FaSortAmountDown />)}
      </FilterButton>

      <FilterButton
        onClick={() => setFilterType(filterType === 'answered' ? null : 'answered')}
        active={filterType === 'answered'}
      >
        Answered
      </FilterButton>

      <FilterButton
        onClick={() => setFilterType(filterType === 'unanswered' ? null : 'unanswered')}
        active={filterType === 'unanswered'}
      >
        Unanswered
      </FilterButton>

      <FilterButton
        onClick={() => setShowNameInput(prev => !prev)}
        active={showNameInput}
      >
        By Name
      </FilterButton>

      {showNameInput && (
        <NameInput
          type="text"
          placeholder="Search question..."
          value={nameSearch}
          onChange={(e) => setNameSearch(e.target.value)}
        />
      )}
    </Bar>
  );
};

export default FilterBar;