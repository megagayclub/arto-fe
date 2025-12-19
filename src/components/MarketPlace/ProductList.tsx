import React, { useMemo } from "react";
import styled from "styled-components";
import { useMarket } from "./MarketContext";
import { useNavigate } from "react-router-dom";
import { LikeButton } from '../Common/LikeButton';
import { useLikeToggle } from '../../hooks/useLikeToggle';
import { useMyWishlist } from "../../hooks/useMyWishlist"; // 위시리스트 훅 임포트

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
  position: relative;
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
    pointer-events: none; /* 이미지 클릭 방해 금지 */
  }

  h3, p, strong {
    pointer-events: none; /* 텍스트 클릭 방해 금지 */
  }

  h3 { font-size: 1.1em; margin: 5px 0; color: #333; padding-left: 10px; }
  p { font-size: 0.9em; color: #666; margin: 5px 0; padding-left: 10px; }
  strong { display: block; color: rgba(182, 182, 182, 1); font-size: 0.75em; margin-bottom: 15px; padding-left: 10px; }
`;

const LikeBadge = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 10;
`;

// --- 개별 아이템 컴포넌트 ---
const ProductItem: React.FC<{ 
  product: any; 
  initialIsLiked: boolean; // 위시리스트 존재 여부 수신
  onClick: (id: number) => void 
}> = ({ product, initialIsLiked, onClick }) => {
  
  // hook 내부에 useEffect 처리가 되어있어야 외부 상태 변화에 대응합니다.
  const { isLiked, toggleLike } = useLikeToggle(initialIsLiked, product.artworkId);

  return (
    <ItemCard onClick={() => onClick(product.artworkId)}>
      <LikeBadge>
        <LikeButton isLiked={isLiked} onToggle={toggleLike} />
      </LikeBadge>
      
      <img src={product.thumbnailImageUrl} alt={product.title} />
      <h3>{product.title}</h3>
      <p>{product.artistName}</p>
      <strong>{product.price.toLocaleString()}円</strong>
    </ItemCard>
  );
};

// --- 메인 리스트 컴포넌트 ---
export const ProductList: React.FC = () => {
  const { products } = useMarket();
  const { wishlist, isLoading: wishlistLoading } = useMyWishlist(); // 찜 데이터 가져오기
  const navigate = useNavigate();

  const handleItemClick = (id: number) => {
    navigate(`/product/${id}`);
  };

  // 찜한 상품 ID들만 모은 Set (검색 성능 최적화)
  const wishset = useMemo(() => new Set(wishlist.map(item => item.artworkId)), [wishlist]);

  if (wishlistLoading) return <p>Loading...</p>;

  return (
    <ListGrid>
      {products && products.length > 0 ? (
        products.map((product) => (
          <ProductItem 
            key={product.artworkId} 
            product={product} 
            // 현재 상품의 ID가 위시리스트 Set에 있는지 확인
            initialIsLiked={wishset.has(product.artworkId)}
            onClick={handleItemClick}
          />
        ))
      ) : (
        <p>No products found.</p>
      )}
    </ListGrid>
  );
};