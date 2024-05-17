import axios from "axios";
import React, { useEffect, useState } from "react";

const Userapi = (token) => {
  const [islogged, setlogged] = useState(false);
  const [isAdmin, setisAdmin] = useState(false);
  const [cart, setCart] = useState([]);
  useEffect(() => {
    if (token) {
      const getUser = async () => {
        try {
          const res = await axios.get("/user/info", {
            headers: { Authorization: token },
          });

          setlogged(true);
          res.data.user.role === 1 ? setisAdmin(true) : setisAdmin(false);
          console.log(res.data);
        } catch (err) {
          alert(err.response.data.msg);
        }
      };
      getUser();
    }
  }, [token]);

  const addCart = (product) => {
    if (!islogged) return alert("Please log in first.");

    const check = cart.every((item) => item.id !== product._id);

    if (check) {
      setCart([...cart, { ...product, quantity: 1 }]);
    } else {
      alert("This product has already been added to the cart.");
    }
  };
  return {
    islogged: [islogged, setlogged],
    isAdmin: [isAdmin, setisAdmin],
    cart: [cart, setCart],
    addCart: addCart,
  };
};

export default Userapi;
