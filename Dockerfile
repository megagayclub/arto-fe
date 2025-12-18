# 1단계: 빌드 (TypeScript 체크와 Vite 빌드 수행)
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# package.json에 적힌 tsc && vite build 실행
RUN npm run build

# 2단계: 실행 (빌드된 결과물만 Nginx로 가볍게 서빙)
FROM nginx:stable-alpine
# Vite의 기본 빌드 폴더인 dist를 Nginx 경로로 복사
COPY --from=build /app/dist /usr/share/nginx/html
# Nginx 기본 포트 80 노출
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]