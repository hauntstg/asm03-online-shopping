import React from "react";
import { useSelector } from "react-redux";
import classes from "./CheckoutForm.module.css";
import { Form, useActionData, useNavigate } from "react-router-dom";
function CheckoutForm() {
  const navigate = useNavigate();
  const dataEntered = useActionData();
  const auth = useSelector((state) => state.auth.isAuthenticated);
  const productsOfUser = useSelector((state) => state.auth.user.cart);
  const totalBill = productsOfUser.reduce(
    (accumulator, currentValue) =>
      accumulator + +currentValue.price * currentValue.quantity,
    0
  );

  // đặt hàng thành công thì alert ra message
  if (dataEntered?.message) {
    alert(dataEntered.message);
    navigate("/");
  }

  return (
    <div className="col-10">
      <div className={classes.title}>BILLING DETAILS</div>
      <div className="container p-0">
        <div className="row justify-content-center pb-4">
          <div className="col-6">
            <Form action="/checkout" method="POST" className={classes.form}>
              <label>FULL NAME:</label>
              <input
                type="text"
                placeholder="Enter Your Full Name Here!"
                name="fullname"
              />
              <label>EMAIL:</label>
              <input
                type="text"
                placeholder="Enter Your Email Here!"
                name="email"
              />
              <label>PHONE NUMBER:</label>
              <input
                type="text"
                placeholder="Enter Your Phone Number Here!"
                name="phone"
              />
              <label>ADDRESS:</label>
              <input
                type="text"
                placeholder="Enter Your Address Here!"
                name="address"
              />
              <button>Place order</button>
            </Form>
            {!dataEntered?.message && dataEntered && (
              <ul className={classes.error}>
                {Object.values(dataEntered).map((err, index) => (
                  <li key={err + index}>{err}</li>
                ))}
              </ul>
            )}
          </div>
          <div className="col-6">
            <div className={classes.order}>
              <p>YOUR ORDER</p>
              <div className={classes.bill}>
                {auth &&
                  productsOfUser.map((prod) => (
                    <div
                      className={classes["wrap-product"]}
                      key={prod.productId}
                    >
                      <div className={classes.name}>{prod.name}</div>
                      <div className={classes.price}>
                        {(+prod.price).toLocaleString("de-DE")} VND x{" "}
                        {prod.quantity}
                      </div>
                    </div>
                  ))}
                <div className={classes.total}>
                  <div className={classes["total-title"]}>TOTAL</div>
                  <div className={classes["total-price"]}>
                    {auth ? totalBill.toLocaleString("de-DE") : 0} VND
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutForm;
