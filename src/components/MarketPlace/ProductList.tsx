import React from "react";
import styled from "styled-components";
import { useMarket } from "./MarketContext"; // MarketContext는 변경 없음

// MarketContext에서 사용했던 Product 타입 (참조용)
// interface Product {
//   id: number;
//   title: string;
//   artist: string;
//   price: number;
//   image: string;
// }

// --- 스타일 수정 ---

const ListGrid = styled.div`
  display: flex;
  /* flex-wrap: wrap; : 컨테이너 너비를 초과하면 다음 줄로 넘어갑니다.
    align-items: stretch; : 이 속성이 ItemCard의 높이를 ListGrid에서 가장 높은 아이템의 높이에 맞게 늘려줍니다.
  */
  flex-wrap: wrap;
  align-items: stretch;
  gap: 20px;
  margin-bottom: 30px;
`;

const ItemCard = styled.div`
  display: flex; /* ItemCard 내부의 컨텐츠도 flex로 정렬하여 */
  flex-direction: column; /* 세로 방향으로 쌓고 */
  justify-content: space-between; /* 내용물이 위아래로 분산되게 할 수도 있지만, 여기서는 */
  /* height: auto; 혹은 min-height를 사용하면 아이템 카드가 내용에 맞춰 늘어납니다. */

  border: 1px solid #ddd;
  /* min-width/max-width 대신 width를 사용하여 유연성을 높였습니다.
    grid 대신 flex를 사용하므로 flex-basis와 flex-grow를 사용해 반응형 너비를 설정합니다.
  */
  flex: 0 0 calc(25% - 15px); /* 한 줄에 4개(25%)씩 배치하고 gap(20px)을 고려한 너비 */
  min-width: 200px; /* 최소 너비 지정 */
  padding: 15px; /* 내부 패딩 추가 */
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  img {
    width: 100%;
    /* 이미지 height는 고정 (200px) */
    height: 200px;
    object-fit: cover;
    margin-bottom: 10px;
  }

  /* ... 나머지 스타일은 유지 ... */
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
    /* 가격이 항상 카드 하단에 붙도록 justify-content: space-between과 함께 사용하려면 margin-top을 없애야 하지만, 여기서는 간단히 margin-top만 유지합니다. */
  }
`;

// --- 컴포넌트 로직은 유지 ---

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
      {products.length > 0 ? (
        products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))
      ) : (
        <p>No products found.</p>
      )}
    </ListGrid>
  );
};
