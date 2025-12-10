import React from "react";
import Header from "../components/layout/Header/Header";
import { ProductDetailLayout } from "../components/ProductDetail/ProductDetailLayout";
// import { FilterSidebar } from "./../components/layout/Filter/FilterSideBar";

export const ProductDetailPage: React.FC = () => {
  return (
    <>
      <Header />
      <ProductDetailLayout />
    </>
  );
};
