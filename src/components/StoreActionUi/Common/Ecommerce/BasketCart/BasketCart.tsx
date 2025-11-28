import Link from "@/components/common/Link";
import { Routes } from "@/constants/enums";
import { useAppSelector } from "@/redux/hooks";
import React, { useEffect, useState } from "react";
import { CiShoppingCart } from "react-icons/ci";
import { motion } from "framer-motion";

const BasketCart = () => {
  const cart = useAppSelector((state) => state.cart);
  const [uniqueProductCount, setUniqueProductCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Only animate if the count actually changes
    if (cart.items.length !== uniqueProductCount) {
      setIsAnimating(true);
      setUniqueProductCount(cart.items.length);
      
      const timer = setTimeout(() => setIsAnimating(false), 500);
      return () => clearTimeout(timer);
    }
  }, [cart.items.length, uniqueProductCount]);

  return (
    <Link className="relative" href={`/${Routes.CART}`}>
      <CiShoppingCart className="text-2xl" />
      <motion.span
        key={uniqueProductCount}
        initial={{ scale: 0 }}
        animate={{ 
          scale: isAnimating ? [1, 1.3, 1] : 1,
          opacity: 1
        }}
        transition={{ duration: 0.3 }}
        className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center"
      >
        {uniqueProductCount}
      </motion.span>
    </Link>
  );
};

export default BasketCart;