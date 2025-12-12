// src/components/ProductDetail/ProductDetail.tsx

import React from "react";
// ProductDetailType과 useArtworkDetail을 통합된 훅 파일에서 임포트
import {
  ProductDetailType,
  useArtworkDetail,
} from "../../hooks/useArtworkDetail";

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

// 아이콘 대체 문자 (실제로는 react-icons 등을 사용합니다)
const ICON_HEART = "🤍"; // 좋아요 아이콘

// 작품 정보 표시 컴포넌트
const ProductInfoTable: React.FC<{ data: ProductDetailType }> = ({ data }) => {
  // 데이터 배열 형태로 변환
  const infoRows = [
    { label: "작품명 | Title", value: data.title },
    { label: "작가명 | Artist", value: data.artist },
    { label: "제작년 | Year", value: data.year },
    { label: "장르 | Genre", value: data.genre },
    { label: "소재 | Medium", value: data.medium },
    { label: "액자 | Frame", value: data.frame },
    { label: "사이즈 | Size", value: data.size },
    {
      label: "배송비 | Shipping Cost",
      value: `${data.shippingCost.toLocaleString()}₩`,
    },
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

// 🔧 임시로 작품 ID를 1로 지정합니다.
// 실제 환경에서는 react-router의 useParams() 등을 사용하여 URL에서 artworkId를 가져오는 방식으로 변경하면 됩니다.
const MOCK_ARTWORK_ID = 1;

export const ProductDetailLayout: React.FC = () => {
  // 커스텀 훅을 사용하여 데이터 로드 및 상태 관리
  const {
    artworkDetail: product,
    isLoading,
    error,
  } = useArtworkDetail(MOCK_ARTWORK_ID);

  // 1. 로딩 상태 처리
  if (isLoading) {
    return (
      <PageLayout>
        <MainContent>
          <p>작품 정보를 불러오는 중입니다...</p>
          {/* TODO: 스켈레톤 UI를 추가하여 사용자 경험을 개선할 수 있습니다. */}
        </MainContent>
      </PageLayout>
    );
  }

  // 2. 에러 상태 처리
  if (error) {
    return (
      <PageLayout>
        <MainContent>
          <p style={{ color: "red", padding: "20px" }}>오류 발생: {error}</p>
        </MainContent>
      </PageLayout>
    );
  }

  // 3. 데이터가 없지만 에러도 아닌 경우 처리 (e.g., 404 Not Found)
  if (!product) {
    return (
      <PageLayout>
        <MainContent>
          <p>작품 정보를 찾을 수 없습니다.</p>
        </MainContent>
      </PageLayout>
    );
  }

  // 4. 성공적으로 데이터 로드 완료
  return (
    <PageLayout>
      {/* 2. 메인 콘텐츠 */}
      <MainContent>
        {/* 2-1. 이미지 영역 */}
        <ImageArea>
          <img src={product.imagePlaceholder} alt={product.title} />
          <p style={{ marginTop: "20px", fontSize: "12px", color: "#666" }}>
            ©{product.year} {product.artist}. All rights reserved. 작품 이미지의 무단
            사용 및 전재를 금합니다.
          </p>
        </ImageArea>

        {/* 2-2. 정보 및 구매 영역 */}
        <InfoArea>
          {/* 작품 제목 및 작가 */}
          <Title>작품명 | Title</Title>
          <ArtistName>{product.title}</ArtistName>

          <Title>작가명 | Artist</Title>
          <ArtistName>{product.artist}</ArtistName>

          {/* 정보 테이블 */}
          <ProductInfoTable data={product} />

          {/* 가격 */}
          <Title>판매가격 | Price</Title>
          <PriceText>{product.price.toLocaleString()}₩</PriceText>

          {/* 버튼 그룹 */}
          <ButtonGroup>
            <ActionButton>
              {ICON_HEART}
              &nbsp;
              <span style={{ fontSize: "14px" }}>문의하기</span>
            </ActionButton>
            <BuyButton>카트에 넣기</BuyButton>
          </ButtonGroup>
        </InfoArea>
      </MainContent>

      {/* 오른쪽 사이드바와 하단 연관 작품은 생략 (확장 가능 지점) */}
    </PageLayout>
  );
};
