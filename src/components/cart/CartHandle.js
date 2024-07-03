import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/store";
import { saveToStorage, getFromStorage } from "../store/storage-account";
import classes from "./CartHandle.module.css";
import { Link } from "react-router-dom";

function CartHandle() {
  const userArray = getFromStorage("USERS", "[]");
  const dispath = useDispatch();
  const refQuantity = useRef();
  const index = useSelector((state) => state.auth.user.index);
  const auth = useSelector((state) => state.auth.isAuthenticated);
  // const productsOfUser = JSON.parse(userArray)[index]?.cart || []; // cách 1 get product từ localStorage
  const productsOfUser = useSelector((state) => state.auth.user.cart); // cách 2 get product từ redux
  const user = useSelector((state) => state.auth.user);

  // sao chép sâu từ 1 đối tượng read only
  const currProductsOfUser = JSON.parse(JSON.stringify(productsOfUser));
  const currUsersArray = JSON.parse(userArray);
  // tổng tiền
  const total = productsOfUser.reduce(
    (accumulator, currentValue) =>
      accumulator + +currentValue.price * currentValue.quantity,
    0
  );

  function decrementHandle(e) {
    // thẻ i nằm trong thẻ p, chỉ có thẻ p là có id nên khi click vào thẻ i sẽ ko get đc id => sử dụng closest để tìm thằng cha gần nhất
    const idClicked = e.target.closest("p").id;
    const indexOfProduct = productsOfUser.findIndex(
      (prod) => prod.productId === idClicked
    );
    // min = 1, ko thể decrement về số < 1
    if (currProductsOfUser[indexOfProduct].quantity === 1) {
      currProductsOfUser[indexOfProduct].quantity = 1;
    } else {
      currProductsOfUser[indexOfProduct].quantity--;
    }

    currUsersArray[index].cart = currProductsOfUser;
    // clone state.user từ store với cart đã được ghi đè
    const updateUserLogined = { ...user, cart: currProductsOfUser };
    // cập nhật localStorage
    saveToStorage("USERS", JSON.stringify(currUsersArray));
    // cập nhật redux từ state.user đã clone từ trước
    dispath(authActions.login(updateUserLogined)); // cập nhật bằng method login(), có thẻ cập nhật bằng updateCart(productId, quantity)
  }

  function incrementHandle(e) {
    const idClicked = e.target.closest("p").id;
    const indexOfProduct = productsOfUser.findIndex(
      (prod) => prod.productId === idClicked
    );
    currProductsOfUser[indexOfProduct].quantity++;
    currUsersArray[index].cart = currProductsOfUser;
    const updateUserLogined = { ...user, cart: currProductsOfUser };
    saveToStorage("USERS", JSON.stringify(currUsersArray));
    dispath(authActions.login(updateUserLogined));
  }

  // onChange input: khi nhập tay vào input thay vì click vào button decrement hay increment
  function changeQuantityHandle(e) {
    const num = +e.target.value;
    const idClicked = e.target.id;
    const indexOfProduct = productsOfUser.findIndex(
      (prod) => prod.productId === idClicked
    );
    currProductsOfUser[indexOfProduct].quantity = num;
    currUsersArray[index].cart = currProductsOfUser;
    const updateUserLogined = { ...user, cart: currProductsOfUser };
    saveToStorage("USERS", JSON.stringify(currUsersArray));
    dispath(authActions.login(updateUserLogined));
  }

  // xóa sản phẩm khỏi giỏ hàng
  function removeProductHandle(e) {
    const idClicked = e.target.id;
    const indexOfProduct = productsOfUser.findIndex(
      (prod) => prod.productId === idClicked
    );
    currUsersArray[index].cart.splice(indexOfProduct, 1);
    // const updateUserLogined = { ...user, cart: currProductsOfUser };
    saveToStorage("USERS", JSON.stringify(currUsersArray));
    // dispath(authActions.login(updateUserLogined));
    dispath(authActions.deleteProduct(indexOfProduct));
  }

  return (
    <div className="col-10">
      <div className="container p-0">
        <div className={classes.shoppingcart + " row"}>
          <div className={classes.title + " col-12"}>SHOPPING CART</div>
          <div className="col-8">
            <table className={classes.table}>
              <thead>
                <tr>
                  <th scope="col">IMAGE</th>
                  <th scope="col">PRODUCT</th>
                  <th scope="col">PRICE</th>
                  <th scope="col">QUANTITY</th>
                  <th scope="col">TOTAL</th>
                  <th scope="col">REMOVE</th>
                </tr>
              </thead>
              <tbody>
                {auth &&
                  productsOfUser?.map((prod) => (
                    <tr key={prod.name}>
                      <td className={classes.img}>
                        <img src={prod.img1} alt="product" />
                      </td>
                      <td className={classes.name}>{prod.name}</td>
                      <td className={classes.price}>
                        {(+prod.price).toLocaleString("de-DE")} VND
                      </td>
                      <td className={classes.quantity}>
                        <div>
                          <p onClick={decrementHandle} id={prod.productId}>
                            <i
                              className="fa fa-caret-up"
                              aria-hidden="true"
                            ></i>
                          </p>
                          <input
                            type="number"
                            defaultValue={prod.quantity}
                            key={prod.quantity}
                            min="1"
                            ref={refQuantity}
                            onChange={changeQuantityHandle}
                            id={prod.productId}
                          />
                          <p onClick={incrementHandle} id={prod.productId}>
                            <i
                              className="fa fa-caret-down"
                              aria-hidden="true"
                            ></i>
                          </p>
                        </div>
                      </td>
                      <td className={classes.price}>
                        {(+prod.price * prod.quantity).toLocaleString("de-DE")}{" "}
                        VND
                      </td>
                      <td className={classes.remove}>
                        <i
                          className="fa fa-trash-o"
                          aria-hidden="true"
                          onClick={removeProductHandle}
                          id={prod.productId}
                        ></i>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <div className="col-4">
            <div className={classes["wrap-carttotal"]}>
              <p>CART TOTAL</p>
              <div className={classes.carttotal}>
                <div className={classes["subtotal-title"]}>SUBTOTAL</div>
                <div className={classes["subtotal-value"]}>
                  {auth && productsOfUser ? total.toLocaleString("de-DE") : 0}
                  &nbsp;VND
                </div>
                <div className={classes["total-title"]}>TOTAL</div>
                <div className={classes["total-value"]}>
                  {auth && productsOfUser ? total.toLocaleString("de-DE") : 0}
                  &nbsp;VND
                </div>
                <input type="text" />
                <button>
                  <i className="fa fa-gift" aria-hidden="true"></i> &nbsp;Apply
                  coupon
                </button>
              </div>
            </div>
          </div>
          <div className={classes.redirect + " col-8"}>
            <div className={classes["wrap-redirect"]}>
              <Link className={classes.shopping} to="/shop">
                <i className="fa fa-long-arrow-left" aria-hidden="true"></i>{" "}
                &nbsp;Continue shopping
              </Link>
              <Link className={classes.checkout} to="/checkout">
                Proceed to checkout &nbsp;
                <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartHandle;
