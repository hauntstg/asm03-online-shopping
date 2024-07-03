import React from "react";
import CheckoutForm from "../components/checkout/CheckoutForm";
import classes from "./Checkout.module.css";
import { redirect } from "react-router-dom";

function CheckoutPage() {
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-10">
          <div className={classes["top-bg"]}>
            <div className={classes.checkout}>
              <span>CHECKOUT</span>
              <span>
                HOME / CART /{" "}
                <span style={{ color: "var(--color-gray-500)" }}>
                  {" "}
                  CHECKOUT
                </span>
              </span>
            </div>
          </div>
        </div>
        <CheckoutForm />
      </div>
    </div>
  );
}

export default CheckoutPage;

export async function action({ request }) {
  const data = await request.formData();
  const enteredForm = {
    fullname: data.get("fullname"),
    email: data.get("email"),
    phone: data.get("phone"),
    address: data.get("address"),
  };
  const { fullname, email, phone, address } = enteredForm;
  const errors = {};

  if (fullname.trim() === "") {
    errors.fullname = "Vui lòng nhập tên đầy đủ!";
  }
  if (email.trim() === "") {
    errors.email = "Vui lòng nhập email!";
  } else if (email.includes("@") === false) {
    errors.email = "Email chưa chính xác, vui lòng nhập lại!";
  }
  if (phone.trim() === "") {
    errors.phone = "Vui lòng nhập số điện thoại!";
  }
  if (address.trim() === "") {
    errors.address = "Vui lòng nhập địa chỉ!";
  }

  if (Object.keys(errors).length) {
    return errors;
  }
  // console.log(fullname, email, phone, address);
  return { message: "Bạn đã đặt hàng thành công!" };
}
