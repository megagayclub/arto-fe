import React from "react";
import Header from "../components/layout/Header/Header";
import { MyPageLayout } from "../components/MyPage/MyPageLayout";
// import { FilterSidebar } from "./../components/layout/Filter/FilterSideBar";

export const MyPage: React.FC = () => {
  return (
    <>
      <Header />
      <MyPageLayout />
    </>
  );
};
