"use strict";
exports.__esModule = true;
exports.SORT_OPTIONS = exports.COLOR_OPTIONS = exports.MORPH_OPTIONS = exports.ETC_OPTIONS = exports.MOOD_OPTIONS = exports.SPACE_OPTIONS = exports.MAIN_FILTER_ICONS = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
// src/data/FilterData.ts
var hi2_1 = require("react-icons/hi2");
var gi_1 = require("react-icons/gi");
var fa_1 = require("react-icons/fa");
var fa_2 = require("react-icons/fa");
var io_1 = require("react-icons/io");
var md_1 = require("react-icons/md");
exports.MAIN_FILTER_ICONS = [
    { id: "space", icon: (0, jsx_runtime_1.jsx)(hi2_1.HiHomeModern, {}, void 0), label: "공간" },
    { id: "mood", icon: (0, jsx_runtime_1.jsx)(gi_1.GiBedLamp, {}, void 0), label: "분위기" },
    { id: "won", icon: "₩", label: "가격" },
    { id: "size", icon: (0, jsx_runtime_1.jsx)(fa_1.FaRulerCombined, {}, void 0), label: "크기" },
    { id: "shape", icon: (0, jsx_runtime_1.jsx)(fa_2.FaShapes, {}, void 0), label: "형태" },
    { id: "color", icon: (0, jsx_runtime_1.jsx)(io_1.IoIosColorPalette, {}, void 0), label: "색상" },
    { id: "ship", icon: (0, jsx_runtime_1.jsx)(md_1.MdLocalShipping, {}, void 0), label: "기타" },
    { id: "reset", icon: "↺", label: "초기화" },
];
exports.SPACE_OPTIONS = [
    { label: "거실", value: 1 },
    { label: "다이닝룸", value: 2 },
    { label: "서재", value: 3 },
    { label: "침실", value: 4 },
    { label: "놀이방", value: 5 },
    { label: "복도", value: 6 },
    { label: "로비", value: 7 },
    { label: "회의실", value: 8 },
    { label: "카페", value: 9 },
];
exports.MOOD_OPTIONS = [
    { label: "모던", value: 1 },
    { label: "빈티지", value: 2 },
    { label: "미니멀", value: 3 },
    { label: "모던클래식", value: 4 },
    { label: "인더스트리얼", value: 5 },
];
// 기타 옵션은 문자열 리스트이므로 그대로 두거나 mapping합니다.
exports.ETC_OPTIONS = [
    { label: "무료배송", value: "FREE" },
    { label: "착불배송", value: "COLLECT" },
    { label: "퀵배송", value: "QUICK" },
];
exports.MORPH_OPTIONS = [
    { label: "세로 사각형", value: "VERTICAL_RECTANGLE" },
    { label: "가로 사각형", value: "HORIZONTAL_RECTANGLE" },
    { label: "원형", value: "CIRCLE" },
    { label: "정사각형", value: "SQUARE" },
    { label: "다각형", value: "POLYGON" },
    { label: "테이블", value: "TABLE" },
    { label: "다발", value: "BUNDLE" },
    { label: "기타", value: "ETC" },
];
exports.COLOR_OPTIONS = [
    { hex: "#FF0000", name: "Red", value: 1 },
    { hex: "#FF8000", name: "Orange", value: 2 },
    { hex: "#FFFF00", name: "Yellow", value: 3 },
    { hex: "#008000", name: "Green", value: 4 },
    { hex: "#0000FF", name: "Blue", value: 5 },
    { hex: "#000000", name: "Black", value: 6 },
    { hex: "#FFFFFF", name: "White", value: 7 },
    { hex: "#FFC0CB", name: "Pink", value: 8 },
    { hex: "#800080", name: "Purple", value: 9 },
    { hex: "#A9A9A9", name: "Grey", value: 10 },
    { hex: "#8B4513", name: "Brown", value: 11 },
    { hex: "#F5F5DC", name: "Beige", value: 12 },
    { hex: "#000080", name: "Navy", value: 13 },
    { hex: "#40E0D0", name: "Turquoise", value: 14 },
    { hex: "#FFD700", name: "Gold", value: 15 },
];
// src/data/FilterData.ts 또는 MarketFilter.tsx 상단
exports.SORT_OPTIONS = [
    { label: "최신순", value: "LATEST" },
    { label: "가격 낮은순", value: "PRICE_ASC" },
    { label: "가격 높은순", value: "PRICE_DESC" }, // 백엔드: PRICE_DESC
];
