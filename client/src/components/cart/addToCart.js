import React, { useState } from "react";
import cart from "./cartHelper";
import { Redirect } from "react-router-dom";
import { ShoppingCartOutlined, createFromIconfontCN } from "@ant-design/icons";
const IconFont = createFromIconfontCN({
  scriptUrl: [
    "//at.alicdn.com/t/font_1788044_0dwu4guekcwr.js", // icon-javascript, icon-java, icon-shoppingcart (overrided)
    "//at.alicdn.com/t/font_1788592_a5xf2bdic3u.js", // icon-shoppingcart, icon-python
  ],
});
export default function AddToCart(props) {
  const [redirect, setRedirect] = useState(false);
  const addToCart = () => {
    cart.addItem(props.item, () => {
      setRedirect({ redirect: true });
    });
  };
  //   if (redirect) {
  //     return <Redirect to={"/cart"} />;
  //   }

  return (
    <>
      {props.item.quantity >= 0 ? (
        <span className={"icon"} onClick={addToCart}>
          <i>
            <IconFont
              type="icon-shoppingcart"
              style={{ fontSize: "35px", color: "#4A4DB9" }}
            />
          </i>
        </span>
      ) : (
        <span className={"icon"} onClick={addToCart}>
          <i>
            <IconFont
              type="icon-shoppingcart"
              style={{ fontSize: "35px", color: "#4A4DB9" }}
            />
          </i>
        </span>
      )}
    </>
  );
}
