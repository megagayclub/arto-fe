import React from "react";
import styled from "styled-components";
import { useMarket } from "./MarketContext";

const PagerContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
`;

const PageButton = styled.button<{ isActive: boolean }>`
  background: ${(props) => (props.isActive ? "#007bff" : "#fff")};
  color: ${(props) => (props.isActive ? "#fff" : "#007bff")};
  border: 1px solid #007bff;
  padding: 8px 15px;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover:not(:disabled) {
    background: ${(props) => (props.isActive ? "#0056b3" : "#eaf4ff")};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

export const Pagination: React.FC = () => {
  const { currentPage, totalPages, setCurrentPage } = useMarket();

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <PagerContainer>
      <PageButton
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
        isActive={false} // 항상 false로 설정하여 '이전' 버튼 스타일 유지
      >
        Prev
      </PageButton>

      {pageNumbers.map((number) => (
        <PageButton
          key={number}
          isActive={number === currentPage}
          onClick={() => setCurrentPage(number)}
        >
          {number}
        </PageButton>
      ))}

      <PageButton
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        isActive={false} // 항상 false로 설정하여 '다음' 버튼 스타일 유지
      >
        Next
      </PageButton>
    </PagerContainer>
  );
};
