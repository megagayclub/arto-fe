import React, { useState, useRef, useEffect } from "react";
import styled, { css } from "styled-components";
import { HiHomeModern } from "react-icons/hi2";
import {
  MAIN_FILTER_ICONS,
  SPACE_OPTIONS,
  MOOD_OPTIONS,
  COLOR_OPTIONS,
  ETC_OPTIONS,
  SHAPE_OPTIONS,
} from "../../data/FilterData";
// useMarket 훅과 initialFilters를 가져옵니다.
import { useMarket } from "../../../context/MarketContext"; 
// 🌟 useArtworkSearch.ts에서 export된 initialFilters를 가져옵니다.
import { initialFilters as initialSearchFilters } from "../../../hooks/useArtworkSearch"; 

// --- 필터 상태 타입 및 초기값 정의 ---
// 🌟 [수정] 크기와 형태 필드를 추가합니다. (useArtworkSearch.ts와 동일해야 함)
interface FilterStateType {
  space: string;
  mood: string;
  minPrice: number;
  maxPrice: number;
  selectedColor: string;
  etc: string[];
  minSize: number;       // 🌟 추가
  maxSize: number;       // 🌟 추가
  selectedShape: string; // 🌟 추가
}

// 🌟 [수정] 이제 initialFilters를 useArtworkSearch.ts에서 가져와 사용합니다.
const initialFilters: FilterStateType = initialSearchFilters as FilterStateType;


// --- A. 스타일 정의 ---
// (스타일 정의는 변경 없이 그대로 유지됩니다.)

const SidebarWrapper = styled.div<{ $isPanelOpen: boolean }>`
  /* ... 스타일 유지 ... */
`;

const IconNav = styled.div`
  /* ... 스타일 유지 ... */
`;

const IconItem = styled.div<{ $isActive?: boolean }>`
  /* ... 스타일 유지 ... */
`;

const FilterPanel = styled.div<{ $isPanelOpen: boolean }>`
  /* ... 스타일 유지 ... */
`;

const CloseButton = styled.button`
  /* ... 스타일 유지 ... */
`;

const FilterSection = styled.section<{ $isCurrent: boolean }>`
  /* ... 스타일 유지 ... */
`;

const FilterSectionTitle = styled.h4`
  /* ... 스타일 유지 ... */
`;

const OptionList = styled.div`
  /* ... 스타일 유지 ... */
`;

const OptionButton = styled.button<{ $isActive: boolean }>`
  /* ... 스타일 유지 ... */
`;

const ColorOption = styled.div<{ hex: string; $isSelected: boolean }>`
  /* ... 스타일 유지 ... */
`;

const RangeContainer = styled.div`
  /* ... 스타일 유지 ... */
`;

const RangeInput = styled.input.attrs({ type: "range" })`
  /* ... 스타일 유지 ... */
`;

const InputGroup = styled.div`
  /* ... 스타일 유지 ... */
`;

const PriceInput = styled.input.attrs({ type: "number" })`
  /* ... 스타일 유지 ... */
`;

const ShapeOptionList = styled(OptionList)`
  gap: 20px;
`;

const FooterButtons = styled.div`
  /* ... 스타일 유지 ... */
`;

const ResetButton = styled.button`
  /* ... 스타일 유지 ... */
`;

const SearchButton = styled.button`
  /* ... 스타일 유지 ... */
`;


// --- B. 컴포넌트 구현 ---

