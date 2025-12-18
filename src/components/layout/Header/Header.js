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
var jsx_runtime_1 = require("react/jsx-runtime");
var io_1 = require("react-icons/io");
var fa6_1 = require("react-icons/fa6");
var HeaderStyle_1 = require("./HeaderStyle");
var AuthContext_1 = require("../../../context/AuthContext"); // 🌟 AuthContext import
var NAV_ITEMS = [
    // ... (NAV_ITEMS 유지)
    { label: "作品を見る", href: "/market" },
    { label: "アーティカバリー", href: "/faq" },
    { label: "ギャラリーズ", href: "/company" },
];
var Header = function () {
    var _a = (0, AuthContext_1.useAuth)(), isLoggedIn = _a.isLoggedIn, logout = _a.logout; // 🌟 로그인 상태 가져오기
    // 로그인 상태에 따른 링크 결정
    var AuthLink = isLoggedIn ? (
    // 로그인 상태: 마이페이지 또는 로그아웃
    (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(HeaderStyle_1.NavLink, __assign({ href: "/mypage", style: { marginLeft: '10px' } }, { children: (0, jsx_runtime_1.jsx)(fa6_1.FaUser, { size: 20 }, void 0) }), void 0), (0, jsx_runtime_1.jsx)(HeaderStyle_1.NavLink, __assign({ onClick: logout, style: { marginLeft: '5px', marginRight: '30px' } }, { children: "\u30ED\u30B0\u30A2\u30A6\u30C8" }), void 0)] }, void 0)) : (
    // 로그아웃 상태: 로그인 페이지
    (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(HeaderStyle_1.NavLink, __assign({ href: "/login", style: { marginLeft: '5px', marginRight: '30px' } }, { children: "\u30ED\u30B0\u30A4\u30F3" }), void 0) }, void 0));
    return ((0, jsx_runtime_1.jsxs)(HeaderStyle_1.HeaderContainer, { children: [(0, jsx_runtime_1.jsx)(HeaderStyle_1.LogoSection, { children: (0, jsx_runtime_1.jsx)(HeaderStyle_1.NavLink, __assign({ href: "/", style: { textDecoration: 'none', color: 'inherit' } }, { children: (0, jsx_runtime_1.jsx)(HeaderStyle_1.LogoText, { children: "rto" }, void 0) }), void 0) }, void 0), (0, jsx_runtime_1.jsxs)(HeaderStyle_1.NavSection, { children: [NAV_ITEMS.map(function (item) { return ((0, jsx_runtime_1.jsx)(HeaderStyle_1.NavLink, __assign({ href: item.href }, { children: item.label }), item.label)); }), (0, jsx_runtime_1.jsxs)(HeaderStyle_1.UtilitySection, { children: [(0, jsx_runtime_1.jsx)(io_1.IoIosSearch, { size: 25, href: "/search", title: "\u691C\u7D22" }, void 0), (0, jsx_runtime_1.jsx)(io_1.IoIosCart, { size: 25, href: "/cart", title: "\u30AB\u30FC\u30C8" }, void 0), (0, jsx_runtime_1.jsx)(HeaderStyle_1.Separator, { children: "|" }, void 0), AuthLink] }, void 0)] }, void 0)] }, void 0));
};
exports["default"] = Header;
