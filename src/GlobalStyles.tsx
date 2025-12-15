// src/styles/GlobalStyles.ts

import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  /* 브라우저 기본 마진/패딩 초기화 */
  html, body {
    margin: 0;
    padding: 0;
  }

  /* 모든 요소의 박스 모델을 border-box로 설정하여 패딩/보더가 너비에 포함되게 합니다. (권장) */
  * {
    box-sizing: border-box;
  }
`;

export default GlobalStyles;