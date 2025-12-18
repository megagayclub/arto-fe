import React, { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { ProductDetailType, useArtworkDetail } from "../../hooks/useArtworkDetail";
import { useAddToCart } from "../../hooks/useAddToCart";
import { useInquiry } from "../../hooks/useInquiry"; // ✅ 새 커스텀 훅 임포트
import * as S from "./ProductDetailStyles";

const ICON_INQUIRY = "✉️";

const ProductInfoTable: React.FC<{ data: ProductDetailType }> = ({ data }) => {
  const infoRows = [
    { label: "작품명 | Title", value: data.title },
    { label: "작가명 | Artist", value: data.artist },
    { label: "사이즈 | Size", value: data.size },
    { label: "배송비 | Shipping Cost", value: `${data.shippingCost.toLocaleString()}₩` },
    { label: "배송방법 | Shipping", value: data.shippingMethod },
  ];

  return (
    <S.InfoTable>
      {infoRows.map((row, index) => (
        <S.InfoRow key={index}>
          <span>{row.label}</span>
          <span>{row.value}</span>
        </S.InfoRow>
      ))}
    </S.InfoTable>
  );
};

export const ProductDetailLayout: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const artworkId = Number(id);
  
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const inquiryRef = useRef<HTMLDivElement>(null);

  const { artworkDetail: product, isLoading, error } = useArtworkDetail(artworkId);
  const { addToCart, isLoading: adding, error: addError } = useAddToCart();

  const handleAddToCart = async () => {
    const ok = await addToCart(artworkId);
    if (ok) alert("장바구니에 담았습니다!");
  };

  const toggleInquiry = () => {
    setIsInquiryOpen((prev) => !prev);
    if (!isInquiryOpen) {
      setTimeout(() => {
        inquiryRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  };

  if (isLoading) return <S.PageLayout><S.MainContent><p>로딩 중...</p></S.MainContent></S.PageLayout>;
  if (error || !id || isNaN(artworkId)) return <S.PageLayout><S.MainContent><p style={{ color: "red" }}>오류 발생</p></S.MainContent></S.PageLayout>;
  if (!product) return null;

  return (
    <S.PageLayout>
      <S.Container>
        <S.MainContent>
          <S.ImageArea>
            <img src={product.imagePlaceholder} alt={product.title} />
            <p>©{product.year} {product.artist}. All rights reserved.</p>
          </S.ImageArea>

          <S.InfoArea>
            <S.Title>작품명 | Title</S.Title>
            <S.ArtistName>{product.title}</S.ArtistName>

            <ProductInfoTable data={product} />

            <S.Title>판매가격 | Price</S.Title>
            <S.PriceText>{product.price.toLocaleString()}₩</S.PriceText>

            {addError && <p style={{ color: "red", fontSize: "12px" }}>{addError}</p>}

            <S.ButtonGroup>
              <S.ActionButton onClick={toggleInquiry} $active={isInquiryOpen}>
                {ICON_INQUIRY}&nbsp;<span>{isInquiryOpen ? "문의닫기" : "문의하기"}</span>
              </S.ActionButton>

              <S.BuyButton onClick={handleAddToCart} disabled={adding}>
                {adding ? "처리 중..." : "카트에 넣기"}
              </S.BuyButton>
            </S.ButtonGroup>
          </S.InfoArea>
        </S.MainContent>

        {isInquiryOpen && (
          <S.InquirySection ref={inquiryRef}>
            <S.InquiryTitle>작품 문의하기 | Inquiry</S.InquiryTitle>
            <p>작품에 대해 궁금한 점을 남겨주시면 작가님 혹은 담당 갤러리에서 답변을 드립니다.</p>
            <S.InquiryForm>
              <textarea placeholder="문의 내용을 상세히 입력해주세요." />
              <S.SubmitButton onClick={() => alert("문의가 발송되었습니다.")}>
                문의 보내기
              </S.SubmitButton>
            </S.InquiryForm>
          </S.InquirySection>
        )}
      </S.Container>
    </S.PageLayout>
  );
};