// src/components/layout/Header/Header.tsx (수정된 코드)

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
import { useAuth } from '../../../context/AuthContext'; // 🌟 AuthContext import

// 내비게이션 항목 타입 정의
interface NavItem {
  label: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  // ... (NAV_ITEMS 유지)
  { label: "作品を見る", href: "/market" },
  { label: "アーティカバリー", href: "/faq" },
  { label: "ギャラリーズ", href: "/company" },
];

const Header: React.FC = () => {
  const { isLoggedIn, logout } = useAuth(); // 🌟 로그인 상태 가져오기

  // 로그인 상태에 따른 링크 결정
  const AuthLink = isLoggedIn ? (
    // 로그인 상태: 마이페이지 또는 로그아웃
    <>
      {/* 🌟 마이페이지 (MY PAGE) 링크 */}
      <NavLink href="/mypage" style={{ marginLeft: '10px' }}>MY PAGE</NavLink> 
      
      {/* 🌟 로그아웃 버튼 (NavLink 대신 버튼 사용 가능) */}
      <NavLink as="button" onClick={logout} style={{ marginLeft: '10px' }}>ログアウト</NavLink>
    </>
  ) : (
    // 로그아웃 상태: 로그인 페이지
    <>
      <NavLink href="/login" style={{ marginLeft: '10px' }}>ログイン</NavLink>
      {/* 회원가입은 유틸리티 아이콘 옆에 추가하지 않고 로그인 페이지 내에 두는 것이 일반적입니다. */}
    </>
  );

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

        {/* 3. 유틸리티 섹션 */}
        <UtilitySection>
          {/* 검색 및 카트 아이콘 */}
          <IoIosSearch size={25} href="/search" title="検索" />
          <IoIosCart size={25} href="/cart" title="カート" />
          
          {/* 사용자 아이콘 (로그인 상태에 따라 다른 링크를 포함할 수 있습니다) */}
          <FaUser size={20} />
          
          <Separator>|</Separator>
          
          {/* 🌟 조건부 렌더링: 로그인 또는 마이페이지 링크 표시 🌟 */}
          {AuthLink} 
          
        </UtilitySection>
      </NavSection>
    </HeaderContainer>
  );
};

export default Header;