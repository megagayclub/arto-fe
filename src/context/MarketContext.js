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
exports.useMarket = exports.MarketProvider = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
// 🌟 [수정] useArtworkSearch에서 타입과 초기 필터를 함께 임포트합니다.
var useArtworkSearch_1 = require("../hooks/useArtworkSearch");
// 3. Context 생성
var MarketContext = (0, react_1.createContext)(undefined);
// 4. Context Provider 컴포넌트
var MarketProvider = function (_a) {
    var children = _a.children;
    // useArtworkSearch 훅을 사용하여 검색 로직과 상태를 가져옵니다.
    // 🌟 useArtworkSearch 훅의 결과물에 initialFilters가 제거되었으므로, contextValue에 별도로 추가하지 않습니다.
    var _b = (0, useArtworkSearch_1.useArtworkSearch)(), results = _b.results, isLoading = _b.isLoading, error = _b.error, executeSearch = _b.executeSearch;
    var contextValue = {
        searchResults: results,
        isLoading: isLoading,
        error: error,
        executeSearch: executeSearch
    };
    return ((0, jsx_runtime_1.jsx)(MarketContext.Provider, __assign({ value: contextValue }, { children: children }), void 0));
};
exports.MarketProvider = MarketProvider;
// 5. Context를 쉽게 사용할 수 있는 Custom Hook
var useMarket = function () {
    var context = (0, react_1.useContext)(MarketContext);
    if (context === undefined) {
        throw new Error('useMarket must be used within a MarketProvider');
    }
    return context;
};
exports.useMarket = useMarket;
