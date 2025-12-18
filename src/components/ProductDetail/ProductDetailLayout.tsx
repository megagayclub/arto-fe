// src/components/ProductDetail/ProductDetail.tsx
import React from "react";
import { useParams } from "react-router-dom";
import { ProductDetailType, useArtworkDetail } from "../../hooks/useArtworkDetail";
import { useAddToCart } from "../../hooks/useAddToCart";
import {
  PageLayout,
  MainContent,
  ImageArea,
  InfoArea,
  Title,
  ArtistName,
  InfoTable,
  InfoRow,
  PriceText,
  ButtonGroup,
  BuyButton,
  ActionButton,
} from "./ProductDetailStyles";

const ICON_HEART = "🤍";

const ProductInfoTable: React.FC<{ data: ProductDetailType }> = ({ data }) => {
  const infoRows = [
    { label: "작품명 | Title", value: data.title },
    { label: "작가명 | Artist", value: data.artist },
    { label: "사이즈 | Size", value: data.size },
    { label: "배송비 | Shipping Cost", value: `${data.shippingCost.toLocaleString()}₩` },
    { label: "배송방법 | Shipping", value: data.shippingMethod },
  ];

  return (
    <InfoTable>
      {infoRows.map((row, index) => (
        <InfoRow key={index}>
          <span>{row.label}</span>
          <span>{row.value}</span>
        </InfoRow>
      ))}
    </InfoTable>
  );
};

export const ProductDetailLayout: React.FC = () => {
  // ✅ URL에서 /product/:id 가져오기
  const { id } = useParams<{ id: string }>();

  // ✅ 숫자로 변환
  const artworkId = Number(id);

  // ✅ 이상한 값 방어
  if (!id || Number.isNaN(artworkId)) {
    return (
      <PageLayout>
        <MainContent>
          <p style={{ color: "red", padding: "20px" }}>잘못된 작품 ID입니다: {id}</p>
        </MainContent>
      </PageLayout>
    );
  }

  const { artworkDetail: product, isLoading, error } = useArtworkDetail(artworkId);

  // ✅ 카트 담기 훅
  const { addToCart, isLoading: adding, error: addError } = useAddToCart();

  const handleAddToCart = async () => {
    const ok = await addToCart(artworkId);
    if (ok) {
      alert("장바구니에 담았습니다!");
      // 원하면 여기서 즉시 마이페이지로 보내도 됨:
      // navigate("/mypage");
    }
  };

  if (isLoading) {
    return (
      <PageLayout>
        <MainContent>
          <p>작품 정보를 불러오는 중입니다...</p>
        </MainContent>
      </PageLayout>
    );
  }

  if (error) {
    return (
      <PageLayout>
        <MainContent>
          <p style={{ color: "red", padding: "20px" }}>오류 발생: {error}</p>
        </MainContent>
      </PageLayout>
    );
  }

  if (!product) {
    return (
      <PageLayout>
        <MainContent>
          <p>작품 정보를 찾을 수 없습니다.</p>
        </MainContent>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <MainContent>
        <ImageArea>
          <img src={product.imagePlaceholder} alt={product.title} />
          <p style={{ marginTop: "20px", fontSize: "12px", color: "#666" }}>
            ©{product.year} {product.artist}. All rights reserved.
          </p>
        </ImageArea>

        <InfoArea>
          <Title>작품명 | Title</Title>
          <ArtistName>{product.title}</ArtistName>

          <Title>작가명 | Artist</Title>
          <ArtistName>{product.artist}</ArtistName>

          <ProductInfoTable data={product} />

          <Title>판매가격 | Price</Title>
          <PriceText>{product.price.toLocaleString()}₩</PriceText>

          {/* ✅ 카트 담기 에러 표시 */}
          {addError && (
            <p style={{ color: "red", marginTop: "10px" }}>
              장바구니 담기 오류: {addError}
            </p>
          )}

          <ButtonGroup>
            <ActionButton>
              {ICON_HEART}&nbsp;<span style={{ fontSize: "14px" }}>문의하기</span>
            </ActionButton>

            {/* ✅ 카트에 넣기 연결 */}
            <BuyButton onClick={handleAddToCart} disabled={adding}>
              {adding ? "담는 중..." : "카트에 넣기"}
            </BuyButton>
          </ButtonGroup>
        </InfoArea>
      </MainContent>
    </PageLayout>
  );
};
