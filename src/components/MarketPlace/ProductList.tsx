import React from "react";
import styled from "styled-components";
import { useMarket } from "./MarketContext";

// --- 스타일 수정 (기존과 동일) ---

const ListGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  justify-content: center;
  gap: 20px;
  margin-bottom: 30px;
`;

const ItemCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid #ddd;
  flex: 0 0 calc(25% - 15px);
  max-width: 200px;
  padding: 15px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    margin-bottom: 10px;
  }

  h3 {
    font-size: 1.1em;
    margin: 5px 0;
    color: #333;
  }

  p {
    font-size: 0.9em;
    color: #666;
    margin: 5px 0;
  }

  strong {
    display: block;
    color: #a00;
    font-size: 1.2em;
    margin-top: 10px;
  }
`;

// --- 컴포넌트 수정 ---

// 개별 상품 아이템 컴포넌트
const ProductItem: React.FC<{ product: any }> = ({ product }) => (
  <ItemCard>
    <img src={product.image} alt={product.title} />
    <h3>{product.title}</h3>
    <p>Artist: {product.artist}</p>
    <strong>₩{product.price.toLocaleString()}</strong>
  </ItemCard>
);

export const ProductList: React.FC = () => {
  const { products } = useMarket();

  return (
    <ListGrid>
      {products && products.length > 0 ? (
        products.map((product, index) => (
          /* 해결책: product.id가 확실히 고유한지 확인하세요. 
             만약 API에서 중복된 ID를 준다면 `${product.id}-${index}` 처럼 조합할 수 있습니다.
             하지만 가장 좋은 방법은 데이터 소스(MarketContext)의 id를 고유하게 만드는 것입니다.
          */
          <ProductItem key={product.id || index} product={product} />
        ))
      ) : (
        <p>No products found.</p>
      )}
    </ListGrid>
  );
};