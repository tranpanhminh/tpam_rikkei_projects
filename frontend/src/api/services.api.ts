import axios from "axios";
import jwtDecode from "jwt-decode";
import BaseAxios from "./apiAxiosClient";

const servicesAPI = process.env.REACT_APP_API_SERVICES;

// ---------------------------------
// 2. Get All Services
export const getAllServices = async () => {
  const result = await axios
    .get(`${servicesAPI}/`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
  return result;
};

// 3. Get Detail Service
export const getDetailService = async (id: number | string | undefined) => {
  const result = await axios
    .get(`${servicesAPI}/detail/${id}`)
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
