// src/router/AppRouter.tsx (예시)

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// 인증 페이지
import LoginPage from '../pages/LoginPage';
import SignUpPage from '../pages/SignUpPage';
// import ForgotPasswordPage from '../pages/ForgotPasswordPage';

// 메인 및 작품 페이지
import MainPageLayout from '../pages/MainPageLayout';
import ProductDetailPage from '../pages/ProductDetailPage';
import MarketLayout from '../pages/MarketLayout';

// 마이페이지 및 주문
import MyPageLayout from '../pages/MyPage';
import CheckoutPage from '../pages/CheckoutPage';

// 레이아웃 컴포넌트 (Header, Footer를 포함하는 공통 레이아웃)
// import Layout from '../components/layout/Layout'; 


const AppRouter: React.FC = () => {
    return (
        <BrowserRouter>
            {/* 만약 Header와 Footer가 모든 페이지에 공통적으로 적용된다면 <Layout> 컴포넌트로 감쌉니다. */}
            {/* <Layout> */}
                <Routes>
                    
                    {/* 메인 페이지 */}
                    <Route path="/" element={<MainPageLayout />} />
                    
                    {/* 인증 경로 */}
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<SignUpPage />} />
                    {/* <Route path="/forgot-password" element={<ForgotPasswordPage />} /> */}
                    
                    {/* 작품 및 마켓 */}
                    <Route path="/market" element={<MarketLayout />} />
                    <Route path="/product/:id" element={<ProductDetailPage />} /> 
                    
                    {/* 마이페이지 및 주문 */}
                    <Route path="/mypage" element={<MyPageLayout />} />
                    <Route path="/checkout" element={<CheckoutPage />} />
                    
                    {/* 404 페이지 */}
                    <Route path="*" element={<div>404 Not Found</div>} />
                    
                </Routes>
            {/* </Layout> */}
        </BrowserRouter>
    );
);

export default AppRouter;