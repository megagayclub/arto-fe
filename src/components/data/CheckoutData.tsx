// src/components/Checkout/CheckoutData.ts

export interface ProductItem {
  id: string;
  title: string;
  artist: string;
  size: string;
  price: number;
  year: number;
}

export interface OrderSummaryData {
  subtotal: number;
  shippingFee: number;
  discount: number;
  totalAmount: number;
}

export const DUMMY_PRODUCTS: ProductItem[] = [
  {
    id: "C-pattern_02",
    title: "C-pattern_02",
    artist: "ARTC",
    size: "2023. Mixed media, 180x180cm, 72.0x72.0in",
    price: 3500000,
    year: 2023,
  },
];

export const DUMMY_SUMMARY: OrderSummaryData = {
  subtotal: 3500000,
  shippingFee: 0,
  discount: 0,
  totalAmount: 3500000,
};
