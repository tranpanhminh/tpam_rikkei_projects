import axios from "axios";
import jwtDecode from "jwt-decode";
import BaseAxios from "./apiAxiosClient";
import { notification } from "antd";

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

// 4. Delete Product
export const deleteService = async (id: number) => {
  const result = await BaseAxios.delete(`${servicesAPI}/delete/${id}`)
    .then((response) => {
      notification.success({
        message: response.data.message,
        // placement: "bottomLeft",
      });
      return true;
    })
    .catch((error) => {
      notification.success({
        message: error.response.data.message,
      });
      return false;
    });
  return result;
};

// 5. Add
export const addService = async (formData: any, config: any) => {
  const result = await BaseAxios.post(`${servicesAPI}/add`, formData, config)
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
      return false;
    });
  return result;
};
