import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  server: {
    // ✅ 포트를 5173으로 고정합니다.
    port: 5173, 
    // ✅ 5173 포트가 이미 사용 중일 때 다른 포트로 자동으로 넘어가지 않게 합니다.
    strictPort: true, 

    // blocked request 에러 해결을 위한 호스트 허용
    allowedHosts: [
      "s9yf3j-5173.csb.app", 
    ],

    proxy: {
      // 백엔드 API 프록시 설정
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});