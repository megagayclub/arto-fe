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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.FilterSidebar = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var styled_components_1 = __importStar(require("styled-components"));
var FilterData_1 = require("../data/FilterData");
var MarketContext_1 = require("./MarketContext");
// --- 스타일 정의 ---
var SidebarWrapper = styled_components_1["default"].div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  position: fixed;\n  top: 0;\n  left: 0;\n  height: 100vh;\n  z-index: 100;\n  display: flex;\n  width: ", ";\n  transition: width 0.3s ease-in-out;\n"], ["\n  position: fixed;\n  top: 0;\n  left: 0;\n  height: 100vh;\n  z-index: 100;\n  display: flex;\n  width: ", ";\n  transition: width 0.3s ease-in-out;\n"])), function (props) { return (props.$isPanelOpen ? "980px" : "80px"); });
var IconNav = styled_components_1["default"].div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  position: fixed;\n  height: 100vh;\n  width: 80px;\n  background-color: #1a1a1a;\n  color: #fff;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding-top: 100px;\n  z-index: 110;\n"], ["\n  position: fixed;\n  height: 100vh;\n  width: 80px;\n  background-color: #1a1a1a;\n  color: #fff;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding-top: 100px;\n  z-index: 110;\n"])));
var IconItem = styled_components_1["default"].div(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  width: 100%;\n  height: 60px;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  cursor: pointer;\n  font-size: 20px;\n  transition: all 0.2s;\n  text-align: center;\n  padding: 5px;\n\n  ", "\n\n  ", "\n"], ["\n  width: 100%;\n  height: 60px;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  cursor: pointer;\n  font-size: 20px;\n  transition: all 0.2s;\n  text-align: center;\n  padding: 5px;\n\n  ", "\n\n  ", "\n"])), function (props) {
    return props.$isActive && (0, styled_components_1.css)(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n      background-color: #fff;\n      color: #1a1a1a;\n    "], ["\n      background-color: #fff;\n      color: #1a1a1a;\n    "])));
}, function (props) {
    return !props.$isActive && (0, styled_components_1.css)(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n      &:hover {\n        background-color: #333;\n      }\n    "], ["\n      &:hover {\n        background-color: #333;\n      }\n    "])));
});
var SelectedText = styled_components_1["default"].span(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  font-size: 11px;\n  font-weight: 600;\n  word-break: keep-all;\n  line-height: 1.2;\n"], ["\n  font-size: 11px;\n  font-weight: 600;\n  word-break: keep-all;\n  line-height: 1.2;\n"])));
var FilterPanel = styled_components_1["default"].div(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n  position: fixed;\n  left: 80px;\n  width: 900px;\n  height: 100vh;\n  background-color: #f7f7f7;\n  overflow-y: auto;\n  padding: 40px;\n  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.2);\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n  padding-top: 100px;\n  transform: translateX(", ");\n  transition: transform 0.3s ease-in-out;\n  pointer-events: ", ";\n"], ["\n  position: fixed;\n  left: 80px;\n  width: 900px;\n  height: 100vh;\n  background-color: #f7f7f7;\n  overflow-y: auto;\n  padding: 40px;\n  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.2);\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n  padding-top: 100px;\n  transform: translateX(", ");\n  transition: transform 0.3s ease-in-out;\n  pointer-events: ", ";\n"])), function (props) { return (props.$isPanelOpen ? "0" : "-980px"); }, function (props) { return (props.$isPanelOpen ? "auto" : "none"); });
var CloseButton = styled_components_1["default"].button(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n  position: absolute;\n  top: 10px;\n  right: 10px;\n  background: none;\n  border: none;\n  font-size: 24px;\n  cursor: pointer;\n  color: #333;\n  width: 40px;\n  height: 40px;\n"], ["\n  position: absolute;\n  top: 10px;\n  right: 10px;\n  background: none;\n  border: none;\n  font-size: 24px;\n  cursor: pointer;\n  color: #333;\n  width: 40px;\n  height: 40px;\n"])));
var FilterSection = styled_components_1["default"].section(templateObject_9 || (templateObject_9 = __makeTemplateObject(["\n  padding-bottom: 25px;\n  margin-bottom: 25px;\n  border-bottom: 1px solid #ddd;\n  transition: background-color 0.3s;\n  background-color: ", ";\n  padding: 10px;\n  margin: -10px;\n  margin-bottom: 10px;\n  border-radius: 5px;\n"], ["\n  padding-bottom: 25px;\n  margin-bottom: 25px;\n  border-bottom: 1px solid #ddd;\n  transition: background-color 0.3s;\n  background-color: ", ";\n  padding: 10px;\n  margin: -10px;\n  margin-bottom: 10px;\n  border-radius: 5px;\n"])), function (props) { return (props.$isCurrent ? "#f0f0f0" : "transparent"); });
var FilterSectionTitle = styled_components_1["default"].h4(templateObject_10 || (templateObject_10 = __makeTemplateObject(["\n  font-size: 16px;\n  font-weight: 600;\n  margin-top: 5px;\n  margin-bottom: 5px;\n  color: #333;\n"], ["\n  font-size: 16px;\n  font-weight: 600;\n  margin-top: 5px;\n  margin-bottom: 5px;\n  color: #333;\n"])));
var OptionList = styled_components_1["default"].div(templateObject_11 || (templateObject_11 = __makeTemplateObject(["\n  display: flex;\n  flex-wrap: wrap;\n  gap: 8px;\n"], ["\n  display: flex;\n  flex-wrap: wrap;\n  gap: 8px;\n"])));
var OptionButton = styled_components_1["default"].button(templateObject_12 || (templateObject_12 = __makeTemplateObject(["\n  padding: 8px 15px;\n  border: 1px solid ", ";\n  background-color: ", ";\n  color: ", ";\n  border-radius: 20px;\n  font-size: 14px;\n  cursor: pointer;\n  transition: all 0.3s ease;\n  &:hover {\n    border-color: ", ";\n    background-color: ", ";\n  }\n"], ["\n  padding: 8px 15px;\n  border: 1px solid ", ";\n  background-color: ", ";\n  color: ", ";\n  border-radius: 20px;\n  font-size: 14px;\n  cursor: pointer;\n  transition: all 0.3s ease;\n  &:hover {\n    border-color: ", ";\n    background-color: ", ";\n  }\n"])), function (props) { return (props.$isActive ? "#1a1a1a" : "#eee"); }, function (props) { return (props.$isActive ? "#1a1a1a" : "transparent"); }, function (props) { return (props.$isActive ? "#fff" : "#1a1a1a"); }, function (props) { return (props.$isActive ? "#333" : "#bebebeff"); }, function (props) { return (props.$isActive ? "#1a1a1a" : "#f0f0f0"); });
var ColorOption = styled_components_1["default"].div(templateObject_13 || (templateObject_13 = __makeTemplateObject(["\n  width: 30px;\n  height: 30px;\n  border-radius: 50%;\n  background-color: ", ";\n  border: 2px solid ", ";\n  box-shadow: 0 0 0 2px ", ";\n  cursor: pointer;\n  &:hover {\n    border-color: ", ";\n  }\n"], ["\n  width: 30px;\n  height: 30px;\n  border-radius: 50%;\n  background-color: ", ";\n  border: 2px solid ", ";\n  box-shadow: 0 0 0 2px ", ";\n  cursor: pointer;\n  &:hover {\n    border-color: ", ";\n  }\n"])), function (props) { return props.hex; }, function (props) { return (props.$isSelected ? "#333" : "#fff"); }, function (props) { return (props.$isSelected ? "#333" : "transparent"); }, function (props) { return (props.$isSelected ? "#333" : "#bebebeff"); });
var FooterButtons = styled_components_1["default"].div(templateObject_14 || (templateObject_14 = __makeTemplateObject(["\n  display: flex;\n  justify-content: flex-end;\n  gap: 15px;\n  padding-top: 20px;\n  border-top: 1px solid #ddd;\n  background-color: #f7f7f7;\n"], ["\n  display: flex;\n  justify-content: flex-end;\n  gap: 15px;\n  padding-top: 20px;\n  border-top: 1px solid #ddd;\n  background-color: #f7f7f7;\n"])));
var ResetButton = styled_components_1["default"].button(templateObject_15 || (templateObject_15 = __makeTemplateObject(["\n  padding: 12px 25px;\n  background-color: #fff;\n  border: 1px solid #333;\n  color: #333;\n  font-size: 16px;\n  cursor: pointer;\n"], ["\n  padding: 12px 25px;\n  background-color: #fff;\n  border: 1px solid #333;\n  color: #333;\n  font-size: 16px;\n  cursor: pointer;\n"])));
var SearchButton = styled_components_1["default"].button(templateObject_16 || (templateObject_16 = __makeTemplateObject(["\n  padding: 12px 25px;\n  background-color: #333;\n  border: none;\n  color: #fff;\n  font-size: 16px;\n  cursor: pointer;\n"], ["\n  padding: 12px 25px;\n  background-color: #333;\n  border: none;\n  color: #fff;\n  font-size: 16px;\n  cursor: pointer;\n"])));
var MultiRangeContainer = styled_components_1["default"].div(templateObject_17 || (templateObject_17 = __makeTemplateObject(["\n  position: relative;\n  width: 100%;\n  height: 50px;\n"], ["\n  position: relative;\n  width: 100%;\n  height: 50px;\n"])));
var RangeLabelGroup = styled_components_1["default"].div(templateObject_18 || (templateObject_18 = __makeTemplateObject(["\n  display: flex;\n  justify-content: space-between;\n  font-size: 14px;\n  font-weight: 600;\n  span {\n    background: #e0e0e0;\n    padding: 2px 8px;\n    border-radius: 4px;\n  }\n"], ["\n  display: flex;\n  justify-content: space-between;\n  font-size: 14px;\n  font-weight: 600;\n  span {\n    background: #e0e0e0;\n    padding: 2px 8px;\n    border-radius: 4px;\n  }\n"])));
var SliderTrack = styled_components_1["default"].div(templateObject_19 || (templateObject_19 = __makeTemplateObject(["\n  position: absolute;\n  width: 100%;\n  height: 4px;\n  background-color: #ddd;\n  border-radius: 2px;\n  top: 10px;\n"], ["\n  position: absolute;\n  width: 100%;\n  height: 4px;\n  background-color: #ddd;\n  border-radius: 2px;\n  top: 10px;\n"])));
var ActiveTrack = styled_components_1["default"].div(templateObject_20 || (templateObject_20 = __makeTemplateObject(["\n  position: absolute;\n  height: 4px;\n  background-color: #1a1a1a;\n  border-radius: 2px;\n  top: 10px;\n  left: ", "%;\n  right: ", "%;\n"], ["\n  position: absolute;\n  height: 4px;\n  background-color: #1a1a1a;\n  border-radius: 2px;\n  top: 10px;\n  left: ", "%;\n  right: ", "%;\n"])), function (props) { return props.$start; }, function (props) { return 100 - props.$end; });
var RangeInputBase = styled_components_1["default"].input.attrs({ type: "range" })(templateObject_21 || (templateObject_21 = __makeTemplateObject(["\n  position: absolute;\n  width: 100%;\n  height: 4px;\n  top: 10px;\n  background: none;\n  pointer-events: none;\n  -webkit-appearance: none;\n  &::-webkit-slider-thumb {\n    height: 18px;\n    width: 18px;\n    border-radius: 50%;\n    background: #1a1a1a;\n    cursor: pointer;\n    pointer-events: auto;\n    -webkit-appearance: none;\n    border: 2px solid #fff;\n    box-shadow: 0 1px 3px rgba(0,0,0,0.3);\n  }\n"], ["\n  position: absolute;\n  width: 100%;\n  height: 4px;\n  top: 10px;\n  background: none;\n  pointer-events: none;\n  -webkit-appearance: none;\n  &::-webkit-slider-thumb {\n    height: 18px;\n    width: 18px;\n    border-radius: 50%;\n    background: #1a1a1a;\n    cursor: pointer;\n    pointer-events: auto;\n    -webkit-appearance: none;\n    border: 2px solid #fff;\n    box-shadow: 0 1px 3px rgba(0,0,0,0.3);\n  }\n"])));
// --- 컴포넌트 구현 ---
var FilterSidebar = function () {
    // MarketContext 연동
    var _a = (0, MarketContext_1.useMarket)(), filters = _a.filters, setFilters = _a.setFilters, resetFilters = _a.resetFilters, applyFilters = _a.applyFilters;
    var _b = (0, react_1.useState)(false), isPanelOpen = _b[0], setIsPanelOpen = _b[1];
    var _c = (0, react_1.useState)("space"), activeIcon = _c[0], setActiveIcon = _c[1];
    var sectionRefs = (0, react_1.useRef)({});
    var panelRef = (0, react_1.useRef)(null);
    // 가격 포맷: '만' 단위로 표시
    var formatPriceLabel = function (price) {
        if (price === 0)
            return "0원";
        var tenThousand = Math.floor(price / 10000);
        return tenThousand + "\uB9CC";
    };
    // 아이콘 네비게이션 내 현재 선택된 값 텍스트 표시
    var renderIconContent = function (item) {
        // 현재 필터에서 해당 아이디의 값을 가져옴
        var selectedValue = filters[item.id];
        // 1. 공간 (space)
        if (item.id === "space" && selectedValue) {
            var target = FilterData_1.SPACE_OPTIONS.find(function (o) { return o.value === selectedValue; });
            return (0, jsx_runtime_1.jsx)(SelectedText, { children: (target === null || target === void 0 ? void 0 : target.label) || "공간" }, void 0);
        }
        // 2. 분위기 (mood)
        if (item.id === "mood" && filters.mood) { // nav 아이디가 'light'라면 filters.mood 참조
            var target = FilterData_1.MOOD_OPTIONS.find(function (o) { return o.value === filters.mood; });
            return (0, jsx_runtime_1.jsx)(SelectedText, { children: (target === null || target === void 0 ? void 0 : target.label) || "분위기" }, void 0);
        }
        // 3. 가격 (won)
        if (item.id === "won") {
            if (filters.won[0] === 0 && filters.won[1] === MarketContext_1.MAX_PRICE)
                return item.icon;
            return ((0, jsx_runtime_1.jsxs)(SelectedText, { children: [formatPriceLabel(filters.won[0]), "~", formatPriceLabel(filters.won[1])] }, void 0));
        }
        // 4. 크기 (size)
        if (item.id === "size") {
            if (filters.size[0] === 0 && filters.size[1] === MarketContext_1.MAX_SIZE)
                return item.icon;
            return (0, jsx_runtime_1.jsxs)(SelectedText, { children: [filters.size[0], "~", filters.size[1], "cm"] }, void 0);
        }
        // 5. 형태 (morph)
        if (item.id === "morph" && filters.morph) { // nav 아이디가 'shape'라면 filters.morph 참조
            var target = FilterData_1.MORPH_OPTIONS.find(function (o) { return o.value === filters.morph; });
            return (0, jsx_runtime_1.jsx)(SelectedText, { children: (target === null || target === void 0 ? void 0 : target.label) || "형태" }, void 0);
        }
        // 6. 색상 (color)
        if (item.id === "color" && selectedValue) {
            var target = FilterData_1.COLOR_OPTIONS.find(function (c) { return c.value === selectedValue; });
            return (0, jsx_runtime_1.jsx)(SelectedText, { children: (target === null || target === void 0 ? void 0 : target.name) || "색상" }, void 0); // name 또는 label 사용
        }
        // 7. 기타/배송 (ship)
        if (item.id === "ship" && filters.ship.length > 0) {
            var target = FilterData_1.ETC_OPTIONS.find(function (o) { return o.value === filters.ship[0]; });
            return (0, jsx_runtime_1.jsx)(SelectedText, { children: (target === null || target === void 0 ? void 0 : target.label) || filters.ship[0] }, void 0);
        }
        return item.icon;
    };
    // 기타(etc) 다중 선택 토글 핸들러
    var handleEtcToggle = function (option) {
        setFilters(function (prev) {
            var isSelected = prev.ship.includes(option);
            return __assign(__assign({}, prev), { ship: isSelected ? prev.ship.filter(function (i) { return i !== option; }) : __spreadArray(__spreadArray([], prev.ship, true), [option], false) });
        });
    };
    // 사이드바 아이콘 클릭 핸들러
    var handleIconClick = function (id) {
        if (id === "reset") {
            resetFilters();
            if (panelRef.current)
                panelRef.current.scrollTo({ top: 0, behavior: "smooth" });
            return;
        }
        if (!isPanelOpen)
            setIsPanelOpen(true);
        var targetElement = sectionRefs.current[id];
        if (targetElement && panelRef.current) {
            var offsetTop = targetElement.offsetTop - 10;
            panelRef.current.scrollTo({ top: offsetTop, behavior: "smooth" });
            setActiveIcon(id);
        }
    };
    var handleClose = function () { return setIsPanelOpen(false); };
    var handleApply = function () {
        // 1. URLSearchParams를 사용하여 파라미터 문자열 생성
        var params = new URLSearchParams();
        if (filters.space)
            params.append("spaces", filters.space.toString());
        if (filters.mood)
            params.append("moods", filters.mood.toString());
        if (filters.morph)
            params.append("morph", filters.morph);
        if (filters.color)
            params.append("colors", filters.color.toString());
        // 가격 및 크기 범위
        params.append("minPrice", filters.won[0].toString());
        params.append("maxPrice", filters.won[1].toString());
        params.append("minSize", filters.size[0].toString());
        params.append("maxSize", filters.size[1].toString());
        // 기타 (배열)
        if (filters.ship.length > 0) {
            filters.ship.forEach(function (s) { return params.append("etc", s); });
        }
        // 2. 알림창으로 파라미터 출력
        alert("\uBC31\uC5D4\uB4DC\uB85C \uC804\uC1A1\uB420 \uD30C\uB77C\uBBF8\uD130:\n?" + params.toString());
        applyFilters(); // Context에서 가져온 함수 실행
        // 3. 패널 닫기
        setIsPanelOpen(false);
    };
    // 가격/크기 슬라이더 핸들러
    var handleRangeChange = function (field, index, value, maxLimit) {
        setFilters(function (prev) {
            var _a;
            var newRange = __spreadArray([], prev[field], true);
            var gap = maxLimit / 50;
            if (index === 0) {
                newRange[0] = Math.min(value, newRange[1] - gap);
            }
            else {
                newRange[1] = Math.max(value, newRange[0] + gap);
            }
            return __assign(__assign({}, prev), (_a = {}, _a[field] = newRange, _a));
        });
    };
    // 패널 스크롤 시 활성화된 섹션 아이콘 하이라이트
    (0, react_1.useEffect)(function () {
        var panel = panelRef.current;
        if (!panel)
            return;
        var handleScroll = function () {
            var currentActiveId = null;
            var sections = Object.entries(sectionRefs.current)
                .filter(function (_a) {
                var el = _a[1];
                return el !== null;
            })
                .map(function (_a) {
                var id = _a[0], el = _a[1];
                return ({ id: id, top: el.offsetTop });
            });
            var scrollTop = panel.scrollTop;
            for (var _i = 0, sections_1 = sections; _i < sections_1.length; _i++) {
                var section = sections_1[_i];
                if (scrollTop >= section.top - 50)
                    currentActiveId = section.id;
            }
            if (currentActiveId !== activeIcon)
                setActiveIcon(currentActiveId);
        };
        panel.addEventListener("scroll", handleScroll);
        return function () { return panel.removeEventListener("scroll", handleScroll); };
    }, [activeIcon]);
    return ((0, jsx_runtime_1.jsxs)(SidebarWrapper, __assign({ "$isPanelOpen": isPanelOpen }, { children: [(0, jsx_runtime_1.jsxs)(IconNav, { children: [(0, jsx_runtime_1.jsx)(IconItem, __assign({ onClick: function () { return setIsPanelOpen(function (prev) { return !prev; }); }, style: { fontSize: "24px" } }, { children: "\u2014" }), void 0), FilterData_1.MAIN_FILTER_ICONS.map(function (item) { return ((0, jsx_runtime_1.jsx)(IconItem, __assign({ "$isActive": activeIcon === item.id, onClick: function () { return handleIconClick(item.id); } }, { children: renderIconContent(item) }), item.id)); }), (0, jsx_runtime_1.jsx)(IconItem, __assign({ onClick: handleClose, style: { marginTop: "auto", marginBottom: "10px", fontSize: "24px" } }, { children: "\u2715" }), void 0)] }, void 0), (0, jsx_runtime_1.jsxs)(FilterPanel, __assign({ "$isPanelOpen": isPanelOpen, ref: panelRef }, { children: [(0, jsx_runtime_1.jsx)(CloseButton, __assign({ onClick: handleClose }, { children: "\u2715" }), void 0), (0, jsx_runtime_1.jsxs)("div", __assign({ style: { flexGrow: 1, paddingRight: "5px" } }, { children: [(0, jsx_runtime_1.jsx)("hr", { style: { margin: "15px 0" } }, void 0), (0, jsx_runtime_1.jsxs)(FilterSection, __assign({ "$isCurrent": activeIcon === "space", ref: function (el) { return (sectionRefs.current["space"] = el); } }, { children: [(0, jsx_runtime_1.jsx)(FilterSectionTitle, { children: "\uACF5\uAC04" }, void 0), (0, jsx_runtime_1.jsx)(OptionList, { children: FilterData_1.SPACE_OPTIONS.map(function (o) { return ((0, jsx_runtime_1.jsx)(OptionButton, __assign({ "$isActive": filters.space === o.value, onClick: function () { return setFilters(function (p) { return (__assign(__assign({}, p), { space: o.value })); }); } }, { children: o.label }), o.value)); }) }, void 0)] }), void 0), (0, jsx_runtime_1.jsxs)(FilterSection, __assign({ "$isCurrent": activeIcon === "mood", ref: function (el) { return (sectionRefs.current["mood"] = el); } }, { children: [(0, jsx_runtime_1.jsx)(FilterSectionTitle, { children: "\uBD84\uC704\uAE30" }, void 0), (0, jsx_runtime_1.jsx)(OptionList, { children: FilterData_1.MOOD_OPTIONS.map(function (o) { return ((0, jsx_runtime_1.jsx)(OptionButton, __assign({ "$isActive": filters.mood === o.value, onClick: function () { return setFilters(function (p) { return (__assign(__assign({}, p), { mood: o.value })); }); } }, { children: o.label }), o.value)); }) }, void 0)] }), void 0), (0, jsx_runtime_1.jsxs)(FilterSection, __assign({ "$isCurrent": activeIcon === "won", ref: function (el) { return (sectionRefs.current["won"] = el); } }, { children: [(0, jsx_runtime_1.jsx)(FilterSectionTitle, { children: "\uAC00\uACA9" }, void 0), (0, jsx_runtime_1.jsxs)(RangeLabelGroup, { children: [(0, jsx_runtime_1.jsx)("span", { children: formatPriceLabel(filters.won[0]) }, void 0), (0, jsx_runtime_1.jsx)("span", { children: formatPriceLabel(filters.won[1]) }, void 0)] }, void 0), (0, jsx_runtime_1.jsxs)(MultiRangeContainer, { children: [(0, jsx_runtime_1.jsx)(SliderTrack, {}, void 0), (0, jsx_runtime_1.jsx)(ActiveTrack, { "$start": (filters.won[0] / MarketContext_1.MAX_PRICE) * 100, "$end": (filters.won[1] / MarketContext_1.MAX_PRICE) * 100 }, void 0), (0, jsx_runtime_1.jsx)(RangeInputBase, { min: 0, max: MarketContext_1.MAX_PRICE, step: 10000, value: filters.won[0], onChange: function (e) { return handleRangeChange('won', 0, Number(e.target.value), MarketContext_1.MAX_PRICE); } }, void 0), (0, jsx_runtime_1.jsx)(RangeInputBase, { min: 0, max: MarketContext_1.MAX_PRICE, step: 10000, value: filters.won[1], onChange: function (e) { return handleRangeChange('won', 1, Number(e.target.value), MarketContext_1.MAX_PRICE); } }, void 0)] }, void 0)] }), void 0), (0, jsx_runtime_1.jsxs)(FilterSection, __assign({ "$isCurrent": activeIcon === "size", ref: function (el) { return (sectionRefs.current["size"] = el); } }, { children: [(0, jsx_runtime_1.jsx)(FilterSectionTitle, { children: "\uD06C\uAE30" }, void 0), (0, jsx_runtime_1.jsxs)(RangeLabelGroup, { children: [(0, jsx_runtime_1.jsxs)("span", { children: [filters.size[0], "cm"] }, void 0), (0, jsx_runtime_1.jsxs)("span", { children: [filters.size[1], "cm"] }, void 0)] }, void 0), (0, jsx_runtime_1.jsxs)(MultiRangeContainer, { children: [(0, jsx_runtime_1.jsx)(SliderTrack, {}, void 0), (0, jsx_runtime_1.jsx)(ActiveTrack, { "$start": (filters.size[0] / MarketContext_1.MAX_SIZE) * 100, "$end": (filters.size[1] / MarketContext_1.MAX_SIZE) * 100 }, void 0), (0, jsx_runtime_1.jsx)(RangeInputBase, { min: 0, max: MarketContext_1.MAX_SIZE, step: 1, value: filters.size[0], onChange: function (e) { return handleRangeChange('size', 0, Number(e.target.value), MarketContext_1.MAX_SIZE); } }, void 0), (0, jsx_runtime_1.jsx)(RangeInputBase, { min: 0, max: MarketContext_1.MAX_SIZE, step: 1, value: filters.size[1], onChange: function (e) { return handleRangeChange('size', 1, Number(e.target.value), MarketContext_1.MAX_SIZE); } }, void 0)] }, void 0)] }), void 0), (0, jsx_runtime_1.jsxs)(FilterSection, __assign({ "$isCurrent": activeIcon === "morph", ref: function (el) { return (sectionRefs.current["morph"] = el); } }, { children: [(0, jsx_runtime_1.jsx)(FilterSectionTitle, { children: "\uD615\uD0DC" }, void 0), (0, jsx_runtime_1.jsx)(OptionList, { children: FilterData_1.MORPH_OPTIONS.map(function (m) { return ((0, jsx_runtime_1.jsx)(OptionButton, __assign({ "$isActive": filters.morph === m.value, onClick: function () { return setFilters(function (p) { return (__assign(__assign({}, p), { morph: m.value })); }); } }, { children: m.label }), m.value)); }) }, void 0)] }), void 0), (0, jsx_runtime_1.jsxs)(FilterSection, __assign({ "$isCurrent": activeIcon === "color", ref: function (el) { return (sectionRefs.current["color"] = el); } }, { children: [(0, jsx_runtime_1.jsx)(FilterSectionTitle, { children: "\uC0C9\uC0C1" }, void 0), (0, jsx_runtime_1.jsx)(OptionList, { children: FilterData_1.COLOR_OPTIONS.map(function (c) { return ((0, jsx_runtime_1.jsx)(ColorOption, { hex: c.hex, "$isSelected": filters.color === c.value, onClick: function () { return setFilters(function (p) { return (__assign(__assign({}, p), { color: c.value })); }); }, title: c.name }, c.hex)); }) }, void 0)] }), void 0), (0, jsx_runtime_1.jsxs)(FilterSection, __assign({ "$isCurrent": activeIcon === "ship", ref: function (el) { return (sectionRefs.current["ship"] = el); }, style: { borderBottom: "none" } }, { children: [(0, jsx_runtime_1.jsx)(FilterSectionTitle, { children: "\uAE30\uD0C0" }, void 0), (0, jsx_runtime_1.jsx)(OptionList, { children: FilterData_1.ETC_OPTIONS.map(function (o) { return ((0, jsx_runtime_1.jsx)(OptionButton, __assign({ "$isActive": filters.ship.includes(o.value), onClick: function () { return handleEtcToggle(o.value); } }, { children: o.label }), o.value)); }) }, void 0)] }), void 0), (0, jsx_runtime_1.jsxs)(FooterButtons, { children: [(0, jsx_runtime_1.jsx)(ResetButton, __assign({ onClick: resetFilters }, { children: "\uCD08\uAE30\uD654" }), void 0), (0, jsx_runtime_1.jsx)(SearchButton, __assign({ onClick: handleApply }, { children: "\uC801\uC6A9" }), void 0)] }, void 0)] }), void 0)] }), void 0)] }), void 0));
};
exports.FilterSidebar = FilterSidebar;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11, templateObject_12, templateObject_13, templateObject_14, templateObject_15, templateObject_16, templateObject_17, templateObject_18, templateObject_19, templateObject_20, templateObject_21;
