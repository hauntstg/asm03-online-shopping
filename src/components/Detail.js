import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { countActioncs, authActions } from "./store/store";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  saveToStorage,
  getFromStorage,
} from "../components/store/storage-account";
import classes from "./Detail.module.css";

function DetailPage() {
  const userArray = getFromStorage("USERS", "[]");
  const navigate = useNavigate();
  const dispath = useDispatch();
  const count = useSelector((state) => state.count.count);
  const auth = useSelector((state) => state.auth.isAuthenticated);
  const param = useParams();
  const { productId } = param;
  const data = useSelector((state) => state.products.data);
  const emailAuth = useSelector((state) => state.auth.user.email);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [param]);

  // tìm index user để kiểm tra giỏ hàng của tài khoản đang đăng nhập
  const indexUser = JSON.parse(userArray).findIndex(
    (user) => user.email === emailAuth
  );

  const refQuantity = useRef();
  let product = [];
  let relatedProduct = [];
  let category;
  if (data) {
    product = data.filter((prod) => prod._id.$oid === productId);
    category = product[0].category;
    relatedProduct = data
      .filter((prod) => prod.category === category)
      .filter((related) => related._id.$oid !== productId);
  }

  function decrementHandle() {
    dispath(countActioncs.decrement(-1));
  }
  function incrementHandle() {
    dispath(countActioncs.increment(+1));
  }

  function addToCartHandle() {
    // Nếu chưa đăng nhập thì không được Add sản phẩm
    if (indexUser === -1 || auth === false) {
      alert("Vui lòng đăng nhập để thực hiện chức năng này!");
    } else {
      // Kiểm tra xem giỏ hàng của user đã có sản phẩm này chưa, nếu có rồi thì cộng dồn - chưa có thì thêm mới
      const indexCartOfUser = JSON.parse(userArray)[indexUser].cart.findIndex(
        (cart) => cart.productId === productId
      );
      if (indexCartOfUser === -1) {
        console.log("Chưa có trong giỏ hàng!");
        // cập nhật giỏ hàng trước khi cập nhật localStorage
        const prevUserArray = [...JSON.parse(userArray)];
        prevUserArray[indexUser].cart.push({
          productId,
          name: product[0].name,
          img1: product[0].img1,
          price: product[0].price,
          quantity: +refQuantity.current.value,
        });
        // thêm mới sản phẩm vào trong redux
        dispath(
          authActions.addToCart({
            productId,
            name: product[0].name,
            img1: product[0].img1,
            price: product[0].price,
            quantity: +refQuantity.current.value,
          })
        );
        // cập nhật localStorage
        saveToStorage("USERS", JSON.stringify(prevUserArray));
      } else {
        console.log("Đã có trong giỏ hàng");
        // cập nhật giỏ hàng trước khi cập nhật localStorage
        const currQuantity =
          JSON.parse(userArray)[indexUser].cart[indexCartOfUser].quantity; // số lượng hiện tại
        const prevUserArray = [...JSON.parse(userArray)];
        prevUserArray[indexUser].cart[indexCartOfUser].quantity =
          currQuantity + +refQuantity.current.value;
        // cộng dồn sản phẩm vào trong redux
        dispath(
          authActions.updateCart({
            productId,
            quantity: +refQuantity.current.value,
          })
        );
        // cập nhật localStorage
        saveToStorage("USERS", JSON.stringify(prevUserArray));
      }
      dispath(countActioncs.resetCount()); // reset nút Add to cart về 1 trước khi chuyển hướng
      navigate("/cart");
    }
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className={classes.detail + " col-10"}>
          <div className={classes.listImage}>
            <div className={classes.smallImage}>
              <img src={product[0]?.img1} alt={product[0]?.name} />
              <img src={product[0]?.img2} alt={product[0]?.name} />
              <img src={product[0]?.img3} alt={product[0]?.name} />
              <img src={product[0]?.img4} alt={product[0]?.name} />
            </div>
            <div className={classes.bigImage}>
              <img src={product[0]?.img4} alt={product[0]?.name} />
            </div>
            <div className={classes.description}>
              <p className={classes.name}>{product[0]?.name}</p>
              <p className={classes.price}>
                {(+product[0]?.price).toLocaleString("de-DE")} VND
              </p>
              <p className={classes.short_desc}>{product[0]?.short_desc}</p>
              <p className={classes.category}>
                <strong>
                  <i>CATEGORY: </i>
                </strong>
                {product[0]?.category}
              </p>
              <div className={classes.btn}>
                <div className={classes.quantity}>
                  QUANTITY
                  <div>
                    <p onClick={decrementHandle}>
                      <i className="fa fa-caret-up" aria-hidden="true"></i>
                    </p>
                    <input
                      type="number"
                      defaultValue={count}
                      key={count}
                      min="1"
                      ref={refQuantity}
                    />
                    <p onClick={incrementHandle}>
                      <i className="fa fa-caret-down" aria-hidden="true"></i>
                    </p>
                  </div>
                </div>

                <button onClick={addToCartHandle}>Add to cart</button>
              </div>
            </div>
          </div>
          <div className={classes.more}>
            <div className={classes["more-desc"]}>
              <button>DESCRIPTION</button>
              <div className={classes.title}>PRODUCT DESCRIPTION</div>
              <div className={classes["long-desc"]}>
                {product[0]?.long_desc.split("\n").map((str, index) => (
                  <p key={index}>{str}</p>
                ))}
              </div>
            </div>
            <div className={classes["related-product"]}>
              <div className={classes["related-title"]}>RELATED PRODUCTS</div>
              <div className={classes["list-related"]}>
                {relatedProduct?.map((prod) => (
                  <div className={classes["wrap-product"]} key={prod._id.$oid}>
                    <Link to={`/detail/${prod._id.$oid}`}>
                      <img src={prod.img1} alt="related products" />
                    </Link>
                    <div className={classes["related-name"]}>{prod.name}</div>
                    <div className={classes["related-price"]}>
                      {(+prod.price).toLocaleString("de-DE")} VND
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default DetailPage;
