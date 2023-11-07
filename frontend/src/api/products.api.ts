import axios from "axios";
import jwtDecode from "jwt-decode";
import BaseAxios from "./apiAxiosClient";
import { notification } from "antd";

const usersAPI = process.env.REACT_APP_API_USERS;
const productsAPI = process.env.REACT_APP_API_PRODUCTS;

// ---------------------------------
// 2. Get All Users
export const getAllProducts = async () => {
  const result = await axios
    .get(`${productsAPI}/`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
  return result;
};

// 3. Get Detail User
export const getDetailProduct = async (id: number | string | undefined) => {
  const result = await axios
    .get(`${productsAPI}/detail/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
  return result;
};

// // 4. Change User Status
// export const changeStatusUser = async (id: number) => {
//   await BaseAxios.patch(`${usersAPI}/change-status-account/${id}`)
//     .then((response) => {
//       notification.success({
//         message: response.data.message,
//       });
//     })
//     .catch((error) => {
//       notification.success({
//         message: error.data.message,
//       });
//     });
// };

// // 4. Delete User
// export const deleteUser = async (id: number) => {
//   await BaseAxios.delete(`${usersAPI}/delete/${id}`)
//     .then((response) => {
//       console.log(response, "RRR");
//       notification.success({
//         message: response.data.message,
//       });
//     })
//     .catch((error) => {
//       notification.success({
//         message: error.data.message,
//       });
//     });
// };
