import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

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

const OrderAllButton = styled.button`
  background-color: #222;
  color: #fff;
  border: none;
  padding: 12px 24px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  border-radius: 4px;
  margin-top: 17px;
  transition: background 0.2s;
  
  &:hover {
    background-color: #444;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  span {
    color: #ffcc00; /* 금액 부분 강조색 */
    margin-right: 4px;
  }
`;

const OrderPrice = styled.div`
  color: #363636ff;
  padding: 12px 24px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 17px; 
`

// --- 구매이력 콘텐츠 컴포넌트 ---
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
  const navigate = useNavigate();
  const { userEmail } = useAuth();
  
  const { wishlist, isLoading: wishLoading, error: wishError } = useMyWishlist();
  const wishlistItems = Array.isArray(wishlist) ? wishlist : [];

  const { cart, isLoading: cartLoading, removeItem } = useMyCart();
  const cartItems = cart?.items ?? [];

  const { inquiries, isLoading: inqLoading, error: inqError } = useMyInquiries();
  const inquiryItems = Array.isArray(inquiries) ? inquiries : [];

  // 💰 장바구니 총액 계산 로직
  const totalCartPrice = cartItems.reduce((acc, item) => acc + Number(item.price), 0);

  // 주문 처리 핸들러
  const handleOrderAll = async () => {
    navigate("/checkout/")
  };

  return (
    <PageWrapper>
      <MyPage>
        <MyPage.Content>
          {/* 상단 대시보드 */}
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

          {/* 찜 목록 섹션 */}
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

          {/* 장바구니 섹션 */}
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
              >
                <DeleteButton onClick={() => removeItem(item.cartItemId)}>
                  삭제
                </DeleteButton>
              </MyPage.Product>
            ))}
            
            {cartItems.length > 0 && (
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <OrderPrice>
                  총 <span>{totalCartPrice.toLocaleString()}원</span>

                </OrderPrice>
                <OrderAllButton onClick={handleOrderAll}>
                   주문하기
                </OrderAllButton>
              </div>
            )}
          </MyPage.Section>

          {/* 구매 이력 섹션 */}
          <MyPage.Section title="구매 이력">
            <PurchaseHistoryContent />
          </MyPage.Section>

          {/* 문의 사항 섹션 */}
          <MyPage.Section title={`문의사항 (${inquiryItems.length})`}>
            {inqLoading && <p>불러오는 중...</p>}
            {inqError && <p style={{ color: "red" }}>{inqError}</p>}
            {!inqLoading && inquiryItems.length === 0 && <p style={{ color: "#999" }}>문의 이력이 없습니다.</p>}
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