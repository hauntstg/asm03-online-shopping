import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import classes from "./ShopCategory.module.css";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";

let keyAutoIncrease = 0;
function ShopCategory() {
  const resetRef = useRef();
  const searchRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();
  const param = useParams();
  const [option, setOption] = useState("0");
  const queryParam = new URLSearchParams(location.search);
  const searchQuery = queryParam.get("search");
  const { categoryProduct } = param;
  const data = useSelector((state) => state.products.data);
  let productsUpdate = [];
  let productsSearch = [];

  // mỗi lần component này render key sẽ tăng lên 1 - element img sẽ bị xóa và tạo lại
  keyAutoIncrease++;

  // reset page khi param thay đổi
  useEffect(() => {
    setOption("0");
    searchRef.current.value = "";
  }, [categoryProduct]);

  // reset page như trên, khi đang sort desc rồi click vào nút all sẽ setOption('0'), search === '';
  useEffect(() => {
    const resetRefCurrent = resetRef.current;
    function setOptionHandle() {
      setOption("0");
      searchRef.current.value = "";
    }
    if (resetRef && resetRef.current) {
      resetRef.current.addEventListener("click", setOptionHandle);
    }

    return () => {
      resetRefCurrent?.removeEventListener("click", setOptionHandle);
    };
  }, [resetRef]);

  // lấy danh sách sản phẩm từ redux ra hiển thị
  if (data) {
    for (const value of data) {
      // trường hợp lấy tất cả
      if (categoryProduct === undefined) {
        productsUpdate.push(value);
      } else if (value.category === categoryProduct) {
        // trường hợp lọc theo param
        productsUpdate.push(value);
      }
    }
    // lọc theo selected (giá giả dần)
    if (queryParam.get("sort") === "desc") {
      productsUpdate.sort((a, b) => a.price - b.price).reverse();
    }
    // lọc theo từ khóa search
    if (searchQuery !== null) {
      // mảng tạm lưu sản phẩm theo từ khóa
      productsSearch = productsUpdate.filter((prod) =>
        prod.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      // tạo mới lại mảng rồi thêm lại sản phẩm từ mảng tạm
      productsUpdate = [];
      for (const value of productsSearch) {
        productsUpdate.push(value);
      }
    }
  }

  // nút sort có 2 chế độ default/desceding
  function sortingHandle(e) {
    setOption(e.target.value);
    // trường hợp descending value = 1
    if (e.target.value === "1") {
      if (searchQuery && searchQuery.toLowerCase() !== null) {
        // khi đã nhập từ khóa để search
        // search từ khóa iphone rồi sort value 1
        navigate("?search=" + searchQuery.toLowerCase() + "&sort=desc");
      } else {
        // khi chưa nhập từ khóa để search
        navigate("?sort=desc");
      }
    } else {
      // trường hợp sort default value = 0
      if (categoryProduct === undefined) {
        // trường hợp đang ở /shop và search/sort
        if (searchQuery && searchQuery.toLowerCase() !== null) {
          // search từ khóa iphone rồi sort value 1, sau đó sort value 0
          navigate(`?search=${searchQuery.toLowerCase()}`);
        } else {
          // click sort value 1 sau đó sort lại value 0
          navigate("/shop");
        }
      } else {
        // trường hợp đang ở /shop/:categoryProduct và search/sort
        if (searchQuery && searchQuery.toLowerCase() !== null) {
          // click vào navbar iphone, search từ khóa 54 rồi sort value 1, sau đó sort value 0
          navigate(`?search=${searchQuery.toLowerCase()}`);
        } else {
          // click navbar iphone rồi sort value 1 sau đó sort lại value 0
          navigate(categoryProduct);
        }
      }
    }
  }

  function searchHandle(e) {
    const search = e.target.value;
    if (search) {
      if (option === "1") {
        // sort value 1, search iphone sẽ thấy sp iphone đã được descending theo giá
        navigate("?search=" + search + `&sort=desc`);
      } else {
        navigate("?search=" + search);
      }
    }
  }

  return (
    <div className={"col-10"}>
      <div className="container p-0">
        <div className={classes.top + " row"}>
          <div className="col-3">
            <span>CATEGORIES</span>
          </div>
          <div className="col-7">
            <input
              type="text"
              placeholder="Enter Search Here!"
              ref={searchRef}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  searchHandle(e);
                }
              }}
            />
          </div>
          <div className="col-2">
            <select onChange={sortingHandle} value={option}>
              <option value="0">Default sorting</option>
              <option value="1">Sort descending</option>
            </select>
          </div>
        </div>
        <div className={classes.bottom + " row"}>
          <div className="col-3">
            <div className={classes.menu}>
              <p className={classes.apple}>APPLE</p>
              <Link className={classes.all} to="" ref={resetRef}>
                All
              </Link>
              <p className={classes.iphonemac}>IPHONE & MAC</p>
              <Link className={classes.iphone} to="iphone">
                Iphone
              </Link>{" "}
              <br />
              <Link className={classes.ipad} to="ipad">
                Ipad
              </Link>{" "}
              <br />
              <Link className={classes.macbook} to="macbook">
                Macbook
              </Link>{" "}
              <br />
              <p className={classes.wireless}>WIRELESS</p>
              <Link className={classes.airpod} to="airpod">
                Airpod
              </Link>{" "}
              <br />
              <Link className={classes.watch} to="watch">
                Watch
              </Link>{" "}
              <br />
              <p className={classes.other}>OTHER</p>
              <Link className={classes.mouse} to="mouse">
                Mouse
              </Link>{" "}
              <br />
              <Link className={classes.keyboard} to="keyboard">
                Keyboard
              </Link>{" "}
              <br />
              <Link className={classes.other2} to="other">
                Other
              </Link>{" "}
              <br />
            </div>
          </div>
          <div className="col-9">
            <div className={classes.products}>
              {productsUpdate &&
                productsUpdate.map((product) => (
                  <div className={classes.product} key={product._id.$oid}>
                    <Link to={`/detail/${product._id.$oid}`}>
                      <img
                        src={product.img1}
                        alt={product.name}
                        id={product._id.$oid}
                        key={product._id.$oid + keyAutoIncrease}
                      />
                    </Link>
                    <p>{product.name}</p>
                    <p>{(+product.price).toLocaleString("de-DE")} VND</p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShopCategory;
// navbar iphone, sort value 1, search 64
// sort value 1 rồi f5
