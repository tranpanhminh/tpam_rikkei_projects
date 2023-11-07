import axios from "axios";
import BaseAxios from "./apiAxiosClient";
import { notification } from "antd";

const couponsAPI = process.env.REACT_APP_API_COUPONS;
// ----------Interface-------------
export interface CouponInfo {
  name: string;
  code: string;
  discount_rate: number;
  min_bill: number;
}

// ---------------------------------
// 1. Get All Coupons
export const getAllCoupons = async () => {
  const result = await axios
    .get(`${couponsAPI}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
  return result;
};

// 2. Delete Coupon
export const deleteCoupon = async (couponId: string | number | undefined) => {
  const result = await BaseAxios.delete(`${couponsAPI}/delete/${couponId}`)
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

// 3. Add Coupon
export const addCoupon = async (data: CouponInfo) => {
  const result = await BaseAxios.post(`${couponsAPI}/add`, data)
    .then((response) => {
      notification.success({ message: response.data.message });
      return true;
    })
    .catch((error) => {
      notification.warning({ message: error.response.data.message });
    });
  return result;
};

// 4. Get Detail Coupon
export const getDetailCoupon = async (id: number | string | undefined) => {
  const result = await axios
    .get(`${couponsAPI}/detail/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
  return result;
};

// 5. Update Coupon
export const updateCoupon = async (
  id: number | string | undefined,
  data: CouponInfo
) => {
  const result = await BaseAxios.patch(`${couponsAPI}/update/${id}`, data)
    .then((response) => {
      notification.success({
        message: `${response.data.message}`,
      });
      return true;
    })
    .catch((error) => {
      notification.warning({
        message: `${error.response.data.message}`,
      });
    });
  return result;
};
