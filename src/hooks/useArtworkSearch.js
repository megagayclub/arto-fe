"use strict";
// src/hooks/useArtworkSearch.ts
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
exports.useArtworkSearch = exports.initialFilters = void 0;
var react_1 = require("react");
var axiosInstance_1 = __importDefault(require("../utils/axiosInstance"));
// 🌟 [추가] FilterStateType에 맞는 초기값 정의 (FilterSidebar와 동기화)
exports.initialFilters = {
    space: "거실",
    mood: "모던",
    minPrice: 0,
    maxPrice: 1000000,
    selectedColor: "#FF0000",
    etc: [],
    minSize: 0,
    maxSize: 500,
    selectedShape: 'square'
};
// 필터 상태를 백엔드가 요구하는 쿼리 파라미터(ArtworkSearchCondition) 형식으로 변환하는 함수
var filterToQueryParams = function (filters) {
    // 백엔드의 ArtworkSearchCondition에 매핑될 쿼리 파라미터 생성
    var params = new URLSearchParams();
    // 1. 공간/분위기
    params.append('space', filters.space);
    params.append('mood', filters.mood);
    // 2. 가격
    params.append('minPrice', filters.minPrice.toString());
    params.append('maxPrice', filters.maxPrice.toString());
    // 🌟 3. 크기 추가
    params.append('minSize', filters.minSize.toString());
    params.append('maxSize', filters.maxSize.toString());
    // 🌟 4. 형태 추가
    params.append('shape', filters.selectedShape);
    // 5. 색상
    params.append('color', filters.selectedColor);
    // 6. 기타 옵션 (multi-select)
    filters.etc.forEach(function (item) {
        params.append('etc', item);
    });
    return params;
};
var useArtworkSearch = function () {
    var _a = (0, react_1.useState)([]), results = _a[0], setResults = _a[1];
    var _b = (0, react_1.useState)(false), isLoading = _b[0], setIsLoading = _b[1];
    var _c = (0, react_1.useState)(null), error = _c[0], setError = _c[1];
    // 검색을 실행하는 콜백 함수
    var executeSearch = (0, react_1.useCallback)(function (filters) { return __awaiter(void 0, void 0, void 0, function () {
        var queryParams, response, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setIsLoading(true);
                    setError(null);
                    queryParams = filterToQueryParams(filters);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, axiosInstance_1["default"].get('/artwork', // 백엔드 API 주소: /api/v1/artwork
                        {
                            params: queryParams // 쿼리 파라미터를 요청에 첨부
                        })];
                case 2:
                    response = _a.sent();
                    setResults(response.data);
                    return [3 /*break*/, 5];
                case 3:
                    err_1 = _a.sent();
                    console.error("검색 API 호출 오류:", err_1);
                    setError("작품 검색 중 오류가 발생했습니다.");
                    setResults([]);
                    return [3 /*break*/, 5];
                case 4:
                    setIsLoading(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); }, []);
    // 🌟 initialFilters도 export 하여 FilterSidebar에서 사용할 수 있도록 함
    return { results: results, isLoading: isLoading, error: error, executeSearch: executeSearch, initialFilters: exports.initialFilters };
};
exports.useArtworkSearch = useArtworkSearch;
