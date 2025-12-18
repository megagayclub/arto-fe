import React from "react";
import Header from "../components/layout/Header/Header";
// MarketLayout import는 유지합니다.
import { MarketLayout } from "../components/MarketPlace/MarketLayout";
import { FilterSidebar } from "../components/MarketPlace/FilterSideBar";
// 🌟 [추가] MarketProvider를 임포트합니다. (경로 확인 필요)
import { MarketProvider } from "../context/MarketContext"; 

const MarketPlacePage: React.FC = () => {
  return (
    // 🌟 [수정] MarketProvider로 필터와 레이아웃 컴포넌트를 감싸줍니다.
    <MarketProvider>
      <Header />
      <MarketLayout>
        <MarketLayout.Filter />
        <MarketLayout.List />
        <MarketLayout.Pagination />
      </MarketLayout>
    </MarketProvider>
  );
};

export default MarketPlacePage;