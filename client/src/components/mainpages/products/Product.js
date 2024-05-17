import React, { useContext, useState, useEffect } from "react";
import { GlobalState } from "../../../GlobalState";
import ProductList from "../utils/ProductList";

const Product = () => {
  const state = useContext(GlobalState);
  const [products, setProducts] = useState([]);
  const [isAdmin] = state.UserApi.isAdmin;
  const addCart = state.UserApi.addCart;
  const [filter, setFilter] = useState({});
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(9);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          `/api/products?${createQueryParams(filter, sort, page, limit)}`
        );
        const data = await res.json();
        setProducts(data.products);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProducts();
  }, [filter, sort, page, limit]);

  const createQueryParams = (filter, sort, page, limit) => {
    const queryParams = [];
    if (filter) {
      Object.keys(filter).forEach((key) => {
        queryParams.push(`${key}=${filter[key]}`);
      });
    }
    if (sort) {
      queryParams.push(`sort=${sort}`);
    }
    queryParams.push(`page=${page}`);
    queryParams.push(`limit=${limit}`);
    return queryParams.join("&");
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter((prevFilter) => ({ ...prevFilter, [name]: value }));
  };

  const handleSortChange = (e) => {
    setSort(e.target.value);
  };

  const handlePageChange = (e) => {
    setPage(e.target.value);
  };

  return (
    <div className="products-main">
      <div className="filters">
        <select name="category" onChange={handleFilterChange}>
          <option value="">Filter</option>
          <option value="electronics">Electronics</option>
          <option value="clothing">Clothing</option>
          {/* Add more options as needed */}
        </select>
        <select name="sort" onChange={handleSortChange}>
          <option value="">Sort</option>
          <option value="price">Price (Low to High)</option>
          <option value="-price">Price (High to Low)</option>
          {/* Add more options as needed */}
        </select>
        <label>Page:</label>
        <select name="page" onChange={handlePageChange}>
          {[...Array(10).keys()].map((i) => (
            <option key={i} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
      </div>
      <div className="products">
        {products.map((product) => (
          <ProductList key={product._id} product={product} isAdmin={isAdmin} />
        ))}
      </div>
    </div>
  );
};

export default Product;
