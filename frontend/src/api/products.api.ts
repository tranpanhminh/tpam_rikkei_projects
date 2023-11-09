import axios from "axios";
import BaseAxios from "./apiAxiosClient";
import { notification } from "antd";

const productsAPI = process.env.REACT_APP_API_PRODUCTS;
// ----------Interface-------------
export interface PostInfo {
  name: string;
  description: string;
  price: number;
  quantity_stock: number;
}

// ---------------------------------
// 2. Get All
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

// 3. Get Detail
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

// 4. Delete Product
export const deleteProduct = async (id: number) => {
  const result = await BaseAxios.delete(`${productsAPI}/delete/${id}`)
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

// 5. Update Product
export const updateProduct = async (
  id: number | string | undefined,
  data: PostInfo
) => {
  const result = await BaseAxios.patch(`${productsAPI}/update/${id}`, data)
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

// 5. Update Product Image
export const updateProductImage = async (
  productId: number | string | undefined,
  imageId: number | string | undefined,
  formData: any,
  config: any
) => {
  const result = await BaseAxios.patch(
    `${productsAPI}/${productId}/update-image/${imageId}`,
    formData,
    config
  )
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

// 6. Update Product Thumbnail
export const updateThumbnail = async (
  productId: number | string | undefined,
  imageId: number | string | undefined
) => {
  const result = await BaseAxios.patch(
    `${productsAPI}/${productId}/update-thumbnail/${imageId}}`
  )
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

// 7. Add Product
export const addProduct = async (formData: any, config: any) => {
  const result = await BaseAxios.post(`${productsAPI}/add`, formData, config)
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

// 8. Add Product
export const paginationProducts = async (page: number, limit: number) => {
  const result = await axios
    .get(`${productsAPI}/?page=${page}&limit=${limit}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
  return result;
};

// 9. Import Products
export const importProducts = async (file: File, config: any) => {
  const result = await axios
    .post(`${productsAPI}/import`, file, config)
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
