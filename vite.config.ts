import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  server: {
    // 1️⃣ 포트를 5173으로 강제 고정합니다.
    port: 5173, 
    
    // 2️⃣ 모든 네트워크 인터페이스에서 접속 가능하게 설정 (npm run dev 시 출력된 IP들 허용)
    host: "0.0.0.0", 

    // 3️⃣ 호스트 허용 설정 (기존 코드 유지)
    allowedHosts: [
      "s9yf3j-5173.csb.app", 
      "localhost",
      "127.0.0.1"
    ],

 proxy: {
      // ✅ 네가 실제로 호출하는 prefix에 맞춤
      // "/api/v1": {
      //   target: "http://localhost:8080",
      //   changeOrigin: true,
      //   secure: false,
      // },

      // // (선택) 혹시 다른 코드에서 /api 로도 부르면 같이 커버
      // "/api": {
      //   target: "http://localhost:8080",
      //   changeOrigin: true,
      //   secure: false,
      // },

      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});