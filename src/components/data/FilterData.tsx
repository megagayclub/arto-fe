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
  { id: "space", icon: <HiHomeModern />, label: "dd" },
  { id: "mood", icon: <GiBedLamp />, label: "분위기" },
  { id: "won", icon: "₩", label: "가격" },
  { id: "size", icon: <FaRulerCombined />, label: "크기" },
  { id: "shape", icon: <FaShapes />, label: "형태" },
  { id: "color", icon: <IoIosColorPalette />, label: "색상" },
  { id: "ship", icon: <MdLocalShipping />, label: "기타" },
  { id: "reset", icon: "↺", label: "초기화" },
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

export const ETC_OPTIONS = [
  { label: "送料無料", value: "FREE_SHIPPING" },
  { label: "着払い", value: "CASH_ON_DELIVERY" },
  { label: "即日配送", value: "PARCEL" },
];

export const MORPH_OPTIONS = [
  { label: "縦長長方形", value: "VERTICAL_RECTANGLE" },
  { label: "横長長方形", value: "HORIZONTAL_RECTANGLE" },
  { label: "円形", value: "CIRCLE" },
  { label: "正方形", value: "SQUARE" },
  { label: "分割型", value: "DIVIDED" },
  { label: "立体的", value: "THREE_DIMENSIONAL" },
  { label: "不定形", value: "IRREGULAR" },
];


export const COLOR_OPTIONS = [
  { hex: "#FF0000", name: "Red", value: 1 },
  { hex: "#FF8000", name: "Orange", value: 2 },
  { hex: "#FFFF00", name: "Yellow", value: 3 },
  { hex: "#008000", name: "Green", value: 4 },
  { hex: "#0000FF", name: "Blue", value: 5 },
  { hex: "#000080", name: "Black", value: 6 },
  { hex: "#800080;", name: "White", value: 7 },
];

