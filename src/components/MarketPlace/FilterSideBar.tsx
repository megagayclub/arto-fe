import React, { useState, useRef, useEffect } from "react";
import styled, { css } from "styled-components";
import {
  MAIN_FILTER_ICONS,
  SPACE_OPTIONS,
  MOOD_OPTIONS,
  COLOR_OPTIONS,
  ETC_OPTIONS,
  SHAPE_OPTIONS,
} from "../data/FilterData";

// --- 필터 상태 타입 정의 ---
interface FilterStateType {
  home: string | null;
  light: string | null;
  won: [number, number];
  size: [number, number];
  shape: string | null;
  color: string | null;
  ship: string[];
}

const MAX_PRICE = 20000000; // 최대 가격 2,000만 원
const MAX_SIZE = 500;

const initialFilters: FilterStateType = {
  home: null,
  light: null,
  won: [0, MAX_PRICE], 
  size: [0, MAX_SIZE],    
  shape: null,
  color: null,
  ship: [],
};

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
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [activeIcon, setActiveIcon] = useState<string | null>("home");
  const [filters, setFilters] = useState<FilterStateType>(initialFilters);

  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const panelRef = useRef<HTMLDivElement>(null);

  // 🌟 가격 포맷: '천' 단위 제거하고 숫자만 (예: 1500만)
  const formatPriceLabel = (price: number) => {
    if (price === 0) return "0원";
    const tenThousand = Math.floor(price / 10000);
    return `${tenThousand}만`;
  };

  const renderIconContent = (item: { id: string; icon: React.ReactNode }) => {
    const selectedValue = filters[item.id as keyof FilterStateType];

    if (item.id === "home" && selectedValue) return <SelectedText>{selectedValue}</SelectedText>;
    if (item.id === "light" && selectedValue) return <SelectedText>{selectedValue}</SelectedText>;
    
    if (item.id === "won") {
      if (filters.won[0] === 0 && filters.won[1] === MAX_PRICE) return item.icon;
      return <SelectedText>{formatPriceLabel(filters.won[0])}~{formatPriceLabel(filters.won[1])}</SelectedText>;
    }
    
    if (item.id === "size") {
      if (filters.size[0] === 0 && filters.size[1] === MAX_SIZE) return item.icon;
      return <SelectedText>{filters.size[0]}~{filters.size[1]}cm</SelectedText>;
    }

    if (item.id === "shape" && selectedValue) return <SelectedText>{selectedValue}</SelectedText>;
    if (item.id === "color" && selectedValue) {
        const colorName = COLOR_OPTIONS.find(c => c.hex === filters.color)?.name;
        return <SelectedText>{colorName || "색상"}</SelectedText>;
    }
    if (item.id === "ship" && filters.ship.length > 0) return <SelectedText>{filters.ship[0]}</SelectedText>;

    return item.icon;
  };

  const handleEtcToggle = (option: string) => {
    setFilters((prev) => {
      const isSelected = prev.ship.includes(option);
      return { ...prev, ship: isSelected ? prev.ship.filter(i => i !== option) : [...prev.ship, option] };
    });
  };

  const handleIconClick = (id: string) => {
    if (id === "reset") {
      setFilters(initialFilters);
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

          <FilterSection $isCurrent={activeIcon === "home"} ref={(el) => (sectionRefs.current["home"] = el)}>
            <FilterSectionTitle>공간</FilterSectionTitle>
            <OptionList>
              {SPACE_OPTIONS.map((o) => (
                <OptionButton key={o} $isActive={filters.home === o} onClick={() => setFilters(p => ({ ...p, home: o }))}>{o}</OptionButton>
              ))}
            </OptionList>
          </FilterSection>

          <FilterSection $isCurrent={activeIcon === "light"} ref={(el) => (sectionRefs.current["light"] = el)}>
            <FilterSectionTitle>분위기</FilterSectionTitle>
            <OptionList>
              {MOOD_OPTIONS.map((o) => (
                <OptionButton key={o} $isActive={filters.light === o} onClick={() => setFilters(p => ({ ...p, light: o }))}>{o}</OptionButton>
              ))}
            </OptionList>
          </FilterSection>

          <FilterSection $isCurrent={activeIcon === "won"} ref={(el) => (sectionRefs.current["won"] = el)}>
            <FilterSectionTitle>가격</FilterSectionTitle>
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

          <FilterSection $isCurrent={activeIcon === "size"} ref={(el) => (sectionRefs.current["size"] = el)}>
            <FilterSectionTitle>크기</FilterSectionTitle>
            <RangeLabelGroup>
              <span>{filters.size[0]}cm</span>
              <span>{filters.size[1]}cm</span>
            </RangeLabelGroup>
            <MultiRangeContainer>
              <SliderTrack />
              <ActiveTrack $start={(filters.size[0] / MAX_SIZE) * 100} $end={(filters.size[1] / MAX_SIZE) * 100} />
              <RangeInputBase min={0} max={500} step={1} value={filters.size[0]} onChange={(e) => handleRangeChange('size', 0, Number(e.target.value), 500)} />
              <RangeInputBase min={0} max={500} step={1} value={filters.size[1]} onChange={(e) => handleRangeChange('size', 1, Number(e.target.value), 500)} />
            </MultiRangeContainer>
          </FilterSection>

          <FilterSection $isCurrent={activeIcon === "shape"} ref={(el) => (sectionRefs.current["shape"] = el)}>
            <FilterSectionTitle>형태</FilterSectionTitle>
            <OptionList>
              {SHAPE_OPTIONS.map((s) => (
                <OptionButton key={s} $isActive={filters.shape === s} onClick={() => setFilters(p => ({ ...p, shape: s }))}>{s}</OptionButton>
              ))}
            </OptionList>
          </FilterSection>

          <FilterSection $isCurrent={activeIcon === "color"} ref={(el) => (sectionRefs.current["color"] = el)}>
            <FilterSectionTitle>색상</FilterSectionTitle>
            <OptionList>
              {COLOR_OPTIONS.map((c) => (
                <ColorOption key={c.hex} hex={c.hex} $isSelected={filters.color === c.hex} onClick={() => setFilters(p => ({ ...p, color: c.hex }))} title={c.name} />
              ))}
            </OptionList>
          </FilterSection>

          <FilterSection $isCurrent={activeIcon === "ship"} ref={(el) => (sectionRefs.current["ship"] = el)} style={{ borderBottom: "none" }}>
            <FilterSectionTitle>기타</FilterSectionTitle>
            <OptionList>
              {ETC_OPTIONS.map((o) => (
                <OptionButton key={o} $isActive={filters.ship.includes(o)} onClick={() => handleEtcToggle(o)}>{o}</OptionButton>
              ))}
            </OptionList>
          </FilterSection>
          <FooterButtons>
          <ResetButton onClick={() => handleIconClick("reset")}>초기화</ResetButton>
          <SearchButton onClick={handleClose}>적용</SearchButton>
        </FooterButtons>
        </div>

        
      </FilterPanel>
    </SidebarWrapper>
  );
};