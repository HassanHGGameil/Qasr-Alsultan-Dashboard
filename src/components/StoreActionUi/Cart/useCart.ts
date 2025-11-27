import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  addItem,
  removeItem,
  decreaseQuantity,
  updateQuantity,
  clearCart,
  CartItem,
} from "@/redux/features/cart/cartSlice";

import { RootState } from "@/redux/store";

export const useCart = () => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state: RootState) => state.cart);

  const addToCart = (product: CartItem) => {
    dispatch(addItem(product));
  };

  const removeFromCart = (productId: string) => {
    dispatch(removeItem({ id: productId }));
  };

  const decreaseCartQuantity = (productId: string) => {
    dispatch(decreaseQuantity({ id: productId }));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    dispatch(updateQuantity({ id: productId, quantity }));
  };

  const clearCartItems = () => {
    dispatch(clearCart());
  };

  const getCartTotal = () => {
    return cart.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };
  const getCartCount = () => {
    return cart.items.reduce((count, item) => count + item.quantity, 0);
  };

  return {
    cart,
    cartItems: cart.items,
    cartCount: getCartCount(),
    cartTotal: getCartTotal(),
    addToCart,
    removeFromCart,
    decreaseCartQuantity,
    updateCartQuantity,
    clearCartItems,
  };
};
