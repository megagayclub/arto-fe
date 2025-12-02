// vite.config.js 파일

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  // ⬇️ 아래 'server' 객체를 추가하거나 수정하세요 ⬇️
  server: {
    // blocked request 에러를 해결하기 위해 호스트를 명시적으로 허용합니다.
    allowedHosts: [
      "s9yf3j-5173.csb.app", // 👈 에러 메시지에 표시된 호스트 이름
    ],
  },
  // ----------------------------------------------
});
