// src/components/MyPage/MyPage.tsx
import React, { ReactNode } from "react";
import { MyPageProvider, useMyPage } from "./MyPageContext";
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

// 1. 작품 항목 컴포넌트 (재사용)
interface ProductProps {
  id: number;
  title: string;
  date: string;
  price: number;
  image: string;
}

const ProductItem: React.FC<ProductProps> = ({ title, date, price }) => (
  <ProductItemWrapper>
    <ProductImage />
    <ProductInfo>
      <p>작품등록일: {date}</p>
      <p>작품명: {title}</p>
      <span>가격: {price.toLocaleString()}₩</span>
    </ProductInfo>
  </ProductItemWrapper>
);

// 2. 주문 상태 요약
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

// 3. 마이 메뉴 (사이드바)
const MySidebarMenu: React.FC = () => {
  const { activeSection, setActiveSection } = useMyPage();

  const menuItems: {
    label: string;
    key: "favorites" | "cart" | "history" | "inquiry";
  }[] = [
    { label: "MY", key: "favorites" }, // MY 대신 '작품 찜'으로 대체 (이미지 기반)
    { label: "카트", key: "cart" },
    { label: "구매이력", key: "history" },
    { label: "문의사항", key: "inquiry" },
  ];

  return (
    <>
      <AccountInfoBox>
        <h3>회원정보</h3>
        <p>E-mail(ID):</p>
        <p>jyc@gmu.ac.kr</p>
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

// 4. 공통 섹션 컴포넌트
interface SectionProps {
  title: string;
  children: ReactNode;
}

const MySection: React.FC<SectionProps> = ({ title, children }) => (
  <SectionWrapper>
    <SectionHeader>
      <span>{title}</span>
      <span>+</span>
    </SectionHeader>
    <SectionContent>{children}</SectionContent>
  </SectionWrapper>
);

// --- Compound Component 구성 ---

interface MyPageLayoutProps {
  children: ReactNode;
}

// Base Component: Context를 제공하고 레이아웃을 정의
const MyPageLayoutBase: React.FC<MyPageLayoutProps> = ({ children }) => {
  return (
    <MyPageProvider>
      <LayoutContainer>{children}</LayoutContainer>
    </MyPageProvider>
  );
};

// 하위 컴포넌트들을 Base에 연결
export const MyPage = Object.assign(MyPageLayoutBase, {
  Sidebar: MySidebarMenu,
  Content: ContentContainer, // 콘텐츠 영역의 레이아웃 컨테이너
  Order: OrderSummary,
  Section: MySection,
  Product: ProductItem,
});

// --- 최종 사용 예시 (App.tsx에 들어갈 내용) ---

/*
const MyPageContent: React.FC = () => {
    return (
        <MyPage.Layout>
            <MyPage.Sidebar />
            
            <MyPage.Content>
                <MyPage.Order />

                { // 1. 찜 목록 섹션
                <MyPage.Section title="찜 목록 (4)">
                    <MyPage.Product id={1} title="작품1" date="2022년 9월 12일" price={48000} image="" />
                    <MyPage.Product id={2} title="작품2" date="2022년 9월 1일" price={35000} image="" />
                </MyPage.Section>
                }
                
                { // 2. 장바구니 섹션
                <MyPage.Section title="장바구니 (1)">
                    <p style={{fontSize: '12px', color: '#888'}}>장바구니 콘텐츠가 여기에 들어갑니다.</p>
                </MyPage.Section>
                }
                
                { // 3. 구매 이력 섹션
                <MyPage.Section title="구매 이력">
                    <p style={{fontSize: '14px', color: '#999', textAlign: 'center'}}>구매 이력이 없습니다.</p>
                </MyPage.Section>
                }

                { // 4. 문의사항 섹션
                <MyPage.Section title="문의 이력">
                    <p style={{fontSize: '14px', color: '#999', textAlign: 'center'}}>문의 이력이 없습니다.</p>
                </MyPage.Section>
                }
            </MyPage.Content>
        </MyPage.Layout>
    );
};
*/
