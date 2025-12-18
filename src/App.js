"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var jsx_runtime_1 = require("react/jsx-runtime");
var AppRouter_1 = __importDefault(require("./router/AppRouter")); // 라우터 파일
var AuthContext_1 = require("./context/AuthContext");
var App = function () {
    return ((0, jsx_runtime_1.jsx)(AuthContext_1.AuthProvider, { children: (0, jsx_runtime_1.jsx)(AppRouter_1["default"], {}, void 0) }, void 0));
};
exports["default"] = App;
