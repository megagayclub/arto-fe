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

  if (isLoading) return <p>注文履歴を読み込み中...</p>;

  if (error) {
    return (
      <p style={{ color: "red" }}>
        注文履歴の取得中にエラーが発生しました: {error}
      </p>
    );
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
        <p>注文履歴はありません。</p>
        <p style={{ fontSize: "12px", marginTop: "10px" }}>
          Artoの素敵な作品をコレクションしてみませんか？
        </p>
      </div>
    );
  }

  return (
    <>
      {orders.map((o) => {
        const isPaid = o.paymentStatus === "CONFIRMED" && !!o.paymentDate;

        const dateLabel = isPaid ? "購入日" : "注文日";
        const date = isPaid ? formatDate(o.paymentDate) : formatDate(o.orderDate);

        const payLabel =
          !o.paymentStatus
            ? "決済情報なし"
            : o.paymentStatus === "PENDING"
            ? "決済待ち"
            : o.paymentStatus === "CONFIRMED"
            ? "決済完了"
            : o.paymentStatus;

        return (
          <MyPage.Product
            key={o.orderId}
            id={o.orderId}
            title={`${o.artworkTitle}（${payLabel} / ${o.orderStatus}）`}
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

  // 🎯 전체 주문 처리 핸들러
  const handleOrderAll = async () => {
    if (cartItems.length === 0) return;
    if (!cart?.userId) {
      alert("로그인 세션이 만료되었습니다. 다시 로그인해주세요.");
      return;
    }

    if (!window.confirm(`총 ${cartItems.length}개의 작품을 결제하시겠습니까?`)) return;

    try {
      // 배송지 정보는 실제 서비스에서 폼 입력을 받아야 하지만, 여기서는 기본값을 사용합니다.
      const request = {
        shippingAddress: "등록된 기본 배송지",
        receiverName: "구매자",
        receiverPhone: "010-0000-0000"
      };

      await checkout(cart.userId, request);
      alert("주문이 정상적으로 완료되었습니다!");
      window.location.reload(); // 상태 업데이트를 위해 새로고침 혹은 navigate 활용
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <PageWrapper>
      <MyPage>
        <MyPage.Content>
          {/* 상단 대시보드 */}
          <TopDashboard>
            <InfoCard>
              <h3>会員情報</h3>
              <div className="content">
                <p>E-mail（ID）</p>
                <p>{userEmail || "ログインが必要です。"}</p>
              </div>
            </InfoCard>
            <MyPage.Order /> 
          </TopDashboard>

          {/* 찜 목록 */}
          <MyPage.Section title={`ウィッシュリスト (${wishlistItems.length})`}>
            {wishLoading && <p>読み込み中...</p>}
            {wishError && <p style={{ color: "red" }}>{wishError}</p>}
            {!wishLoading && wishlistItems.length === 0 && (
              <p style={{ color: "#999" }}>登録された作品はありません。</p>
            )}
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
          <MyPage.Section title={`カート (${cartItems.length})`}>
            {cartLoading && <p>読み込み中...</p>}
            {cartItems.length === 0 && (
              <p style={{ color: "#999" }}>登録された作品はありません。</p>
            )}
            {cartItems.map((item) => (
              <MyPage.Product
                key={item.cartItemId}
                id={item.artworkId}
                title={item.title}
                price={Number(item.price)}
                image={item.thumbnailImageUrl}
              >
                <DeleteButton onClick={() => removeItem(item.cartItemId)}>
                  削除
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
          </MyPage.Section>

          {/* 구매 이력 */}
          <MyPage.Section title="注文 / 購入履歴">
            <PurchaseHistoryContent />
          </MyPage.Section>

          {/* 문의 사항 */}
          <MyPage.Section title={`お問い合わせ (${inquiryItems.length})`}>
            {inqLoading && <p>読み込み中...</p>}
            {inquiryItems.length === 0 && (
              <p style={{ color: "#999" }}>お問い合わせ履歴はありません。</p>
            )}
            {inquiryItems.map((q) => (
              <MyPage.Product
                key={q.inquiryId}
                id={q.inquiryId}
                titleLabel="お問い合わせ件名"
                title={q.title}
                dateLabel="お問い合わせ日"
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