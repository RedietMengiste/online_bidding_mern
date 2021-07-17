import React, { useState } from "react";
import cart from "./cartHelper";
import { Link } from "react-router-dom";
import { Typography, Input } from "antd";

export default function CartItem(props) {
  const [cartItems, setCartItems] = useState(cart.getCart());

  const handleChange = (index) => (event) => {
    let updatedCartItems = cartItems;
    if (event.target.value == 0) {
      updatedCartItems[index].quantity = 1;
    } else {
      updatedCartItems[index].quantity = event.target.value;
    }
    setCartItems([...updatedCartItems]);
    cart.updateCart(index, event.target.value);
  };
  const getTotal = () => {
    return cartItems.reduce((a, b) => {
      return a + b.quantity * b.product.price;
    }, 0);
  };
  const removeItem = (index) => (event) => {
    let updatedCartItems = cart.removeItem(index);
    if (updatedCartItems.length == 0) {
      props.setCheckout(false);
    }
    setCartItems(updatedCartItems);
  };

  const openCheckout = () => {
    props.setCheckout(true);
  };

  return (
    <>
      <div className={"title"}>Shopping Cart</div>
      {cartItems.length > 0 ? (
        <span>
          {cartItems.map((item, i) => {
            return (
              <span key={i}>
                <div className={"single-product-item"}>
                  <div className={"thumb"}>
                    <a href="#0">
                      <img
                        src={`${process.env.REACT_APP_PRODUCT_IMG_URL}/${item.product.image}`}
                        alt="shop"
                      />
                    </a>
                  </div>
                  <div className={"content"}>
                    <h4 className={"title"}>
                      <a href="#0">{item.product.name}</a>
                    </h4>
                    <div className={"price"}>
                      <span className={"price"}>
                        Price: {item.product.price}
                      </span>{" "}
                      <del className={"dprice"}>$120.00</del>
                      <span className={"total"}>
                        Total Price: {item.product.price * item.quantity}
                      </span>{" "}
                      <del className={"dprice"}>$120.00</del>
                      <span>Shop: {item.product.shop.name}</span>
                    </div>
                    <a href="/" className={"remove-cart"}>
                      Remove
                    </a>
                  </div>
                </div>
              </span>
            );
          })}
        </span>
      ) : (
        <Typography variant="subtitle1" component="h3" color="primary">
          No items added to your cart.
        </Typography>
      )}
    </>
  );
}
