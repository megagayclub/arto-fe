import React from "react";
import styled, { keyframes } from "styled-components";
import { LikeButton } from "../Common/LikeButton"; 
import { useLikeToggle } from "../../hooks/useLikeToggle"; 
import { useAddToCart } from "../../hooks/useAddToCart"; // 

// --- 스타일 정의 (기존 180줄 디자인 그대로) ---

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const PageLayout = styled.div`
  display: flex;
  justify-content: center;
  min-height: 100vh;
  background-color: #fff;
  font-family: "Noto Sans KR", Arial, sans-serif;
  padding: 80px 20px;
`;

export const Container = styled.div`
  max-width: 1100px;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const MainContent = styled.div`
  display: flex;
  width: 100%;
  padding-top: 50px;
  gap: 60px;
  @media (max-width: 768px) { flex-direction: column; align-items: center; }
`;

export const ImageArea = styled.div`
  flex: 1.2;
  img {
    width: 100%;
    height: 700px;
    max-height: 75vh;
    object-fit: cover;
    background-color: #fafafa;
    border: 1px solid #f0f0f0;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  }
  p { margin-top: 15px; font-size: 13px; color: #999; }
`;

export const InfoArea = styled.div`
  flex: 0.8;
  min-width: 380px;
  display: flex;
  flex-direction: column;
`;

export const Title = styled.h3`
  font-size: 14px;
  font-weight: 600;
  color: #888;
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

export const ArtistName = styled.h2`
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 40px;
  color: #222;
`;

export const InfoTable = styled.div`
  margin-bottom: 40px;
  border-top: 1.5px solid #222;
`;

export const InfoRow = styled.div`
  display: flex;
  padding: 15px 0;
  border-bottom: 1px solid #eee;
  span:first-child { width: 120px; color: #777; font-size: 14px; }
  span:last-child { flex: 1; color: #333; font-size: 15px; font-weight: 500; }
`;

export const PriceText = styled.div`
  font-size: 26px;
  font-weight: 700;
  margin-bottom: 40px;
  color: #333;
  &::after { content: ""; display: block; width: 100%; height: 1px; background: #eee; margin-top: 20px; }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
`;

export const BuyButton = styled.button`
  flex: 2;
  padding: 18px;
  background-color: #222;
  border: none;
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  &:hover { background-color: #444; }
  &:disabled { background-color: #ccc; }
`;

export const ActionButton = styled.button<{ $active?: boolean }>`
  flex: 1;
  padding: 18px;
  background-color: ${props => props.$active ? "#f0f0f0" : "#fff"};
  border: 1px solid ${props => props.$active ? "#222" : "#ddd"};
  color: #333;
  font-size: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  &:hover { background-color: #f9f9f9; }
`;

export const InquirySection = styled.div`
  margin-top: 80px;
  padding-top: 60px;
  border-top: 1px solid #eee;
  animation: ${fadeIn} 0.5s ease-out;
  p { color: #666; font-size: 14px; margin-bottom: 20px; }
`;

export const InquiryTitle = styled.h3`
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 10px;
`;

export const InquiryForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  input, select, textarea {
    width: 100%; padding: 12px 15px; border: 1px solid #ddd;
    border-radius: 4px; font-family: inherit; font-size: 14px;
    &:focus { outline: 1px solid #222; border-color: #222; }
  }
  textarea { height: 150px; resize: none; }
`;

export const SubmitButton = styled.button`
  align-self: flex-end; padding: 12px 30px; background-color: #222;
  color: #fff; border: none; font-weight: 600; cursor: pointer;
  transition: background 0.2s; &:hover { background-color: #444; }
`;

// --- 컴포넌트 로직 (에러 수정 완료) ---

export const ProductDetailLayout: React.FC<{ product: any }> = ({ product }) => {
  const { isLiked, toggleLike } = useLikeToggle(product.isLikedByMe || false, product.artworkId);
  const { addToCart } = useAddToCart(); // 👈 에러 났던 부분 수정 완료

  if (!product) return null;

  return (
    <PageLayout>
      <Container>
        <MainContent>
          <ImageArea>
            <img src={product.thumbnailImageUrl} alt={product.title} />
            <p>© {product.artistName}. All rights reserved.</p>
          </ImageArea>

          <InfoArea>
            <Title>作品名 | TITLE</Title>
            <ArtistName>{product.title}</ArtistName>

            <InfoTable>
              <InfoRow><span>作品名 | Title</span><span>{product.title}</span></InfoRow>
              <InfoRow><span>作家名 | Artist</span><span>{product.artistName}</span></InfoRow>
              <InfoRow><span>サイズ | Size</span><span>{product.dimensions}</span></InfoRow>
              <InfoRow><span>配送費 | Shipping</span><span>{product.shippingCost.toLocaleString()}円</span></InfoRow>
              <InfoRow><span>配送방법 | Method</span><span>{product.shippingMethod}</span></InfoRow>
            </InfoTable>

            <PriceText>
              <span style={{ fontSize: '14px', color: '#888', display: 'block', marginBottom: '8px' }}>販売価格 | PRICE</span>
              {product.price.toLocaleString()}円
            </PriceText>

            <ButtonGroup>
              <ActionButton onClick={() => document.getElementById('inquiry')?.scrollIntoView({ behavior: 'smooth' })}>
                □ 問い合わせ
              </ActionButton>

              <ActionButton 
                $active={isLiked} 
                onClick={toggleLike}
                style={{ flex: "0 0 60px", padding: "0" }} 
              >
                <LikeButton isLiked={isLiked} onToggle={toggleLike} />
              </ActionButton>

              <BuyButton onClick={() => addToCart(product.artworkId)}>
                カートに入れる
              </BuyButton>
            </ButtonGroup>
          </InfoArea>
        </MainContent>

        <InquirySection id="inquiry">
          <InquiryTitle>Product Inquiry</InquiryTitle>
          <p>이 작품에 대해 궁금한 점이 있으신가요? 작가님께 직접 문의해보세요.</p>
          <InquiryForm>
            <textarea placeholder="문의 내용을 입력해주세요." />
            <SubmitButton>送信하기</SubmitButton>
          </InquiryForm>
        </InquirySection>
      </Container>
    </PageLayout>
  );
};