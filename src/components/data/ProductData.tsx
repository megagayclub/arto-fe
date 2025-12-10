// src/data/ProductData.ts

export interface ProductDetailType {
  title: string;
  artist: string;
  year: number;
  genre: string;
  medium: string;
  frame: string;
  size: string;
  shippingCost: number;
  shippingMethod: string;
  price: number;
  imagePlaceholder: string; // 이미지 플레이스홀더 URL
}

export const DUMMY_PRODUCT_DETAIL: ProductDetailType = {
  title: "The aura Hitchcock",
  artist: "Kim, Jiyoung Kim",
  year: 2017,
  genre: "Painting",
  medium: "Oil on Canvas",
  frame: "No",
  size: "22.7 x 15.8cm | 1호",
  shippingCost: 10000,
  shippingMethod: "Courier Delivery",
  price: 200000,
  imagePlaceholder: "https://via.placeholder.com/600x600?text=Artwork+Image",
};
