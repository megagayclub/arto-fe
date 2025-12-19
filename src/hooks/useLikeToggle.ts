import { useState } from 'react';
import axiosInstance from "../utils/axiosInstance"; 

export const useLikeToggle = (initialLiked: boolean, artworkId: number) => {
  const [isLiked, setIsLiked] = useState(initialLiked);

  const toggleLike = async (e: React.MouseEvent) => {
    e.stopPropagation(); // 카드 클릭 시 상세 이동 방지

    // 1. UI를 먼저 변경 (낙관적 업데이트)
    const previousState = isLiked;
    setIsLiked(!isLiked);

    try {
      if (!previousState) {
        // 찜 추가 (POST)
        await axiosInstance.post(`/v1/wishlists/${artworkId}`);
      } else {
        // 찜 삭제 (DELETE)
        await axiosInstance.delete(`/v1/wishlists/${artworkId}`);
      }
    } catch (error: any) {
      // 실패 시 원래 상태로 복구
      setIsLiked(previousState);
      
      // 401 에러(인증 만료/비로그인) 처리
      if (error.response?.status === 401) {
        alert("ログインが必要です。(로그인이 필요합니다.)");
      } else {
        console.error("좋아요 처리 중 오류 발생:", error);
      }
    }
  };

  return { isLiked, toggleLike };
};