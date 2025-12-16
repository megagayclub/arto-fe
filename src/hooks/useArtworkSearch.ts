// src/hooks/useArtworkSearch.ts

import { useState, useCallback } from 'react';
import axiosInstance from '../utils/axiosInstance'; 

// 🌟 [수정] 크기 및 형태 필드 추가
export interface FilterStateType {
  space: string;
  mood: string;
  minPrice: number;
  maxPrice: number;
  selectedColor: string;
  etc: string[];
  minSize: number;        // 🌟 추가
  maxSize: number;        // 🌟 추가
  selectedShape: string;  // 🌟 추가
}

// 🌟 [추가] FilterStateType에 맞는 초기값 정의 (FilterSidebar와 동기화)
export const initialFilters: FilterStateType = {
  space: "거실",
  mood: "모던",
  minPrice: 0,
  maxPrice: 1000000,
  selectedColor: "#FF0000",
  etc: [],
  minSize: 0,            // 🌟 추가 (FilterSidebar의 RangeInput 초기값 기준)
  maxSize: 500,          // 🌟 추가 (FilterSidebar의 RangeInput 최대값 기준)
  selectedShape: 'square', // 🌟 추가 (임의의 기본 형태)
};


// 백엔드에서 받는 작품 목록 응답 DTO (예시)
interface ArtworkSimpleResponseDto {
    artworkId: number;
    title: string;
    artistName: string;
    imageUrl: string;
    price: number;
    // ... 기타 간략 정보
}

// 필터 상태를 백엔드가 요구하는 쿼리 파라미터(ArtworkSearchCondition) 형식으로 변환하는 함수
const filterToQueryParams = (filters: FilterStateType) => {
    // 백엔드의 ArtworkSearchCondition에 매핑될 쿼리 파라미터 생성
    const params = new URLSearchParams();

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
    filters.etc.forEach(item => {
        params.append('etc', item);
    });
    
    return params;
};

export const useArtworkSearch = () => {
  const [results, setResults] = useState<ArtworkSimpleResponseDto[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // 검색을 실행하는 콜백 함수
  const executeSearch = useCallback(
    async (filters: FilterStateType) => {
      setIsLoading(true);
      setError(null);
      const queryParams = filterToQueryParams(filters); // 필터 객체를 쿼리 파라미터로 변환
      
      try {
        const response = await axiosInstance.get<ArtworkSimpleResponseDto[]>(
          '/artwork', // 백엔드 API 주소: /api/v1/artwork
          { 
            params: queryParams // 쿼리 파라미터를 요청에 첨부
          }
        );
        
        setResults(response.data);
      } catch (err) {
        console.error("검색 API 호출 오류:", err);
        setError("작품 검색 중 오류가 발생했습니다.");
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  // 🌟 initialFilters도 export 하여 FilterSidebar에서 사용할 수 있도록 함
  return { results, isLoading, error, executeSearch, initialFilters }; 
};