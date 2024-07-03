import React from "react";
import Popup from "../pages/Popup";
import { useDispatch, useSelector } from "react-redux";
import { showPopupActions } from "../store/store";
import classes from "./TrendingProducts.module.css";

function TrendingProducts() {
  const dispatch = useDispatch();
  const showPopup = useSelector((state) => state.showPopup.show);
  const products = useSelector((state) => state.products.data); // lấy sản phẩm từ redux
  // console.log(products);

  //hàm show popup
  function inforProductHandle(e) {
    const productId = e.target.id;
    // tìm index của sản phẩm thông qua id
    const productIndex = products.findIndex(
      (prod) => prod._id.$oid === productId
    );

    // dispatch truyền đối số là sản phẩm cần hiển thị đến redux
    dispatch(showPopupActions.showPopup(products[productIndex]));
  }

  return (
    <>
      {showPopup && <Popup />}
      <div className={classes["trending-products"] + " col-10"}>
        <div className={classes.title}>
          <p>MADE THE HARD WAY</p>
          <p>TOP TRENDING PRODUCTS</p>
        </div>
        <div className={classes.products}>
          {products &&
            products.map((product) => (
              <div className={classes.product} key={product._id.$oid}>
                <img
                  src={product.img1}
                  alt={product.name}
                  id={product._id.$oid}
                  onClick={inforProductHandle}
                />
                <p>{product.name}</p>
                <p>{(+product.price).toLocaleString("de-DE")} VND</p>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default TrendingProducts;
