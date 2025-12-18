"use strict";
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
exports.__esModule = true;
exports.MyPage = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var MyPageContext_1 = require("./MyPageContext");
var MyPageStyles_1 = require("./MyPageStyles");
var ProductItem = function (_a) {
    var title = _a.title, date = _a.date, price = _a.price;
    return ((0, jsx_runtime_1.jsxs)(MyPageStyles_1.ProductItemWrapper, { children: [(0, jsx_runtime_1.jsx)(MyPageStyles_1.ProductImage, {}, void 0), (0, jsx_runtime_1.jsxs)(MyPageStyles_1.ProductInfo, { children: [(0, jsx_runtime_1.jsxs)("p", { children: ["\uC791\uD488\uB4F1\uB85D\uC77C: ", date] }, void 0), (0, jsx_runtime_1.jsxs)("p", { children: ["\uC791\uD488\uBA85: ", title] }, void 0), (0, jsx_runtime_1.jsxs)("span", { children: ["\uAC00\uACA9: ", price.toLocaleString(), "\u20A9"] }, void 0)] }, void 0)] }, void 0));
};
// 2. 주문 상태 요약
var OrderSummary = function () {
    var statuses = [
        { label: "결제진행 / 완료", count: 0 },
        { label: "배송준비 중", count: 0 },
        { label: "배송중", count: 0 },
        { label: "배송완료", count: 0 },
    ];
    return ((0, jsx_runtime_1.jsx)(MyPageStyles_1.OrderSummaryContainer, { children: statuses.map(function (s) { return ((0, jsx_runtime_1.jsxs)(MyPageStyles_1.StatusItem, { children: [(0, jsx_runtime_1.jsx)("p", { children: s.label }, void 0), (0, jsx_runtime_1.jsx)("span", { children: s.count }, void 0)] }, s.label)); }) }, void 0));
};
// 3. 마이 메뉴 (사이드바)
var MySidebarMenu = function () {
    var _a = (0, MyPageContext_1.useMyPage)(), activeSection = _a.activeSection, setActiveSection = _a.setActiveSection;
    var menuItems = [
        { label: "MY", key: "favorites" },
        { label: "카트", key: "cart" },
        { label: "구매이력", key: "history" },
        { label: "문의사항", key: "inquiry" },
    ];
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)(MyPageStyles_1.AccountInfoBox, { children: [(0, jsx_runtime_1.jsx)("h3", { children: "\uD68C\uC6D0\uC815\uBCF4" }, void 0), (0, jsx_runtime_1.jsx)("p", { children: "E-mail(ID):" }, void 0), (0, jsx_runtime_1.jsx)("p", { children: "jyc@gmu.ac.kr" }, void 0), (0, jsx_runtime_1.jsx)(MyPageStyles_1.Button, { children: "\uBE44\uBC00\uBC88\uD638 \uBCC0\uACBD" }, void 0), (0, jsx_runtime_1.jsx)(MyPageStyles_1.Button, { children: "\uD68C\uC6D0 \uD0C8\uD1F4" }, void 0)] }, void 0), (0, jsx_runtime_1.jsx)(MyPageStyles_1.MyMenu, { children: menuItems.map(function (item) { return ((0, jsx_runtime_1.jsxs)(MyPageStyles_1.MenuItem, __assign({ "$active": activeSection === item.key, onClick: function () { return setActiveSection(item.key); } }, { children: [(0, jsx_runtime_1.jsx)("span", { children: item.label }, void 0), (0, jsx_runtime_1.jsx)("span", { children: "+" }, void 0)] }), item.key)); }) }, void 0)] }, void 0));
};
var MySection = function (_a) {
    var title = _a.title, children = _a.children;
    return ((0, jsx_runtime_1.jsxs)(MyPageStyles_1.SectionWrapper, { children: [(0, jsx_runtime_1.jsxs)(MyPageStyles_1.SectionHeader, { children: [(0, jsx_runtime_1.jsx)("span", { children: title }, void 0), (0, jsx_runtime_1.jsx)("span", { children: "+" }, void 0)] }, void 0), (0, jsx_runtime_1.jsx)(MyPageStyles_1.SectionContent, { children: children }, void 0)] }, void 0));
};
// Base Component: Context를 제공하고 레이아웃을 정의
var MyPageLayoutBase = function (_a) {
    var children = _a.children;
    return ((0, jsx_runtime_1.jsx)(MyPageContext_1.MyPageProvider, { children: (0, jsx_runtime_1.jsx)(MyPageStyles_1.LayoutContainer, { children: children }, void 0) }, void 0));
};
// 하위 컴포넌트들을 Base에 연결
exports.MyPage = Object.assign(MyPageLayoutBase, {
    Sidebar: MySidebarMenu,
    Content: MyPageStyles_1.ContentContainer,
    Order: OrderSummary,
    Section: MySection,
    Product: ProductItem
});
