"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.Pagination = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var styled_components_1 = __importDefault(require("styled-components"));
var MarketContext_1 = require("./MarketContext");
var PagerContainer = styled_components_1["default"].div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: flex;\n  justify-content: center;\n  gap: 10px;\n  margin-top: 20px;\n"], ["\n  display: flex;\n  justify-content: center;\n  gap: 10px;\n  margin-top: 20px;\n"])));
var PageButton = styled_components_1["default"].button(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  background: ", ";\n  color: ", ";\n  border: 1px solid #007bff;\n  padding: 8px 15px;\n  border-radius: 5px;\n  cursor: pointer;\n  transition: background 0.3s;\n\n  &:hover:not(:disabled) {\n    background: ", ";\n  }\n\n  &:disabled {\n    cursor: not-allowed;\n    opacity: 0.5;\n  }\n"], ["\n  background: ", ";\n  color: ", ";\n  border: 1px solid #007bff;\n  padding: 8px 15px;\n  border-radius: 5px;\n  cursor: pointer;\n  transition: background 0.3s;\n\n  &:hover:not(:disabled) {\n    background: ", ";\n  }\n\n  &:disabled {\n    cursor: not-allowed;\n    opacity: 0.5;\n  }\n"])), function (props) { return (props.$isActive ? "#007bff" : "#fff"); }, function (props) { return (props.$isActive ? "#fff" : "#007bff"); }, function (props) { return (props.$isActive ? "#0056b3" : "#eaf4ff"); });
var Pagination = function () {
    var _a = (0, MarketContext_1.useMarket)(), currentPage = _a.currentPage, totalPages = _a.totalPages, setCurrentPage = _a.setCurrentPage;
    var pageNumbers = Array.from({ length: totalPages }, function (_, i) { return i + 1; });
    return ((0, jsx_runtime_1.jsxs)(PagerContainer, { children: [(0, jsx_runtime_1.jsx)(PageButton, __assign({ onClick: function () { return setCurrentPage(currentPage - 1); }, disabled: currentPage === 1, "$isActive": false }, { children: "Prev" }), void 0), pageNumbers.map(function (number) { return ((0, jsx_runtime_1.jsx)(PageButton, __assign({ "$isActive": number === currentPage, onClick: function () { return setCurrentPage(number); } }, { children: number }), number)); }), (0, jsx_runtime_1.jsx)(PageButton, __assign({ onClick: function () { return setCurrentPage(currentPage + 1); }, disabled: currentPage === totalPages, "$isActive": false }, { children: "Next" }), void 0)] }, void 0));
};
exports.Pagination = Pagination;
var templateObject_1, templateObject_2;
