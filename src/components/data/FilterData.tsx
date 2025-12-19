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
  { id: "space", icon: <HiHomeModern />, label: "空間" },
  { id: "mood", icon: <GiBedLamp />, label: "雰囲気" },
  { id: "won", icon: "₩", label: "価格" },
  { id: "size", icon: <FaRulerCombined />, label: "サイズ" },
  { id: "shape", icon: <FaShapes />, label: "形" },
  { id: "color", icon: <IoIosColorPalette />, label: "色" },
  { id: "ship", icon: <MdLocalShipping />, label: "その他" },
  { id: "reset", icon: "↺", label: "リセット" },
];

export const SPACE_OPTIONS = [
  { label: "リビング", value: 1 },
  { label: "寝室", value: 2 },
  { label: "キッチン", value: 3 },
  { label: "オフィス", value: 4 },
  { label: "玄関", value: 5 }
];

export const MOOD_OPTIONS = [
  { label: "モダン", value: 1 },
  { label: "コージー", value: 2 },
  { label: "ヴィンテージ", value: 3 },
  { label: "ミニマル", value: 4 },
  { label: "抽象", value: 5 },
];

// 기타 옵션은 문자열 리스트이므로 그대로 두거나 mapping합니다.
export const ETC_OPTIONS = [
  { label: "送料無料", value: "FREE_SHIPPING" },
  { label: "着払い", value: "CASH_ON_DELIVERY" },
  { label: "クイック配送", value: "PARCEL" },
];

export const MORPH_OPTIONS = [
  { label: "縦長の長方形", value: "VERTICAL_RECTANGLE" },
  { label: "横長の長方形", value: "HORIZONTAL_RECTANGLE" },
  { label: "円形", value: "CIRCLE" },
  { label: "正方形", value: "SQUARE" },
  { label: "分割", value: "DIVIDED" },
  { label: "立体的", value: "THREE_DIMENSIONAL" },
  { label: "不定形", value: "IRREGULAR" },
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

