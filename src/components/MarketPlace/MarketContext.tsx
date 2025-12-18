import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import axios from "axios";

// 1. 상품 데이터 타입
interface Product {
  id: number;
  title: string;
  artist: string;
  price: number;
  thumbnailImageUrl : string;
}

// 2. 검색 조건 타입 (백엔드 ArtworkSearchCondition과 매핑)
export interface FilterStateType {
  space: number | null;
  mood: number | null;
  won: [number, number];
  size: [number, number];
  morph: string | null;
  color: number | null;
  ship: string[];
  sort: string | null;
}

interface MarketContextType {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
  filters: FilterStateType;
  setFilters: React.Dispatch<React.SetStateAction<FilterStateType>>;
  applyFilters: (overrideFilters?: FilterStateType) => void;
  resetFilters: () => void;
}

const MarketContext = createContext<MarketContextType | undefined>(undefined);

export const MAX_PRICE = 20000000;
export const MAX_SIZE = 500;

export const initialFilters: FilterStateType = {
  space: null,
  mood: null,
  won: [0, MAX_PRICE],
  size: [0, MAX_SIZE],
  morph: null,
  color: null,
  ship: [],
  sort: null
};

const BASE_URL = "http://localhost:8080/api/v1/artworks";

export const MarketProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState<FilterStateType>(initialFilters);

  const fetchProducts = async (currentFilters = filters) => {
  setIsLoading(true);
  setError(null);
  try {
    const params = new URLSearchParams();
    
    // 1. 페이지네이션 (Spring은 0-index이므로 -1)
    params.append("page", (currentPage - 1).toString());
    params.append("size", "12");

    // 2. 필터 매핑 (백엔드 ArtworkSearchCondition DTO 기준)
    // 공간, 분위기, 색상이 단일 선택이라면 아래와 같이 추가 (다중 선택이면 반복문 사용)
    if (currentFilters.space) params.append("spaces", currentFilters.space.toString());
    if (currentFilters.mood) params.append("moods", currentFilters.mood.toString());
    if (currentFilters.color) params.append("colors", currentFilters.color.toString());

    // 형태 (morph)
    if (currentFilters.morph) {
      params.append("morph", currentFilters.morph); 
    }

    // 가격 범위 (BigDecimal 대응)
    params.append("minPrice", currentFilters.won[0].toString());
    params.append("maxPrice", currentFilters.won[1].toString());

    // 크기 범위
    params.append("minSize", currentFilters.size[0].toString());
    params.append("maxSize", currentFilters.size[1].toString());

    // 배송 방법 (List<String> shippingMethods)
    if (currentFilters.ship && currentFilters.ship.length > 0) {
      currentFilters.ship.forEach(s => params.append("shippingMethods", s));
    }
    if (currentFilters.sort) {
      params.append("sort", currentFilters.sort);
    }
    // 디버깅용: 실제 호출되는 URL 확인
    console.log("Request URL:", `${BASE_URL}?${params.toString()}`);

    const response = await axios.get(BASE_URL, { params });
    
    if (Array.isArray(response.data)) {
      setProducts(response.data);
      setTotalPages(1); 
    } else if (response.data.content) {
      setProducts(response.data.content);
      setTotalPages(response.data.totalPages || 1);
    }
  } catch (err) {
    setError("데이터를 불러오는데 실패했습니다.");
    console.error(err);
  } finally {
    setIsLoading(false);
  }
};

// 의존성 배열에서 filters 제거 (페이지 변경시에만 자동 호출)
useEffect(() => {
  fetchProducts();
}, [currentPage]); 

// FilterSidebar의 적용 버튼에서 호출할 함수
const applyFilters = (overrideFilters?: FilterStateType) => {
  setCurrentPage(1);
  fetchProducts(overrideFilters || filters); // 인자가 있으면 그것을 사용
};

  const resetFilters = () => setFilters(initialFilters);

  return (
    <MarketContext.Provider value={{ 
      products, isLoading, error, currentPage, totalPages, 
      setCurrentPage, filters, setFilters, applyFilters, resetFilters 
    }}>
      {children}
    </MarketContext.Provider>
  );
};

export const useMarket = () => {
  const context = useContext(MarketContext);
  if (!context) throw new Error("useMarket must be used within a MarketProvider");
  return context;
};