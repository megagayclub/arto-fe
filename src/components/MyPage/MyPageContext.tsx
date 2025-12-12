// src/components/MyPage/MyPageContent.tsx

import React from "react";
import { MyPage } from "./MyPage";
import { useMyPage } from "./MyPageContext";
import { useMyWishlist } from "../../hooks/useMyWishlist";

const MyPageContent: React.FC = () => {
  // 사이드바에서 어떤 탭이 선택되었는지
  const { activeSection } = useMyPage();

  // 찜 목록 API 훅
  const { wishlist, isLoading, error } = useMyWishlist();

  return (
    <MyPage>
      {/* 왼쪽 사이드바 */}
      <MyPage.Sidebar />

      {/* 오른쪽 메인 콘텐츠 영역 */}
      <MyPage.Content>
        {/* 주문 상태 요약 (지금은 더미, 나중에 orders API랑 연결 가능) */}
        <MyPage.Order />

        {/* 1. 찜 목록 섹션 - activeSection 이 'favorites' 일 때만 표시 */}
        {activeSection === "favorites" && (
          <MyPage.Section title={`찜 목록 (${wishlist.length})`}>
            {isLoading && <p>불러오는 중...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}

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
        )}

        {/* 2. 장바구니 섹션 (아직 더미) */}
        {activeSection === "cart" && (
          <MyPage.Section title="장바구니">
            <p
              style={{
                fontSize: "12px",
                color: "#888",
              }}
            >
              장바구니 콘텐츠가 여기에 들어갑니다.
            </p>
          </MyPage.Section>
        )}

        {/* 3. 구매 이력 섹션 (아직 더미) */}
        {activeSection === "history" && (
          <MyPage.Section title="구매 이력">
            <p
              style={{
                fontSize: "14px",
                color: "#999",
                textAlign: "center",
              }}
            >
              구매 이력이 없습니다.
            </p>
          </MyPage.Section>
        )}

        {/* 4. 문의 이력 섹션 (아직 더미) */}
        {activeSection === "inquiry" && (
          <MyPage.Section title="문의 이력">
            <p
              style={{
                fontSize: "14px",
                color: "#999",
                textAlign: "center",
              }}
            >
              문의 이력이 없습니다.
            </p>
          </MyPage.Section>
        )}
      </MyPage.Content>
    </MyPage>
  );
};

export default MyPageContent;
