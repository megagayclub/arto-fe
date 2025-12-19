import React from "react";
import styled from "styled-components";
import { useMarket } from "./MarketContext";
import { useNavigate } from "react-router-dom";

// --- 스타일 (기존 디자인 100% 유지) ---

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
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s;
  cursor: pointer; /* 마우스 커서 변경 확인 */

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  img {
    width: 100%;
    height: 250px;
    object-fit: cover;
    margin-bottom: 10px;
    pointer-events: none; /* 이미지 클릭 방해 금지 */
  }

  h3, p, strong {
    pointer-events: none; /* 텍스트 클릭 방해 금지 */
  }

  h3 {
    font-size: 1.1em;
    margin: 5px 0;
    color: #333;
    padding-left: 10px;
  }

  p {
    font-size: 0.9em;
    color: #666;
    margin: 5px 0;
    padding-left: 10px;
  }

  strong {
    display: block;
    color: rgba(182, 182, 182, 1);
    font-size: 0.75em;
    margin-bottom: 15px;
    padding-left: 10px;
  }
`;

// --- 컴포넌트 ---

export const ProductList: React.FC = () => {
  const { products } = useMarket();
  const navigate = useNavigate();

  // 클릭 핸들러를 부모에서 관리
  const handleItemClick = (id: number | string) => {
    console.log("클릭된 ID:", id); // 브라우저 콘솔에서 작동 여부 확인용
    navigate(`/product/${id}`);
  };

  return (
    <ListGrid>
      {products && products.length > 0 ? (
        products.map((product, index) => (
          <ItemCard 
            key={product.artworkId || index} 
            onClick={() => handleItemClick(product.artworkId)}
    >
            <img src={product.thumbnailImageUrl} alt={product.title} />
            <h3>{product.title}</h3>
            <p>{product.artistName}</p>
            {/* ₩ 기호를 제거하고 숫자 뒤에 円을 추가합니다 */}
            <strong>{product.price.toLocaleString()}円</strong> 
          </ItemCard>
        ))
      ) : (
        <p>No products found.</p>
      )}
    </ListGrid>
  );
};