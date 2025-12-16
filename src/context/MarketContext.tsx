import React, { createContext, useContext, useState, ReactNode } from 'react';
// 🌟 [수정] useArtworkSearch에서 타입과 초기 필터를 함께 임포트합니다.
import { 
    useArtworkSearch, 
    FilterStateType,      // useArtworkSearch에서 확장된 타입 가져오기
    initialFilters,        // useArtworkSearch에서 export한 초기 필터값 가져오기
} from '../hooks/useArtworkSearch'; 


// 1. DTO 타입 정의 (useArtworkSearch와 동일하게 유지)
interface ArtworkSimpleResponseDto {
    artworkId: number;
    title: string;
    artistName: string;
    imageUrl: string;
    price: number;
    // ... 기타 간략 정보
}

// 2. Context가 제공할 값의 타입 정의
interface MarketContextType {
    searchResults: ArtworkSimpleResponseDto[];
    isLoading: boolean;
    error: string | null;
    // 🌟 [수정] executeSearch의 필터 타입을 명확하게 지정 (any 대신 FilterStateType 사용)
    executeSearch: (filters: FilterStateType) => void; 
    
    // (선택 사항: 초기 필터 상태도 제공하여 다른 컴포넌트에서 초기화 용도로 사용할 수 있게 함)
    // initialFilters: FilterStateType;
}

// 3. Context 생성
const MarketContext = createContext<MarketContextType | undefined>(undefined);

// 4. Context Provider 컴포넌트
export const MarketProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    // useArtworkSearch 훅을 사용하여 검색 로직과 상태를 가져옵니다.
    // 🌟 useArtworkSearch 훅의 결과물에 initialFilters가 제거되었으므로, contextValue에 별도로 추가하지 않습니다.
    const { results, isLoading, error, executeSearch } = useArtworkSearch();

    const contextValue: MarketContextType = {
        searchResults: results,
        isLoading,
        error,
        executeSearch,
        // initialFilters,
    };

    return (
        <MarketContext.Provider value={contextValue}>
            {children}
        </MarketContext.Provider>
    );
};

// 5. Context를 쉽게 사용할 수 있는 Custom Hook
export const useMarket = () => {
    const context = useContext(MarketContext);
    if (context === undefined) {
        throw new Error('useMarket must be used within a MarketProvider');
    }
    return context;
};