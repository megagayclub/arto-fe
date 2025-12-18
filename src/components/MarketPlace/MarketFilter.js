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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
exports.__esModule = true;
exports.MarketFilter = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var styled_components_1 = __importStar(require("styled-components"));
var MarketContext_1 = require("./MarketContext");
// --- 정렬 옵션 정의 ---
var SORT_OPTIONS = [
    { label: "安い順", value: "PRICE_ASC" },
    { label: "高い順", value: "PRICE_DESC" },
    { label: "新着順", value: "LATEST" },
];
// --- 스타일 수정 ---
var FilterContainer = styled_components_1["default"].div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: flex;\n  justify-content: space-between;\n  padding: 15px;\n  margin-bottom: 20px;\n  border-bottom: 1px solid #eee;\n  background: #f9f9f9;\n  border-radius: 5px;\n  align-items: center; /* \uC138\uB85C \uC911\uC559 \uC815\uB82C */\n"], ["\n  display: flex;\n  justify-content: space-between;\n  padding: 15px;\n  margin-bottom: 20px;\n  border-bottom: 1px solid #eee;\n  background: #f9f9f9;\n  border-radius: 5px;\n  align-items: center; /* \uC138\uB85C \uC911\uC559 \uC815\uB82C */\n"])));
var SelectBox = styled_components_1["default"].select(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  padding: 8px 10px;\n  border: 1px solid #ccc;\n  border-radius: 4px;\n"], ["\n  padding: 8px 10px;\n  border: 1px solid #ccc;\n  border-radius: 4px;\n"])));
var SortOptionsContainer = styled_components_1["default"].div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  display: flex;\n  align-items: center;\n  gap: 10px; /* \uBC84\uD2BC \uAC04\uACA9 */\n"], ["\n  display: flex;\n  align-items: center;\n  gap: 10px; /* \uBC84\uD2BC \uAC04\uACA9 */\n"])));
var SortLabel = styled_components_1["default"].span(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  font-size: 14px;\n  color: #333;\n  font-weight: 500;\n"], ["\n  font-size: 14px;\n  color: #333;\n  font-weight: 500;\n"])));
var SortButton = styled_components_1["default"].button(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n  background: none;\n  border: none;\n  padding: 5px 10px;\n  font-size: 14px;\n  cursor: pointer;\n  transition: all 0.2s ease-in-out;\n  border-radius: 3px;\n\n  ", "\n"], ["\n  background: none;\n  border: none;\n  padding: 5px 10px;\n  font-size: 14px;\n  cursor: pointer;\n  transition: all 0.2s ease-in-out;\n  border-radius: 3px;\n\n  ", "\n"])), function (props) {
    return props.$isSelected
        ? (0, styled_components_1.css)(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n          color: white;\n          background-color: #333; /* \uC120\uD0DD\uB428: \uC9C4\uD55C \uBC30\uACBD */\n          font-weight: bold;\n        "], ["\n          color: white;\n          background-color: #333; /* \uC120\uD0DD\uB428: \uC9C4\uD55C \uBC30\uACBD */\n          font-weight: bold;\n        "]))) : (0, styled_components_1.css)(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n          color: #666; /* \uC120\uD0DD \uC548\uB428: \uC5F0\uD55C \uC0C9 */\n          background-color: transparent;\n          &:hover {\n            color: #333;\n          }\n        "], ["\n          color: #666; /* \uC120\uD0DD \uC548\uB428: \uC5F0\uD55C \uC0C9 */\n          background-color: transparent;\n          &:hover {\n            color: #333;\n          }\n        "])));
});
// --- 컴포넌트 로직 수정 ---
var MarketFilter = function () {
    var _a = (0, MarketContext_1.useMarket)(), filters = _a.filters, setFilters = _a.setFilters, applyFilters = _a.applyFilters;
    var handleSortClick = function (sortValue) {
        var nextFilters = __assign(__assign({}, filters), { sort: sortValue });
        setFilters(nextFilters);
        applyFilters(nextFilters);
    };
    return ((0, jsx_runtime_1.jsxs)(FilterContainer, { children: [(0, jsx_runtime_1.jsx)("div", {}, void 0), " ", (0, jsx_runtime_1.jsx)(SortOptionsContainer, { children: SORT_OPTIONS.map(function (option) { return ((0, jsx_runtime_1.jsx)(SortButton, __assign({ "$isSelected": filters.sort === option.value, onClick: function () { return handleSortClick(option.value); } }, { children: option.label }), option.value)); }) }, void 0)] }, void 0));
};
exports.MarketFilter = MarketFilter;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7;
