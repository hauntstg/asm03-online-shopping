import React from "react";
import classes from "./LiveChatPopup.module.css";

function LiveChatPopup() {
  return (
    <div className={classes.box}>
      <div className={classes["top-box"]}>
        <div className={classes["top-box__left"]}>Customer Support</div>
        <div className={classes["top-box__right"]}>Let's Chat App</div>
      </div>
      <div className={classes["body-box"]}>
        <div className={classes["body-box__right"]}>Xin chào</div>
        <div className={classes["body-box__right"]}>
          Làm thế nào để xem các sản phẩm
        </div>
        <div className={classes["body-box__left"]}>
          <img src="/images/admin.png" alt="admin" />
          <div>ADMIN: Chào bạn</div>
        </div>
        <div className={classes["body-box__left"]}>
          <img src="/images/admin.png" alt="admin" />
          <div>ADMIN: Bạn có thể vào mục Shop để xem các sản phẩm</div>
        </div>
      </div>
      <div className={classes["bottom-box"]}>
        <div className={classes["bottom-box__left"]}>
          <img src="/images/admin.png" alt="admin" />
          <input type="text" placeholder="Enter Message!" />
          <div className={classes["bottom-box__icon"]}>
            <i className="fa fa-paperclip" aria-hidden="true"></i>
            <i className="fa fa-smile-o" aria-hidden="true"></i>
            <i className="fa fa-telegram" aria-hidden="true"></i>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LiveChatPopup;
