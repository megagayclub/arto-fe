import React from "react";
import styled from "styled-components";

import { useAuth } from "../../context/AuthContext";
import { MyPage } from "./MyPage";
import { TopDashboard, InfoCard } from "./MyPageStyles"; // 🌟 스타일 추가 임포트

// API 훅 임포트
import { useMyWishlist } from "../../hooks/useMyWishlist";
import { useMyCart } from "../../hooks/useMyCart";
import { useMyOrders } from "../../hooks/useMyOrders";
import { useMyInquiries } from "../../hooks/useMyInquiries";

const PageWrapper = styled.div`
  padding: 20px 0;
  min-height: calc(100vh - 80px);
  background-color: #fff;
`;

// --- 하위 리스트 컴포넌트 (구매이력) ---
const PurchaseHistoryContent: React.FC = () => {
  const { orders, isLoading, error } = useMyOrders();

  if (isLoading) return <p>구매 이력 불러오는 중...</p>;
  if (error) return <p style={{ color: "red" }}>오류 발생: {error}</p>;
  if (!orders || orders.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "30px 0", color: "#999" }}>
        <p>구매 이력이 없습니다.</p>
      </div>
    );
  }

  return (
    <>
      {orders.map((o) => (
        <MyPage.Product
          key={o.orderId}
          id={o.orderId}
          title={`${o.artworkTitle} (${o.orderStatus})`}
          dateLabel="구매일"
          date={o.orderDate}
          price={Number(o.totalAmount)}
          image={o.thumbnailUrl ?? undefined}
        />
      ))}
    </>
  );
};

// --- 메인 레이아웃 컴포넌트 ---
export const MyPageLayout: React.FC = () => {
  const { userEmail } = useAuth();
  
  const { wishlist, isLoading: wishLoading, error: wishError } = useMyWishlist();
  const wishlistItems = Array.isArray(wishlist) ? wishlist : [];

  const { cart, isLoading: cartLoading, error: cartError } = useMyCart();
  const cartItems = cart?.items ?? [];

  const { inquiries, isLoading: inqLoading, error: inqError } = useMyInquiries();
  const inquiryItems = Array.isArray(inquiries) ? inquiries : [];

  return (
    <PageWrapper>
      <MyPage>
        {/* 1. 사이드바 (메뉴 위주) */}
        

        {/* 2. 메인 콘텐츠 영역 */}
        <MyPage.Content>
          {/* <MyPage.Sidebar /> */}
          {/* 🌟 상단 대시보드 영역: 회원정보 + 결제/배송 */}
          <TopDashboard>
            <InfoCard>
              <h3>회원 정보</h3>
              <div className="content">
                <p>E-mail (ID)</p>
                <p>{userEmail || "로그인이 필요합니다."}</p>
              </div>
            </InfoCard>

            <MyPage.Order /> 
          </TopDashboard>
  

          {/* 3. 리스트 섹션들 */}
          {/* 찜 목록 */}
          <MyPage.Section title={`찜 목록 (${wishlistItems.length})`}>
            {wishLoading && <p>불러오는 중...</p>}
            {wishError && <p style={{ color: "red" }}>{wishError}</p>}
            {!wishLoading && wishlistItems.length === 0 && <p style={{ color: "#999" }}>찜한 작품이 없습니다.</p>}
            {wishlistItems.map((item) => (
              <MyPage.Product
                key={item.wishlistId}
                id={item.artworkId}
                title={item.title}
                price={item.price}
                image={item.thumbnailImageUrl}
              />
            ))}
          </MyPage.Section>

          {/* 장바구니 */}
          <MyPage.Section title={`카트 (${cartItems.length})`}>
            {cartLoading && <p>불러오는 중...</p>}
            {cartItems.length === 0 && <p style={{ color: "#999" }}>장바구니가 비어 있습니다.</p>}
            {cartItems.map((item) => (
              <MyPage.Product
                key={item.cartItemId}
                id={item.artworkId}
                title={item.title}
                price={Number(item.price)}
                image={item.thumbnailImageUrl}
              />
            ))}
          </MyPage.Section>

          {/* 구매 이력 */}
          <MyPage.Section title="구매 이력">
            <PurchaseHistoryContent />
          </MyPage.Section>

          {/* 문의 사항 */}
          <MyPage.Section title={`문의사항 (${inquiryItems.length})`}>
            {inqLoading && <p>불러오는 중...</p>}
            {inquiryItems.length === 0 && <p style={{ color: "#999" }}>문의 이력이 없습니다.</p>}
            {inquiryItems.map((q) => (
              <MyPage.Product
                key={q.inquiryId}
                id={q.inquiryId}
                titleLabel="문의제목"
                title={q.title}
                dateLabel="문의일"
                date={new Date(q.createdAt).toLocaleDateString()}
                hideImage={true}
              />
            ))}
          </MyPage.Section>

        </MyPage.Content>
      </MyPage>
    </PageWrapper>
  );
};