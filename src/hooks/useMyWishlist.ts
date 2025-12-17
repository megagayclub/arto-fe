// src/hooks/useMyWishlist.ts
import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";

export interface WishlistItem {
  wishlistId: number;
  artworkId: number;
  title: string;
  artistName: string;
  thumbnailImageUrl: string;
  price: number;
  addedAt: string;
}

export const useMyWishlist = () => {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const res = await axiosInstance.get<WishlistItem[]>("/v1/wishlists");

        setWishlist(res.data ?? []);
      } catch (e: any) {
        const msg =
          e?.response?.data?.message ??
          e?.message ??
          "찜 목록을 불러오지 못했습니다.";
        setError(msg);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  return { wishlist, isLoading, error };
};
