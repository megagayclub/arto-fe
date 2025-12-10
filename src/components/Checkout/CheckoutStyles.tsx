// src/components/Checkout/CheckoutStyles.ts
import styled, { css } from "styled-components";

// --- 기본 레이아웃 ---
export const LayoutContainer = styled.div`
  max-width: 1200px;
  margin: 50px auto;
  padding: 0 20px;
  font-family: Arial, sans-serif;
`;

export const MainGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr; /* 좌측 입력폼 2, 우측 결제요약 1 */
  gap: 30px;
`;

// --- 공통 섹션 스타일 ---
export const SectionWrapper = styled.div`
  margin-bottom: 30px;
  padding: 20px;
  border: 1px solid #ddd;
  background-color: #fff;
`;

export const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
`;

// --- 좌측 (입력 및 선택) 영역 ---
export const InputColumn = styled.div`
  /* Left Column Container */
`;

export const InfoBlock = styled.div`
  /* 주문자 정보, 배송지 정보 등 */
  margin-bottom: 20px;
`;

export const FormRow = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 10px;
  align-items: center;

  > label {
    flex-basis: 80px;
    font-size: 14px;
    color: #333;
    flex-shrink: 0;
  }

  > div {
    flex-grow: 1;
    display: flex;
    gap: 5px;
    align-items: center;
  }
`;

export const InputField = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  font-size: 14px;
  width: 100%;
`;

export const SelectBox = styled.select`
  padding: 10px;
  border: 1px solid #ccc;
  font-size: 14px;
  width: 100%;
`;

// --- 결제 방식 ---
export const PaymentMethod = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 15px;
`;

export const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  font-size: 14px;
  gap: 8px;
  cursor: pointer;
`;

// --- 우측 (결제 요약) 영역 ---
export const SummaryColumn = styled.div`
  background-color: #f9f9f9;
  padding: 20px;
  border: 1px solid #eee;
  height: fit-content;
`;

export const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  font-size: 14px;
  border-bottom: 1px dashed #ddd;

  &:last-of-type {
    border-bottom: none;
    font-weight: bold;
    font-size: 16px;
    margin-top: 10px;
    padding-top: 10px;
    border-top: 2px solid #333;
  }
`;

export const FinalPrice = styled.div`
  font-size: 26px;
  font-weight: bold;
  color: #333;
  text-align: right;
  margin-top: 20px;
`;

export const FinalButton = styled.button`
  width: 100%;
  padding: 15px;
  background-color: #333;
  color: #fff;
  border: none;
  font-size: 16px;
  font-weight: bold;
  margin-top: 20px;
  cursor: pointer;

  &:hover {
    background-color: #555;
  }
`;

// --- 상품 요약 ---
export const ProductSummaryBlock = styled.div`
  padding: 15px 0;
  margin-bottom: 20px;
  border-bottom: 1px solid #ddd;
`;

export const ProductInfo = styled.div`
  display: flex;
  gap: 10px;

  div:first-child {
    width: 80px;
    height: 80px;
    background: #ccc;
    flex-shrink: 0;
  }

  p {
    font-size: 13px;
    color: #666;
  }
  span {
    display: block;
    font-weight: bold;
    color: #333;
  }
`;
