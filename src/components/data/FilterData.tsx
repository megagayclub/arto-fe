// src/data/FilterData.ts
import { HiHomeModern } from "react-icons/hi2";
import { GiBedLamp } from "react-icons/gi";
import { FaRulerCombined } from "react-icons/fa";
import { FaShapes } from "react-icons/fa";
import { IoIosColorPalette } from "react-icons/io";
import { MdLocalShipping } from "react-icons/md";
// 아이콘 타입
export interface FilterIcon {
  id: string;
  icon: React.ReactNode;
  label: string;
}

export const MAIN_FILTER_ICONS: FilterIcon[] = [
  { id: "space", icon: <HiHomeModern />, label: "공간" },
  { id: "mood", icon: <GiBedLamp />, label: "분위기" },
  { id: "won", icon: "₩", label: "가격" },
  { id: "size", icon: <FaRulerCombined />, label: "크기" },
  { id: "shape", icon: <FaShapes />, label: "형태" },
  { id: "color", icon: <IoIosColorPalette />, label: "색상" },
  { id: "ship", icon: <MdLocalShipping />, label: "기타" },
  { id: "reset", icon: "↺", label: "초기화" },
];

export const SPACE_OPTIONS = [
  { label: "거실", value: 1 },
  { label: "침실", value: 2 },
  { label: "주방", value: 3 },
  { label: "사무실", value: 4 },
  { label: "현관", value: 5 }
];

export const MOOD_OPTIONS = [
  { label: "모던", value: 1 },
  { label: "코지", value: 2 },
  { label: "빈티지", value: 3 },
  { label: "미니멀", value: 4 },
  { label: "추상화", value: 5 },
];

// 기타 옵션은 문자열 리스트이므로 그대로 두거나 mapping합니다.
export const ETC_OPTIONS = [
  { label: "무료배송", value: "FREE_SHIPPING" },
  { label: "착불배송", value: "CASH_ON_DELIVERY" },
  { label: "퀵배송", value: "PARCEL" },
];

export const MORPH_OPTIONS = [
  { label: "세로 사각형", value: "VERTICAL_RECTANGLE" },
  { label: "가로 사각형", value: "HORIZONTAL_RECTANGLE" },
  { label: "원형", value: "CIRCLE" },
  { label: "정사각형", value: "SQUARE" },
  { label: "분리된", value: "DIVIDED" },
  { label: "입체적", value: "THREE_DIMENSIONAL" },
  { label: "비정형적", value: "IRREGULAR" },
];

export const COLOR_OPTIONS = [
  { hex: "#FF0000", name: "Red", value: 1 },
  { hex: "#FF8000", name: "Orange", value: 2 },
  { hex: "#FFFF00", name: "Yellow", value: 3 },
  { hex: "#008000", name: "Green", value: 4 },
  { hex: "#0000FF", name: "Blue", value: 5 },
  { hex: "#000000", name: "Black", value: 6 },
  { hex: "#FFFFFF", name: "White", value: 7 },
];

