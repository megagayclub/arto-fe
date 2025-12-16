// src/components/MyPage/MyPageLayout.tsx

import React from "react";
import styled from "styled-components";

// 🔹 컴파운드 컴포넌트 MyPage 레고틀
import { MyPage } from "./MyPage";

// 🔹 찜 목록 API 훅
import { useMyWishlist } from "../../hooks/useMyWishlist";

// 이 페이지의 전체 콘텐츠 영역에 패딩 등을 줄 수 있습니다.
const PageWrapper = styled.div`
  padding: 20px 0;
  min-height: calc(100vh - 80px); /* 헤더 높이를 제외한 최소 높이 */
  background-color: #fff;
`;

// 이미지에서 본 장바구니/구매 이력 등에 대한 더미 콘텐츠를 위한 컴포넌트
const CartContent: React.FC = () => (
  <>
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "10px 0",
        borderBottom: "1px solid #ddd",
      }}
    >
      <label>
        <input type="checkbox" defaultChecked />
        <span>전체 선택</span>
      </label>
      <span>선택 항목 삭제</span>
    </div>

    {/* 장바구니 상품 1 (작품: 미지의 섬) */}
    <MyPage.Product
      id={3}
      title="미지의 섬"
      date="2023년 10월 25일"
      price={270000}
      image=""
    />
    {/* 장바구니 상품 2 (작품: 산의 오후) */}
    <MyPage.Product
      id={4}
      title="산의 오후"
      date="2023년 7월 30일"
      price={520000}
      image=""
    />
  </>
);

const PurchaseHistoryContent: React.FC = () => (
  <div style={{ textAlign: "center", padding: "30px 0", color: "#999" }}>
    <p>구매 이력이 없습니다.</p>
    <p style={{ fontSize: "12px", marginTop: "10px" }}>
      Artisry의 멋진 작품을 컬렉션 해보세요!
    </p>
  </div>
);

const InquiryContent: React.FC = () => (
  <div style={{ textAlign: "center", padding: "30px 0", color: "#999" }}>
    <p>문의 이력이 없습니다.</p>
    <p style={{ fontSize: "12px", marginTop: "10px" }}>
      궁금한 점이 있다면 언제든지 1대1 문의를 이용하세요.
    </p>
  </div>
);

export const MyPageLayout: React.FC = () => {
  // ✅ 여기서 찜 목록 API 호출
  const { wishlist, isLoading, error } = useMyWishlist();

  return (
    <PageWrapper>
      {/* 🌟 MyPage Compound Component의 기본 레이아웃 사용 */}
      <MyPage>
        {/* 1. 사이드바 (계정 정보 및 메뉴) */}
        <MyPage.Sidebar />

        {/* 2. 메인 콘텐츠 영역 */}
        <MyPage.Content>
          {/* 2-1. 주문 상태 요약 */}
          <MyPage.Order />

          {/* 2-2. ✅ 찜 목록 섹션 - 이제 진짜 데이터 사용 */}
          <MyPage.Section title={`찜 목록 (${wishlist.length})`}>
            {isLoading && <p>찜 목록 불러오는 중...</p>}

            {error && (
              <p style={{ color: "red" }}>
                찜 목록을 불러오는 중 오류가 발생했습니다: {error}
              </p>
            )}

            {!isLoading && !error && wishlist.length === 0 && (
              <p style={{ fontSize: "14px", color: "#999" }}>
                찜한 작품이 없습니다.
              </p>
            )}

            {wishlist.map((item) => (
              <MyPage.Product
                key={item.wishlistId}
                id={item.artworkId}
                title={item.title}
                date={new Date(item.addedAt).toLocaleDateString()}
                price={item.price}
                image={item.thumbnailImageUrl}
              />
            ))}
          </MyPage.Section>

          {/* 2-3. 장바구니 섹션 (더미 그대로) */}
          <MyPage.Section title="카트 (1)">
            <CartContent />
          </MyPage.Section>

          {/* 2-4. 구매 이력 섹션 (더미) */}
          <MyPage.Section title="구매 이력">
            <PurchaseHistoryContent />
          </MyPage.Section>

          {/* 2-5. 문의사항 섹션 (더미) */}
          <MyPage.Section title="문의사항">
            <InquiryContent />
          </MyPage.Section>
        </MyPage.Content>
      </MyPage>
    </PageWrapper>
  );
};