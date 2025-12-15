import React from "react";
import MarketPlacePage from "./pages/MarketPlacePage";
import ProductDetailPage from "./pages/ProductDetailPage";
import MyPage from "./pages/MyPage";
import CheckoutPage from "./pages/CheckoutPage";
import HorizontalScrollLayout from "./components/MainPage/MainPageLayout"
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import AppRouter from './router/AppRouter'; // 라우터 파일
import { AuthProvider } from './context/AuthContext';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
};

export default App;
