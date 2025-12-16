// src/router/AppRouter.tsx

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from "../components/layout/Header/Header"; // 🌟 Header import

// 인증 페이지
import LoginPage from '../pages/LoginPage';
import SignUpPage from '../pages/SignUpPage';
// import ForgotPasswordPage from '../pages/ForgotPasswordPage';

// 메인 및 작품 페이지
import MainPageLayout from '../components/MainPage//MainPageLayout'; // 주석 해제 (MainPageLayout을 메인 페이지로 사용)
import ProductDetailPage from '../pages/ProductDetailPage';
import MarketPlacePage from '../pages/MarketPlacePage';

// 마이페이지 및 주문
import MyPage from '../pages/MyPage';


const AppRouter: React.FC = () => {
    return (
        <BrowserRouter>
            {/* Header는 모든 페이지 위에 고정됩니다. */}
            
                    <Header /> 
            
            {/* <Layout> */}
                <Routes>
                    {/* 메인 페이지 (경로를 "/"로 지정해야 합니다.) */}
                    <Route path="/" element={<MainPageLayout/>} /> 
                    
                    {/* 인증 경로 */}
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<SignUpPage />} />
                    
                    {/* 작품 및 마켓 */}
                    <Route path="/market" element={<MarketPlacePage />} />
                    <Route path="/product/:id" element={<ProductDetailPage />} /> 
                    
                    {/* 마이페이지 및 주문 */}
                    <Route path="/mypage" element={<MyPage />} />
                    {/* <Route path="/checkout" element={<CheckoutPage />} /> */}
                    
                    {/* 404 페이지 */}
                    <Route path="*" element={<div>404 Not Found</div>} />
                    
                </Routes>
            {/* </Layout> */}
        </BrowserRouter>
    );
};

export default AppRouter;