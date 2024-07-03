import React from "react";
import classes from "./Category.module.css";

function Category() {
  return (
    <div className={classes.category + " col-10"}>
      <div className={classes.title}>
        <p>CAREFULLY CREATED COLLECTIONS</p>
        <p>BROWSE OUR CATEGORIES</p>
      </div>
      <div className={classes.products}>
        <img src="./images/product_1.png" alt="iphone" />
        <img src="./images/product_2.png" alt="iphone" />
        <img src="./images/product_3.png" alt="iphone" />
        <img src="./images/product_4.png" alt="iphone" />
        <img src="./images/product_5.png" alt="iphone" />
      </div>
    </div>
  );
}

export default Category;
