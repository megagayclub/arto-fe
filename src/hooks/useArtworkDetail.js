"use strict";
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
exports.useArtworkDetail = void 0;
// src/hooks/useArtworkDetail.ts
var react_1 = require("react");
var axiosInstance_1 = __importDefault(require("../utils/axiosInstance"));
var API_BASE_URL = "http://localhost:8080";
var useArtworkDetail = function (artworkId) {
    var _a = (0, react_1.useState)(null), artworkDetail = _a[0], setArtworkDetail = _a[1];
    var _b = (0, react_1.useState)(true), isLoading = _b[0], setIsLoading = _b[1];
    var _c = (0, react_1.useState)(null), error = _c[0], setError = _c[1];
    (0, react_1.useEffect)(function () {
        if (!artworkId)
            return;
        var controller = new AbortController();
        function fetchDetail() {
            var _a, _b, _c, _d, _e, _f, _g, _h;
            return __awaiter(this, void 0, void 0, function () {
                var res, data, mapped, err_1, msg;
                return __generator(this, function (_j) {
                    switch (_j.label) {
                        case 0:
                            setIsLoading(true);
                            setError(null);
                            _j.label = 1;
                        case 1:
                            _j.trys.push([1, 3, 4, 5]);
                            return [4 /*yield*/, axiosInstance_1["default"].get(API_BASE_URL + "/api/v1/artworks/" + artworkId, {
                                    signal: controller.signal
                                })];
                        case 2:
                            res = _j.sent();
                            data = res.data;
                            mapped = {
                                id: data.artworkId,
                                title: data.title,
                                description: data.description,
                                artist: data.artistName,
                                price: Number(data.price),
                                shippingCost: Number(data.shippingCost),
                                shippingMethod: data.shippingMethod,
                                // 프론트 요구 스펙 중 DTO에 없는 필드는 빈값 처리
                                size: (_a = data.dimensions) !== null && _a !== void 0 ? _a : "",
                                frame: "",
                                medium: "",
                                genre: "",
                                year: "",
                                imagePlaceholder: data.thumbnailImageUrl,
                                colors: (_b = data.colors) !== null && _b !== void 0 ? _b : [],
                                spaces: (_c = data.spaces) !== null && _c !== void 0 ? _c : [],
                                moods: (_d = data.moods) !== null && _d !== void 0 ? _d : []
                            };
                            setArtworkDetail(mapped);
                            return [3 /*break*/, 5];
                        case 3:
                            err_1 = _j.sent();
                            // ✅ abort로 취소된 요청은 정상 동작이므로 무시
                            if ((err_1 === null || err_1 === void 0 ? void 0 : err_1.code) === "ERR_CANCELED" || (err_1 === null || err_1 === void 0 ? void 0 : err_1.name) === "CanceledError") {
                                return [2 /*return*/];
                            }
                            console.error("작품 상세 API 오류:", err_1);
                            msg = (_h = (_g = (_f = (_e = err_1 === null || err_1 === void 0 ? void 0 : err_1.response) === null || _e === void 0 ? void 0 : _e.data) === null || _f === void 0 ? void 0 : _f.message) !== null && _g !== void 0 ? _g : err_1 === null || err_1 === void 0 ? void 0 : err_1.message) !== null && _h !== void 0 ? _h : "작품 정보를 불러오는 중 오류가 발생했습니다.";
                            setError(msg);
                            return [3 /*break*/, 5];
                        case 4:
                            setIsLoading(false);
                            return [7 /*endfinally*/];
                        case 5: return [2 /*return*/];
                    }
                });
            });
        }
        fetchDetail();
        return function () { return controller.abort(); };
    }, [artworkId]);
    return { artworkDetail: artworkDetail, isLoading: isLoading, error: error };
};
exports.useArtworkDetail = useArtworkDetail;
