import React from "react";
import Header from "../components/layout/Header/Header";
import { MarketLayout } from "../components/MarketPlace/MarketLayout";
import { FilterSidebar } from "../components/layout/Filter/FilterSideBar";

const MarketPlacePage: React.FC = () => {
  return (
    <>
      <Header />
      <FilterSidebar></FilterSidebar>
      <MarketLayout>
        <MarketLayout.Filter />
        <MarketLayout.List />
        <MarketLayout.Pagination />
      </MarketLayout>
    </>
  );
};

export default MarketPlacePage;