"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var jsx_runtime_1 = require("react/jsx-runtime");
var Header_1 = __importDefault(require("../components/layout/Header/Header"));
var MyPageLayout_1 = require("../components/MyPage/MyPageLayout");
// import { FilterSidebar } from "./../components/layout/Filter/FilterSideBar";
var MyPage = function () {
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(Header_1["default"], {}, void 0), (0, jsx_runtime_1.jsx)(MyPageLayout_1.MyPageLayout, {}, void 0)] }, void 0));
};
exports["default"] = MyPage;
