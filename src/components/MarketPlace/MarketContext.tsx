import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import axios from "axios";

// 1. 상품 데이터 타입
interface Product {
  id: number;
  title: string;
  artist: string;
  price: number;
  image: string;
}

// 2. 검색 조건 타입 (백엔드 ArtworkSearchCondition과 매핑)
export interface FilterStateType {
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
  applyFilters: () => void;
  resetFilters: () => void;
}

const MarketContext = createContext<MarketContextType | undefined>(undefined);

export const MAX_PRICE = 20000000;
export const MAX_SIZE = 500;

export const initialFilters: FilterStateType = {
  home: null,
  light: null,
  won: [0, MAX_PRICE],
  size: [0, MAX_SIZE],
  shape: null,
  color: null,
  ship: [],
};

const BASE_URL = "http://localhost:8080/api/v1/artworks";

export const MarketProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState<FilterStateType>(initialFilters);

  const fetchProducts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      // 페이지네이션 (Spring: 0-indexed)
      params.append("page", (currentPage - 1).toString());
      params.append("size", "12");

      // 필터 매핑
      if (filters.home) params.append("space", filters.home);
      if (filters.light) params.append("mood", filters.light);
      if (filters.shape) params.append("shape", filters.shape);
      if (filters.color) params.append("color", filters.color);
      
      params.append("minPrice", filters.won[0].toString());
      params.append("maxPrice", filters.won[1].toString());
      params.append("minSize", filters.size[0].toString());
      params.append("maxSize", filters.size[1].toString());

      if (filters.ship.length > 0) {
        filters.ship.forEach(s => params.append("etc", s));
      }

      const response = await axios.get(BASE_URL, { params });
      
      if (Array.isArray(response.data)) {
        setProducts(response.data);
      } else if (response.data.content) {
        setProducts(response.data.content);
        setTotalPages(response.data.totalPages || 1);
      }
    } catch (err) {
      setError("作品リストを取得できませんでした。");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // 페이지나 필터 변경 시 자동 호출
  useEffect(() => {
    fetchProducts();
  }, [currentPage, filters]);

  const resetFilters = () => setFilters(initialFilters);

  return (
    <MarketContext.Provider value={{ 
      products, isLoading, error, currentPage, totalPages, 
      setCurrentPage, filters, setFilters, applyFilters: fetchProducts, resetFilters 
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