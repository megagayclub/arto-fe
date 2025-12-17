# 1단계: 빌드 스테이지 (이름을 'builder'로 지정)
FROM node:20 AS builder 
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build  # 빌드 결과물(dist 또는 build 폴더) 생성

# 2단계: 실행 스테이지 (Nginx)
FROM nginx:alpine

# 🌟 [수정된 부분] 커스텀 Nginx 설정 파일 복사
# (주의: nginx.conf 파일이 프로젝트 루트에 있어야 합니다)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 🌟 [수정된 부분] builder 스테이지에서 생성된 'dist' 폴더만 복사
# 프레임워크에 따라 dist가 아닌 build일 수 있으니 확인 필요!
COPY --from=builder /app/dist /usr/share/nginx/html

# Nginx 기본 포트는 80입니다. (필요시 3000으로 매핑 가능)
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
