import { useCallback } from "react";
import { useLocalStorage } from "./useLocalStorage";

export function useWishlist() {
  const [wishlist, setWishlist] = useLocalStorage("giftmall-wishlist", []);

  const toggleWishlist = useCallback((productId) => {
    setWishlist((current) =>
      current.includes(productId)
        ? current.filter((id) => id !== productId)
        : [...current, productId]
    );
  }, [setWishlist]);

  const isWishlisted = useCallback((productId) => wishlist.includes(productId), [wishlist]);

  return { wishlist, toggleWishlist, isWishlisted };
}
