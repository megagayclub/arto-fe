// src/components/MyPage/MyPageStyles.ts
import styled, { css } from "styled-components";

// --- 기본 레이아웃 ---
export const LayoutContainer = styled.div`
  max-width: 1200px;
  margin: 50px auto;
  padding: 0 20px;
  display: flex;
  gap: 30px;
  font-family: Arial, sans-serif;
`;

export const SidebarContainer = styled.div`
  width: 200px;
  flex-shrink: 0;
`;

export const ContentContainer = styled.div`
  flex-grow: 1;
`;

// --- 사이드바 요소 ---
export const AccountInfoBox = styled.div`
  background: #000;
  color: #fff;
  padding: 20px;
  margin-bottom: 20px;
  height: 300px;

  h3 {
    font-size: 16px;
    margin-bottom: 10px;
  }
  p {
    font-size: 14px;
    margin-bottom: 5px;
  }
`;

export const Button = styled.button`
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  background: none;
  border: 1px solid #fff;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background: #333;
  }
`;

export const MyMenu = styled.div`
  border: 1px solid #eee;
`;

export const MenuItem = styled.div<{ $active: boolean }>`
  display: flex;
  justify-content: space-between;
  padding: 12px 15px;
  font-size: 14px;
  cursor: pointer;
  border-bottom: 1px solid #eee;
  font-weight: ${(props) => (props.$active ? "bold" : "normal")};
  background-color: ${(props) => (props.$active ? "#f5f5f5" : "#fff")};

  &:hover {
    background-color: #f9f9f9;
  }
`;

// --- 콘텐츠 요소 ---
export const SectionWrapper = styled.div`
  margin-bottom: 40px;
  border: 1px solid #eee;
`;

export const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 15px 20px;
  background: #f9f9f9;
  font-weight: bold;
  border-bottom: 1px solid #eee;
  cursor: pointer;
`;

export const SectionContent = styled.div`
  padding: 20px;
`;

// --- 주문 상태 요약 ---
export const OrderSummaryContainer = styled(SectionWrapper)`
  display: flex;
  border: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  background: #f9f9f9;
  margin-bottom: 30px;
`;

export const StatusItem = styled.div`
  flex: 1;
  text-align: center;
  padding: 20px 0;
  border-right: 1px solid #ddd;

  &:last-child {
    border-right: none;
  }

  p:first-child {
    font-size: 14px;
    color: #666;
    margin-bottom: 10px;
  }

  span {
    display: block;
    font-size: 24px;
    font-weight: bold;
    color: #333;
  }
`;

// --- 상품 목록 요소 ---
export const ProductItemWrapper = styled.div`
  display: flex;
  padding: 15px 0;
  border-bottom: 1px solid #eee;
`;

export const ProductImage = styled.div`
  width: 80px;
  height: 80px;
  background: #eee;
  margin-right: 15px;
`;

export const ProductInfo = styled.div`
  flex-grow: 1;

  p {
    font-size: 13px;
    color: #666;
    margin-bottom: 4px;
  }
  span {
    font-size: 14px;
    font-weight: bold;
  }
`;
