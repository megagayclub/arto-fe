import React, { useState, useRef, useEffect } from "react";
import styled, { css } from "styled-components";
import {
  MAIN_FILTER_ICONS,
  SPACE_OPTIONS,
  MOOD_OPTIONS,
  COLOR_OPTIONS,
  ETC_OPTIONS,
  MORPH_OPTIONS,
} from "../data/FilterData";
import { 
  useMarket, 
  MAX_PRICE, 
  MAX_SIZE, 
  FilterStateType
} from "./MarketContext";

// --- 스타일 정의 ---

const SidebarWrapper = styled.div<{ $isPanelOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  z-index: 100;
  display: flex;
  width: ${(props) => (props.$isPanelOpen ? "980px" : "80px")};
  transition: width 0.3s ease-in-out;
`;

const IconNav = styled.div`
  position: fixed;
  height: 100vh;
  width: 80px;
  background-color: #1a1a1a;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 100px;
  z-index: 110;
`;

const IconItem = styled.div<{ $isActive?: boolean }>`
  width: 100%;
  height: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 20px;
  transition: all 0.2s;
  text-align: center;
  padding: 5px;

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

const SelectedText = styled.span`
  font-size: 11px;
  font-weight: 600;
  word-break: keep-all;
  line-height: 1.2;
`;

const FilterPanel = styled.div<{ $isPanelOpen: boolean }>`
  position: fixed;
  left: 80px;
  width: 900px;
  height: 100vh;
  background-color: #f7f7f7;
  overflow-y: auto;
  padding: 40px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-top: 100px;
  transform: translateX(${(props) => (props.$isPanelOpen ? "0" : "-980px")});
  transition: transform 0.3s ease-in-out;
  pointer-events: ${(props) => (props.$isPanelOpen ? "auto" : "none")};
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

const FilterSection = styled.section<{ $isCurrent: boolean }>`
  padding-bottom: 25px;
  margin-bottom: 25px;
  border-bottom: 1px solid #ddd;
  transition: background-color 0.3s;
  background-color: ${(props) => (props.$isCurrent ? "#f0f0f0" : "transparent")};
  padding: 10px;
  margin: -10px;
  margin-bottom: 10px;
  border-radius: 5px;
`;

const FilterSectionTitle = styled.h4`
  font-size: 16px;
  font-weight: 600;
  margin-top: 5px;
  margin-bottom: 5px;
  color: #333;
`;

const OptionList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const OptionButton = styled.button<{ $isActive: boolean }>`
  padding: 8px 15px;
  border: 1px solid ${(props) => (props.$isActive ? "#1a1a1a" : "#eee")};
  background-color: ${(props) => (props.$isActive ? "#1a1a1a" : "transparent")};
  color: ${(props) => (props.$isActive ? "#fff" : "#1a1a1a")};
  border-radius: 20px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    border-color: ${(props) => (props.$isActive ? "#333" : "#bebebeff")};
    background-color: ${(props) => (props.$isActive ? "#1a1a1a" : "#f0f0f0")};
  }
`;

const ColorOption = styled.div<{ hex: string; $isSelected: boolean }>`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${(props) => props.hex};
  border: 2px solid ${(props) => (props.$isSelected ? "#333" : "#fff")};
  box-shadow: 0 0 0 2px ${(props) => (props.$isSelected ? "#333" : "transparent")};
  cursor: pointer;
  &:hover {
    border-color: ${(props) => (props.$isSelected ? "#333" : "#bebebeff")};
  }
`;

const FooterButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 15px;
  padding-top: 20px;
  border-top: 1px solid #ddd;
  background-color: #f7f7f7;
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

const MultiRangeContainer = styled.div`
  position: relative;
  width: 100%;
  height: 50px;
`;

const RangeLabelGroup = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  font-weight: 600;
  span {
    background: #e0e0e0;
    padding: 2px 8px;
    border-radius: 4px;
  }
`;

const SliderTrack = styled.div`
  position: absolute;
  width: 100%;
  height: 4px;
  background-color: #ddd;
  border-radius: 2px;
  top: 10px;
`;

