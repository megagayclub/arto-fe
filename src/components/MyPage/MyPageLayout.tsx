// src/components/MyPage/MyPageLayout.tsx

import React from "react";
import styled from "styled-components";

// 🔹 컴파운드 컴포넌트 MyPage 레고틀
import { MyPage } from "./MyPage";

// 🔹 찜 목록 API 훅
import { useMyWishlist } from "../../hooks/useMyWishlist";

// 🔹 장바구니 API 훅
import { useMyCart } from "../../hooks/useMyCart";

// 🔹 구매(주문) 이력 API 훅 ✅ 추가
import { useMyOrders } from "../../hooks/useMyOrders";

// 🔹 문의 내역 API 훅 ✅ 추가
import { useMyInquiries } from "../../hooks/useMyInquiries";

// 이 페이지의 전체 콘텐츠 영역에 패딩 등을 줄 수 있습니다.
const PageWrapper = styled.div`
  padding: 20px 0;
  min-height: calc(100vh - 80px); /* 헤더 높이를 제외한 최소 높이 */
  background-color: #fff;
`;

// ✅ 구매(주문) 이력 (API 연동)
const PurchaseHistoryContent: React.FC = () => {
  const { orders, isLoading, error } = useMyOrders();

  if (isLoading) {
    return <p>구매(주문) 이력 불러오는 중...</p>;
  }

  if (error) {
    return (
      <p style={{ color: "red" }}>
        구매(주문) 이력을 불러오는 중 오류가 발생했습니다: {error}
      </p>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "30px 0", color: "#999" }}>
        <p>구매 이력이 없습니다.</p>
        <p style={{ fontSize: "12px", marginTop: "10px" }}>
          Artisry의 멋진 작품을 컬렉션 해보세요!
        </p>
      </div>
    );
  }

  const toNumber = (v: any) => (typeof v === "number" ? v : Number(v));

  return (
    <>
      {orders.map((o) => (
        <MyPage.Product
          key={o.orderId}
          id={o.orderId}
          title={`${o.artworkTitle} (${o.orderStatus})`}
          date={o.orderDate} // ✅ 주문일 표시 (작품등록일 대신)
          price={Number.isFinite(toNumber(o.totalAmount)) ? toNumber(o.totalAmount) : undefined}
          image={o.thumbnailUrl ?? undefined}
        />
      ))}
    </>
  );
};


export const MyPageLayout: React.FC = () => {
  // ✅ 찜 목록 API 호출
  const { wishlist, isLoading, error } = useMyWishlist();

  // ✅ 핵심: wishlist가 배열이 아닐 수도 있으니 무조건 배열로 안전 처리
  const wishlistItems = Array.isArray(wishlist) ? wishlist : [];

  // ✅ 장바구니 API 호출
  const { cart, isLoading: cartLoading, error: cartError } = useMyCart();
  const cartItems = cart?.items ?? [];



  // ✅ 문의 내역 API 호출 (GET /api/v1/inquiries)
  const {
    inquiries,
    isLoading: inquiryLoading,
    error: inquiryError,
  } = useMyInquiries();

  const inquiryItems = Array.isArray(inquiries) ? inquiries : [];

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

          {/* 2-2. ✅ 찜 목록 섹션 */}
          <MyPage.Section title={`찜 목록 (${wishlistItems.length})`}>
            {isLoading && <p>찜 목록 불러오는 중...</p>}

            {error && (
              <p style={{ color: "red" }}>
                찜 목록을 불러오는 중 오류가 발생했습니다: {error}
              </p>
            )}

            {!isLoading && !error && wishlistItems.length === 0 && (
              <p style={{ fontSize: "14px", color: "#999" }}>
                찜한 작품이 없습니다.
              </p>
            )}

            {!isLoading &&
              !error &&
              wishlistItems.map((item) => (
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

          {/* 2-3. ✅ 장바구니 섹션 */}
          <MyPage.Section title={`카트 (${cartItems.length})`}>
            {cartLoading && <p>장바구니 불러오는 중...</p>}

            {cartError && (
              <p style={{ color: "red" }}>
                장바구니를 불러오는 중 오류가 발생했습니다: {cartError}
              </p>
            )}

            {!cartLoading && !cartError && cartItems.length === 0 && (
              <p style={{ fontSize: "14px", color: "#999" }}>
                장바구니가 비어 있습니다.
              </p>
            )}

            {!cartLoading &&
              !cartError &&
              cartItems.map((item) => (
                <MyPage.Product
                  key={item.cartItemId}
                  id={item.artworkId}
                  title={item.title}
                  date={"-"} // ✅ CartResponse에 날짜 필드가 없어서 표시 불가
                  price={Number(item.price)}
                  image={item.thumbnailImageUrl}
                />
              ))}

            {!cartLoading && !cartError && cart && (
              <p style={{ marginTop: "12px", fontWeight: "bold" }}>
                총액: {Number(cart.totalAmount).toLocaleString()}₩
              </p>
            )}
          </MyPage.Section>

          {/* 2-4. 구매 이력 섹션 (API 연동) */}
          <MyPage.Section title="구매 이력">
            <PurchaseHistoryContent />
          </MyPage.Section>

          {/* 2-5. ✅ 문의사항 섹션 (API 연동) */}
          <MyPage.Section title={`문의사항 (${inquiryItems.length})`}>
            
            {inquiryLoading && <p>문의 내역 불러오는 중...</p>}

            {inquiryError && (
              <p style={{ color: "red" }}>
                문의 내역을 불러오는 중 오류가 발생했습니다: {inquiryError}
              </p>
            )}

            {!inquiryLoading && !inquiryError && inquiryItems.length === 0 && (
              <p style={{ fontSize: "14px", color: "#999" }}>
                문의 이력이 없습니다.
              </p>
            )}

            {!inquiryLoading &&
              !inquiryError &&
              inquiryItems.map((q) => (
                <MyPage.Product
                  key={q.inquiryId}
                  id={q.inquiryId}
                  title={q.title}
                  date={new Date(q.createdAt).toLocaleDateString()}
                  // ✅ 문의는 price/image 없음 (MyPage.Product가 optional 처리돼 있어야 함)
                />
              ))}
          </MyPage.Section>
        </MyPage.Content>
      </MyPage>
    </PageWrapper>
  );
};
