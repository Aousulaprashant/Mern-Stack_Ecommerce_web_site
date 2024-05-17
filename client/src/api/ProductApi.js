import { useEffect, useState } from "react";
import axios from "axios";
const ProductApi = () => {
  const [products, setproducts] = useState([]);

  const getproducts = async () => {
    const res = await axios.get("http://localhost:5000/api/products");
    setproducts(res.data.products);
  };

  useEffect(() => {
    getproducts();
  }, []);

  return {
    products: [products, setproducts],
  };
};

export default ProductApi;
