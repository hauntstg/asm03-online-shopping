import React, { useEffect } from "react";
import { Link, Form, useActionData, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "./store/store";
import { getFromStorage, saveToStorage } from "./store/storage-account";
import classes from "./Login.module.css";

function LoginPage() {
  const userArray = getFromStorage("USERS", "[]");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = useActionData();

  // khi đăng nhập thành công thì lưu thông tin tài khoản đang đăng nhập vào redux
  useEffect(() => {
    if (data?.fullname) {
      const index = JSON.parse(userArray).findIndex(
        (user) => user.email === data.email
      );
      const cartOfUser = JSON.parse(userArray)[index].cart;
      dispatch(
        authActions.login({
          fullname: data.fullname,
          email: data.email,
          index,
          cart: cartOfUser,
        })
      );
      navigate("/");
    }
  }, [data]);

  return (
    <div className={classes.login + " col-12"}>
      <img src="/images/banner1.jpg" alt="login banner" />
      <img src="/images/banner1.jpg" alt="login banner" />
      <div className={classes.form}>
        <Form method="post">
          <div className={classes.title}>Sign In</div>
          <input type="text" placeholder="Email" name="email" />
          <input type="password" placeholder="Password" name="password" />
          <button>SIGN IN</button>
          {data && (
            <ul className={classes.error}>
              {Object.values(data).map((err, index) => (
                <li key={index + err}>{err}</li>
              ))}
            </ul>
          )}
          <p>
            Create an account?<Link to="/register"> Sign up</Link>
          </p>
        </Form>
      </div>
    </div>
  );
}

export default LoginPage;

export async function action({ request }) {
  const userArray = getFromStorage("USERS", "[]");
  const data = await request.formData();

  const enteredLogin = {
    email: data.get("email"),
    password: data.get("password"),
  };

  const { email, password } = enteredLogin;
  const index = JSON.parse(userArray).findIndex((user) => user.email === email); // -1 ko tồn tại
  const validatePassword = JSON.parse(userArray)[index]?.password === password;

  // validate form input
  const errors = {};
  if (email.trim() === "") {
    errors.email = "Vui lòng nhập email!";
  } else if (email.includes("@") === false) {
    errors.email = "Email không chính xác, vui lòng nhập lại!";
  } else if (index === -1) {
    errors.email = "Email không tồn tại, vui lòng đăng ký!";
  } else if (!validatePassword) {
    errors.email = "Mật khẩu không chính xác!";
  }
  if (email.trim() === "") {
    errors.password = "Vui lòng nhập mật khẩu!";
  }

  if (Object.keys(errors).length) {
    return errors;
  }

  // Tạo 1 session đăng nhập tại localStorage
  saveToStorage(
    "SESSION",
    JSON.stringify([
      {
        email,
        fullname: JSON.parse(userArray)[index].fullname,
      },
    ])
  );

  // lấy fullname để làm payload dispatch hiển thị trên Navbar (vì cần phải dispatch store ở hàm component nên chưa thể return redirect ở đây)
  return { fullname: JSON.parse(userArray)[index].fullname, email };
}
