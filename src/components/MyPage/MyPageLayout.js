"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
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
exports.MyPageLayout = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var styled_components_1 = __importDefault(require("styled-components"));
// 🔹 컴파운드 컴포넌트 MyPage 레고틀
var MyPage_1 = require("./MyPage");
// 🔹 찜 목록 API 훅
var useMyWishlist_1 = require("../../hooks/useMyWishlist");
// 🔹 장바구니 API 훅
var useMyCart_1 = require("../../hooks/useMyCart");
// 🔹 문의 내역 API 훅 ✅ 추가
var useMyInquiries_1 = require("../../hooks/useMyInquiries");
// 이 페이지의 전체 콘텐츠 영역에 패딩 등을 줄 수 있습니다.
var PageWrapper = styled_components_1["default"].div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  padding: 20px 0;\n  min-height: calc(100vh - 80px); /* \uD5E4\uB354 \uB192\uC774\uB97C \uC81C\uC678\uD55C \uCD5C\uC18C \uB192\uC774 */\n  background-color: #fff;\n"], ["\n  padding: 20px 0;\n  min-height: calc(100vh - 80px); /* \uD5E4\uB354 \uB192\uC774\uB97C \uC81C\uC678\uD55C \uCD5C\uC18C \uB192\uC774 */\n  background-color: #fff;\n"])));
// (더미) 구매 이력
var PurchaseHistoryContent = function () { return ((0, jsx_runtime_1.jsxs)("div", __assign({ style: { textAlign: "center", padding: "30px 0", color: "#999" } }, { children: [(0, jsx_runtime_1.jsx)("p", { children: "\uAD6C\uB9E4 \uC774\uB825\uC774 \uC5C6\uC2B5\uB2C8\uB2E4." }, void 0), (0, jsx_runtime_1.jsx)("p", __assign({ style: { fontSize: "12px", marginTop: "10px" } }, { children: "Artisry\uC758 \uBA4B\uC9C4 \uC791\uD488\uC744 \uCEEC\uB809\uC158 \uD574\uBCF4\uC138\uC694!" }), void 0)] }), void 0)); };
var MyPageLayout = function () {
    var _a;
    // ✅ 찜 목록 API 호출
    var _b = (0, useMyWishlist_1.useMyWishlist)(), wishlist = _b.wishlist, isLoading = _b.isLoading, error = _b.error;
    // ✅ 핵심: wishlist가 배열이 아닐 수도 있으니 무조건 배열로 안전 처리
    var wishlistItems = Array.isArray(wishlist) ? wishlist : [];
    // ✅ 장바구니 API 호출
    var _c = (0, useMyCart_1.useMyCart)(), cart = _c.cart, cartLoading = _c.isLoading, cartError = _c.error;
    var cartItems = (_a = cart === null || cart === void 0 ? void 0 : cart.items) !== null && _a !== void 0 ? _a : [];
    // ✅ 문의 내역 API 호출 (GET /api/v1/inquiries)
    var _d = (0, useMyInquiries_1.useMyInquiries)(), inquiries = _d.inquiries, inquiryLoading = _d.isLoading, inquiryError = _d.error;
    var inquiryItems = Array.isArray(inquiries) ? inquiries : [];
    return ((0, jsx_runtime_1.jsx)(PageWrapper, { children: (0, jsx_runtime_1.jsxs)(MyPage_1.MyPage, { children: [(0, jsx_runtime_1.jsx)(MyPage_1.MyPage.Sidebar, {}, void 0), (0, jsx_runtime_1.jsxs)(MyPage_1.MyPage.Content, { children: [(0, jsx_runtime_1.jsx)(MyPage_1.MyPage.Order, {}, void 0), (0, jsx_runtime_1.jsxs)(MyPage_1.MyPage.Section, __assign({ title: "\uCC1C \uBAA9\uB85D (" + wishlistItems.length + ")" }, { children: [isLoading && (0, jsx_runtime_1.jsx)("p", { children: "\uCC1C \uBAA9\uB85D \uBD88\uB7EC\uC624\uB294 \uC911..." }, void 0), error && ((0, jsx_runtime_1.jsxs)("p", __assign({ style: { color: "red" } }, { children: ["\uCC1C \uBAA9\uB85D\uC744 \uBD88\uB7EC\uC624\uB294 \uC911 \uC624\uB958\uAC00 \uBC1C\uC0DD\uD588\uC2B5\uB2C8\uB2E4: ", error] }), void 0)), !isLoading && !error && wishlistItems.length === 0 && ((0, jsx_runtime_1.jsx)("p", __assign({ style: { fontSize: "14px", color: "#999" } }, { children: "\uCC1C\uD55C \uC791\uD488\uC774 \uC5C6\uC2B5\uB2C8\uB2E4." }), void 0)), !isLoading &&
                                    !error &&
                                    wishlistItems.map(function (item) { return ((0, jsx_runtime_1.jsx)(MyPage_1.MyPage.Product, { id: item.artworkId, title: item.title, date: new Date(item.addedAt).toLocaleDateString(), price: item.price, image: item.thumbnailImageUrl }, item.wishlistId)); })] }), void 0), (0, jsx_runtime_1.jsxs)(MyPage_1.MyPage.Section, __assign({ title: "\uCE74\uD2B8 (" + cartItems.length + ")" }, { children: [cartLoading && (0, jsx_runtime_1.jsx)("p", { children: "\uC7A5\uBC14\uAD6C\uB2C8 \uBD88\uB7EC\uC624\uB294 \uC911..." }, void 0), cartError && ((0, jsx_runtime_1.jsxs)("p", __assign({ style: { color: "red" } }, { children: ["\uC7A5\uBC14\uAD6C\uB2C8\uB97C \uBD88\uB7EC\uC624\uB294 \uC911 \uC624\uB958\uAC00 \uBC1C\uC0DD\uD588\uC2B5\uB2C8\uB2E4: ", cartError] }), void 0)), !cartLoading && !cartError && cartItems.length === 0 && ((0, jsx_runtime_1.jsx)("p", __assign({ style: { fontSize: "14px", color: "#999" } }, { children: "\uC7A5\uBC14\uAD6C\uB2C8\uAC00 \uBE44\uC5B4 \uC788\uC2B5\uB2C8\uB2E4." }), void 0)), !cartLoading &&
                                    !cartError &&
                                    cartItems.map(function (item) { return ((0, jsx_runtime_1.jsx)(MyPage_1.MyPage.Product, { id: item.artworkId, title: item.title, date: "-", price: Number(item.price), image: item.thumbnailImageUrl }, item.cartItemId)); }), !cartLoading && !cartError && cart && ((0, jsx_runtime_1.jsxs)("p", __assign({ style: { marginTop: "12px", fontWeight: "bold" } }, { children: ["\uCD1D\uC561: ", Number(cart.totalAmount).toLocaleString(), "\u20A9"] }), void 0))] }), void 0), (0, jsx_runtime_1.jsx)(MyPage_1.MyPage.Section, __assign({ title: "\uAD6C\uB9E4 \uC774\uB825" }, { children: (0, jsx_runtime_1.jsx)(PurchaseHistoryContent, {}, void 0) }), void 0), (0, jsx_runtime_1.jsxs)(MyPage_1.MyPage.Section, __assign({ title: "\uBB38\uC758\uC0AC\uD56D (" + inquiryItems.length + ")" }, { children: [inquiryLoading && (0, jsx_runtime_1.jsx)("p", { children: "\uBB38\uC758 \uB0B4\uC5ED \uBD88\uB7EC\uC624\uB294 \uC911..." }, void 0), inquiryError && ((0, jsx_runtime_1.jsxs)("p", __assign({ style: { color: "red" } }, { children: ["\uBB38\uC758 \uB0B4\uC5ED\uC744 \uBD88\uB7EC\uC624\uB294 \uC911 \uC624\uB958\uAC00 \uBC1C\uC0DD\uD588\uC2B5\uB2C8\uB2E4: ", inquiryError] }), void 0)), !inquiryLoading && !inquiryError && inquiryItems.length === 0 && ((0, jsx_runtime_1.jsx)("p", __assign({ style: { fontSize: "14px", color: "#999" } }, { children: "\uBB38\uC758 \uC774\uB825\uC774 \uC5C6\uC2B5\uB2C8\uB2E4." }), void 0)), !inquiryLoading &&
                                    !inquiryError &&
                                    inquiryItems.map(function (q) { return ((0, jsx_runtime_1.jsx)(MyPage_1.MyPage.Product, { id: q.inquiryId, title: q.title, date: new Date(q.createdAt).toLocaleDateString() }, q.inquiryId)); })] }), void 0)] }, void 0)] }, void 0) }, void 0));
};
exports.MyPageLayout = MyPageLayout;
var templateObject_1;
