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
exports.SignUp = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var SignUpStyles_1 = require("./SignUpStyles");
// 아이콘 대체
var ICON_CHECK = "✓"; // 체크 아이콘
var SignUpComponentBase = function (_a) {
    var children = _a.children;
    return ((0, jsx_runtime_1.jsx)(SignUpStyles_1.PageWrapper, { children: (0, jsx_runtime_1.jsxs)(SignUpStyles_1.SignUpFormContainer, { children: [(0, jsx_runtime_1.jsx)(SignUpStyles_1.SignUpTitle, { children: "\u4F1A\u54E1\u767B\u9332" }, void 0), children] }, void 0) }, void 0));
};
var RegistrationForm = function (_a) {
    var onSubmit = _a.onSubmit, children = _a.children;
    return (0, jsx_runtime_1.jsx)(SignUpStyles_1.SignUpForm, __assign({ onSubmit: onSubmit }, { children: children }), void 0);
};
var FieldGroup = function (_a) {
    var label = _a.label, children = _a.children, _b = _a.hasCheck, hasCheck = _b === void 0 ? false : _b;
    return ((0, jsx_runtime_1.jsxs)(SignUpStyles_1.InputGroup, { children: [(0, jsx_runtime_1.jsxs)("label", { children: [hasCheck && (0, jsx_runtime_1.jsx)(SignUpStyles_1.CheckIcon, { children: ICON_CHECK }, void 0), label] }, void 0), children] }, void 0));
};
// 4. 약관 동의 섹션 (생략 없음)
var TermsSection = function () { return ((0, jsx_runtime_1.jsxs)(SignUpStyles_1.TermsContainer, { children: [(0, jsx_runtime_1.jsxs)(SignUpStyles_1.AgreeAllRow, { children: [(0, jsx_runtime_1.jsxs)("label", { children: [(0, jsx_runtime_1.jsx)("input", { type: "checkbox" }, void 0), (0, jsx_runtime_1.jsx)("span", { children: "\u3059\u3079\u3066\u306B\u540C\u610F" }, void 0)] }, void 0), (0, jsx_runtime_1.jsx)("p", __assign({ style: { fontSize: "12px", fontWeight: "normal", marginLeft: "20px" } }, { children: "\u79C1\u306F14\u6B73\u4EE5\u4E0A\u3067\u3042\u308A\u3001arto\u30B5\u30FC\u30D3\u30B9\u5229\u7528\u898F\u7D04\u304A\u3088\u3073\u500B\u4EBA\u60C5\u5831\u306E\u53CE\u96C6\u30FB\u5229\u7528\u6848\u5185\u7B49\u306B\u540C\u610F\u3057\u307E\u3059\u3002" }), void 0)] }, void 0), (0, jsx_runtime_1.jsxs)(SignUpStyles_1.TermItem, { children: [(0, jsx_runtime_1.jsxs)("label", { children: [(0, jsx_runtime_1.jsx)("input", { type: "checkbox", required: true }, void 0), (0, jsx_runtime_1.jsx)("span", { children: "(\u5FC5\u9808) arto\u30B5\u30FC\u30D3\u30B9\u5229\u7528\u898F\u7D04" }, void 0)] }, void 0), (0, jsx_runtime_1.jsx)(SignUpStyles_1.TermLink, __assign({ href: "#" }, { children: "[\u5185\u5BB9\u3092\u898B\u308B]" }), void 0)] }, void 0), (0, jsx_runtime_1.jsxs)(SignUpStyles_1.TermItem, { children: [(0, jsx_runtime_1.jsxs)("label", { children: [(0, jsx_runtime_1.jsx)("input", { type: "checkbox", required: true }, void 0), (0, jsx_runtime_1.jsx)("span", { children: "(\u5FC5\u9808) \u500B\u4EBA\u60C5\u5831\u53CE\u96C6\u30FB\u5229\u7528\u6848\u5185" }, void 0)] }, void 0), (0, jsx_runtime_1.jsx)(SignUpStyles_1.TermLink, __assign({ href: "#" }, { children: "[\u5185\u5BB9\u3092\u898B\u308B]" }), void 0)] }, void 0)] }, void 0)); };
// 🌟 ActionGroup 컴포넌트 수정
var ActionGroup = function (_a) {
    var onRegister = _a.onRegister, onCancel = _a.onCancel, registerText = _a.registerText, // 추가
    registerDisabled = _a.registerDisabled;
    return ((0, jsx_runtime_1.jsxs)(SignUpStyles_1.ActionRow, { children: [(0, jsx_runtime_1.jsxs)(SignUpStyles_1.SubmitButton, __assign({ type: "button", onClick: onRegister, disabled: registerDisabled }, { children: [registerText, " "] }), void 0), (0, jsx_runtime_1.jsx)(SignUpStyles_1.CancelButton, __assign({ type: "button", onClick: onCancel }, { children: "\u30AD\u30E3\u30F3\u30BB\u30EB" }), void 0)] }, void 0));
};
// --- Compound Component 연결 (생략 없음) ---
exports.SignUp = Object.assign(SignUpComponentBase, {
    Form: RegistrationForm,
    InputGrid: SignUpStyles_1.InputGrid,
    FieldGroup: FieldGroup,
    InputWrapper: SignUpStyles_1.InputWrapper,
    Input: SignUpStyles_1.InputBlock,
    Postcode: SignUpStyles_1.PostcodeButton,
    Terms: TermsSection,
    Actions: ActionGroup
});
