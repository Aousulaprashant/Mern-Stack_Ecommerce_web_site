import axios from "axios";
import React, { useState } from "react";
const CreateProduct = () => {
  const [newproduct, setnewproduct] = useState({
    product_id: "",
    tittle: "",
    price: "",
    description: "",
    content: "",
    images: {
      public_id: "",
      url: "",
    },
    category: "",
  });

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setnewproduct({ ...newproduct, [name]: value });
  };
  const onChangeImage = async (e) => {
    const files = e.target.files;

    try {
      const formData = new FormData();
      formData.append("file", files[0]);

      const response = await axios.post("/api/upload", formData);
      console.log(response.data);
      console.log(response.data.url);
      setnewproduct({
        ...newproduct,
        images: { public_id: response.data.public_id, url: response.data.url },
      });
    } catch (err) {
      console.error(err);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/api/products", newproduct);

      if (res.status === 200) {
        alert("Product created Sucessfully !");
      }
      setnewproduct({
        product_id: "",
        tittle: "",
        price: "",
        description: "",
        content: "",
        images: {
          public_id: "",
          url: "",
        },
        category: "",
      });

      // window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <h2>Product Information</h2>
      <label>Product ID:</label>
      <input
        type="text"
        id="product_id"
        name="product_id"
        value={newproduct.product_id}
        onChange={onChangeInput}
      />
      <br />

      <label>Tittle:</label>
      <input
        type="text"
        id="tittle"
        name="tittle"
        value={newproduct.tittle}
        onChange={onChangeInput}
      />
      <br />

      <label>Price:</label>
      <input
        type="number"
        id="price"
        name="price"
        value={newproduct.price}
        onChange={onChangeInput}
      />
      <br />

      <label>Description:</label>
      <textarea
        id="description"
        name="description"
        value={newproduct.description}
        onChange={onChangeInput}
      />
      <br />

      <label>Content:</label>
      <textarea
        id="content"
        name="content"
        value={newproduct.content}
        onChange={onChangeInput}
      />
      <br />

      <label>Images:</label>
      <input type="file" id="images" name="images" onChange={onChangeImage} />
      <br />

      <label>Category:</label>
      <input
        type="text"
        id="category"
        name="category"
        value={newproduct.category}
        onChange={onChangeInput}
      />
      <br />

      <input type="submit" value="Submit" />
    </form>
  );
};

export default CreateProduct;
