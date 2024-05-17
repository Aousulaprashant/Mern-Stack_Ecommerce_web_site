import React from "react";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { GlobalState } from "../../../GlobalState";
import Btnrender from "./Btnrender";

const ProductList = ({ product, isAdmin }) => {
  return (
    <div className="product_cart">
      {isAdmin && <input type="checkbox" checked={product.checked} />}
      <img src={product.images.url} alt="/" />
      <div className="product_box">
        <h2 title={product.tittle}>{product.tittle}</h2>
        <span>₹{product.price}/-</span>
      </div>
      <Btnrender product={product} />
    </div>
  );
};

export default ProductList;
