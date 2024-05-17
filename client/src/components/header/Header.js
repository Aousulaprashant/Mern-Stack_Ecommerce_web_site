import React, { useContext } from "react";
import { TfiMenuAlt } from "react-icons/tfi";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { GlobalState } from "../../GlobalState";
import axios from "axios";

const Header = () => {
  const state = useContext(GlobalState);
  const [islogged, setislogged] = state.UserApi.islogged;
  const [isAdmin, setisAdmin] = state.UserApi.isAdmin;
  const [cart] = state.UserApi.cart;

  const adminRouer = () => {
    return (
      <>
        <li>
          <Link to="/create-product">Create Product</Link>
        </li>
      </>
    );
  };
  const logoutUser = async () => {
    await axios.get("/user/logout");
    localStorage.clear();
    setisAdmin(false);
    setislogged(false);
  };
  const loggedRouer = () => {
    return (
      <>
        <li>
          <Link to="/history">History</Link>
        </li>
        <li>
          <Link to="/" onClick={logoutUser}>
            Logout
          </Link>
        </li>
      </>
    );
  };
  return (
    <header>
      <div className="menu">
        <TfiMenuAlt size={30} />
      </div>
      <div className="logo">
        <h1>
          <Link to="/">{isAdmin ? "Admin's Store" : "Dev's Store"}</Link>
        </h1>
      </div>
      <ul>
        <li>
          <Link to="/">{isAdmin ? "Products" : "Shop"}</Link>
        </li>

        {isAdmin && adminRouer()}
        {islogged ? (
          loggedRouer()
        ) : (
          <li>
            <Link to="/login">Login or Register</Link>
          </li>
        )}

        <li>
          <IoClose size={30} className="menu" />
        </li>
      </ul>

      {isAdmin ? (
        ""
      ) : (
        <div className="cart-icon">
          <span>{cart.length}</span>
          <Link to="/cart">
            <MdOutlineAddShoppingCart size={30} />
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
