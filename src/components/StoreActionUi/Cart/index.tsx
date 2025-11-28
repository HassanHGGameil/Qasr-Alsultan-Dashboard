'use client'
import React from "react";
import CartHeader from "./CartHeader";
import Checkout from "./Checkout";
import CartItems from "./CartItems";
import { useCart } from "./useCart";
import EmptyCart from "./CartEmpty";

const UserCart = () => {
  const { cartItems } = useCart();

    if (cartItems.length === 0) {
      return <EmptyCart />;
    }

    console.log("cartItems",cartItems)

    
  return (
    <section>
      <div className="container">
        <CartHeader />
        <div className="pb-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="">
              <CartItems />
            </div>
            <div className="">
              <Checkout />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserCart;
