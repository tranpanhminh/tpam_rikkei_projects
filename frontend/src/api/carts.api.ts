import axios from "axios";
import jwtDecode from "jwt-decode";
import BaseAxios from "./apiAxiosClient";
import { notification } from "antd";

const cartsAPI = process.env.REACT_APP_API_CARTS;

// ---------------------------------
// 1. Add Product To Cart
export const addProductToCart = async (
  productId: any,
  userId: any,
  data: any
) => {
  await BaseAxios.post(
    `${cartsAPI}/add/products/${productId}/users/${userId}`,
    data
  )
    .then((response) => {
      return notification.success({
        message: `${response.data.message}`,
      });
    })
    .catch((error) => {
      return notification.warning({
        message: `${error.response.data.message}`,
      });
    });
};
