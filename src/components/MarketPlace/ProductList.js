"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.ProductList = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var styled_components_1 = __importDefault(require("styled-components"));
var MarketContext_1 = require("./MarketContext");
// --- 스타일 수정 (기존과 동일) ---
var ListGrid = styled_components_1["default"].div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: flex;\n  flex-wrap: wrap;\n  align-items: stretch;\n  justify-content: center;\n  gap: 20px;\n  margin-bottom: 30px;\n"], ["\n  display: flex;\n  flex-wrap: wrap;\n  align-items: stretch;\n  justify-content: center;\n  gap: 20px;\n  margin-bottom: 30px;\n"])));
var ItemCard = styled_components_1["default"].div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n  border: 1px solid #ddd;\n  flex: 0 0 calc(25% - 15px);\n  max-width: 200px;\n  padding: 15px;\n  text-align: center;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);\n  transition: transform 0.2s;\n\n  &:hover {\n    transform: translateY(-5px);\n    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);\n  }\n\n  img {\n    width: 100%;\n    height: 200px;\n    object-fit: cover;\n    margin-bottom: 10px;\n  }\n\n  h3 {\n    font-size: 1.1em;\n    margin: 5px 0;\n    color: #333;\n  }\n\n  p {\n    font-size: 0.9em;\n    color: #666;\n    margin: 5px 0;\n  }\n\n  strong {\n    display: block;\n    color: #a00;\n    font-size: 1.2em;\n    margin-top: 10px;\n  }\n"], ["\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n  border: 1px solid #ddd;\n  flex: 0 0 calc(25% - 15px);\n  max-width: 200px;\n  padding: 15px;\n  text-align: center;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);\n  transition: transform 0.2s;\n\n  &:hover {\n    transform: translateY(-5px);\n    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);\n  }\n\n  img {\n    width: 100%;\n    height: 200px;\n    object-fit: cover;\n    margin-bottom: 10px;\n  }\n\n  h3 {\n    font-size: 1.1em;\n    margin: 5px 0;\n    color: #333;\n  }\n\n  p {\n    font-size: 0.9em;\n    color: #666;\n    margin: 5px 0;\n  }\n\n  strong {\n    display: block;\n    color: #a00;\n    font-size: 1.2em;\n    margin-top: 10px;\n  }\n"])));
// --- 컴포넌트 수정 ---
// 개별 상품 아이템 컴포넌트
var ProductItem = function (_a) {
    var product = _a.product;
    return ((0, jsx_runtime_1.jsxs)(ItemCard, { children: [(0, jsx_runtime_1.jsx)("img", { src: product.thumbnailImageUrl, alt: product.title }, void 0), (0, jsx_runtime_1.jsx)("h3", { children: product.title }, void 0), (0, jsx_runtime_1.jsxs)("p", { children: ["Artist: ", product.artist] }, void 0), (0, jsx_runtime_1.jsxs)("strong", { children: ["\u20A9", product.price.toLocaleString()] }, void 0)] }, void 0));
};
var ProductList = function () {
    var products = (0, MarketContext_1.useMarket)().products;
    return ((0, jsx_runtime_1.jsx)(ListGrid, { children: products && products.length > 0 ? (products.map(function (product, index) { return (
        /* 해결책: product.id가 확실히 고유한지 확인하세요.
           만약 API에서 중복된 ID를 준다면 `${product.id}-${index}` 처럼 조합할 수 있습니다.
           하지만 가장 좋은 방법은 데이터 소스(MarketContext)의 id를 고유하게 만드는 것입니다.
        */
        (0, jsx_runtime_1.jsx)(ProductItem, { product: product }, product.id || index)); })) : ((0, jsx_runtime_1.jsx)("p", { children: "No products found." }, void 0)) }, void 0));
};
exports.ProductList = ProductList;
var templateObject_1, templateObject_2;