const ActiveTrack = styled.div<{ $start: number; $end: number }>`
  position: absolute;
  height: 4px;
  background-color: #1a1a1a;
  border-radius: 2px;
  top: 10px;
  left: ${(props) => props.$start}%;
  right: ${(props) => 100 - props.$end}%;
`;

const RangeInputBase = styled.input.attrs({ type: "range" })`
  position: absolute;
  width: 100%;
  height: 4px;
  top: 10px;
  background: none;
  pointer-events: none;
  -webkit-appearance: none;
  &::-webkit-slider-thumb {
    height: 18px;
    width: 18px;
    border-radius: 50%;
    background: #1a1a1a;
    cursor: pointer;
    pointer-events: auto;
    -webkit-appearance: none;
    border: 2px solid #fff;
    box-shadow: 0 1px 3px rgba(0,0,0,0.3);
  }
`;

// --- 컴포넌트 구현 ---

export const FilterSidebar: React.FC = () => {
  // MarketContext 연동
  const { filters, setFilters, resetFilters,applyFilters } = useMarket();
  
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [activeIcon, setActiveIcon] = useState<string | null>("space");

  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const panelRef = useRef<HTMLDivElement>(null);

  // 가격 포맷: '만' 단위로 표시
  const formatPriceLabel = (price: number) => {
    if (price === 0) return "0원";
    const tenThousand = Math.floor(price / 10000);
    return `${tenThousand}만`;
  };

  // 아이콘 네비게이션 내 현재 선택된 값 텍스트 표시
  const renderIconContent = (item: { id: string; icon: React.ReactNode }) => {
  // 현재 필터에서 해당 아이디의 값을 가져옴
  const selectedValue = filters[item.id as keyof FilterStateType];

  // 1. 공간 (space)
  if (item.id === "space" && selectedValue) {
    const target = SPACE_OPTIONS.find((o) => o.value === selectedValue);
    return <SelectedText>{target?.label || "공간"}</SelectedText>;
  }

  // 2. 분위기 (mood)
  if (item.id === "mood" && filters.mood) { // nav 아이디가 'light'라면 filters.mood 참조
    const target = MOOD_OPTIONS.find((o) => o.value === filters.mood);
    return <SelectedText>{target?.label || "분위기"}</SelectedText>;
  }

  // 3. 가격 (won)
  if (item.id === "won") {
    if (filters.won[0] === 0 && filters.won[1] === MAX_PRICE) return item.icon;
    return (
      <SelectedText>
        {formatPriceLabel(filters.won[0])}~{formatPriceLabel(filters.won[1])}
      </SelectedText>
    );
  }

  // 4. 크기 (size)
  if (item.id === "size") {
    if (filters.size[0] === 0 && filters.size[1] === MAX_SIZE) return item.icon;
    return <SelectedText>{filters.size[0]}~{filters.size[1]}cm</SelectedText>;
  }

  // 5. 형태 (morph)
  if (item.id === "morph" && filters.morph) { // nav 아이디가 'shape'라면 filters.morph 참조
    const target = MORPH_OPTIONS.find((o) => o.value === filters.morph);
    return <SelectedText>{target?.label || "형태"}</SelectedText>;
  }

  // 6. 색상 (color)
  if (item.id === "color" && selectedValue) {
    const target = COLOR_OPTIONS.find((c) => c.value === selectedValue);
    return <SelectedText>{target?.name || "색상"}</SelectedText>; // name 또는 label 사용
  }

  // 7. 기타/배송 (ship)
  if (item.id === "ship" && filters.ship.length > 0) {
    const target = ETC_OPTIONS.find((o) => o.value === filters.ship[0]);
    return <SelectedText>{target?.label || filters.ship[0]}</SelectedText>;
  }

  return item.icon;
};

  // 기타(etc) 다중 선택 토글 핸들러
  const handleEtcToggle = (option: string) => {
    setFilters((prev) => {
      const isSelected = prev.ship.includes(option);
      return { 
        ...prev, 
        ship: isSelected ? prev.ship.filter(i => i !== option) : [...prev.ship, option] 
      };
    });
  };

  // 사이드바 아이콘 클릭 핸들러
  const handleIconClick = (id: string) => {
    if (id === "reset") {
      resetFilters();
      if (panelRef.current) panelRef.current.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    if (!isPanelOpen) setIsPanelOpen(true);
    const targetElement = sectionRefs.current[id];
    if (targetElement && panelRef.current) {
      const offsetTop = targetElement.offsetTop - 10;
      panelRef.current.scrollTo({ top: offsetTop, behavior: "smooth" });
      setActiveIcon(id);
    }
  };

  const handleClose = () => setIsPanelOpen(false);

  const handleApply = () => {
    applyFilters(); // Context에서 가져온 함수 실행

    // 3. 패널 닫기
    setIsPanelOpen(false);
  };

  // 가격/크기 슬라이더 핸들러
  const handleRangeChange = (field: 'won' | 'size', index: 0 | 1, value: number, maxLimit: number) => {
    setFilters(prev => {
      const newRange = [...prev[field]] as [number, number];
      const gap = maxLimit / 50; 
      if (index === 0) {
        newRange[0] = Math.min(value, newRange[1] - gap);
      } else {
        newRange[1] = Math.max(value, newRange[0] + gap);
      }
      return { ...prev, [field]: newRange };
    });
  };

  // 패널 스크롤 시 활성화된 섹션 아이콘 하이라이트
  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;
    const handleScroll = () => {
      let currentActiveId: string | null = null;
      const sections = Object.entries(sectionRefs.current)
        .filter(([, el]) => el !== null)
        .map(([id, el]) => ({ id, top: el!.offsetTop }));
      const scrollTop = panel.scrollTop;
      for (const section of sections) {
        if (scrollTop >= section.top - 50) currentActiveId = section.id;
      }
      if (currentActiveId !== activeIcon) setActiveIcon(currentActiveId);
    };
    panel.addEventListener("scroll", handleScroll);
    return () => panel.removeEventListener("scroll", handleScroll);
  }, [activeIcon]);

  return (
    <SidebarWrapper $isPanelOpen={isPanelOpen}>
      <IconNav>
        <IconItem onClick={() => setIsPanelOpen((prev) => !prev)} style={{ fontSize: "24px" }}>—</IconItem>
        {MAIN_FILTER_ICONS.map((item) => (
          <IconItem key={item.id} $isActive={activeIcon === item.id} onClick={() => handleIconClick(item.id)}>
            {renderIconContent(item)}
          </IconItem>
        ))}
        <IconItem onClick={handleClose} style={{ marginTop: "auto", marginBottom: "10px", fontSize: "24px" }}>✕</IconItem>
      </IconNav>

      <FilterPanel $isPanelOpen={isPanelOpen} ref={panelRef}>
        <CloseButton onClick={handleClose}>✕</CloseButton>
        <div style={{ flexGrow: 1, paddingRight: "5px" }}>
          <hr style={{ margin: "15px 0" }} />

          {/* 공간(space) 섹션 */}
<FilterSection $isCurrent={activeIcon === "space"} ref={(el) => (sectionRefs.current["space"] = el)}>
  <FilterSectionTitle>空間</FilterSectionTitle>
  <OptionList>
    {SPACE_OPTIONS.map((o) => (
      <OptionButton 
        key={o.value} 
        $isActive={filters.space === o.value} 
        onClick={() => setFilters(p => ({ ...p, space: o.value }))}
      >
        {o.label}
      </OptionButton>
    ))}
  </OptionList>
</FilterSection>

{/* 분위기(mood/Mood) 섹션 */}
<FilterSection $isCurrent={activeIcon === "mood"} ref={(el) => (sectionRefs.current["mood"] = el)}>
  <FilterSectionTitle>雰囲気</FilterSectionTitle>
  <OptionList>
    {MOOD_OPTIONS.map((o) => (
      <OptionButton 
        key={o.value} 
        $isActive={filters.mood === o.value} 
        onClick={() => setFilters(p => ({ ...p, mood: o.value }))}
      >
        {o.label}
      </OptionButton>
    ))}
  </OptionList>
</FilterSection>

          {/* 가격(Won) 섹션 */}
          <FilterSection $isCurrent={activeIcon === "won"} ref={(el) => (sectionRefs.current["won"] = el)}>
            <FilterSectionTitle>価格</FilterSectionTitle>
            <RangeLabelGroup>
              <span>{formatPriceLabel(filters.won[0])}</span>
              <span>{formatPriceLabel(filters.won[1])}</span>
            </RangeLabelGroup>
            <MultiRangeContainer>
              <SliderTrack />
              <ActiveTrack $start={(filters.won[0] / MAX_PRICE) * 100} $end={(filters.won[1] / MAX_PRICE) * 100} />
              <RangeInputBase min={0} max={MAX_PRICE} step={10000} value={filters.won[0]} onChange={(e) => handleRangeChange('won', 0, Number(e.target.value), MAX_PRICE)} />
              <RangeInputBase min={0} max={MAX_PRICE} step={10000} value={filters.won[1]} onChange={(e) => handleRangeChange('won', 1, Number(e.target.value), MAX_PRICE)} />
            </MultiRangeContainer>
          </FilterSection>

          {/* 크기(Size) 섹션 */}
          <FilterSection $isCurrent={activeIcon === "size"} ref={(el) => (sectionRefs.current["size"] = el)}>
            <FilterSectionTitle>サイズ</FilterSectionTitle>
            <RangeLabelGroup>
              <span>{filters.size[0]}cm</span>
              <span>{filters.size[1]}cm</span>
            </RangeLabelGroup>
            <MultiRangeContainer>
              <SliderTrack />
              <ActiveTrack $start={(filters.size[0] / MAX_SIZE) * 100} $end={(filters.size[1] / MAX_SIZE) * 100} />
              <RangeInputBase min={0} max={MAX_SIZE} step={1} value={filters.size[0]} onChange={(e) => handleRangeChange('size', 0, Number(e.target.value), MAX_SIZE)} />
              <RangeInputBase min={0} max={MAX_SIZE} step={1} value={filters.size[1]} onChange={(e) => handleRangeChange('size', 1, Number(e.target.value), MAX_SIZE)} />
            </MultiRangeContainer>
          </FilterSection>

          {/* 형태(morph) 섹션 */}
          <FilterSection $isCurrent={activeIcon === "morph"} ref={(el) => (sectionRefs.current["morph"] = el)}>
            <FilterSectionTitle>形状</FilterSectionTitle>
            <OptionList>
              {MORPH_OPTIONS.map((m: { label: string; value: string }) => (
                <OptionButton key={m.value} $isActive={filters.morph === m.value} onClick={() => setFilters(p => ({ ...p, morph: m.value }))}>{m.label}</OptionButton>
              ))}
            </OptionList>
          </FilterSection>

          {/* 색상(Color) 섹션 */}
          <FilterSection $isCurrent={activeIcon === "color"} ref={(el) => (sectionRefs.current["color"] = el)}>
            <FilterSectionTitle>カラー</FilterSectionTitle>
            <OptionList>
              {COLOR_OPTIONS.map((c) => (
                <ColorOption key={c.hex} hex={c.hex} $isSelected={filters.color === c.value} onClick={() => setFilters(p => ({ ...p, color: c.value }))} title={c.name} />
              ))}
            </OptionList>
          </FilterSection>

          {/* 기타(Etc/Ship) 섹션 */}
          <FilterSection $isCurrent={activeIcon === "ship"} ref={(el) => (sectionRefs.current["ship"] = el)} style={{ borderBottom: "none" }}>
            <FilterSectionTitle>その他</FilterSectionTitle>
            <OptionList>
              {ETC_OPTIONS.map((o) => (
                <OptionButton key={o.value} $isActive={filters.ship.includes(o.value)} onClick={() => handleEtcToggle(o.value)}>{o.label}</OptionButton>
              ))}
            </OptionList>
          </FilterSection>
          
          <FooterButtons>
            <ResetButton onClick={resetFilters}>リセット</ResetButton>
            <SearchButton onClick={handleApply}>適用</SearchButton>
          </FooterButtons>
        </div>
      </FilterPanel>
    </SidebarWrapper>
  );
};