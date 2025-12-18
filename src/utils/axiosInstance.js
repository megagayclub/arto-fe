"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
// src/utils/axiosInstance.ts
var axios_1 = __importDefault(require("axios"));
var axiosInstance = axios_1["default"].create({
    // baseURL: "/api", (기존)
    baseURL: "http://52.79.193.77:8080/api",
    headers: {
        "Content-Type": "application/json"
    }
});
// ✅ 요청마다 토큰 자동 첨부
axiosInstance.interceptors.request.use(function (config) {
    var _a;
    var token = localStorage.getItem("accessToken");
    if (token) {
        config.headers = (_a = config.headers) !== null && _a !== void 0 ? _a : {};
        config.headers.Authorization = "Bearer " + token;
    }
    return config;
});
exports["default"] = axiosInstance;
