// src/components/MyPage/MyPageLayout.tsx
import React from "react";
import styled from "styled-components";

import { useAuth } from "../../context/AuthContext";
import { MyPage } from "./MyPage";
import { TopDashboard, InfoCard } from "./MyPageStyles";

import { useMyWishlist } from "../../hooks/useMyWishlist";
import { useMyCart } from "../../hooks/useMyCart";
import { useMyOrders } from "../../hooks/useMyOrders";
import { useMyInquiries } from "../../hooks/useMyInquiries";

const PageWrapper = styled.div`
  padding: 20px 0;
  min-height: calc(100vh - 80px);
  background-color: #fff;
`;

// 삭제 버튼 전용 스타일 (styled-components)
const DeleteButton = styled.button`
  background: none;
  border: 1px solid #ddd;
  padding: 6px 12px;
  font-size: 12px;
  color: #666;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #f5f5f5;
    color: #ff4d4f;
    border-color: #ff4d4f;
  }
`;

const PurchaseHistoryContent: React.FC = () => {
  const { orders, isLoading, error } = useMyOrders();

  if (isLoading) return <p>주문 이력 불러오는 중...</p>;

  if (error) {
    return (
      <p style={{ color: "red" }}>
        주문 이력을 불러오는 중 오류가 발생했습니다: {error}
      </p>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "30px 0", color: "#999" }}>
        <p>주문 이력이 없습니다.</p>
        <p style={{ fontSize: "12px", marginTop: "10px" }}>
          Arto의 멋진 작품을 컬렉션 해보세요!
        </p>
      </div>
    );
  }

  const toNumber = (v: any) => (typeof v === "number" ? v : Number(v));

  const formatDate = (v?: string | null) => {
    if (!v) return "";
    const d = new Date(v);
    return isNaN(d.getTime()) ? v : d.toLocaleDateString();
  };

  return (
    <>
      {orders.map((o) => {
        const isPaid = o.paymentStatus === "CONFIRMED" && !!o.paymentDate;

        const dateLabel = isPaid ? "구매일" : "주문일";
        const date = isPaid ? formatDate(o.paymentDate) : formatDate(o.orderDate);

        // 결제 상태 텍스트(선택)
        const payLabel =
          !o.paymentStatus
            ? "결제정보없음"
            : o.paymentStatus === "PENDING"
            ? "결제대기"
            : o.paymentStatus === "CONFIRMED"
            ? "결제완료"
            : o.paymentStatus;

        return (
          <MyPage.Product
            key={o.orderId}
            id={o.orderId}
            title={`${o.artworkTitle} (${payLabel} / ${o.orderStatus})`}
            dateLabel={dateLabel}
            date={date}
            price={Number.isFinite(toNumber(o.totalAmount)) ? toNumber(o.totalAmount) : undefined}
            image={o.thumbnailUrl ?? undefined}
          />
        );
      })}
    </>
  );
};

export const MyPageLayout: React.FC = () => {
  const { userEmail } = useAuth();
  
  const { wishlist, isLoading: wishLoading, error: wishError } = useMyWishlist();
  const wishlistItems = Array.isArray(wishlist) ? wishlist : [];

  // 🌟 removeItem 함수 추가 추출
  const { cart, isLoading: cartLoading, removeItem } = useMyCart();
  const cartItems = cart?.items ?? [];

  const { inquiries, isLoading: inqLoading, error: inqError } = useMyInquiries();
  const inquiryItems = Array.isArray(inquiries) ? inquiries : [];

  return (
    <PageWrapper>
      <MyPage>
        <MyPage.Content>
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
                // 🌟 삭제 버튼 추가 (MyPage.Product 컴포넌트 내부에 children을 렌더링하도록 구현되어 있어야 함)
              >
                <DeleteButton onClick={() => removeItem(item.cartItemId)}>
                  삭제
                </DeleteButton>
              </MyPage.Product>
            ))}
          </MyPage.Section>
          {/* 2-4. 구매 이력 섹션 (API 연동) */}
          <MyPage.Section title="주문 / 구매 이력">

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