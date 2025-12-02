// src/components/ProductDetail/ProductDetailStyles.ts
import styled from "styled-components";

export const PageLayout = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #fff;
  font-family: Arial, sans-serif;
`;

// --- 사이드바 영역 ---

export const LeftSidebar = styled.div`
  width: 50px; /* 고정된 좁은 너비 */
  background-color: #000;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
`;

export const SidebarIcon = styled.div`
  padding: 15px 0;
  cursor: pointer;
  font-size: 20px;
  opacity: 0.7;
  transition: opacity 0.2s;

  &:hover {
    opacity: 1;
  }
`;

export const HamburgerMenu = styled(SidebarIcon)`
  margin-bottom: 20px;
  font-size: 24px;
`;

// --- 메인 콘텐츠 영역 ---

export const MainContent = styled.div`
  flex-grow: 1;
  display: flex;
  padding: 40px;
`;

export const ImageArea = styled.div`
  flex: 1;
  padding-right: 40px;

  img {
    width: 100%;
    max-width: 600px;
    height: auto;
    background-color: #f0f0f0; /* 플레이스홀더 배경 */
    border: 1px solid #eee;
  }
`;

export const InfoArea = styled.div`
  width: 350px; /* 정보 영역 고정 너비 */
  padding-left: 20px;
`;

// --- 정보 테이블 ---

export const Title = styled.h1`
  font-size: 26px;
  font-weight: normal;
  margin-bottom: 5px;
  color: #333;
`;

export const ArtistName = styled.h2`
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 30px;
  color: #666;
`;

export const InfoTable = styled.div`
  margin-bottom: 30px;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
`;

export const InfoRow = styled.div`
  display: flex;
  padding: 8px 0;
  border-top: 1px solid #eee;

  span:first-child {
    flex-basis: 100px;
    font-weight: normal;
    color: #666;
    font-size: 14px;
  }

  span:last-child {
    flex-grow: 1;
    font-weight: 500;
    color: #333;
    font-size: 14px;
  }
`;

// --- 가격 및 버튼 ---

export const PriceText = styled.div`
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 25px;
  color: #a00;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;

export const BuyButton = styled.button`
  flex-grow: 1;
  padding: 12px 20px;
  background-color: #ccc; /* 이미지와 유사한 회색 */
  border: none;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #a0a0a0;
  }
`;

export const ActionButton = styled(BuyButton)`
  flex-grow: 0;
  width: 120px;
  background-color: #fff;
  border: 1px solid #ccc;
  color: #333;

  &:hover {
    background-color: #f5f5f5;
  }
`;
