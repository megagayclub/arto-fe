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
  left: 0px;
  width: 100%;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.05);
  z-index: 1000;
  margin-bottom: 100px;
  // background: #c99c5f;
`;

export const LogoSection = styled.div`
  display: flex;
  align-items: center;
`;

export const LogoText = styled.div`
  font-family: "Georgia", serif;
  font-size: 30px;
  font-weight: bold;
  color: #c99c5f;
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
  flex-shrink: 0;
  margin-right: 50px;
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
  gap: 10px;
`;

export const Separator = styled.span`
  color: #ccc;
  font-size: 14px;
  margin: 0 5px;
`;
