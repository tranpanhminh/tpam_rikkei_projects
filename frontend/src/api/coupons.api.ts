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
