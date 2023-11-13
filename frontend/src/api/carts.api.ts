import axios from "axios";
import jwtDecode from "jwt-decode";
import BaseAxios from "./apiAxiosClient";
import { notification } from "antd";

const cartsAPI = process.env.REACT_APP_API_CARTS;
// ---------Interface-----------
export interface ProductQuantity {
  quantity: number;
}

// ---------------------------------
// 1. Add Product To Cart
export const addProductToCart = async (
  productId: any,
  userId: any,
  data: any
) => {
  const result = await BaseAxios.post(
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
  return result;
};

// 2. Get Detail User Cart
export const getDetailUserCart = async (userId: any) => {
  const result = await BaseAxios.get(`${cartsAPI}/detail/users/${userId}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data.message;
    });
  return result;
};

// 3. Delete Product From Cart
export const deleteProductFromCart = async (
  productId: number | string | undefined,
  userId: number | string | undefined
) => {
  const result = await BaseAxios.delete(
    `${cartsAPI}/delete/products/${productId}/users/${userId}`
  )
    .then((response) => {
      notification.success({
        message: `${response.data.message}`,
      });
    })
    .catch((error) => {
      notification.warning({
        message: `${error.response.data.message}`,
      });
    });
  return result;
};

// 4. Update Product Quantity In Cart
export const updateProductQuantityInCart = async (
  productId: number | string | undefined,
  userId: number | string | undefined,
  dataCart: ProductQuantity
) => {
  const result = await BaseAxios.patch(
    `${cartsAPI}/update/products/${productId}/users/${userId}`,
    dataCart
  )
    .then((response) => {
      console.log(response);
      notification.success({
        message: `${response.data.message}`,
      });
    })
    .catch((error) => {
      notification.warning({
        message: `${error.response.data.message}`,
      });
    });
  return result;
};
