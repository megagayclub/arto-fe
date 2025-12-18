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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var jsx_runtime_1 = require("react/jsx-runtime");
// LoginPage.tsx (수정된 코드)
var react_1 = require("react");
// 🌟 useNavigate 훅을 가져옵니다.
var react_router_dom_1 = require("react-router-dom");
var Header_1 = __importDefault(require("../components/layout/Header/Header"));
var Login_1 = require("../components/Login/Login");
// 🌟 새로 생성한 useLogin 훅을 가져옵니다.
var useLogin_1 = require("../hooks/useLogin");
var LoginPage = function () {
    var navigate = (0, react_router_dom_1.useNavigate)();
    // 🌟 useLogin 훅 사용 및 상태 디스트럭처링
    var _a = (0, useLogin_1.useLogin)(), executeLogin = _a.executeLogin, isLoading = _a.isLoading, error = _a.error;
    var _b = (0, react_1.useState)(""), email = _b[0], setEmail = _b[1];
    var _c = (0, react_1.useState)(""), password = _c[0], setPassword = _c[1];
    var handleSubmit = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        var success;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    console.log("로그인 시도:", { email: email, password: password });
                    return [4 /*yield*/, executeLogin({ email: email, password: password })];
                case 1:
                    success = _a.sent();
                    if (success) {
                        console.log("ログイン成功！ トークン 저장 완료.");
                        // 로그인 성공 시 마이페이지로 이동
                        navigate('/mypage');
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    var handleRegister = function () {
        console.log("회원가입 페이지로 이동");
        navigate('/register');
    };
    var handleForgotPassword = function () {
        console.log("비밀번호 찾기 페이지로 이동");
        navigate('/forgot-password');
    };
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(Header_1["default"], {}, void 0), (0, jsx_runtime_1.jsx)(Login_1.Login, { children: (0, jsx_runtime_1.jsxs)(Login_1.Login.Form, __assign({ onSubmit: handleSubmit }, { children: [error && (0, jsx_runtime_1.jsx)("p", __assign({ style: { color: "red", textAlign: "center", marginBottom: "10px" } }, { children: error }), void 0), (0, jsx_runtime_1.jsx)(Login_1.Login.Input, { type: "email", placeholder: "ID(E-mail)", required: true, value: email, onChange: function (e) { return setEmail(e.target.value); }, disabled: isLoading }, void 0), (0, jsx_runtime_1.jsx)(Login_1.Login.Input, { type: "password", placeholder: "Password", required: true, value: password, onChange: function (e) { return setPassword(e.target.value); }, disabled: isLoading }, void 0), (0, jsx_runtime_1.jsx)(Login_1.Login.RememberMe, {}, void 0), (0, jsx_runtime_1.jsx)(Login_1.Login.Action, __assign({ type: "submit", isPrimary: true, disabled: isLoading }, { children: isLoading ? "로그인 중..." : "로그인" }), void 0), (0, jsx_runtime_1.jsx)(Login_1.Login.Action, __assign({ type: "button", onClick: handleRegister, disabled: isLoading }, { children: "\uD68C\uC6D0 \uB4F1\uB85D" }), void 0), (0, jsx_runtime_1.jsx)(Login_1.Login.Action, __assign({ onClick: handleForgotPassword }, { children: "\uBE44\uBC00\uBC88\uD638 \uCC3E\uAE30" }), void 0)] }), void 0) }, void 0)] }, void 0));
};
exports["default"] = LoginPage;
