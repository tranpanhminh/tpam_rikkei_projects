import axios from "axios";
import jwtDecode from "jwt-decode";
import BaseAxios from "./apiAxiosClient";
import { notification } from "antd";

const ordersAPI = process.env.REACT_APP_API_ORDERS;
const cancelReasonsAPI = process.env.REACT_APP_API_CANCEL_REASONS;
// ---------Interface-----------
export interface OrderInfo {
  phone: string;
}

export interface CancelOrderInfo {
  cancel_reason_id: number;
}
// ---------------------------------
// 1. Get

// 2. Get Order By User
export const getUserOrder = async (userId: string | number | undefined) => {
  const result = await BaseAxios.get(`${ordersAPI}/users/${userId}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data.message;
    });
  return result;
};

// 3. Get Order By User + Information
export const getUserOrderInfo = async (
  orderId: string | number | undefined
) => {
  const result = await BaseAxios.get(`${ordersAPI}/detail/${orderId}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data.message;
    });
  return result;
};

// 4. Get Order Items
export const getOrderItems = async (orderId: string | number | undefined) => {
  const result = await BaseAxios.get(`${ordersAPI}/${orderId}/detail`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data.message;
    });
  return result;
};

// 5. Get All Cancel Reasons
export const getAllCancelReasons = async () => {
  const result = await axios
    .get(`${cancelReasonsAPI}/`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data.message;
    });
  return result;
};

// 4. Cancel Order
export const cancelOrder = async (
  orderId: number | string | undefined,
  data: CancelOrderInfo
) => {
  const result = await BaseAxios.patch(
    `${ordersAPI}/cancel-order/${orderId}/`,
    data
  )
    .then((response) => {
      notification.success({
        message: response.data.message,
      });
      return true;
    })
    .catch((error) => {
      notification.warning({
        message: error.response.data.message,
      });
    });
  return result;
};

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
