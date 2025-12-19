// src/components/Checkout/CheckoutData.ts

export interface ProductItem {
  id: string;
  title: string;
  artist: string;
  size: string;
  price: number;
  year: number;
  thumbnail: string;
}

export interface OrderSummaryData {
  subtotal: number;
  shippingFee: number;
  discount: number;
  totalAmount: number;
}


export const DUMMY_SUMMARY: OrderSummaryData = {
  subtotal: 3500000,
  shippingFee: 0,
  discount: 0,
  totalAmount: 3500000,
};
