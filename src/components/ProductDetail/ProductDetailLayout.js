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
exports.ProductDetailLayout = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_router_dom_1 = require("react-router-dom");
var useArtworkDetail_1 = require("../../hooks/useArtworkDetail");
var ProductDetailStyles_1 = require("./ProductDetailStyles");
var ICON_HEART = "🤍";
var ProductInfoTable = function (_a) {
    var data = _a.data;
    var infoRows = [
        { label: "작품명 | Title", value: data.title },
        { label: "작가명 | Artist", value: data.artist },
        { label: "사이즈 | Size", value: data.size },
        { label: "배송비 | Shipping Cost", value: data.shippingCost.toLocaleString() + "\u20A9" },
        { label: "배송방법 | Shipping", value: data.shippingMethod },
    ];
    return ((0, jsx_runtime_1.jsx)(ProductDetailStyles_1.InfoTable, { children: infoRows.map(function (row, index) { return ((0, jsx_runtime_1.jsxs)(ProductDetailStyles_1.InfoRow, { children: [(0, jsx_runtime_1.jsx)("span", { children: row.label }, void 0), (0, jsx_runtime_1.jsx)("span", { children: row.value }, void 0)] }, index)); }) }, void 0));
};
var ProductDetailLayout = function () {
    // ✅ URL에서 /product/:id 가져오기
    var id = (0, react_router_dom_1.useParams)().id;
    // ✅ 숫자로 변환
    var artworkId = Number(id);
    // ✅ 이상한 값(예: "{2}" 같은 거) 방어
    if (!id || Number.isNaN(artworkId)) {
        return ((0, jsx_runtime_1.jsx)(ProductDetailStyles_1.PageLayout, { children: (0, jsx_runtime_1.jsx)(ProductDetailStyles_1.MainContent, { children: (0, jsx_runtime_1.jsxs)("p", __assign({ style: { color: "red", padding: "20px" } }, { children: ["\uC798\uBABB\uB41C \uC791\uD488 ID\uC785\uB2C8\uB2E4: ", id] }), void 0) }, void 0) }, void 0));
    }
    var _a = (0, useArtworkDetail_1.useArtworkDetail)(artworkId), product = _a.artworkDetail, isLoading = _a.isLoading, error = _a.error;
    if (isLoading) {
        return ((0, jsx_runtime_1.jsx)(ProductDetailStyles_1.PageLayout, { children: (0, jsx_runtime_1.jsx)(ProductDetailStyles_1.MainContent, { children: (0, jsx_runtime_1.jsx)("p", { children: "\uC791\uD488 \uC815\uBCF4\uB97C \uBD88\uB7EC\uC624\uB294 \uC911\uC785\uB2C8\uB2E4..." }, void 0) }, void 0) }, void 0));
    }
    if (error) {
        return ((0, jsx_runtime_1.jsx)(ProductDetailStyles_1.PageLayout, { children: (0, jsx_runtime_1.jsx)(ProductDetailStyles_1.MainContent, { children: (0, jsx_runtime_1.jsxs)("p", __assign({ style: { color: "red", padding: "20px" } }, { children: ["\uC624\uB958 \uBC1C\uC0DD: ", error] }), void 0) }, void 0) }, void 0));
    }
    if (!product) {
        return ((0, jsx_runtime_1.jsx)(ProductDetailStyles_1.PageLayout, { children: (0, jsx_runtime_1.jsx)(ProductDetailStyles_1.MainContent, { children: (0, jsx_runtime_1.jsx)("p", { children: "\uC791\uD488 \uC815\uBCF4\uB97C \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4." }, void 0) }, void 0) }, void 0));
    }
    return ((0, jsx_runtime_1.jsx)(ProductDetailStyles_1.PageLayout, { children: (0, jsx_runtime_1.jsxs)(ProductDetailStyles_1.MainContent, { children: [(0, jsx_runtime_1.jsxs)(ProductDetailStyles_1.ImageArea, { children: [(0, jsx_runtime_1.jsx)("img", { src: product.imagePlaceholder, alt: product.title }, void 0), (0, jsx_runtime_1.jsxs)("p", __assign({ style: { marginTop: "20px", fontSize: "12px", color: "#666" } }, { children: ["\u00A9", product.year, " ", product.artist, ". All rights reserved."] }), void 0)] }, void 0), (0, jsx_runtime_1.jsxs)(ProductDetailStyles_1.InfoArea, { children: [(0, jsx_runtime_1.jsx)(ProductDetailStyles_1.Title, { children: "\uC791\uD488\uBA85 | Title" }, void 0), (0, jsx_runtime_1.jsx)(ProductDetailStyles_1.ArtistName, { children: product.title }, void 0), (0, jsx_runtime_1.jsx)(ProductDetailStyles_1.Title, { children: "\uC791\uAC00\uBA85 | Artist" }, void 0), (0, jsx_runtime_1.jsx)(ProductDetailStyles_1.ArtistName, { children: product.artist }, void 0), (0, jsx_runtime_1.jsx)(ProductInfoTable, { data: product }, void 0), (0, jsx_runtime_1.jsx)(ProductDetailStyles_1.Title, { children: "\uD310\uB9E4\uAC00\uACA9 | Price" }, void 0), (0, jsx_runtime_1.jsxs)(ProductDetailStyles_1.PriceText, { children: [product.price.toLocaleString(), "\u20A9"] }, void 0), (0, jsx_runtime_1.jsxs)(ProductDetailStyles_1.ButtonGroup, { children: [(0, jsx_runtime_1.jsxs)(ProductDetailStyles_1.ActionButton, { children: [ICON_HEART, "\u00A0", (0, jsx_runtime_1.jsx)("span", __assign({ style: { fontSize: "14px" } }, { children: "\uBB38\uC758\uD558\uAE30" }), void 0)] }, void 0), (0, jsx_runtime_1.jsx)(ProductDetailStyles_1.BuyButton, { children: "\uCE74\uD2B8\uC5D0 \uB123\uAE30" }, void 0)] }, void 0)] }, void 0)] }, void 0) }, void 0));
};
exports.ProductDetailLayout = ProductDetailLayout;
