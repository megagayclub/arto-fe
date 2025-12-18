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
exports.Checkout = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var CheckoutStyles_1 = require("./CheckoutStyles");
// --- 하위 컴포넌트 정의 ---
// 1. 상품 요약 정보
var ProductSummary = function (_a) {
    var products = _a.products;
    return ((0, jsx_runtime_1.jsxs)(CheckoutStyles_1.ProductSummaryBlock, { children: [(0, jsx_runtime_1.jsx)(CheckoutStyles_1.SectionTitle, { children: "\uC8FC\uBB38 / \uACB0\uC81C" }, void 0), products.map(function (p) { return ((0, jsx_runtime_1.jsxs)(CheckoutStyles_1.ProductInfo, { children: [(0, jsx_runtime_1.jsx)("div", {}, void 0), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("p", { children: ["[\uBBF8\uB4F1\uB85D] ", p.title] }, void 0), (0, jsx_runtime_1.jsxs)("p", { children: [p.year, ". ", p.size] }, void 0), (0, jsx_runtime_1.jsxs)("span", { children: [p.price.toLocaleString(), "\uC6D0"] }, void 0)] }, void 0)] }, p.id)); })] }, void 0));
};
// 2. 입력 필드 그룹
var InputGroup = function (_a) {
    var label = _a.label, children = _a.children;
    return ((0, jsx_runtime_1.jsxs)(CheckoutStyles_1.FormRow, { children: [(0, jsx_runtime_1.jsx)("label", { children: label }, void 0), (0, jsx_runtime_1.jsx)("div", { children: children }, void 0)] }, void 0));
};
// 3. 결제 방법 선택
var PaymentSelection = function () { return ((0, jsx_runtime_1.jsxs)(CheckoutStyles_1.InfoBlock, { children: [(0, jsx_runtime_1.jsx)(CheckoutStyles_1.SectionTitle, { children: "\uACB0\uC81C \uC9C4\uD589" }, void 0), (0, jsx_runtime_1.jsxs)(CheckoutStyles_1.PaymentMethod, { children: [(0, jsx_runtime_1.jsxs)(CheckoutStyles_1.RadioLabel, { children: [(0, jsx_runtime_1.jsx)("input", { type: "radio", name: "payment", defaultChecked: true }, void 0), "\uC2E0\uC6A9\uCE74\uB4DC \uACB0\uC81C"] }, void 0), (0, jsx_runtime_1.jsxs)(CheckoutStyles_1.RadioLabel, { children: [(0, jsx_runtime_1.jsx)("input", { type: "radio", name: "payment" }, void 0), "\uACC4\uC88C \uC774\uCCB4 (\uC2E4\uC2DC\uAC04)"] }, void 0), (0, jsx_runtime_1.jsxs)(CheckoutStyles_1.RadioLabel, { children: [(0, jsx_runtime_1.jsx)("input", { type: "radio", name: "payment", disabled: true }, void 0), "\uBB34\uD1B5\uC7A5 \uC785\uAE08 (\uBBF8\uC9C0\uC6D0)"] }, void 0)] }, void 0)] }, void 0)); };
// 4. 우측 최종 결제 요약
var FinalSummary = function (_a) {
    var summary = _a.summary;
    return ((0, jsx_runtime_1.jsxs)(CheckoutStyles_1.SummaryColumn, { children: [(0, jsx_runtime_1.jsx)(CheckoutStyles_1.SectionTitle, { children: "\uCD1D \uACB0\uC81C \uAE08\uC561" }, void 0), (0, jsx_runtime_1.jsxs)(CheckoutStyles_1.SummaryRow, { children: [(0, jsx_runtime_1.jsx)("span", { children: "\uC0C1\uD488 \uAE08\uC561 \uD569\uACC4" }, void 0), (0, jsx_runtime_1.jsxs)("span", { children: [summary.subtotal.toLocaleString(), "\uC6D0"] }, void 0)] }, void 0), (0, jsx_runtime_1.jsxs)(CheckoutStyles_1.SummaryRow, { children: [(0, jsx_runtime_1.jsx)("span", { children: "\uBC30\uC1A1\uBE44" }, void 0), (0, jsx_runtime_1.jsxs)("span", { children: [summary.shippingFee.toLocaleString(), "\uC6D0"] }, void 0)] }, void 0), (0, jsx_runtime_1.jsxs)(CheckoutStyles_1.SummaryRow, { children: [(0, jsx_runtime_1.jsx)("span", { children: "\uD560\uC778 \uAE08\uC561" }, void 0), (0, jsx_runtime_1.jsxs)("span", { children: [summary.discount.toLocaleString(), "\uC6D0"] }, void 0)] }, void 0), (0, jsx_runtime_1.jsxs)(CheckoutStyles_1.FinalPrice, { children: [summary.totalAmount.toLocaleString(), "\uC6D0"] }, void 0), (0, jsx_runtime_1.jsx)("p", __assign({ style: { fontSize: "12px", color: "#666", marginTop: "15px" } }, { children: "* \uC0C1\uD488\uC758 \uC0C1\uC138 \uC815\uBCF4\uC640 \uACB0\uC81C \uAE08\uC561\uC744 \uD655\uC778\uD558\uC600\uC73C\uBA70, \uAD6C\uB9E4\uC5D0 \uB3D9\uC758\uD569\uB2C8\uB2E4." }), void 0), (0, jsx_runtime_1.jsx)(CheckoutStyles_1.FinalButton, { children: "\uACB0\uC81C \uC9C4\uD589" }, void 0)] }, void 0));
};
// Base Component: 메인 Grid 레이아웃을 정의
var CheckoutLayoutBase = function (_a) {
    var children = _a.children;
    return ((0, jsx_runtime_1.jsx)(CheckoutStyles_1.LayoutContainer, { children: (0, jsx_runtime_1.jsx)(CheckoutStyles_1.MainGrid, { children: children }, void 0) }, void 0));
};
// 하위 컴포넌트들을 Base에 연결
exports.Checkout = Object.assign(CheckoutLayoutBase, {
    // 상품 및 입력 섹션 (Left Column)
    InputColumn: CheckoutStyles_1.InputColumn,
    Product: ProductSummary,
    InputGroup: InputGroup,
    InputField: CheckoutStyles_1.InputField,
    Select: CheckoutStyles_1.SelectBox,
    // 결제 방식
    Payment: PaymentSelection,
    // 결제 요약 섹션 (Right Column)
    SummaryColumn: CheckoutStyles_1.SummaryColumn,
    FinalSummary: FinalSummary
});
