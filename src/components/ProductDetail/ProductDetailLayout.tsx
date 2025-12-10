// src/components/ProductDetail/ProductDetail.tsx

import React from "react";
import { DUMMY_PRODUCT_DETAIL, ProductDetailType } from "../data/ProductData";
import {
  PageLayout,
  LeftSidebar,
  SidebarIcon,
  HamburgerMenu,
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
const ICON_HOME = "🏠";
const ICON_DOLLAR = "$";
const ICON_CALENDAR = "📅";
const ICON_EYE = "👁️";
const ICON_MAIL = "✉️";
const ICON_HISTORY = "↺";
const ICON_CLOSE = "✕";
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

export const ProductDetailLayout: React.FC = () => {
  const product = DUMMY_PRODUCT_DETAIL;

  return (
    <PageLayout>
      {/* 2. 메인 콘텐츠 */}
      <MainContent>
        {/* 2-1. 이미지 영역 */}
        <ImageArea>
          <img src={product.imagePlaceholder} alt={product.title} />
          <p style={{ marginTop: "20px", fontSize: "12px", color: "#666" }}>
            ©2017 김·지영. All rights reserved. 작품 이미지의 무단 사용 및
            전재를 금합니다.
          </p>
        </ImageArea>

        {/* 2-2. 정보 및 구매 영역 */}
        <InfoArea>
          {/* 작품 제목 및 작가 */}
          <Title>작품명 | Title</Title>
          <ArtistName>{product.title}</ArtistName>

          <Title>작가명 | Artist</Title>
          <ArtistName>킴·지영 | Jiyoung Kim</ArtistName>

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
