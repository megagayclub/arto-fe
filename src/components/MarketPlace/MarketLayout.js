"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.MarketLayout = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var styled_components_1 = __importDefault(require("styled-components"));
var MarketContext_1 = require("./MarketContext");
var MarketFilter_1 = require("./MarketFilter");
var ProductList_1 = require("./ProductList");
var Pagination_1 = require("./Pagination");
var FilterSideBar_1 = require("./FilterSideBar");
// Styled Components
var StyledMarketLayout = styled_components_1["default"].div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  max-width: 1500px;\n  margin: 0 auto;\n  margin-top: 90px;\n  padding: 20px;\n  font-family: Arial, sans-serif;\n"], ["\n  max-width: 1500px;\n  margin: 0 auto;\n  margin-top: 90px;\n  padding: 20px;\n  font-family: Arial, sans-serif;\n"])));
var Header = styled_components_1["default"].h1(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  text-align: center;\n  margin-bottom: 30px;\n  color: #333;\n"], ["\n  text-align: center;\n  margin-bottom: 30px;\n  color: #333;\n"])));
var MarketLayoutBase = function (_a) {
    var children = _a.children;
    return ((0, jsx_runtime_1.jsxs)(MarketContext_1.MarketProvider, { children: [(0, jsx_runtime_1.jsx)(FilterSideBar_1.FilterSidebar, {}, void 0), (0, jsx_runtime_1.jsxs)(StyledMarketLayout, { children: [(0, jsx_runtime_1.jsx)(Header, { children: "ARTWORKS" }, void 0), children] }, void 0)] }, void 0));
};
// Compound Components의 하위 컴포넌트들을 Base에 연결
exports.MarketLayout = Object.assign(MarketLayoutBase, {
    Filter: MarketFilter_1.MarketFilter,
    List: ProductList_1.ProductList,
    Pagination: Pagination_1.Pagination
});
var templateObject_1, templateObject_2;
