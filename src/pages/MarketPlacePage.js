"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var jsx_runtime_1 = require("react/jsx-runtime");
var Header_1 = __importDefault(require("../components/layout/Header/Header"));
// MarketLayout import는 유지합니다.
var MarketLayout_1 = require("../components/MarketPlace/MarketLayout");
// 🌟 [추가] MarketProvider를 임포트합니다. (경로 확인 필요)
var MarketContext_1 = require("../context/MarketContext");
var MarketPlacePage = function () {
    return (
    // 🌟 [수정] MarketProvider로 필터와 레이아웃 컴포넌트를 감싸줍니다.
    (0, jsx_runtime_1.jsxs)(MarketContext_1.MarketProvider, { children: [(0, jsx_runtime_1.jsx)(Header_1["default"], {}, void 0), (0, jsx_runtime_1.jsxs)(MarketLayout_1.MarketLayout, { children: [(0, jsx_runtime_1.jsx)(MarketLayout_1.MarketLayout.Filter, {}, void 0), (0, jsx_runtime_1.jsx)(MarketLayout_1.MarketLayout.List, {}, void 0), (0, jsx_runtime_1.jsx)(MarketLayout_1.MarketLayout.Pagination, {}, void 0)] }, void 0)] }, void 0));
};
exports["default"] = MarketPlacePage;
