import React, { ReactNode } from "react";
import styled from "styled-components";
import { MarketProvider } from "./MarketContext";
import { MarketFilter } from "./MarketFilter";
import { ProductList } from "./ProductList";
import { Pagination } from "./Pagination";

// Styled Components
const StyledMarketLayout = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
`;

const Header = styled.h1`
  text-align: center;
  margin-bottom: 30px;
  color: #333;
`;

// Compound Component
interface MarketLayoutProps {
  children: ReactNode;
}

const MarketLayoutBase: React.FC<MarketLayoutProps> = ({ children }) => {
  return (
    <MarketProvider>
      <StyledMarketLayout>
        <Header>ARTWORKS</Header>
        {children}
      </StyledMarketLayout>
    </MarketProvider>
  );
};

// Compound Components의 하위 컴포넌트들을 Base에 연결
export const MarketLayout = Object.assign(MarketLayoutBase, {
  Filter: MarketFilter,
  List: ProductList,
  Pagination: Pagination,
});
