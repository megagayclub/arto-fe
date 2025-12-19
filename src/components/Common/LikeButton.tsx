import React from 'react';
import styled from 'styled-components';
import { FaHeart, FaRegHeart } from 'react-icons/fa'; // react-icons 패키지 확인 [cite: 592]

interface LikeButtonProps {
  isLiked: boolean;
  onToggle: (e: React.MouseEvent) => void;
}

const HeartWrapper = styled.div<{ $isLiked: boolean }>`
  cursor: pointer;
  font-size: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  // 좋아요 상태면 로즈 컬러(#e3857a), 아니면 연한 회색
  color: ${props => props.$isLiked ? '#e3857a' : '#ddd'};
  transition: transform 0.2s ease, color 0.2s ease;

  &:hover {
    transform: scale(1.15);
  }
`;

export const LikeButton: React.FC<LikeButtonProps> = ({ isLiked, onToggle }) => {
  return (
    <HeartWrapper $isLiked={isLiked} onClick={onToggle}>
      {isLiked ? <FaHeart /> : <FaRegHeart />}
    </HeartWrapper>
  );
};