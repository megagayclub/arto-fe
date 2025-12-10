import React from "react";
import { MarketPlacePage } from "./pages/MarketPlacePage";
import { ProductDetailPage } from "./pages/ProductDetailPage";
import { MyPage } from "./pages/MyPage";
import { CheckoutPage } from "./pages/CheckoutPage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";

const MarketPage: React.FC = () => {
  return (
    <>
      <SignUpPage />
      {/* <ProductDetail></ProductDetail> */}
    </>
  );
};

export default MarketPage;
