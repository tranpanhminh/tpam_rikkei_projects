import axios from "axios";
import BaseAxios from "./apiAxiosClient";
import { notification } from "antd";

const workingTimeAPI = process.env.REACT_APP_API_WORKING_TIME;
// ----------Interface-------------
export interface CouponInfo {
  name: string;
  code: string;
  discount_rate: number;
  min_bill: number;
}

// ---------------------------------
// 1. Get All
export const getAllWorkingTime = async () => {
  const result = await axios
    .get(`${workingTimeAPI}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
  return result;
};

// 2. Delete
export const deleteVendor = async (couponId: string | number | undefined) => {
  const result = await BaseAxios.delete(`${workingTimeAPI}/delete/${couponId}`)
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

// 3. Add
export const addVendor = async (data: CouponInfo) => {
  const result = await BaseAxios.post(`${workingTimeAPI}/add`, data)
    .then((response) => {
      notification.success({ message: response.data.message });
      return true;
    })
    .catch((error) => {
      notification.warning({ message: error.response.data.message });
    });
  return result;
};

// 4. Get Detail
export const getDetailVendor = async (id: number | string | undefined) => {
  const result = await axios
    .get(`${workingTimeAPI}/detail/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
  return result;
};

// 5. Update
export const updateVendor = async (
  id: number | string | undefined,
  data: CouponInfo
) => {
  const result = await BaseAxios.patch(`${workingTimeAPI}/update/${id}`, data)
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
