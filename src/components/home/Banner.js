import React from "react";
import { useNavigate } from "react-router-dom";
import classes from "./Banner.module.css";

function Banner() {
  const navigate = useNavigate();
  function handleClick() {
    navigate("/shop");
  }
  return (
    <div className={classes.banner + " col-10"}>
      <img src="./images/banner1.jpg" alt="banner" />
      <div className={classes["collections-button"]}>
        <p>NEW INSPIRATION 2020</p>
        <p>
          20% OFF ON NEW <br />
          SEASON
        </p>
        <button onClick={handleClick}>Browse collections</button>
      </div>
    </div>
  );
}

export default Banner;
