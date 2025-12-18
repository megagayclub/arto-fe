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
exports.useMyPage = exports.MyPageProvider = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
// src/components/MyPage/MyPageContext.tsx
var react_1 = require("react");
var MyPageContext = (0, react_1.createContext)(undefined);
var MyPageProvider = function (_a) {
    var children = _a.children;
    var _b = (0, react_1.useState)("favorites"), activeSection = _b[0], setActiveSection = _b[1];
    return ((0, jsx_runtime_1.jsx)(MyPageContext.Provider, __assign({ value: { activeSection: activeSection, setActiveSection: setActiveSection } }, { children: children }), void 0));
};
exports.MyPageProvider = MyPageProvider;
var useMyPage = function () {
    var context = (0, react_1.useContext)(MyPageContext);
    if (!context) {
        throw new Error("useMyPage must be used within a MyPageProvider");
    }
    return context;
};
exports.useMyPage = useMyPage;
