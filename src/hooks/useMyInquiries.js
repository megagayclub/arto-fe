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
exports.useMyInquiries = void 0;
// src/hooks/useMyInquiries.ts
var react_1 = require("react");
var axiosInstance_1 = __importDefault(require("../utils/axiosInstance"));
var useMyInquiries = function () {
    var _a = (0, react_1.useState)(null), inquiries = _a[0], setInquiries = _a[1];
    var _b = (0, react_1.useState)(true), isLoading = _b[0], setIsLoading = _b[1];
    var _c = (0, react_1.useState)(null), error = _c[0], setError = _c[1];
    function fetchMyInquiries(signal) {
        var _a, _b, _c, _d, _e;
        return __awaiter(this, void 0, void 0, function () {
            var res, err_1, msg;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        setIsLoading(true);
                        setError(null);
                        _f.label = 1;
                    case 1:
                        _f.trys.push([1, 3, 4, 5]);
                        return [4 /*yield*/, axiosInstance_1["default"].get("/v1/inquiries", { signal: signal })];
                    case 2:
                        res = _f.sent();
                        setInquiries((_a = res.data) !== null && _a !== void 0 ? _a : []);
                        return [3 /*break*/, 5];
                    case 3:
                        err_1 = _f.sent();
                        // ✅ 취소는 에러로 치지 않음
                        if ((err_1 === null || err_1 === void 0 ? void 0 : err_1.code) === "ERR_CANCELED" || (err_1 === null || err_1 === void 0 ? void 0 : err_1.name) === "CanceledError")
                            return [2 /*return*/];
                        msg = (_e = (_d = (_c = (_b = err_1 === null || err_1 === void 0 ? void 0 : err_1.response) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.message) !== null && _d !== void 0 ? _d : err_1 === null || err_1 === void 0 ? void 0 : err_1.message) !== null && _e !== void 0 ? _e : "문의 내역을 불러오는 중 오류가 발생했습니다.";
                        setError(String(msg));
                        setInquiries(null);
                        return [3 /*break*/, 5];
                    case 4:
                        setIsLoading(false);
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        });
    }
    (0, react_1.useEffect)(function () {
        var controller = new AbortController();
        fetchMyInquiries(controller.signal);
        return function () { return controller.abort(); };
    }, []);
    return {
        inquiries: inquiries,
        isLoading: isLoading,
        error: error,
        refetch: function () { return fetchMyInquiries(); }
    };
};
exports.useMyInquiries = useMyInquiries;
