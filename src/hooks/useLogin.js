"use strict";
// src/hooks/useLogin.ts
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
exports.useLogin = void 0;
var react_1 = require("react");
var axios_1 = __importDefault(require("axios"));
// ⚠️ AuthContext가 외부 파일에 있다고 가정하고 import합니다.
//    (예: src/context/AuthContext.tsx)
var AuthContext_1 = require("../context/AuthContext");
// 백엔드 API의 기본 URL (실제 환경에 맞게 변경 필요)
var BASE_URL = 'http://localhost:8080/api/v1';
var LOGIN_URL = BASE_URL + "/login";
// --- 커스텀 훅 정의 ---
var useLogin = function () {
    var login = (0, AuthContext_1.useAuth)().login; // AuthContext에서 login 함수 가져오기
    var _a = (0, react_1.useState)(false), isLoading = _a[0], setIsLoading = _a[1];
    var _b = (0, react_1.useState)(null), error = _b[0], setError = _b[1];
    /**
     * 로그인 API 호출 및 인증 처리 로직
     * @param data - LoginRequest (email, password)
     * @returns 성공 여부 (boolean)
     */
    var executeLogin = function (data) { return __awaiter(void 0, void 0, void 0, function () {
        var response, _a, accessToken, tokenType, err_1, errorMessage;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    setIsLoading(true);
                    setError(null);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, axios_1["default"].post(LOGIN_URL, data)];
                case 2:
                    response = _b.sent();
                    _a = response.data, accessToken = _a.accessToken, tokenType = _a.tokenType;
                    login(data.email, accessToken);
                    // 🔥 (2) localStorage에 저장 (이 줄이 핵심)
                    localStorage.setItem("accessToken", accessToken);
                    localStorage.setItem("tokenType", tokenType); // 보통 "Bearer"
                    return [2 /*return*/, true]; // 로그인 성공
                case 3:
                    err_1 = _b.sent();
                    // API 통신 에러 처리
                    if (axios_1["default"].isAxiosError(err_1) && err_1.response) {
                        errorMessage = err_1.response.data.message || 'ログイン情報が正しくありません。';
                        setError(errorMessage);
                    }
                    else {
                        setError('ネットワークエラーが発生しました。');
                    }
                    return [2 /*return*/, false]; // 로그인 실패
                case 4:
                    setIsLoading(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    return { executeLogin: executeLogin, isLoading: isLoading, error: error };
};
exports.useLogin = useLogin;
