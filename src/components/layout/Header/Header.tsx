import React from "react";
// 스타일 파일에서 정의한 styled components를 import
import {
  HeaderContainer,
  LogoSection,
  LogoText,
  NavSection,
  NavLink,
  UtilitySection,
  IconLink,
  Separator,
} from "./HeaderStyle";

// 아이콘 대체용 문자열 (실제 프로젝트에서는 react-icons 등의 라이브러리를 사용합니다)
const ICON_SEARCH = "🔍";
const ICON_CART = "🛒";
const ICON_USER = "👤";

// 내비게이션 항목 타입 정의
interface NavItem {
  label: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: "作品を見る", href: "/artshop" },
  { label: "アートコンサルティング", href: "/project" },
  { label: "アーティカバリー", href: "/faq" },
  { label: "ギャラリーズ", href: "/company" },
];

const Header: React.FC = () => {
  return (
    <HeaderContainer>
      {/* 1. 로고 섹션 */}
      <LogoSection>
        <LogoText>rto</LogoText>
      </LogoSection>

      {/* 2. 내비게이션 및 유틸리티 섹션 */}
      <NavSection>
        {/* 내비게이션 링크 */}
        {NAV_ITEMS.map((item) => (
          <NavLink key={item.label} href={item.href}>
            {item.label}
          </NavLink>
        ))}

        {/* 유틸리티 링크 및 아이콘 */}
        <UtilitySection>
          <Separator>|</Separator>

          {/* 아이콘: 검색 */}
          <IconLink href="/search" title="검색">
            {ICON_SEARCH}
          </IconLink>

          {/* 아이콘: 장바구니 */}
          <IconLink href="/cart" title="장바구니">
            {ICON_CART}
          </IconLink>

          {/* 아이콘: 마이페이지/로그인 (이미지에는 사용자 아이콘이 없지만 일반적인 구성 요소입니다.) */}
          <IconLink href="/profile" title="마이페이지">
            {ICON_USER}
          </IconLink>
        </UtilitySection>
      </NavSection>
    </HeaderContainer>
  );
};

export default Header;
