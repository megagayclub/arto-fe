import styled, { createGlobalStyle } from 'styled-components';

// CSS Variables for Styled Components
const TEXT_COLOR = '#111';
const BG_COLOR = '#b9b3a9';

// --- Global Styles ---
export const GlobalStyle = createGlobalStyle`
  :root {
    --text-color: ${TEXT_COLOR};
    --bg-color: ${BG_COLOR};
  }

  html {
    scroll-behavior: auto;
    overflow: hidden; 
  }
  
  body {
    font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, Roboto, sans-serif;
    color: var(--text-color);
    background: var(--bg-color);
    transition: 0.3s ease-out;
    overflow-x: hidden;
    max-width: 100%;
    width: 100%;
    overscroll-behavior: none;
    margin: 0px;
  }

  * {
    box-sizing: border-box;
  }
`;

// --- Styled Components ---

export const PageContainer = styled.div.attrs({
  className: 'container',
})`
  /* Locomotive Scroll 컨테이너 스타일 */
`;

export const StyledSection = styled.section`
  min-height: 101vh;
  width: 100%;
  position: relative;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 2rem;
  padding: 50px 10vw;
  margin: auto;
  place-items: center;
`;

export const StyledSectionPin = styled.section.attrs({
  id: 'sectionPin',
})`
  height: 100vh;
  overflow: hidden;
  display: flex;
  left: 0;
  background: var(--text-color);
  color: var(--bg-color);
`;

export const PinWrap = styled.div.attrs({
  className: 'pin-wrap',
})`
  height: 100vh;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 50px 10vw;
  
  & > * {
    min-width: 60vw;
    padding: 0 5vw;
  }
`;

export const StyledImage = styled.img`
  height: 80vh;
  width: auto;
  object-fit: cover;
`;

export const StyledH1 = styled.h1`
  font-size: 5rem;
  line-height: 1;
  font-weight: 800;
  margin-bottom: 1rem;
  position: absolute;
  top: 10vw;
  left: 10vw;
  z-index: 10;
  overflow-wrap: break-word;
  hyphens: auto;
  color: #fff;
  background-color: #472cceff;
  padding: 0.5rem 1rem; /* 상하 0.5rem, 좌우 1rem 여백 */

  @media (max-width: 768px) {
    font-size: 16vw;
  }

  span {
    display: block;
  }
`;

export const StyledH2 = styled.h2`
  font-size: 2rem;
  max-width: 400px;
`;

export const StyledP = styled.p`
  position: absolute;
  bottom: 10vw;
  right: 10vw;
  width: 320px;
  font-size: 1.5rem;
  line-height: 1.5;
  font-weight: 700;
  color: #130d27ff
`;

export const CreditH2 = styled(StyledH2).attrs({
  className: 'credit',
})`
  font-family: Termina, sans-serif;
  
  a {
    color: inherit;
  }
`;