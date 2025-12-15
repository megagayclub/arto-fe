# 1단계: 빌드 환경 - Node.js를 사용하여 프로젝트 빌드 (pnpm 사용)
FROM node:20-slim AS builder

# 작업 디렉토리 설정
WORKDIR /app
# pnpm 설정 파일 복사 및 의존성 설치
COPY package*.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install

# 프로젝트 파일 전체 복사 및 빌드
COPY . .
# Vite 프로젝트 빌드 명령 실행 (결과물은 기본적으로 /dist 폴더에 생성됨)
RUN pnpm run build

# 2단계: 서빙 환경 - Nginx를 사용하여 빌드된 파일 제공
FROM nginx:stable-alpine

# Nginx의 기본 웹 서비스 경로에 빌드 결과물 복사
# (이것이 프론트엔드 화면을 외부에 노출하는 '러너 연결'의 실질적인 작업입니다.)
COPY --from=builder /app/dist /usr/share/nginx/html

# Nginx 기본 포트 80을 외부에 노출
EXPOSE 80

# Nginx 시작 명령어
CMD ["nginx", "-g", "daemon off;"]