export const FilterSidebar: React.FC = () => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [activeIcon, setActiveIcon] = useState<string | null>("home");
  // 🌟 [수정] filters 상태의 초기값을 useArtworkSearch에서 가져온 initialFilters로 설정
  const [filters, setFilters] = useState<FilterStateType>(initialFilters);
  
  // useMarket 훅 사용
  const { isLoading, executeSearch } = useMarket(); 

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

  const handleClose = () => {
    setIsPanelOpen(false);
  };
  
  const handleSearch = () => {
    handleClose(); 
    executeSearch(filters); 
    console.log("검색 필터 적용:", filters);
  }


  // 스크롤 이벤트 감지 로직 (유지)
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

  // --- 렌더링 시작 ---
  return (
    <SidebarWrapper $isPanelOpen={isPanelOpen}>
      <IconNav>
        {/* ... 아이콘 네비게이션 유지 ... */}

        <IconItem
          style={{ marginBottom: "10px", fontSize: "24px" }}
          onClick={() => setIsPanelOpen((prev) => !prev)}
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

        <IconItem
          style={{ marginTop: "auto", marginBottom: "10px", fontSize: "24px" }}
          onClick={handleClose}
        >
          {/* 아이콘: X 표시나 닫는 방향 화살표 등을 여기에 배치할 수 있습니다. */}
        </IconItem>
      </IconNav>

      <FilterPanel $isPanelOpen={isPanelOpen} ref={panelRef}>
        <CloseButton onClick={handleClose}>✕</CloseButton>

        <div style={{ flexGrow: 1, paddingRight: "5px" }}>
          <hr style={{ margin: "15px 0" }} />

          {/* 공간/분위기 섹션 (유지) */}
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

          {/* 가격 섹션 (유지) */}
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

          {/* 🌟 [수정] 크기 섹션: minSize/maxSize 상태에 연결 */}
          <FilterSection
            $isCurrent={activeIcon === "size"}
            ref={(el) => (sectionRefs.current["size"] = el)}
          >
            <FilterSectionTitle>크기</FilterSectionTitle>
            <RangeContainer>
              <RangeInput 
                min={0} 
                max={500} 
                value={filters.minSize} 
                onChange={(e) => 
                  setFilters((prev) => ({ 
                    ...prev, 
                    minSize: Number(e.target.value) 
                  }))
                } 
              />
              <InputGroup>
                <PriceInput 
                  value={filters.minSize} 
                  onChange={(e) => 
                    setFilters((prev) => ({ 
                      ...prev, 
                      minSize: Number(e.target.value) 
                    }))
                  } 
                /> cm ~
                <PriceInput 
                  value={filters.maxSize} 
                  onChange={(e) => 
                    setFilters((prev) => ({ 
                      ...prev, 
                      maxSize: Number(e.target.value) 
                    }))
                  } 
                /> cm
              </InputGroup>
            </RangeContainer>
          </FilterSection>

          {/* 🌟 [수정] 형태 섹션: selectedShape 상태에 연결 */}
          <FilterSection
            $isCurrent={activeIcon === "shape"}
            ref={(el) => (sectionRefs.current["shape"] = el)}
          >
            <FilterSectionTitle>형태</FilterSectionTitle>
            <ShapeOptionList>
              {SHAPE_OPTIONS.map((shape) => (
                <div 
                  key={shape} 
                  style={{ textAlign: "center" }}
                  // 🌟 클릭 시 selectedShape 업데이트
                  onClick={() => setFilters((prev) => ({...prev, selectedShape: shape}))}
                >
                  <img
                    src={`https://via.placeholder.com/40x40?text=${shape[0]}`}
                    alt={shape}
                  // 🌟 선택 상태에 따라 시각적 피드백 제공 (옵션)
                  style={{ border: filters.selectedShape === shape ? '2px solid #333' : 'none', borderRadius: '5px', cursor: 'pointer' }}
                  />
                  <div style={{ fontSize: "10px" }}>{shape}</div>
                </div>
              ))}
            </ShapeOptionList>
          </FilterSection>

          {/* 색상 섹션 (유지) */}
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

          {/* 기타 섹션 (유지) */}
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
          <SearchButton onClick={handleSearch} disabled={isLoading}>
            {isLoading ? "검색 중..." : "적용"} 
          </SearchButton>
        </FooterButtons>

      </FilterPanel>
    </SidebarWrapper>
  );
};