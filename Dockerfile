# node 이미지 기반 Docker 이미지 생성
FROM node

# 작업 디렉토리 설정
WORKDIR /src

# COPY <복사할 경로/파일명> <붙여넣을 디렉토리>
# package.json 작업 디렉토리에 복사
# . = ./ 과 동일 현재 작업 디렉토리 의미
COPY package.json .

# 🌟 [추가된 부분 1] 커스텀 Nginx 설정 파일 복사
# 프론트엔드 프로젝트 루트에 있는 nginx.conf를 Nginx 컨테이너의 기본 설정 파일로 사용
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Nginx의 기본 웹 서비스 경로에 빌드 결과물 복사
COPY --from=builder /app/dist /usr/share/nginx/html

# 3000번 포트 노출
EXPOSE 3000

# Nginx 시작 명령어
CMD ["nginx", "-g", "daemon off;"]
