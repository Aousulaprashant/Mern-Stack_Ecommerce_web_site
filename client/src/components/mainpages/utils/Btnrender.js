import React from "react";
import { GlobalState } from "../../../GlobalState";
import { Link } from "react-router-dom";
import { useContext } from "react";
import axios from "axios";
const Btnrender = ({ product }) => {
  const state = useContext(GlobalState);

  const [isAdmin] = state.UserApi.isAdmin;
  const addCart = state.UserApi.addCart;

  const deleteProduct = async (id) => {
    try {
      const response = await axios.delete(`/api/products/${id}`);
      console.log(response.status);

      if (response.status === 200) {
        alert("Product Deleted sucessfully");
      } else {
        alert("Something went wrong");
      }
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const handleClick = () => {
    console.log(product);
    alert(`Press ok to Delete the Product !!  id : ${product._id}`);
    deleteProduct(product._id);
  };
  return (
    <div className="row_bnt">
      {isAdmin ? (
        <>
          <Link id="bnt_buy" onClick={handleClick}>
            Delete
          </Link>
          <Link id="bnt_view" to={`detail/${product._id}`}>
            Edit
          </Link>
        </>
      ) : (
        <>
          <Link id="bnt_buy" to={"#!"} onClick={() => addCart(product)}>
            Buy
          </Link>
          <Link id="bnt_view" to={`detail/${product._id}`}>
            View
          </Link>
        </>
      )}
    </div>
  );
};

export default Btnrender;
