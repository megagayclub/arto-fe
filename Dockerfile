# 1단계: 빌드 (TypeScript 체크와 Vite 빌드 수행)
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# 2단계: 실행 (빌드된 결과물만 Nginx로 가볍게 서빙)
FROM nginx:stable-alpine

# 🌟 [추가] 작성하신 nginx.conf 파일을 Nginx 설정 위치로 복사합니다.
# 이 줄이 있어야 /login, /register 등에서의 404 에러가 사라집니다.
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 빌드된 결과물 복사
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]