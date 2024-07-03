import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./components/Home";
import ShopPage, { loader as categoryLoader } from "./components/Shop";
import DetailPage from "./components/Detail";
import CartPage from "./components/Cart";
import CheckoutPage, {
  action as getDataFormAction,
} from "./components/Checkout";
import LoginPage, { action as loginAction } from "./components/Login";
import RegisterPage, { action as registerAction } from "./components/Register";
import RootLayout from "./layout/Root";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateProductsActions, authActions } from "./components/store/store";
import { getFromStorage } from "./components/store/storage-account";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "shop",
        element: <ShopPage />,
        loader: categoryLoader,
        children: [{ path: ":categoryProduct", element: <ShopPage /> }],
      },
      { path: "detail/:productId", element: <DetailPage /> },
      { path: "cart", element: <CartPage /> },
      {
        path: "checkout",
        element: <CheckoutPage />,
        action: getDataFormAction,
      },
      { path: "login", element: <LoginPage />, action: loginAction },
      { path: "register", element: <RegisterPage />, action: registerAction },
    ],
  },
]);

const accountLogined = getFromStorage("SESSION", "[]");
const userArray = getFromStorage("USERS", "[]");

function App() {
  const dispatch = useDispatch();

  // Kiểm tra đã đăng nhập chưa
  if (JSON.parse(accountLogined).length) {
    const { email, fullname } = JSON.parse(accountLogined)[0];
    const index = JSON.parse(userArray).findIndex(
      (user) => user.email === email
    );
    const cartOfUser = JSON.parse(userArray)[index].cart;
    dispatch(authActions.login({ email, fullname, index, cart: cartOfUser })); // index - stt của tài khoản trong mảng users localStorage
  }

  // get danh sách sản phẩm từ api và lưu vào redux
  useEffect(() => {
    const abortController = new AbortController();
    async function fetchData() {
      const res = await fetch(
        "https://firebasestorage.googleapis.com/v0/b/funix-subtitle.appspot.com/o/Boutique_products.json?alt=media&token=dc67a5ea-e3e0-479e-9eaf-5e01bcd09c74",
        { signal: abortController.signal }
      );

      const data = await res.json();
      dispatch(updateProductsActions.dataProducts(data));

      return () => {
        abortController.abort();
      };
    }
    fetchData();
  }, []);
  return <RouterProvider router={router} />;
}

export default App;
