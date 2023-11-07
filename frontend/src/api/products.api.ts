import axios from "axios";
import jwtDecode from "jwt-decode";
import BaseAxios from "./apiAxiosClient";
import { notification } from "antd";

const usersAPI = process.env.REACT_APP_API_USERS;
const productsAPI = process.env.REACT_APP_API_PRODUCT_COMMENTS;

// ---------------------------------

// 1. Lấy thông tin người dùng đăng nhập
export const getDataLogin = async () => {
  const token: any = localStorage.getItem("token") || "";
  let data: any;
  if (token) {
    try {
      data = jwtDecode(token);

      // Kiểm tra thời hạn của token
      const currentTimestamp = Math.floor(Date.now() / 1000);
      if (data.exp < currentTimestamp) {
        console.log("Token is expired.");
      } else {
        console.log("Token is valid.");
      }
    } catch (error) {
      return error;
    }
  } else {
    console.log("Token Not Found.");
  }
  return data;
};

// 2. Get All Users
export const getAllUsers = async () => {
  const result: any = await axios.get(`${usersAPI}`);
  return result.data;
};

// 3. Get Detail User
export const getDetailUser = async (id: number) => {
  await axios
    .get(`${usersAPI}/detail/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

// 4. Change User Status
export const changeStatusUser = async (id: number) => {
  await BaseAxios.patch(`${usersAPI}/change-status-account/${id}`)
    .then((response) => {
      notification.success({
        message: response.data.message,
      });
    })
    .catch((error) => {
      notification.success({
        message: error.data.message,
      });
    });
};

// 4. Delete User
export const deleteUser = async (id: number) => {
  await BaseAxios.delete(`${usersAPI}/delete/${id}`)
    .then((response) => {
      console.log(response, "RRR");
      notification.success({
        message: response.data.message,
      });
    })
    .catch((error) => {
      notification.success({
        message: error.data.message,
      });
    });
};

// 5. Get Product Detail Comment
export const getProductDetailComment = async (
  id: string | number | undefined
) => {
  await axios
    .get(`${productsAPI}/detail/${id}/`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};
