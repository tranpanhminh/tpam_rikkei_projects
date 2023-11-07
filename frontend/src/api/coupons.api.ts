import axios from "axios";
import jwtDecode from "jwt-decode";
import BaseAxios from "./apiAxiosClient";
import { notification } from "antd";

const couponsAPI = process.env.REACT_APP_API_COUPONS;

// ---------------------------------
// 1. Get All Users
export const getAllCoupons = async () => {
  const result = await axios.get(`${couponsAPI}`);
  return result.data;
};

// // 3. Get Detail User
// export const getDetailUser = async (id: number) => {
//   await axios
//     .get(`${usersAPI}/detail/${id}`)
//     .then((response) => {
//       return response.data;
//     })
//     .catch((error) => {
//       return error;
//     });
// };

// // 4. Change User Status
// export const changeStatusUser = async (id: number) => {
//   await BaseAxios.patch(`${usersAPI}/change-status-account/${id}`)
//     .then((response) => {
//       notification.success({
//         message: response.data.message,
//       });
//     })
//     .catch((error) => {
//       notification.warning({
//         message: error.data.message,
//       });
//     });
// };

// // 4. Delete User
// export const deleteUser = async (id: number) => {
//   await BaseAxios.delete(`${usersAPI}/delete/${id}`)
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
