import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../components/store/store";
import classes from "./NavBar.module.css";
function NavBar() {
  const dispath = useDispatch();
  const auth = useSelector((state) => state.auth.isAuthenticated);
  const fullname = useSelector((state) => state.auth.user.fullname);

  // logout thì cập nhật lại store authenticated và xóa localStorage 'SESSION'
  function logoutHandle() {
    dispath(authActions.logout());
    localStorage.removeItem("SESSION");
  }
  return (
    <div className="container">
      <nav className="row justify-content-center">
        <ul className={classes.list + " col-10"}>
          <li>
            <NavLink
              to=""
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="shop"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Shop
            </NavLink>
          </li>
          <li className={classes.boutique}>BOUTIQUE</li>

          <li>
            <NavLink
              to="cart"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              <i className="fa fa-shopping-cart"></i>Cart
            </NavLink>
          </li>
          <li>
            {!auth && (
              <NavLink
                to="login"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                <i className="fa fa-user" aria-hidden="true"></i>Login
              </NavLink>
            )}
            {auth && (
              <NavLink
                to=""
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                <i className="fa fa-user" aria-hidden="true"></i>
                {fullname}
                <i className="fa fa-caret-down" aria-hidden="true">
                  <span onClick={logoutHandle} style={{ fontStyle: "italic" }}>
                    &nbsp;&nbsp; (Logout)
                  </span>
                </i>
              </NavLink>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default NavBar;
