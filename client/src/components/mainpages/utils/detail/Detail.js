import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { GlobalState } from "../../../../GlobalState";
import axios from "axios";

const Detail = () => {
  const params = useParams();
  const state = useContext(GlobalState);

  const [isAdmin] = state.UserApi.isAdmin;
  const [products] = state.productApi.products;
  const [detailProduct, setDetailProduct] = useState([]);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (params) {
      products.forEach((product) => {
        if (product._id === params.id) {
          setDetailProduct(product);
        }
      });
    }
  }, [params, products]);

  const handleUpdate = () => {
    // Update the product in the database
    // You'll need to implement the update logic here
    // For example, you can use the `axios` library to make a PUT request to your API
    axios
      .put(`/api/products/${params.id}`, detailProduct)
      .then((response) => {
        setEditMode(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleEdit = () => {
    setEditMode(true);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setDetailProduct({ ...detailProduct, [name]: value });
  };

  return (
    <div className="detail">
      {console.log(detailProduct)}
      <img src={detailProduct.images?.url} alt="" />
      <div className="box-detail">
        <div className="row">
          {isAdmin && editMode ? (
            <input
              type="text"
              name="title"
              value={detailProduct.tittle}
              onChange={handleInputChange}
            />
          ) : (
            <h2>Tittle: {detailProduct.tittle}</h2>
          )}
          {isAdmin && editMode ? (
            <input
              type="text"
              name="price"
              value={detailProduct.price}
              onChange={handleInputChange}
            />
          ) : (
            <h6>Price: ₹{detailProduct.price}</h6>
          )}
        </div>

        {isAdmin && editMode ? (
          <textarea
            style={{ width: "100%", height: "60%" }}
            name="description"
            value={detailProduct.description}
            onChange={handleInputChange}
          />
        ) : (
          <p>Decricption : {detailProduct.description}</p>
        )}
        {isAdmin && editMode ? (
          <textarea
            name="content"
            value={detailProduct.content}
            onChange={handleInputChange}
          />
        ) : (
          <p>Content: {detailProduct.content}</p>
        )}
        <p>Sold:{detailProduct.sold}</p>
        {isAdmin && (
          <div>
            {editMode ? (
              <button
                style={{
                  backgroundColor: "#41C9E2",
                  padding: "10px",
                  borderRadius: "10px",
                }}
                onClick={handleUpdate}
              >
                Update
              </button>
            ) : (
              <button
                style={{
                  backgroundColor: "#41C9E2",
                  padding: "10px",
                  borderRadius: "10px",
                }}
                onClick={handleEdit}
              >
                Edit
              </button>
            )}
          </div>
        )}
        {isAdmin && (
          <div>
            {editMode ? (
              ""
            ) : (
              <Link
                to="/cart"
                className="cart"
                style={{ borderRadius: "10px" }}
              >
                Buy Now
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Detail;
