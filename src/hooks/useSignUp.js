"use strict";
// hooks/useSignUp.ts
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
exports.useSignUp = void 0;
var react_1 = require("react");
var axios_1 = __importDefault(require("axios"));
// API 통신을 위한 기본 URL 설정 (실제 서버 주소로 변경 필요)
var API_BASE_URL = 'http://localhost:8080/api/v1';
/**
 * 회원가입 API 통신을 처리하는 커스텀 훅
 */
var useSignUp = function () {
    var _a = (0, react_1.useState)(false), isLoading = _a[0], setIsLoading = _a[1];
    var _b = (0, react_1.useState)(null), error = _b[0], setError = _b[1];
    var _c = (0, react_1.useState)(false), isSuccess = _c[0], setIsSuccess = _c[1];
    var _d = (0, react_1.useState)(null), response = _d[0], setResponse = _d[1];
    /**
     * 회원가입 API 호출 함수
     * @param data SignUpRequest에 해당하는 요청 데이터
     */
    var signUp = function (data) { return __awaiter(void 0, void 0, void 0, function () {
        var res, err_1, axiosError, serverMessage, validationErrors, firstError;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    setIsLoading(true);
                    setError(null);
                    setIsSuccess(false);
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, axios_1["default"].post(API_BASE_URL + "/users/signup", data, {
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        })];
                case 2:
                    res = _c.sent();
                    // HTTP 상태 코드 201 (CREATED) 성공 처리
                    setResponse(res.data);
                    setIsSuccess(true);
                    console.log("회원가입 성공:", res.data);
                    return [3 /*break*/, 5];
                case 3:
                    err_1 = _c.sent();
                    axiosError = err_1;
                    // 서버에서 보낸 에러 메시지 처리 (예: 이메일 중복, 유효성 검사 실패)
                    if (axiosError.response) {
                        serverMessage = ((_a = axiosError.response.data) === null || _a === void 0 ? void 0 : _a.message) || ((_b = axiosError.response.data) === null || _b === void 0 ? void 0 : _b.error);
                        // 유효성 검사 실패 시 (HTTP 400 Bad Request)
                        if (axiosError.response.status === 400 && axiosError.response.data.errors) {
                            validationErrors = axiosError.response.data.errors;
                            firstError = validationErrors[0].defaultMessage || "入力内容を確認してください。";
                            setError(firstError);
                        }
                        else {
                            // 그 외의 일반적인 서버 에러 메시지
                            setError(serverMessage || "\u767B\u9332\u306B\u5931\u6557\u3057\u307E\u3057\u305F\u3002\u30B9\u30C6\u30FC\u30BF\u30B9\u30B3\u30FC\u30C9: " + axiosError.response.status);
                        }
                    }
                    else if (axiosError.request) {
                        // 요청은 보냈으나 응답을 받지 못한 경우 (네트워크 오류)
                        setError("サーバーに接続できませんでした。ネットワーク状態を確認してください。");
                    }
                    else {
                        // 요청 설정 중 발생한 오류
                        setError("リクエストの準備中にエラーが発生しました。");
                    }
                    setIsSuccess(false);
                    return [3 /*break*/, 5];
                case 4:
                    setIsLoading(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    return {
        signUp: signUp,
        isLoading: isLoading,
        error: error,
        isSuccess: isSuccess,
        response: response // 성공 시 응답 데이터
    };
};
exports.useSignUp = useSignUp;
