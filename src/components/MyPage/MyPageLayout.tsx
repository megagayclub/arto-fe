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

  if (isLoading) return <p>注文履歴を読み込み中...</p>;

  if (error) {
    return (
      <p style={{ color: "red" }}>
        注文履歴の取得中にエラーが発生しました: {error}
      </p>
    );
  }

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

export const MyPageLayout: React.FC = () => {
  const { userEmail } = useAuth();
  
  const { wishlist, isLoading: wishLoading, error: wishError } = useMyWishlist();
  const wishlistItems = Array.isArray(wishlist) ? wishlist : [];

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
