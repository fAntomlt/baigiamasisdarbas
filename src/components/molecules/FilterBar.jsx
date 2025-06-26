import React, { useState } from 'react';
import styled from 'styled-components';
import { FaSortAmountUp, FaSortAmountDown } from 'react-icons/fa';

const Bar = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  position: relative;
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

const Dropdown = styled.div`
  position: absolute;
  top: 120%;
  left: 0;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 6px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  z-index: 5;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  min-width: 120px;
`;

const DropdownItem = styled.button`
  background: none;
  border: none;
  padding: 0.4rem 0.6rem;
  text-align: left;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background 0.2s;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const FilterBar = ({ sortField, sortOrder, setSortField, setSortOrder, filterType, setFilterType }) => {
  const [showExtra, setShowExtra] = useState(false);

  const toggleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  const toggleFilter = (type) => {
    if (filterType === type) {
      setFilterType(null);
    } else {
      setFilterType(type);
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
        onClick={() => toggleFilter('answered')}
        active={filterType === 'answered'}
      >
        Answered
      </FilterButton>

      <FilterButton
        onClick={() => toggleFilter('unanswered')}
        active={filterType === 'unanswered'}
      >
        Unanswered
      </FilterButton>

      <div style={{ position: 'relative' }}>
        <FilterButton onClick={() => setShowExtra(prev => !prev)}>
          Extra ⬇️
        </FilterButton>

        {showExtra && (
          <Dropdown>
            <DropdownItem>By name</DropdownItem>
            <DropdownItem>By tags</DropdownItem>
          </Dropdown>
        )}
      </div>
    </Bar>
  );
};

export default FilterBar;