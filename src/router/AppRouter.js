"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_router_dom_1 = require("react-router-dom");
var Header_1 = __importDefault(require("../components/layout/Header/Header")); // 🌟 Header import
// 인증 페이지
var LoginPage_1 = __importDefault(require("../pages/LoginPage"));
var SignUpPage_1 = __importDefault(require("../pages/SignUpPage"));
// import ForgotPasswordPage from '../pages/ForgotPasswordPage';
// 메인 및 작품 페이지
var MainPageLayout_1 = __importDefault(require("../components/MainPage//MainPageLayout")); // 주석 해제 (MainPageLayout을 메인 페이지로 사용)
var ProductDetailPage_1 = __importDefault(require("../pages/ProductDetailPage"));
var MarketPlacePage_1 = __importDefault(require("../pages/MarketPlacePage"));
// 마이페이지 및 주문
var MyPage_1 = __importDefault(require("../pages/MyPage"));
var AppRouter = function () {
    return ((0, jsx_runtime_1.jsxs)(react_router_dom_1.BrowserRouter, { children: [(0, jsx_runtime_1.jsx)(Header_1["default"], {}, void 0), (0, jsx_runtime_1.jsxs)(react_router_dom_1.Routes, { children: [(0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/", element: (0, jsx_runtime_1.jsx)(MainPageLayout_1["default"], {}, void 0) }, void 0), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/login", element: (0, jsx_runtime_1.jsx)(LoginPage_1["default"], {}, void 0) }, void 0), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/register", element: (0, jsx_runtime_1.jsx)(SignUpPage_1["default"], {}, void 0) }, void 0), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/market", element: (0, jsx_runtime_1.jsx)(MarketPlacePage_1["default"], {}, void 0) }, void 0), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/product/:id", element: (0, jsx_runtime_1.jsx)(ProductDetailPage_1["default"], {}, void 0) }, void 0), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/mypage", element: (0, jsx_runtime_1.jsx)(MyPage_1["default"], {}, void 0) }, void 0), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "*", element: (0, jsx_runtime_1.jsx)("div", { children: "404 Not Found" }, void 0) }, void 0)] }, void 0)] }, void 0));
};
exports["default"] = AppRouter;
