import styled from "styled-components";

// 폰트와 색상은 이미지에서 유추하여 임의로 지정합니다.

export const HeaderContainer = styled.header`
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 40px;
  background: linear-gradient(to right, #ffffff, #f7f0f0);
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  height: 80px;
  top: 0px;
  width: 100%;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.05);
`;

export const LogoSection = styled.div`
  display: flex;
  align-items: center;
`;

export const LogoText = styled.div`
  font-family: "Georgia", serif; /* 임의의 폰트 */
  font-size: 30px;
  font-weight: bold;
  color: #c99c5f; /* 골드 계열 색상 */
  line-height: 1;

  span {
    display: block;
    font-size: 12px;
    font-weight: normal;
    letter-spacing: 2px;
    color: #333;
    margin-top: 2px;
  }

  &::before {
    content: "A";
    font-size: 40px;
    color: #c99c5f;
    margin-right: 5px;
  }
`;

export const NavSection = styled.nav`
  display: flex;
  align-items: center;
`;

export const NavLink = styled.a`
  text-decoration: none;
  color: #333;
  font-size: 14px;
  font-weight: 500;
  margin-left: 30px;
  padding: 5px 0;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: #c99c5f;
  }
`;

export const UtilitySection = styled.div`
  display: flex;
  align-items: center;
  margin-left: 30px;
`;

export const IconLink = styled(NavLink)`
  /* 아이콘은 폰트 사이즈로 크기 조절 */
  font-size: 18px;
  margin-left: 20px;
  /* 아이콘들은 오른쪽으로 붙어있으므로 마진 조정 */
  &:first-child {
    margin-left: 0;
  }
`;

export const Separator = styled.span`
  color: #ccc;
  font-size: 14px;
  margin: 0 5px;
`;
