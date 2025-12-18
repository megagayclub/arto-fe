"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var jsx_runtime_1 = require("react/jsx-runtime");
var Header_1 = __importDefault(require("../components/layout/Header/Header"));
var ProductDetailLayout_1 = require("../components/ProductDetail/ProductDetailLayout");
// import { FilterSidebar } from "./../components/layout/Filter/FilterSideBar";
var ProductDetailPage = function () {
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(Header_1["default"], {}, void 0), (0, jsx_runtime_1.jsx)(ProductDetailLayout_1.ProductDetailLayout, {}, void 0)] }, void 0));
};
exports["default"] = ProductDetailPage;
