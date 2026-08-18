import { useCallback, useMemo } from "react";
import { useLocalStorage } from "./useLocalStorage";

export function useCart() {
  const [cart, setCart] = useLocalStorage("giftmall-cart", []);

  const addToCart = useCallback((productId) => {
    setCart((current) => {
      const existing = current.find((item) => item.productId === productId);
      if (existing) {
        return current.map((item) =>
          item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...current, { productId, quantity: 1 }];
    });
  }, [setCart]);

  const updateQuantity = useCallback((productId, quantity) => {
    setCart((current) => {
      if (quantity <= 0) return current.filter((item) => item.productId !== productId);
      return current.map((item) => item.productId === productId ? { ...item, quantity } : item);
    });
  }, [setCart]);

  const removeFromCart = useCallback((productId) => {
    setCart((current) => current.filter((item) => item.productId !== productId));
  }, [setCart]);

  const itemCount = useMemo(() => cart.reduce((total, item) => total + item.quantity, 0), [cart]);

  return { cart, addToCart, updateQuantity, removeFromCart, itemCount };
}
