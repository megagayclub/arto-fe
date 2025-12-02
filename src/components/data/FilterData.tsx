// src/data/FilterData.ts

// 아이콘 타입
export interface FilterIcon {
  id: string;
  icon: string;
  label: string;
}

export const MAIN_FILTER_ICONS: FilterIcon[] = [
  { id: "home", icon: "🏠", label: "공간" },
  { id: "light", icon: "💡", label: "분위기" },
  { id: "won", icon: "₩", label: "가격" },
  { id: "size", icon: "📏", label: "크기" },
  { id: "shape", icon: "🖼️", label: "형태" },
  { id: "color", icon: "🎨", label: "색상" },
  { id: "ship", icon: "🚚", label: "기타" },
  { id: "reset", icon: "↺", label: "초기화" },
];

export const SPACE_OPTIONS: string[] = [
  "거실",
  "다이닝룸",
  "서재",
  "침실",
  "놀이방",
  "공부방",
  "복도",
  "로비",
  "회의실",
  "카페",
  "바",
];
export const MOOD_OPTIONS: string[] = [
  "모던",
  "빈티지",
  "미니멀",
  "모던클래식",
  "인더스트리얼",
];
export const ETC_OPTIONS: string[] = [
  "무료배송",
  "착불배송",
  "퀵배송",
  "꽃길 제외",
];
export const SHAPE_OPTIONS: string[] = [
  "세로 사각형",
  "가로 사각형",
  "원형",
  "정사각형",
  "다각형",
  "테이블",
  "다발",
  "기타",
];
export const COLOR_OPTIONS: { hex: string; name: string }[] = [
  { hex: "#FF0000", name: "Red" },
  { hex: "#FF8000", name: "Orange" },
  { hex: "#FFFF00", name: "Yellow" },
  { hex: "#008000", name: "Green" },
  { hex: "#0000FF", name: "Blue" },
  { hex: "#FF00FF", name: "Pink" },
  { hex: "#800080", name: "Purple" },
  { hex: "#000000", name: "Black" },
  { hex: "#FFFFFF", name: "White" },
  { hex: "#A9A9A9", name: "Grey" },
  { hex: "#8B4513", name: "Brown" },
  { hex: "#556B2F", name: "Olive" },
];
