import { createContext, useEffect, useState } from "react";
import ProductApi from "./api/ProductApi";
import axios from "axios";
import Userapi from "./api/Userapi";

export const GlobalState = createContext();

export const DataProvider = ({ children }) => {
  const [token, setToken] = useState(false);

  const refreshToken = async () => {
    const res = await axios.post("/user/refresh_token");
    setToken(res.data.accesstoken);
  };

  useEffect(() => {
    const firstLogin = localStorage.getItem("firstLogin");
    if (firstLogin) {
      refreshToken();
    }
  }, []);

  const state = {
    token: [token, setToken],
    productApi: ProductApi(),
    UserApi: Userapi(token),
  };

  return <GlobalState.Provider value={state}>{children}</GlobalState.Provider>;
};
