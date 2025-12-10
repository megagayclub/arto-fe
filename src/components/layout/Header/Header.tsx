import React from "react";
import { IoIosSearch, IoIosCart } from "react-icons/io";
import { FaUser } from "react-icons/fa6";
import {
  HeaderContainer,
  LogoSection,
  LogoText,
  NavSection,
  NavLink,
  UtilitySection,
  Separator,
} from "./HeaderStyle";

// 아이콘 대체용 문자열 (실제 프로젝트에서는 react-icons 등의 라이브러리를 사용합니다)

// 내비게이션 항목 타입 정의
interface NavItem {
  label: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: "作品を見る", href: "/artshop" },
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

        {/* 링크 및 아이콘 */}
        <UtilitySection>
          <Separator>|</Separator>
          <IoIosSearch size={25} href="/search" title="검색" />
          <IoIosCart size={25} href="/cart" title="검색" />
          <FaUser size={20} />
        </UtilitySection>
      </NavSection>
    </HeaderContainer>
  );
};

export default Header;
