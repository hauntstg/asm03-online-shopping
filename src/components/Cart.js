import React from "react";
import CartHandle from "./cart/CartHandle";
import classes from "./Cart.module.css";

function CartPage() {
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-10">
          <div className={classes["top-bg"]}>
            <div className={classes.cartcart}>
              <span>CART</span>
              <span>CART</span>
            </div>
          </div>
        </div>
        <CartHandle />
      </div>
    </div>
  );
}

export default CartPage;
