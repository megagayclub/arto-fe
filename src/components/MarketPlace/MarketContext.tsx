import React, { createContext, useContext, useState, ReactNode } from "react";

// 상품 데이터 타입 정의
interface Product {
  id: number;
  title: string;
  artist: string;
  price: number;
  image: string;
}

// Context 타입 정의
interface MarketContextType {
  products: Product[];
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
  filters: { category: string; sort: string };
  setFilters: React.Dispatch<
    React.SetStateAction<{ category: string; sort: string }>
  >;
}

const MarketContext = createContext<MarketContextType | undefined>(undefined);

// 더미 데이터
const DUMMY_PRODUCTS: Product[] = [
  {
    id: 1,
    title: "Morning Calm",
    artist: "Kim",
    price: 120000,
    image: "/img/p1.jpg",
  },
  {
    id: 2,
    title: "City Lights",
    artist: "Lee",
    price: 350000,
    image: "/img/p2.jpg",
  },
  {
    id: 3,
    title: "Abstract Art",
    artist: "Park",
    price: 89000,
    image: "/img/p3.jpg",
  },
  {
    id: 4,
    title: "Seascape",
    artist: "Choi",
    price: 210000,
    image: "/img/p4.jpg",
  },
  {
    id: 5,
    title: "Morning Calm",
    artist: "Kim",
    price: 120000,
    image: "/img/p1.jpg",
  },
  {
    id: 6,
    title: "City Lights",
    artist: "Lee",
    price: 350000,
    image: "/img/p2.jpg",
  },
  {
    id: 7,
    title: "Abstract Art",
    artist: "Park",
    price: 89000,
    image: "/img/p3.jpg",
  },
  {
    id: 8,
    title: "Seascape",
    artist: "Choi",
    price: 210000,
    image: "/img/p4.jpg",
  },
];

const ITEMS_PER_PAGE = 6;

// Provider 컴포넌트
export const MarketProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({ category: "All", sort: "Latest" });
  const totalPages = Math.ceil(DUMMY_PRODUCTS.length / ITEMS_PER_PAGE);

  // 필터링/정렬 로직 (여기서는 단순화)
  const filteredProducts = DUMMY_PRODUCTS;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const products = filteredProducts.slice(startIndex, endIndex);

  const contextValue: MarketContextType = {
    products,
    currentPage,
    totalPages,
    setCurrentPage,
    filters,
    setFilters,
  };

  return (
    <MarketContext.Provider value={contextValue}>
      {children}
    </MarketContext.Provider>
  );
};

// Custom Hook
export const useMarket = () => {
  const context = useContext(MarketContext);
  if (!context) {
    throw new Error("useMarket must be used within a MarketProvider");
  }
  return context;
};
