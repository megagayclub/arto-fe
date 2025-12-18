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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var jsx_runtime_1 = require("react/jsx-runtime");
// pages/SignUpPage.tsx
var react_1 = require("react");
var SignUp_1 = require("../components/SignUp/SignUp");
var Header_1 = __importDefault(require("../components/layout/Header/Header"));
var useSignUp_1 = require("../hooks/useSignUp");
var SignUpPage = function () {
    // 폼 상태 관리
    var _a = (0, react_1.useState)(""), email = _a[0], setEmail = _a[1];
    var _b = (0, react_1.useState)(""), name = _b[0], setName = _b[1];
    var _c = (0, react_1.useState)(""), password = _c[0], setPassword = _c[1];
    var _d = (0, react_1.useState)(""), confirmPassword = _d[0], setConfirmPassword = _d[1];
    // 전화번호와 주소 상태 추가
    var _e = (0, react_1.useState)(""), phoneNumber = _e[0], setPhoneNumber = _e[1];
    var _f = (0, react_1.useState)(""), address = _f[0], setAddress = _f[1];
    // 🌟 훅 사용
    var _g = (0, useSignUp_1.useSignUp)(), signUp = _g.signUp, isLoading = _g.isLoading, error = _g.error, isSuccess = _g.isSuccess;
    // 1. 실제 회원가입 로직 (인자를 받지 않음: onRegister에 적합)
    var executeSignUp = function () {
        // 1. 프론트엔드 비밀번호 확인
        if (password !== confirmPassword) {
            alert("パスワードが一致しません。");
            return;
        }
        // 2. API 호출을 위한 데이터 준비
        var signUpData = {
            email: email,
            password: password,
            name: name,
            phoneNumber: phoneNumber,
            address: address
        };
        // 3. API 호출
        alert("ㅇㅋ일단2");
        signUp(signUpData);
    };
    // 2. 폼 제출 이벤트 핸들러 (FormEvent를 인자로 받음: onSubmit에 적합)
    var handleSubmit = function (e) {
        e.preventDefault(); // 폼의 기본 제출 동작 방지
        executeSignUp(); // 실제 로직 실행
    };
    // 회원가입 성공 시 UI
    if (isSuccess) {
        return ((0, jsx_runtime_1.jsx)(SignUp_1.SignUp, { children: (0, jsx_runtime_1.jsx)("p", __assign({ style: { textAlign: "center", fontSize: "18px", color: "green", padding: "40px" } }, { children: "\u2705 \u4F1A\u54E1\u767B\u9332\u304C\u5B8C\u4E86\u3057\u307E\u3057\u305F\u3002\u30ED\u30B0\u30A4\u30F3\u3057\u3066\u304F\u3060\u3055\u3044\u3002" }), void 0) }, void 0));
    }
    var handleCancel = function () {
        console.log("会員登録取消");
        // 실제로는 홈페이지나 로그인 페이지로 이동하는 로직을 추가합니다.
    };
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(Header_1["default"], {}, void 0), (0, jsx_runtime_1.jsx)(SignUp_1.SignUp, { children: (0, jsx_runtime_1.jsxs)(SignUp_1.SignUp.Form, __assign({ onSubmit: handleSubmit }, { children: [error && ((0, jsx_runtime_1.jsxs)("p", __assign({ style: { color: "red", textAlign: "center", marginBottom: "20px" } }, { children: ["\uD83D\uDEA8 ", error] }), void 0)), (0, jsx_runtime_1.jsxs)(SignUp_1.SignUp.InputGrid, { children: [(0, jsx_runtime_1.jsx)(SignUp_1.SignUp.FieldGroup, __assign({ label: "E-mail\u30A2\u30C9\u30EC\u30B9 (ID)", hasCheck: true }, { children: (0, jsx_runtime_1.jsx)(SignUp_1.SignUp.InputWrapper, { children: (0, jsx_runtime_1.jsx)(SignUp_1.SignUp.Input, { type: "email", placeholder: "E-mail\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044 (\u4F8B: arto@arto.com)", required: true, value: email, onChange: function (e) { return setEmail(e.target.value); }, disabled: isLoading }, void 0) }, void 0) }), void 0), (0, jsx_runtime_1.jsx)(SignUp_1.SignUp.FieldGroup, __assign({ label: "\u540D\u524D", hasCheck: true }, { children: (0, jsx_runtime_1.jsx)(SignUp_1.SignUp.InputWrapper, { children: (0, jsx_runtime_1.jsx)(SignUp_1.SignUp.Input, { placeholder: "\u540D\u524D", type: "text", required: true, value: name, onChange: function (e) { return setName(e.target.value); }, disabled: isLoading }, void 0) }, void 0) }), void 0), (0, jsx_runtime_1.jsx)(SignUp_1.SignUp.FieldGroup, __assign({ label: "\u30D1\u30B9\u30EF\u30FC\u30C9", hasCheck: true }, { children: (0, jsx_runtime_1.jsx)(SignUp_1.SignUp.InputWrapper, { children: (0, jsx_runtime_1.jsx)(SignUp_1.SignUp.Input, { type: "password", required: true, value: password, onChange: function (e) { return setPassword(e.target.value); }, disabled: isLoading }, void 0) }, void 0) }), void 0), (0, jsx_runtime_1.jsx)(SignUp_1.SignUp.FieldGroup, __assign({ label: "\u30D1\u30B9\u30EF\u30FC\u30C9\u78BA\u8A8D", hasCheck: true }, { children: (0, jsx_runtime_1.jsx)(SignUp_1.SignUp.InputWrapper, { children: (0, jsx_runtime_1.jsx)(SignUp_1.SignUp.Input, { type: "password", required: true, value: confirmPassword, onChange: function (e) { return setConfirmPassword(e.target.value); }, disabled: isLoading }, void 0) }, void 0) }), void 0), (0, jsx_runtime_1.jsx)(SignUp_1.SignUp.FieldGroup, __assign({ label: "\u96FB\u8A71\u756A\u53F7", hasCheck: true }, { children: (0, jsx_runtime_1.jsx)(SignUp_1.SignUp.InputWrapper, { children: (0, jsx_runtime_1.jsx)(SignUp_1.SignUp.Input, { placeholder: "\u96FB\u8A71\u756A\u53F7", type: "tel", value: phoneNumber, onChange: function (e) { return setPhoneNumber(e.target.value); }, disabled: isLoading }, void 0) }, void 0) }), void 0), (0, jsx_runtime_1.jsx)(SignUp_1.SignUp.FieldGroup, __assign({ label: "\u4F4F\u6240", hasCheck: true }, { children: (0, jsx_runtime_1.jsx)(SignUp_1.SignUp.InputWrapper, { children: (0, jsx_runtime_1.jsx)(SignUp_1.SignUp.Input, { placeholder: "\u4F4F\u6240", type: "text", value: address, onChange: function (e) { return setAddress(e.target.value); }, disabled: isLoading }, void 0) }, void 0) }), void 0)] }, void 0), (0, jsx_runtime_1.jsx)(SignUp_1.SignUp.Terms, {}, void 0), (0, jsx_runtime_1.jsx)(SignUp_1.SignUp.Actions, { registerText: isLoading ? "登録中..." : "登録", onRegister: executeSignUp, onCancel: handleCancel, registerDisabled: isLoading }, void 0)] }), void 0) }, void 0)] }, void 0));
};
exports["default"] = SignUpPage;
