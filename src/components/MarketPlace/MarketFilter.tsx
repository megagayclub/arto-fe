import React from "react";
import styled, { css } from "styled-components";
import { useMarket } from "./MarketContext";

// --- 정렬 옵션 정의 ---
const SORT_OPTIONS: { label: string; value: string }[] = [
  { label: "安い順", value: "Latest" },
  { label: "高い順", value: "PriceAsc" },
  { label: "新着順", value: "PriceDesc" },
];

// --- 스타일 수정 ---

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 15px;
  margin-bottom: 20px;
  border-bottom: 1px solid #eee;
  background: #f9f9f9;
  border-radius: 5px;
  align-items: center; /* 세로 중앙 정렬 */
`;

const SelectBox = styled.select`
  padding: 8px 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const SortOptionsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px; /* 버튼 간격 */
`;

const SortLabel = styled.span`
  font-size: 14px;
  color: #333;
  font-weight: 500;
`;

const SortButton = styled.button<{ $isSelected: boolean }>`
  background: none;
  border: none;
  padding: 5px 10px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  border-radius: 3px;

  ${(props) =>
    props.$isSelected
      ? css`
          color: white;
          background-color: #333; /* 선택됨: 진한 배경 */
          font-weight: bold;
        `
      : css`
          color: #666; /* 선택 안됨: 연한 색 */
          background-color: transparent;
          &:hover {
            color: #333;
          }
        `}
`;

// --- 컴포넌트 로직 수정 ---

export const MarketFilter: React.FC = () => {
  const { filters, setFilters } = useMarket();

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters((prev) => ({ ...prev, category: e.target.value }));
  };

  // 버튼 클릭 핸들러: 특정 value를 받아 sort 상태를 업데이트합니다.
  const handleSortClick = (sortValue: string) => {
    setFilters((prev) => ({ ...prev, sort: sortValue }));
  };

  return (
    <FilterContainer>
      {/* 1. Category (SelectBox 유지) */}
      <div>
        <label htmlFor="category">Category: </label>
        <SelectBox
          id="category"
          value={filters.category}
          onChange={handleCategoryChange}
        >
          <option value="All">All</option>
          <option value="Painting">Painting</option>
          <option value="Sculpture">Sculpture</option>
        </SelectBox>
      </div>

      {/* 2. Sort By (버튼으로 변경) */}
      <SortOptionsContainer>
        {SORT_OPTIONS.map((option) => (
          <SortButton
            key={option.value}
            // 🌟 현재 Context의 filters.sort 값과 일치하면 true
            $isSelected={filters.sort === option.value}
            onClick={() => handleSortClick(option.value)}
          >
            {option.label}
          </SortButton>
        ))}
      </SortOptionsContainer>
    </FilterContainer>
  );
};
