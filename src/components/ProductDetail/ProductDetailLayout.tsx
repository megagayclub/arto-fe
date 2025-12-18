import React, { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { ProductDetailType, useArtworkDetail } from "../../hooks/useArtworkDetail";
import { useAddToCart } from "../../hooks/useAddToCart";
import { useInquiry } from "../../hooks/useInquiry"; 
import * as S from "./ProductDetailStyles";

const ICON_INQUIRY = "✉️";

// 문의 카테고리 옵션
const CATEGORIES = [
  { value: "SHIPPING", label: "배송 문의" },
  { value: "PRODUCT_ISSUE", label: "상품문제" },
  { value: "OTHER", label: "기타 문의" },
];

// 상단 상세 정보 테이블 컴포넌트 (작품명, 작가명, 사이즈 등)
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
  
  // ✅ 상태 관리 (문의 섹션 및 입력 폼)
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [inquiryData, setInquiryData] = useState({
    title: "",
    category: "SHIPPING",
    content: ""
  });

  const inquiryRef = useRef<HTMLDivElement>(null);

  // ✅ 커스텀 훅 연결
  const { artworkDetail: product, isLoading, error } = useArtworkDetail(artworkId);
  const { addToCart, isLoading: adding } = useAddToCart();
  const { submitInquiry, isLoading: submitting, error: inquiryError } = useInquiry();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setInquiryData(prev => ({ ...prev, [name]: value }));
  };

  const toggleInquiry = () => {
    setIsInquiryOpen((prev) => !prev);
    if (!isInquiryOpen) {
      setTimeout(() => {
        inquiryRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  };

  const handleAddToCart = async () => {
    const ok = await addToCart(artworkId);
    if (ok) alert("장바구니에 담았습니다!");
  };

  const handleSubmitInquiry = async () => {
    const { title, content, category } = inquiryData;

    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 모두 입력해주세요.");
      return;
    }

    const success = await submitInquiry({
      artworkId,
      title,
      category,
      content,
    });

    if (success) {
      alert("문의가 성공적으로 등록되었습니다.");
      setInquiryData({ title: "", category: "", content: "" });
      setIsInquiryOpen(false);
    }
  };

  if (isLoading) return <S.PageLayout><S.MainContent><p>작품 정보를 불러오는 중입니다...</p></S.MainContent></S.PageLayout>;
  if (error || !id || isNaN(artworkId)) return <S.PageLayout><S.MainContent><p style={{ color: "red" }}>오류 발생: {error || "잘못된 접근입니다."}</p></S.MainContent></S.PageLayout>;
  if (!product) return null;

  return (
    <S.PageLayout>
      <S.Container>
        <S.MainContent>
          {/* 왼쪽: 이미지 영역 */}
          <S.ImageArea>
            <img src={product.imagePlaceholder} alt={product.title} />
            <p>©{product.year} {product.artist}. All rights reserved.</p>
          </S.ImageArea>

          {/* 오른쪽: 정보 및 구매 영역 */}
          <S.InfoArea>
            <S.Title>작품명 | Title</S.Title>
            <S.ArtistName>{product.title}</S.ArtistName>

            {/* ✅ 여기에 처음에 요청하신 정보 테이블이 들어갑니다 */}
            <ProductInfoTable data={product} />

            <S.Title>판매가격 | Price</S.Title>
            <S.PriceText>{product.price.toLocaleString()}₩</S.PriceText>

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

        {/* ✅ 하단: 문의하기 섹션 (제목/카테고리/내용 포함) */}
        {isInquiryOpen && (
          <S.InquirySection ref={inquiryRef}>
            <S.InquiryTitle>작품 문의하기 | Inquiry</S.InquiryTitle>
            <p>작품에 대해 궁금한 점을 남겨주시면 작가님 혹은 담당 갤러리에서 답변을 드립니다.</p>
            
            <S.InquiryForm>
              {/* 카테고리 선택 */}
              <select 
                name="category" 
                value={inquiryData.category} 
                onChange={handleInputChange}
                disabled={submitting}
              >
                {CATEGORIES.map(cat => (
                  <option key={cat.value} value={cat.value}>{cat.label}</option>
                ))}
              </select>

              {/* 제목 입력 */}
              <input 
                type="text"
                name="title"
                placeholder="문의 제목을 입력해주세요."
                value={inquiryData.title}
                onChange={handleInputChange}
                disabled={submitting}
              />

              {/* 내용 입력 */}
              <textarea 
                name="content"
                placeholder="문의 내용을 상세히 입력해주세요." 
                value={inquiryData.content}
                onChange={handleInputChange}
                disabled={submitting}
              />
              
              {inquiryError && <p style={{ color: "red", fontSize: "13px" }}>{inquiryError}</p>}
              
              <S.SubmitButton 
                onClick={handleSubmitInquiry} 
                disabled={submitting}
              >
                {submitting ? "보내는 중..." : "문의 보내기"}
              </S.SubmitButton>
            </S.InquiryForm>
          </S.InquirySection>
        )}
      </S.Container>
    </S.PageLayout>
  );
};