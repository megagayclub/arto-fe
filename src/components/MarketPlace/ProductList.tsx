import React from "react";
import styled from "styled-components";
import { useMarket } from "./MarketContext";
import { useNavigate } from "react-router-dom";
import { LikeButton } from '../Common/LikeButton';
import { useLikeToggle } from '../../hooks/useLikeToggle';

// --- 스타일 ---

const ListGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  justify-content: center;
  gap: 20px;
  margin-bottom: 30px;
`;

const ItemCard = styled.div`
  position: relative; /* 👈 하트 버튼을 absolute로 배치하기 위해 추가 */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid #ddd;
  flex: 0 0 calc(25% - 15px);
  max-width: 200px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  img {
    width: 100%;
    height: 250px;
    object-fit: cover;
    margin-bottom: 10px;
    /* pointer-events: none; 은 제거하거나 하트 버튼 영역만 예외처리 해야 클릭이 됩니다 */
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

// 하트 버튼 위치 스타일
const LikeBadge = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 10;
`;

// --- 개별 아이템 컴포넌트 (토글 로직 분리) ---
const ProductItem: React.FC<{ product: any; onClick: (id: number) => void }> = ({ product, onClick }) => {
  // 훅 연결 (isLikedByMe는 백엔드 필드명에 맞게 확인 필요)
  const { isLiked, toggleLike } = useLikeToggle(product.isLikedByMe || false, product.artworkId);

  return (
    <ItemCard onClick={() => onClick(product.artworkId)}>
      <LikeBadge>
        {/* 하트 버튼 클릭 시 카드 상세 이동 방지를 위해 이벤트 버블링은 훅 내부(toggleLike)에서 막고 있습니다 */}
        <LikeButton isLiked={isLiked} onToggle={toggleLike} />
      </LikeBadge>
      
      <img src={product.thumbnailImageUrl} alt={product.title} />
      <h3>{product.title}</h3>
      <p>{product.artistName}</p>
      {/* 화폐 단위 엔화로 변경 */}
      <strong>{product.price.toLocaleString()}円</strong>
    </ItemCard>
  );
};

// --- 메인 리스트 컴포넌트 ---
export const ProductList: React.FC = () => {
  const { products } = useMarket();
  const navigate = useNavigate();

  const handleItemClick = (id: number) => {
    navigate(`/product/${id}`);
  };

  return (
    <ListGrid>
      {products && products.length > 0 ? (
        products.map((product) => (
          <ProductItem 
            key={product.artworkId} 
            product={product} 
            onClick={handleItemClick}
          />
        ))
      ) : (
        <p>No products found.</p>
      )}
    </ListGrid>
  );
};