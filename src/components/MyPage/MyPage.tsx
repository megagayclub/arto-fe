import React, { ReactNode } from "react";
import { MyPageProvider, useMyPage } from "./MyPageContext";
import { useAuth } from "../../context/AuthContext";
import {
  LayoutContainer,
  SidebarContainer,
  ContentContainer,
  AccountInfoBox,
  Button,
  MyMenu,
  MenuItem,
  OrderSummaryContainer,
  StatusItem,
  SectionWrapper,
  SectionHeader,
  SectionContent,
  ProductItemWrapper,
  ProductImage,
  ProductInfo,
} from "./MyPageStyles";

// --- 하위 컴포넌트 정의 ---

interface ProductProps {
  id: number;
  title: string;
  titleLabel?: string;
  date?: string;
  dateLabel?: string;
  price?: number;
  image?: string;
  hideImage?: boolean;
  children?: ReactNode; // 🌟 추가: 삭제 버튼 등 액션 버튼을 넣을 공간
}

const ProductItem: React.FC<ProductProps> = ({
  title,
  titleLabel,
  date,
  dateLabel,
  price,
  image,
  hideImage,
  children, // 🌟 children 비구조화 할당
}) => (
  <ProductItemWrapper>
    {!hideImage && (
      <ProductImage>
        {image && (
          <img
            src={image}
            alt={title}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        )}
      </ProductImage>
    )}

    <ProductInfo>
      {date && <p>{dateLabel ?? "작품등록일"}: {date}</p>}
      <p>{titleLabel ?? "작품명"}: {title}</p>
      {typeof price === "number" && (
        <span>가격: {price.toLocaleString()}₩</span>
      )}
    </ProductInfo>

    {/* 🌟 장바구니 삭제 버튼이 렌더링될 위치 */}
    {children && (
      <div style={{ marginLeft: "auto", display: "flex", alignItems: "center" }}>
        {children}
      </div>
    )}
  </ProductItemWrapper>
);

// ... OrderSummary, MySidebarMenu, MySection 코드는 동일 (생략 가능하나 유지함) ...
const OrderSummary: React.FC = () => {
  const statuses = [
    { label: "결제진행 / 완료", count: 0 },
    { label: "배송준비 중", count: 0 },
    { label: "배송중", count: 0 },
    { label: "배송완료", count: 0 },
  ];
  return (
    <OrderSummaryContainer>
      {statuses.map((s) => (
        <StatusItem key={s.label}>
          <p>{s.label}</p>
          <span>{s.count}</span>
        </StatusItem>
      ))}
    </OrderSummaryContainer>
  );
};

const MySidebarMenu: React.FC = () => {
  const { activeSection, setActiveSection } = useMyPage();
  const { userEmail } = useAuth();
  const menuItems: { label: string; key: "favorites" | "cart" | "history" | "inquiry"; }[] = [
    { label: "MY", key: "favorites" },
    { label: "카트", key: "cart" },
    { label: "구매이력", key: "history" },
    { label: "문의사항", key: "inquiry" },
  ];
  return (
    <>
      <AccountInfoBox>
        <h3>회원정보</h3>
        <p>E-mail(ID):</p>
        <p><strong>{userEmail || "로그인 정보 없음"}</strong></p>
        <Button>비밀번호 변경</Button>
        <Button>회원 탈퇴</Button>
      </AccountInfoBox>
      <MyMenu>
        {menuItems.map((item) => (
          <MenuItem
            key={item.key}
            $active={activeSection === item.key}
            onClick={() => setActiveSection(item.key)}
          >
            <span>{item.label}</span>
            <span>+</span>
          </MenuItem>
        ))}
      </MyMenu>
    </>
  );
};

const MySection: React.FC<SectionProps> = ({ title, children }) => (
  <SectionWrapper>
    <SectionHeader>
      <span>{title}</span>
      <span>+</span>
    </SectionHeader>
    <SectionContent>{children}</SectionContent>
  </SectionWrapper>
);

interface SectionProps { title: string; children: ReactNode; }
interface MyPageLayoutProps { children: ReactNode; }

const MyPageLayoutBase: React.FC<MyPageLayoutProps> = ({ children }) => (
  <MyPageProvider>
    <LayoutContainer>{children}</LayoutContainer>
  </MyPageProvider>
);

export const MyPage = Object.assign(MyPageLayoutBase, {
  Sidebar: MySidebarMenu,
  Content: ContentContainer,
  Order: OrderSummary,
  Section: MySection,
  Product: ProductItem,
});