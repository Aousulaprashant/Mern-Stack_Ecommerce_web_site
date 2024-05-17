import React from "react";
import Product from "./products/Product";
import Login from "./login/Login";
import Register from "./login/Register";
import Cart from "./cart/Cart";
import { Routes, Route } from "react-router-dom";
import Detail from "./utils/detail/Detail";
import CreateProduct from "./CreateProduct";
const Pages = () => {
  return (
    <Routes>
      <Route path="/" element={<Product />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/detail/:id" element={<Detail />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/create-product" element={<CreateProduct />} />
    </Routes>
  );
};

export default Pages;
