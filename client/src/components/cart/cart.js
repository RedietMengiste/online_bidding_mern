import React, { useState, useEffect } from "react";
import CartItem from "./cartItem";

export default function Cart() {
  const [checkout, setCheckout] = useState(false);

  const showCheckout = (val) => {
    setCheckout(val);
  };

  return (
    <>
      <div>
        <CartItem />
      </div>
    </>
  );
}
