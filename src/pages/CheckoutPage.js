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
var Checkout_1 = require("../components/Checkout/Checkout");
var Header_1 = __importDefault(require("../components/layout/Header/Header"));
var CheckoutData_1 = require("../components/data/CheckoutData");
var CheckoutStyles_1 = require("../components/Checkout/CheckoutStyles");
var CheckoutPage = function () {
    // 실제로는 여기서 useFetchUserOrders, useFetchCartItems 등의 훅을 사용해 데이터를 불러옵니다.
    var products = CheckoutData_1.DUMMY_PRODUCTS;
    var summary = CheckoutData_1.DUMMY_SUMMARY;
    // 실제 결제 API 호출 함수
    var handleCheckout = function (e) {
        e.preventDefault();
        console.log("결제 진행 버튼 클릭됨. 데이터 유효성 검사 및 API 호출 시작.");
        // window.alert('결제 API 호출 로직 실행');
    };
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(Header_1["default"], {}, void 0), (0, jsx_runtime_1.jsxs)(Checkout_1.Checkout, { children: [(0, jsx_runtime_1.jsxs)(Checkout_1.Checkout.InputColumn, { children: [(0, jsx_runtime_1.jsx)(Checkout_1.Checkout.Product, { products: products }, void 0), (0, jsx_runtime_1.jsxs)(CheckoutStyles_1.SectionWrapper, { children: [(0, jsx_runtime_1.jsx)(CheckoutStyles_1.SectionTitle, { children: "\uC8FC\uBB38\uC790 \uC815\uBCF4" }, void 0), (0, jsx_runtime_1.jsxs)("form", { children: [(0, jsx_runtime_1.jsx)(Checkout_1.Checkout.InputGroup, __assign({ label: "\uC774\uB984" }, { children: (0, jsx_runtime_1.jsx)(Checkout_1.Checkout.InputField, { placeholder: "\uD64D\uAE38\uB3D9", required: true }, void 0) }), void 0), (0, jsx_runtime_1.jsxs)(Checkout_1.Checkout.InputGroup, __assign({ label: "\uC5F0\uB77D\uCC98" }, { children: [(0, jsx_runtime_1.jsxs)(Checkout_1.Checkout.Select, { children: [(0, jsx_runtime_1.jsx)("option", { children: "010" }, void 0), (0, jsx_runtime_1.jsx)("option", { children: "011" }, void 0)] }, void 0), (0, jsx_runtime_1.jsx)(Checkout_1.Checkout.InputField, { placeholder: "0000-0000", style: { flexGrow: 1 }, required: true }, void 0), (0, jsx_runtime_1.jsx)("button", __assign({ type: "button", style: { padding: "10px 15px" } }, { children: "\uC778\uC99D" }), void 0)] }), void 0), (0, jsx_runtime_1.jsx)(Checkout_1.Checkout.InputGroup, __assign({ label: "\uC774\uBA54\uC77C" }, { children: (0, jsx_runtime_1.jsx)(Checkout_1.Checkout.InputField, { placeholder: "your-email@example.com", type: "email", required: true }, void 0) }), void 0)] }, void 0), (0, jsx_runtime_1.jsx)("div", __assign({ style: {
                                            fontSize: "12px",
                                            marginTop: "20px",
                                            borderTop: "1px dashed #eee",
                                            paddingTop: "10px"
                                        } }, { children: (0, jsx_runtime_1.jsxs)("label", { children: [(0, jsx_runtime_1.jsx)("input", { type: "checkbox" }, void 0), " \uAC1C\uC778\uC815\uBCF4 \uC218\uC9D1 \uBC0F \uC774\uC6A9\uC5D0 \uB3D9\uC758\uD569\uB2C8\uB2E4."] }, void 0) }), void 0)] }, void 0), (0, jsx_runtime_1.jsxs)(CheckoutStyles_1.SectionWrapper, { children: [(0, jsx_runtime_1.jsx)(CheckoutStyles_1.SectionTitle, { children: "\uBC30\uC1A1\uC9C0 \uC815\uBCF4" }, void 0), (0, jsx_runtime_1.jsxs)("form", { children: [(0, jsx_runtime_1.jsx)(Checkout_1.Checkout.InputGroup, __assign({ label: "\uC218\uB839\uC778" }, { children: (0, jsx_runtime_1.jsx)(Checkout_1.Checkout.InputField, { placeholder: "\uC218\uB839\uC778 \uC774\uB984", required: true }, void 0) }), void 0), (0, jsx_runtime_1.jsxs)(Checkout_1.Checkout.InputGroup, __assign({ label: "\uC8FC\uC18C" }, { children: [(0, jsx_runtime_1.jsx)(Checkout_1.Checkout.InputField, { placeholder: "\uC6B0\uD3B8\uBC88\uD638", style: { maxWidth: "100px" } }, void 0), (0, jsx_runtime_1.jsx)("button", __assign({ type: "button", style: { padding: "10px 15px" } }, { children: "\uC8FC\uC18C \uAC80\uC0C9" }), void 0)] }), void 0), (0, jsx_runtime_1.jsxs)(Checkout_1.Checkout.InputGroup, __assign({ label: "\uC0C1\uC138\uC8FC\uC18C" }, { children: [(0, jsx_runtime_1.jsx)(Checkout_1.Checkout.InputField, { placeholder: "\uAE30\uBCF8 \uC8FC\uC18C", style: { marginBottom: "5px" }, required: true }, void 0), (0, jsx_runtime_1.jsx)(Checkout_1.Checkout.InputField, { placeholder: "\uC0C1\uC138 \uC8FC\uC18C", required: true }, void 0)] }), void 0)] }, void 0)] }, void 0), (0, jsx_runtime_1.jsx)(CheckoutStyles_1.SectionWrapper, { children: (0, jsx_runtime_1.jsx)(Checkout_1.Checkout.Payment, {}, void 0) }, void 0)] }, void 0), (0, jsx_runtime_1.jsx)(Checkout_1.Checkout.SummaryColumn, { children: (0, jsx_runtime_1.jsx)("form", __assign({ onSubmit: handleCheckout }, { children: (0, jsx_runtime_1.jsx)(Checkout_1.Checkout.FinalSummary, { summary: summary }, void 0) }), void 0) }, void 0)] }, void 0)] }, void 0));
};
exports["default"] = CheckoutPage;
