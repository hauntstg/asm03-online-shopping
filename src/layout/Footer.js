import React from "react";
import classes from "./Footer.module.css";

function Footer() {
  return (
    <div className={classes.footer}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-10">
            <div className="container p-0">
              <div className="row">
                <div className="customer-services col-md-4">
                  <p className={classes.title}>CUSTOMER SERVICES</p>
                  <p>Help & Contact Us</p>
                  <p>Return & Refunds</p>
                  <p>Online Stores</p>
                  <p>Terms & Conditions</p>
                </div>
                <div className="company  col-md-4">
                  <p className={classes.title}>COMPANY</p>
                  <p>What We Do</p>
                  <p>Available Services</p>
                  <p>Lastest Posts</p>
                  <p>FAQs</p>
                </div>
                <div className="Social-media  col-md-4">
                  <p className={classes.title}>SOCIAL MEDIA</p>
                  <p>Twitter</p>
                  <p>Instagram</p>
                  <p>Facebook</p>
                  <p>Printerest</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
