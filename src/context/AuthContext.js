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
exports.useAuth = exports.AuthProvider = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
// src/context/AuthContext.tsx
var react_1 = require("react");
var AuthContext = (0, react_1.createContext)(undefined);
var AuthProvider = function (_a) {
    var children = _a.children;
    // 1. 초기값 설정: 로컬 스토리지에 토큰이 있으면 true로 시작
    var _b = (0, react_1.useState)(function () {
        return !!localStorage.getItem('authToken');
    }), isLoggedIn = _b[0], setIsLoggedIn = _b[1];
    var _c = (0, react_1.useState)(function () {
        return localStorage.getItem('userEmail');
    }), userEmail = _c[0], setUserEmail = _c[1];
    var login = function (email, token) {
        localStorage.setItem('authToken', token);
        localStorage.setItem('userEmail', email); // 이메일도 저장해야 유지됨
        setIsLoggedIn(true);
        setUserEmail(email);
    };
    var logout = function () {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userEmail');
        setIsLoggedIn(false);
        setUserEmail(null);
        window.location.href = '/login'; // 로그아웃 시 로그인 페이지로 강제 이동 (선택)
    };
    return ((0, jsx_runtime_1.jsx)(AuthContext.Provider, __assign({ value: { isLoggedIn: isLoggedIn, userEmail: userEmail, login: login, logout: logout } }, { children: children }), void 0));
};
exports.AuthProvider = AuthProvider;
var useAuth = function () {
    var context = (0, react_1.useContext)(AuthContext);
    if (!context)
        throw new Error('useAuth must be used within an AuthProvider');
    return context;
};
exports.useAuth = useAuth;
