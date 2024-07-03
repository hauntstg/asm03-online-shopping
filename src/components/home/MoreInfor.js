import React from "react";
import classes from "./MoreInfor.module.css";

function MoreInfor() {
  return (
    <div className={classes["more-infor"] + " col-10"}>
      <div className={classes.infor}>
        <div className={classes["free-shipping"]}>
          <p>FREE SHIPPING</p>
          <p>Free shipping worldwide</p>
        </div>
        <div className={classes["247-service"]}>
          <p>24 x 7 SERVICE</p>
          <p>Free shipping worldwide</p>
        </div>
        <div className={classes["festival-offer"]}>
          <p>FESTIVAL OFFER</p>
          <p>Free shipping worldwide</p>
        </div>
      </div>
      <div className={classes.form}>
        <div className={classes.left}>
          <p>LET'S BE FRIENDS!</p>
          <p>Nisi nisi tempor consequat laboris nise.</p>
        </div>
        <div className={classes.right}>
          <input type="text" placeholder="Enter your email address" />
          <button>Subscribe</button>
        </div>
      </div>
    </div>
  );
}

export default MoreInfor;
