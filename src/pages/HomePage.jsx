import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import QuestionFeed from '../components/organisms/QuestionFeed';
import UserSidebar from '../components/organisms/UserSidebar';
import headerBg from '../assets/header-pattern.png';
import NewQuestionForm from '../components/molecules/NewQuestionForm';
import FilterBar from '../components/molecules/FilterBar';

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Header = styled.header`
  position: relative;
  background-color: #1877f2;
  color: white;
  padding: 1rem 2rem;
  font-size: 3rem;
  font-weight: bold;
  overflow: hidden;

  > * {
    position: relative;
    z-index: 1;
  }

  &::before {
    content: '';
    position: absolute;
    top: -40%;
    left: -50%;
    width: 200%;
    height: 200%;
    background-image: url(${headerBg});
    background-repeat: repeat;
    background-size: 16rem;
    opacity: 0.15;
    z-index: 0;
    transform: rotate(6deg);
    transform-origin: center;
  }
`;

const Content = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  padding: 2rem;
`;

const MainSection = styled.main`
  flex: 2;
  max-width: 700px;
`;

const SidebarSection = styled.aside`
  flex: 1;
  max-width: 250px;
`;

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  gap: 0.5rem;
`;

const HomePage = () => {
  const { token } = useContext(AuthContext);
  const [questions, setQuestions] = useState([]);
  const [sortField, setSortField] = useState('recent');
  const [sortOrder, setSortOrder] = useState('desc');
  const [filterType, setFilterType] = useState(null);
  const [nameSearch, setNameSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/questions', {
          headers: { Authorization: `Bearer ${token}` },
          params: {
            page: currentPage,
            sort: sortField,
            order: sortOrder,
            filter: filterType,
            name: nameSearch
          }
      });
        setQuestions(res.data.questions);
        setTotalPages(res.data.totalPages);
      } catch (err) {
        console.error('Klaida gaunant klausimus:', err);
      }
    };

    fetchQuestions();
  }, [token, currentPage]);

  const handleQuestionCreated = (newQuestion) => {
    setQuestions((prev) => [newQuestion, ...prev]);
  };

  const handleQuestionUpdated = (updatedQuestion) => {
    setQuestions((prev) =>
      prev.map((q) => (q._id === updatedQuestion._id ? updatedQuestion : q))
    );
  };

  const handleQuestionDeleted = (id) => {
    setQuestions((prev) => prev.filter((q) => q._id !== id));
  };

  const filteredQuestions = questions.filter((q) => {
    if (filterType === 'answered' && q.comments === 0) return false;
    if (filterType === 'unanswered' && q.comments > 0) return false;
    if (nameSearch && !q.question.toLowerCase().includes(nameSearch.toLowerCase()))
      return false;
    return true;
  });

  const sortedQuestions = [...filteredQuestions].sort((a, b) => {
    if (sortField === 'comments') {
      return sortOrder === 'asc' ? a.comments - b.comments : b.comments - a.comments;
    } else if (sortField === 'recent') {
      const aTime = new Date(a.createdAt).getTime();
      const bTime = new Date(b.createdAt).getTime();
      return sortOrder === 'asc' ? aTime - bTime : bTime - aTime;
    }
    return 0;
  });

  return (
    <PageWrapper>
      <Header>
        <span>LifeBook</span>
      </Header>

      <Content>
        <MainSection>
          <FilterBar
            sortField={sortField}
            sortOrder={sortOrder}
            setSortField={setSortField}
            setSortOrder={setSortOrder}
            filterType={filterType}
            setFilterType={setFilterType}
            nameSearch={nameSearch}
            setNameSearch={setNameSearch}
          />

          <NewQuestionForm onQuestionCreated={handleQuestionCreated} />

          <QuestionFeed
            questions={sortedQuestions}
            onUpdate={handleQuestionUpdated}
            onDelete={handleQuestionDeleted}
          />

          {totalPages > 1 && (
            <PaginationWrapper>
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
              >
                Prev
              </button>

              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  style={{
                    fontWeight: currentPage === i + 1 ? 'bold' : 'normal',
                    backgroundColor: currentPage === i + 1 ? '#1877f2' : '#f0f2f5',
                    color: currentPage === i + 1 ? 'white' : 'black',
                    border: 'none',
                    padding: '6px 12px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
                  {i + 1}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </PaginationWrapper>
          )}
        </MainSection>

        <SidebarSection>
          <UserSidebar />
        </SidebarSection>
      </Content>
    </PageWrapper>
  );
};

export default HomePage;