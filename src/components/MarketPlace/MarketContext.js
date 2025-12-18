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
exports.useMarket = exports.MarketProvider = exports.initialFilters = exports.MAX_SIZE = exports.MAX_PRICE = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var axios_1 = __importDefault(require("axios"));
var MarketContext = (0, react_1.createContext)(undefined);
exports.MAX_PRICE = 20000000;
exports.MAX_SIZE = 500;
exports.initialFilters = {
    space: null,
    mood: null,
    won: [0, exports.MAX_PRICE],
    size: [0, exports.MAX_SIZE],
    morph: null,
    color: null,
    ship: [],
    sort: null
};
var BASE_URL = "http://localhost:8080/api/v1/artworks";
var MarketProvider = function (_a) {
    var children = _a.children;
    var _b = (0, react_1.useState)([]), products = _b[0], setProducts = _b[1];
    var _c = (0, react_1.useState)(false), isLoading = _c[0], setIsLoading = _c[1];
    var _d = (0, react_1.useState)(null), error = _d[0], setError = _d[1];
    var _e = (0, react_1.useState)(1), currentPage = _e[0], setCurrentPage = _e[1];
    var _f = (0, react_1.useState)(1), totalPages = _f[0], setTotalPages = _f[1];
    var _g = (0, react_1.useState)(exports.initialFilters), filters = _g[0], setFilters = _g[1];
    var fetchProducts = function (currentFilters) {
        if (currentFilters === void 0) { currentFilters = filters; }
        return __awaiter(void 0, void 0, void 0, function () {
            var params_1, response, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        setIsLoading(true);
                        setError(null);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, 4, 5]);
                        params_1 = new URLSearchParams();
                        // 1. 페이지네이션 (Spring은 0-index이므로 -1)
                        params_1.append("page", (currentPage - 1).toString());
                        params_1.append("size", "12");
                        // 2. 필터 매핑 (백엔드 ArtworkSearchCondition DTO 기준)
                        // 공간, 분위기, 색상이 단일 선택이라면 아래와 같이 추가 (다중 선택이면 반복문 사용)
                        if (currentFilters.space)
                            params_1.append("spaces", currentFilters.space.toString());
                        if (currentFilters.mood)
                            params_1.append("moods", currentFilters.mood.toString());
                        if (currentFilters.color)
                            params_1.append("colors", currentFilters.color.toString());
                        // 형태 (morph)
                        if (currentFilters.morph) {
                            params_1.append("morph", currentFilters.morph);
                        }
                        // 가격 범위 (BigDecimal 대응)
                        params_1.append("minPrice", currentFilters.won[0].toString());
                        params_1.append("maxPrice", currentFilters.won[1].toString());
                        // 크기 범위
                        params_1.append("minSize", currentFilters.size[0].toString());
                        params_1.append("maxSize", currentFilters.size[1].toString());
                        // 배송 방법 (List<String> shippingMethods)
                        if (currentFilters.ship && currentFilters.ship.length > 0) {
                            currentFilters.ship.forEach(function (s) { return params_1.append("shippingMethods", s); });
                        }
                        if (currentFilters.sort) {
                            params_1.append("sort", currentFilters.sort);
                        }
                        // 디버깅용: 실제 호출되는 URL 확인
                        console.log("Request URL:", BASE_URL + "?" + params_1.toString());
                        return [4 /*yield*/, axios_1["default"].get(BASE_URL, { params: params_1 })];
                    case 2:
                        response = _a.sent();
                        if (Array.isArray(response.data)) {
                            setProducts(response.data);
                            setTotalPages(1);
                        }
                        else if (response.data.content) {
                            setProducts(response.data.content);
                            setTotalPages(response.data.totalPages || 1);
                        }
                        return [3 /*break*/, 5];
                    case 3:
                        err_1 = _a.sent();
                        setError("데이터를 불러오는데 실패했습니다.");
                        console.error(err_1);
                        return [3 /*break*/, 5];
                    case 4:
                        setIsLoading(false);
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    // 의존성 배열에서 filters 제거 (페이지 변경시에만 자동 호출)
    (0, react_1.useEffect)(function () {
        fetchProducts();
    }, [currentPage]);
    // FilterSidebar의 적용 버튼에서 호출할 함수
    var applyFilters = function (overrideFilters) {
        setCurrentPage(1);
        fetchProducts(overrideFilters || filters); // 인자가 있으면 그것을 사용
    };
    var resetFilters = function () { return setFilters(exports.initialFilters); };
    return ((0, jsx_runtime_1.jsx)(MarketContext.Provider, __assign({ value: {
            products: products,
            isLoading: isLoading,
            error: error,
            currentPage: currentPage,
            totalPages: totalPages,
            setCurrentPage: setCurrentPage,
            filters: filters,
            setFilters: setFilters,
            applyFilters: applyFilters,
            resetFilters: resetFilters
        } }, { children: children }), void 0));
};
exports.MarketProvider = MarketProvider;
var useMarket = function () {
    var context = (0, react_1.useContext)(MarketContext);
    if (!context)
        throw new Error("useMarket must be used within a MarketProvider");
    return context;
};
exports.useMarket = useMarket;
