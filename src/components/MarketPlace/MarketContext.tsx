// src/context/MarketContext.tsx

import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import axios from "axios";

// 1. 상품 데이터 타입 (스프링 부트 ArtworkSimpleResponseDto와 일치)
interface Product {
  id: number;
  title: string;
  artist: string;
  price: number;
  image: string; // 백엔드에서 이미지 URL을 반환한다고 가정
}

// 2. 검색 조건 타입 (FilterSidebar의 내부 상태 구조와 100% 일치)
interface FilterStateType {
  home: string | null;
  light: string | null;
  won: [number, number];
  size: [number, number];
  shape: string | null;
  color: string | null;
  ship: string[];
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
  refresh: () => void; // 수동 새로고침 기능 추가
}

const MarketContext = createContext<MarketContextType | undefined>(undefined);

const BASE_URL = "http://localhost:8080/api/v1/artworks";

export const MarketProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // 3. 필터 초기값 (FilterSidebar의 initialFilters와 동일하게 설정)
  const [filters, setFilters] = useState<FilterStateType>({
    home: null,
    light: null,
    won: [0, 20000000],
    size: [0, 500],
    shape: null,
    color: null,
    ship: [],
  });

  // 🌟 4. API 호출 로직 (Axios)
  const fetchProducts = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // 쿼리 파라미터 빌드 (백엔드 ArtworkSearchCondition DTO 필드명에 맞춤)
      const params = new URLSearchParams();
      
      // 페이지네이션 (스프링은 0-indexed)
      params.append("page", (currentPage - 1).toString());
      params.append("size", "12"); // 한 페이지에 보여줄 개수 고정

      // 필터 데이터 매핑
      if (filters.home) params.append("space", filters.home);
      if (filters.light) params.append("mood", filters.light);
      if (filters.shape) params.append("shape", filters.shape);
      if (filters.color) params.append("color", filters.color);
      
      // 가격 범위 (minPrice, maxPrice)
      params.append("minPrice", filters.won[0].toString());
      params.append("maxPrice", filters.won[1].toString());
      
      // 크기 범위 (minSize, maxSize)
      params.append("minSize", filters.size[0].toString());
      params.append("maxSize", filters.size[1].toString());

      // 기타(ship -> etc) 배열 전송
      if (filters.ship.length > 0) {
        filters.ship.forEach(s => params.append("etc", s));
      }

      const response = await axios.get(BASE_URL, { params });
      
      /* 백엔드 응답 처리 로직 
         응답이 List<ArtworkSimpleResponseDto>인 경우: setProducts(response.data)
         응답이 Page<ArtworkSimpleResponseDto>인 경우: 
         setProducts(response.data.content);
         setTotalPages(response.data.totalPages);
      */
      if (Array.isArray(response.data)) {
        setProducts(response.data);
      } else if (response.data.content) {
        setProducts(response.data.content);
        setTotalPages(response.data.totalPages || 1);
      }

    } catch (err) {
      setError("作品リストを取得できませんでした。"); // 작품 목록을 가져오지 못했습니다.
      console.error("API Fetch Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // 5. 페이지나 필터가 변경될 때마다 자동 호출
  useEffect(() => {
    fetchProducts();
  }, [currentPage, filters]);

  const contextValue: MarketContextType = {
    products,
    isLoading,
    error,
    currentPage,
    totalPages,
    setCurrentPage,
    filters,
    setFilters,
    refresh: fetchProducts, // 필요 시 수동 호출용
  };

  return (
    <MarketContext.Provider value={contextValue}>
      {children}
    </MarketContext.Provider>
  );
};

export const useMarket = () => {
  const context = useContext(MarketContext);
  if (!context) throw new Error("useMarket must be used within a MarketProvider");
  return context;
};