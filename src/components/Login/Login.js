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
exports.Login = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var LoginStyles_1 = require("./LoginStyles");
var LoginComponentBase = function (_a) {
    var children = _a.children;
    return ((0, jsx_runtime_1.jsx)(LoginStyles_1.PageWrapper, { children: (0, jsx_runtime_1.jsxs)(LoginStyles_1.FormContainer, { children: [(0, jsx_runtime_1.jsx)(LoginStyles_1.Title, { children: "\uB85C\uADF8\uC778" }, void 0), children] }, void 0) }, void 0));
};
var LoginForm = function (_a) {
    var onSubmit = _a.onSubmit, children = _a.children;
    return (0, jsx_runtime_1.jsx)(LoginStyles_1.Form, __assign({ onSubmit: onSubmit }, { children: children }), void 0);
};
var Input = function (props) {
    // 플레이스홀더를 사용하여 이미지와 동일하게 구현
    return (0, jsx_runtime_1.jsx)(LoginStyles_1.InputField, __assign({}, props), void 0);
};
// 4. 로그인 유지 체크박스
var RememberMe = function () { return ((0, jsx_runtime_1.jsxs)(LoginStyles_1.CheckboxGroup, { children: [(0, jsx_runtime_1.jsxs)("label", { children: [(0, jsx_runtime_1.jsx)("input", { type: "checkbox", name: "rememberMe" }, void 0), (0, jsx_runtime_1.jsx)("span", { children: "\uB85C\uADF8\uC778 \uC0C1\uD0DC \uC720\uC9C0" }, void 0)] }, void 0), (0, jsx_runtime_1.jsxs)("label", { children: [(0, jsx_runtime_1.jsx)("input", { type: "checkbox", name: "keepLoggedIn" }, void 0), (0, jsx_runtime_1.jsx)("span", { children: "ID\uB97C \uC800\uC7A5\uD569\uB2C8\uB2E4" }, void 0)] }, void 0)] }, void 0)); };
var Action = function (_a) {
    var children = _a.children, onClick = _a.onClick, _b = _a.type, type = _b === void 0 ? "button" : _b, _c = _a.isPrimary, isPrimary = _c === void 0 ? false : _c, href = _a.href;
    if (type === "submit" && isPrimary) {
        return (0, jsx_runtime_1.jsx)(LoginStyles_1.LoginButton, __assign({ type: "submit" }, { children: children }), void 0);
    }
    if (!isPrimary && href) {
        return (0, jsx_runtime_1.jsx)(LoginStyles_1.ForgotPasswordLink, __assign({ href: href }, { children: children }), void 0);
    }
    if (!isPrimary && type === "button") {
        return ((0, jsx_runtime_1.jsx)(LoginStyles_1.RegisterButton, __assign({ type: "button", onClick: onClick }, { children: children }), void 0));
    }
    // 기본은 로그인 버튼
    return ((0, jsx_runtime_1.jsx)(LoginStyles_1.LoginButton, __assign({ type: type, onClick: onClick }, { children: children }), void 0));
};
// --- Compound Component 연결 ---
exports.Login = Object.assign(LoginComponentBase, {
    Form: LoginForm,
    Input: Input,
    RememberMe: RememberMe,
    Action: Action
});
