import axios from "axios";
import jwtDecode from "jwt-decode";
import BaseAxios from "./apiAxiosClient";
import { notification } from "antd";

const orderItemsAPI = process.env.REACT_APP_API_ORDER_ITEMS;
// ---------Interface-----------
export interface ProductQuantity {
  quantity: number;
}

// ---------------------------------
// 1. Get Best Selling Products
export const getBestSellingProducts = async () => {
  const result = await axios
    .get(`${orderItemsAPI}/report`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      const array: any[] = [];
      return array;
    });
  return result;
};

// // 2. Get Detail User Cart
// export const getDetailUserCart = async (userId: any) => {
//   const result = await BaseAxios.get(`${cartsAPI}/detail/users/${userId}`)
//     .then((response) => {
//       return response.data;
//     })
//     .catch((error) => {
//       return error.response.data.message;
//     });
//   return result;
// };

// // 3. Delete Product From Cart
// export const deleteProductFromCart = async (
//   productId: number | string | undefined,
//   userId: number | string | undefined
// ) => {
//   const result = await BaseAxios.delete(
//     `${cartsAPI}/delete/products/${productId}/users/${userId}`
//   )
//     .then((response) => {
//       notification.success({
//         message: `${response.data.message}`,
//       });
//     })
//     .catch((error) => {
//       notification.warning({
//         message: `${error.response.data.message}`,
//       });
//     });
//   return result;
// };

// // 4. Update Product Quantity In Cart
// export const updateProductQuantityInCart = async (
//   productId: number | string | undefined,
//   userId: number | string | undefined,
//   dataCart: ProductQuantity
// ) => {
//   const result = await BaseAxios.patch(
//     `${cartsAPI}/update/products/${productId}/users/${userId}`,
//     dataCart
//   )
//     .then((response) => {
//       //   notification.success({
//       //     message: `${response.data.message}`,
//       //   });
//     })
//     .catch((error) => {
//       notification.warning({
//         message: `${error.response.data.message}`,
//       });
//     });
//   return result;
// };
