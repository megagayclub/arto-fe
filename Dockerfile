# 1단계: 빌드 환경
FROM node:20-slim AS builder

WORKDIR /app

# 1. 설정 파일만 먼저 복사
COPY package*.json pnpm-lock.yaml ./

# 2. 패키지 설치
RUN npm install -g pnpm && pnpm install

# 3. [핵심 수정] COPY . . 대신 필요한 것만 따로 복사합니다.
# 이렇게 하면 내 컴퓨터의 node_modules가 들어올 틈이 없습니다.
COPY src ./src
COPY public ./public
COPY index.html ./
COPY tsconfig.json ./
COPY tsconfig.node.json ./
COPY vite.config.ts ./

# 4. 빌드 (여기서 tsc 에러가 나면 package.json에서 "build": "vite build"로 수정)
RUN pnpm run build

# 2단계: 서빙 환경
FROM nginx:stable-alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
