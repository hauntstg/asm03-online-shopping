import React from "react";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showPopupActions } from "../store/store";
import classes from "./Popup.module.css";

export default function Popup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.showPopup.data);

  function closePopup() {
    dispatch(showPopupActions.closePopup());
  }

  function viewDetailHandle() {
    closePopup();
    navigate("/detail/" + data._id.$oid);
  }
  return createPortal(
    <div className="row justify-content-center">
      <div className={classes.popup + " col-7"}>
        <div className={classes.infor}>
          {data && <img src={data.img1} alt={data.name} />}
          <div className={classes.description}>
            <div className={classes.icon}>
              <i className="fa fa-times" onClick={closePopup}></i>
            </div>
            {data && <p className={classes.name}>{data.name}</p>}
            {data && (
              <p className={classes.price}>
                {(+data.price).toLocaleString("de-DE")} VND
              </p>
            )}
            {data && <p className={classes.desc}>{data.short_desc}</p>}
            <button onClick={viewDetailHandle}>
              <i className="fa fa-shopping-cart"></i> View Detail
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("popup")
  );
}
