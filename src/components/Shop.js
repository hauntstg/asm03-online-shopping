import React, { useEffect } from "react";
import ShopCategory from "./shop/ShopCategory";
import classes from "./Shop.module.css";

function ShopPage() {
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-10">
          <div className={classes["top-bg"]}>
            <div className={classes.shopshop}>
              <span>SHOP</span>
              <span>SHOP</span>
            </div>
          </div>
        </div>
        <ShopCategory />
      </div>
    </div>
  );
}

export default ShopPage;

export async function loader({ request, params }) {
  // const category = new URL(request.url).searchParams.get("category");
  // // const category = params.categoryProduct;
  // // console.log(category);
  // const res = await fetch(
  //   "https://firebasestorage.googleapis.com/v0/b/funix-subtitle.appspot.com/o/Boutique_products.json?alt=media&token=dc67a5ea-e3e0-479e-9eaf-5e01bcd09c74"
  // );

  // const data = await res.json();

  // const productsSelected = [];
  // for (const value of data) {
  //   if (category == null) {
  //     return data;
  //   }
  //   if (value.category === category) {
  //     productsSelected.push(value);
  //   }
  // }
  // console.log(productsSelected);

  return null;
}
