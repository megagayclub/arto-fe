import styled from "styled-components";

export const LayoutContainer = styled.div`
  max-width: 1200px;
  margin: 50px auto;
  padding: 90px 20px;
  font-family: "Noto Sans KR", Arial, sans-serif;
`;

export const MainGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 30px;
`;

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

export const InputColumn = styled.div``;

export const InfoBlock = styled.div`
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

// --- 우측 컬럼 전용 추가 스타일 ---

export const SummaryColumn = styled.div`
  height: fit-content;
`;

export const SideSection = styled.div`
  margin-bottom: 40px;
`;

export const SideInfoText = styled.div`
  margin-bottom: 40px;
  
  h4 {
    font-size: 13px;
    font-weight: bold;
    margin-bottom: 8px;
    color: #333;
  }
  
  p {
    font-size: 12px;
    color: #888;
    line-height: 1.6;
    margin: 0;
  }
`;

export const SummaryBox = styled.div`
  background-color: #f9f9f9;
  padding: 25px;
  border: 1px solid #eee;
`;

export const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  font-size: 14px;
  color: #666;

  &.total-row {
    margin-top: 20px;
    padding-top: 20px;
    border-top: 1px solid #ddd;
    color: #333;
    font-weight: bold;
    font-size: 18px;
  }
`;

export const FinalPrice = styled.div`
  font-size: 32px;
  font-weight: bold;
  color: #333;
  text-align: right;
  margin: 10px 0 30px 0;
`;

export const AgreementSection = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;

  label {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 13px;
    color: #333;
    cursor: pointer;
  }

  .sub-agreement {
    padding-left: 26px;
    font-size: 12px;
    color: #888;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
`;

export const FinalButton = styled.button`
  width: 100%;
  padding: 18px;
  background-color: #000;
  color: #fff;
  border: none;
  font-size: 16px;
  font-weight: bold;
  margin-top: 30px;
  cursor: pointer;

  &:hover {
    background-color: #333;
  }
`;

export const ProductSummaryBlock = styled.div`
  padding: 15px 0;
  margin-bottom: 20px;
  border-bottom: 1px solid #ddd;
`;

export const ProductInfo = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 15px;

  div:first-child {
    width: 80px;
    height: 80px;
    background: #f4f4f4;
    flex-shrink: 0;
    overflow: hidden;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  div:last-child {
    display: flex;
    flex-direction: column;
    justify-content: center;
    
    p {
      margin: 0 0 5px 0;
      font-size: 13px;
      color: #666;
      line-height: 1.4;
    }
    
    span {
      display: block;
      font-weight: bold;
      color: #333;
      font-size: 15px;
    }
  }
`;