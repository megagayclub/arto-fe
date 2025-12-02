import React, { useState, useRef, useEffect } from "react";
import styled, { css } from "styled-components";
import {
  MAIN_FILTER_ICONS,
  SPACE_OPTIONS,
  MOOD_OPTIONS,
  COLOR_OPTIONS,
  ETC_OPTIONS,
  SHAPE_OPTIONS,
} from "../../data/FilterData";

// --- 필터 상태 타입 및 초기값 정의 ---
interface FilterStateType {
  space: string;
  mood: string;
  minPrice: number;
  maxPrice: number;
  selectedColor: string;
  etc: string[];
}

const initialFilters: FilterStateType = {
  space: "거실",
  mood: "모던",
  minPrice: 0,
  maxPrice: 1000000,
  selectedColor: "#FF0000",
  etc: [],
};

// --- A. 스타일 정의 ---

// 🌟 수정: 패널 열림/닫힘 상태를 받아 translateX로 이동
const SidebarWrapper = styled.div<{ $isPanelOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  z-index: 1000;
  display: hidden;
  transform: translateX(${(props) => (props.$isPanelOpen ? "0" : "-500px")});
  transition: transform 0.3s ease-in-out;
`;

const IconNav = styled.div`
  width: 50px;
  background-color: #1a1a1a;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 10px;
`;

const IconItem = styled.div<{ $isActive?: boolean }>`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 20px;
  transition: background-color 0.2s;

  ${(props) =>
    props.$isActive &&
    css`
      background-color: #fff;
      color: #1a1a1a;
    `}

  ${(props) =>
    !props.$isActive &&
    css`
      &:hover {
        background-color: #333;
      }
    `}
`;

// 🌟 FilterPanel: 고정 너비와 세로 스크롤 허용
const FilterPanel = styled.div`
  width: 450px;
  background-color: #f7f7f7;
  overflow-y: auto;
  padding: 40px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #333;
  width: 40px;
  height: 40px;
`;

// 🌟 필터 섹션 컨테이너: 활성 상태에 따라 강조
const FilterSection = styled.section<{ $isCurrent: boolean }>`
  padding-bottom: 25px;
  margin-bottom: 25px;
  border-bottom: 1px solid #ddd;
  transition: background-color 0.3s;

  background-color: ${(props) =>
    props.$isCurrent ? "#f0f0f0" : "transparent"};
  padding: 10px;
  margin: -10px;
  margin-bottom: 15px;
  border-radius: 5px;
`;

const FilterSectionTitle = styled.h4`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 15px;
  color: #333;
`;

const OptionList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const OptionButton = styled.button<{ $isActive: boolean }>`
  padding: 8px 15px;
  border: 1px solid ${(props) => (props.$isActive ? "#333" : "#ccc")};
  background-color: ${(props) => (props.$isActive ? "#333" : "#fff")};
  color: ${(props) => (props.$isActive ? "#fff" : "#333")};
  border-radius: 20px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
`;

const ColorOption = styled.div<{ hex: string; $isSelected: boolean }>`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${(props) => props.hex};
  border: 2px solid ${(props) => (props.$isSelected ? "#333" : "#fff")};
  box-shadow: 0 0 0 2px
    ${(props) => (props.$isSelected ? "#333" : "transparent")};
  cursor: pointer;
`;

const RangeContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 10px;
`;

const RangeInput = styled.input.attrs({ type: "range" })`
  width: 100%;
`;

const InputGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
`;

const PriceInput = styled.input.attrs({ type: "number" })`
  width: 80px;
  padding: 5px;
  border: 1px solid #ccc;
  text-align: center;
`;

const ShapeOptionList = styled(OptionList)`
  gap: 20px;
`;

const FooterButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 15px;
  padding-top: 20px;
  border-top: 1px solid #ddd;
`;

const ResetButton = styled.button`
  padding: 12px 25px;
  background-color: #fff;
  border: 1px solid #333;
  color: #333;
  font-size: 16px;
  cursor: pointer;
`;

const SearchButton = styled.button`
  padding: 12px 25px;
  background-color: #333;
  border: none;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
`;

// --- B. 컴포넌트 구현 ---

export const FilterSidebar: React.FC = () => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [activeIcon, setActiveIcon] = useState<string | null>("home");
  const [filters, setFilters] = useState<FilterStateType>(initialFilters);

  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const panelRef = useRef<HTMLDivElement>(null);

  const handleEtcToggle = (option: string) => {
    setFilters((prev) => {
      const isSelected = prev.etc.includes(option);
      if (isSelected) {
        return { ...prev, etc: prev.etc.filter((item) => item !== option) };
      } else {
        return { ...prev, etc: [...prev.etc, option] };
      }
    });
  };

  const handleIconClick = (id: string) => {
    if (id === "reset") {
      setFilters(initialFilters);
      setActiveIcon(null);
      if (panelRef.current) {
        panelRef.current.scrollTo({ top: 0, behavior: "smooth" });
      }
      return;
    }

    // 🌟 닫혀있다면 일단 패널을 엽니다.
    if (!isPanelOpen) {
      setIsPanelOpen(true);
    }

    const targetElement = sectionRefs.current[id];
    if (targetElement && panelRef.current) {
      const offsetTop = targetElement.offsetTop - 10;
      panelRef.current.scrollTo({ top: offsetTop, behavior: "smooth" });

      setActiveIcon(id);
    }
  };

  // 🌟 닫기 로직: 패널 닫힘 상태로 변경
  const handleClose = () => {
    setIsPanelOpen(false);
  };

  // 스크롤 이벤트 감지하여 활성 아이콘 업데이트 로직 (유지)
  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;

    const handleScroll = () => {
      let currentActiveId: string | null = null;
      const sections = Object.entries(sectionRefs.current)
        .filter(([, el]) => el !== null)
        .map(([id, el]) => ({
          id,
          top: el!.offsetTop,
          height: el!.offsetHeight,
        }));

      const scrollTop = panel.scrollTop;

      for (const section of sections) {
        if (scrollTop >= section.top - 50) {
          currentActiveId = section.id;
        }
      }

      if (currentActiveId !== activeIcon) {
        setActiveIcon(currentActiveId);
      }
    };

    panel.addEventListener("scroll", handleScroll);

    return () => {
      panel.removeEventListener("scroll", handleScroll);
    };
  }, [activeIcon]);

  return (
    // 🌟 1. SidebarWrapper에 isPanelOpen 상태 연결
    <SidebarWrapper $isPanelOpen={isPanelOpen}>
      {/* 1. 아이콘 네비게이션 바 */}
      <IconNav>
        {/* 닫힌 패널을 열기 위해 클릭 시 isPanelOpen을 true로 설정 */}
        <IconItem
          style={{ marginBottom: "10px", fontSize: "24px" }}
          onClick={() => setIsPanelOpen(true)}
        >
          —
        </IconItem>

        {MAIN_FILTER_ICONS.map((item) => (
          <IconItem
            key={item.id}
            $isActive={activeIcon === item.id}
            onClick={() => handleIconClick(item.id)}
          >
            {item.icon}
          </IconItem>
        ))}
        {/* 하단 닫기 아이콘도 패널 닫기 기능에 연결 */}
        <IconItem
          style={{ marginTop: "auto", marginBottom: "10px", fontSize: "24px" }}
          onClick={handleClose}
        >
          ㅇ
        </IconItem>
      </IconNav>

      {/* 2. 상세 필터 패널 (모든 내용 상시 존재) */}
      <FilterPanel ref={panelRef}>
        {/* 🌟 2. CloseButton에 handleClose 연결 */}
        <CloseButton onClick={handleClose}>✕</CloseButton>

        <div style={{ flexGrow: 1, paddingRight: "5px" }}>
          <h2>작품검색</h2>
          <hr style={{ margin: "15px 0" }} />

          {/* 🌟 필터 섹션들 (내용 유지) */}
          <FilterSection
            $isCurrent={activeIcon === "home" || activeIcon === "light"}
            ref={(el) => (sectionRefs.current["home"] = el)}
          >
            <FilterSectionTitle>공간</FilterSectionTitle>
            <OptionList>
              {SPACE_OPTIONS.map((option) => (
                <OptionButton
                  key={option}
                  $isActive={filters.space === option}
                  onClick={() =>
                    setFilters((prev) => ({ ...prev, space: option }))
                  }
                >
                  {option}
                </OptionButton>
              ))}
            </OptionList>
            <FilterSectionTitle>분위기</FilterSectionTitle>
            <OptionList>
              {MOOD_OPTIONS.map((option) => (
                <OptionButton
                  key={option}
                  $isActive={filters.mood === option}
                  onClick={() =>
                    setFilters((prev) => ({ ...prev, mood: option }))
                  }
                >
                  {option}
                </OptionButton>
              ))}
            </OptionList>
          </FilterSection>

          <FilterSection
            $isCurrent={activeIcon === "won"}
            ref={(el) => (sectionRefs.current["won"] = el)}
          >
            <FilterSectionTitle>가격</FilterSectionTitle>
            <RangeContainer>
              <RangeInput
                min={0}
                max={1000000}
                value={filters.minPrice}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    minPrice: Number(e.target.value),
                  }))
                }
              />
              <InputGroup>
                <PriceInput
                  value={filters.minPrice}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      minPrice: Number(e.target.value),
                    }))
                  }
                />{" "}
                원 ~
                <PriceInput
                  value={filters.maxPrice}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      maxPrice: Number(e.target.value),
                    }))
                  }
                />{" "}
                원
              </InputGroup>
            </RangeContainer>
          </FilterSection>

          <FilterSection
            $isCurrent={activeIcon === "size"}
            ref={(el) => (sectionRefs.current["size"] = el)}
          >
            <FilterSectionTitle>크기</FilterSectionTitle>
            <RangeContainer>
              <RangeInput min={0} max={500} value={0} onChange={() => {}} />
              <InputGroup>
                <PriceInput value={0} onChange={() => {}} /> cm ~
                <PriceInput value={500} onChange={() => {}} /> cm
              </InputGroup>
            </RangeContainer>
          </FilterSection>

          <FilterSection
            $isCurrent={activeIcon === "shape"}
            ref={(el) => (sectionRefs.current["shape"] = el)}
          >
            <FilterSectionTitle>형태</FilterSectionTitle>
            <ShapeOptionList>
              {SHAPE_OPTIONS.map((shape) => (
                <div key={shape} style={{ textAlign: "center" }}>
                  <img
                    src={`https://via.placeholder.com/40x40?text=${shape[0]}`}
                    alt={shape}
                  />
                  <div style={{ fontSize: "10px" }}>{shape}</div>
                </div>
              ))}
            </ShapeOptionList>
          </FilterSection>

          <FilterSection
            $isCurrent={activeIcon === "color"}
            ref={(el) => (sectionRefs.current["color"] = el)}
          >
            <FilterSectionTitle>색상</FilterSectionTitle>
            <OptionList
              style={{
                justifyContent: "space-between",
                flexWrap: "nowrap",
                overflowX: "auto",
                paddingBottom: "0",
              }}
            >
              {COLOR_OPTIONS.map((color) => (
                <ColorOption
                  key={color.hex}
                  hex={color.hex}
                  $isSelected={filters.selectedColor === color.hex}
                  onClick={() =>
                    setFilters((prev) => ({
                      ...prev,
                      selectedColor: color.hex,
                    }))
                  }
                  title={color.name}
                />
              ))}
            </OptionList>
          </FilterSection>

          <FilterSection
            $isCurrent={activeIcon === "ship"}
            ref={(el) => (sectionRefs.current["ship"] = el)}
            style={{ borderBottom: "none" }}
          >
            <FilterSectionTitle>기타</FilterSectionTitle>
            <OptionList style={{ borderBottom: "none" }}>
              {ETC_OPTIONS.map((option) => (
                <OptionButton
                  key={option}
                  $isActive={filters.etc.includes(option)}
                  onClick={() => handleEtcToggle(option)}
                >
                  {option}
                </OptionButton>
              ))}
            </OptionList>
          </FilterSection>
        </div>

        <FooterButtons>
          <ResetButton onClick={() => handleIconClick("reset")}>
            초기화
          </ResetButton>
          <SearchButton>적용</SearchButton>
        </FooterButtons>
      </FilterPanel>
    </SidebarWrapper>
  );
};
