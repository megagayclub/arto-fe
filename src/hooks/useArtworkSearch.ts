import { useState, useCallback } from 'react';
import axiosInstance from '../utils/axiosInstance'; // 이전에 설정한 axios 인스턴스 import

// FilterSidebar에서 정의된 필터 상태 타입
interface FilterStateType {
  space: string;
  mood: string;
  minPrice: number;
  maxPrice: number;
  selectedColor: string;
  etc: string[];
  // 여기에 누락된 '형태'와 '크기' 필드를 추가해야 실제 검색 조건이 완성됩니다.
  // 예: minSize: number; maxSize: number; selectedShape: string;
  // 현재 FilterSidebar 코드를 기반으로, 백엔드가 요구하는 형식에 맞게 변환합니다.
}

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
    // 백엔드 ArtworkSearchCondition DTO 필드명에 맞게 key를 사용해야 합니다.
    params.append('space', filters.space);
    params.append('mood', filters.mood);

    // 2. 가격
    params.append('minPrice', filters.minPrice.toString());
    params.append('maxPrice', filters.maxPrice.toString());

    // 3. 색상 (HEX 값을 백엔드가 처리할 수 있는 Color Enum으로 변환 필요)
    // 현재는 HEX 값이지만, 백엔드가 'RED'와 같은 문자열을 기대한다고 가정하고,
    // 이 작업을 프론트에서 수행하거나 백엔드 개발자와 협의해야 합니다.
    // 여기서는 일단 selectedColor를 직접 전달합니다.
    params.append('color', filters.selectedColor); 

    // 4. 기타 옵션 (multi-select)
    filters.etc.forEach(item => {
        params.append('etc', item); // 예: ?etc=FREE_DELIVERY&etc=LIMITED_EDITION
    });
    
    // 5. 누락된 크기와 형태 필드가 있다면 이곳에 추가해야 합니다. (FilterSidebar 코드 수정 필요)
    // 현재 FilterSidebar의 크기/형태 필드는 로직이 미구현 상태입니다.
    
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

  return { results, isLoading, error, executeSearch };
};