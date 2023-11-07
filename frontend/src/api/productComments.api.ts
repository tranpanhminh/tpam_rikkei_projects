import axios from "axios";
import BaseAxios from "./apiAxiosClient";
import { notification } from "antd";

const productCommentsAPI = process.env.REACT_APP_API_PRODUCT_COMMENTS;

// ---------Interface-----------
export interface UserComment {
  comment: string;
  rating: number;
}
// -------------API-------------

// 1. Get Product Detail Comment
export const getAllCommentsByProduct = async (
  id: string | number | undefined
) => {
  const result = await axios
    .get(`${productCommentsAPI}/${id}/`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
  return result;
};

// 2. Delete Comment
export const deleteProductComment = async (commentId: number) => {
  const result = await BaseAxios.delete(
    `${productCommentsAPI}/delete/${commentId}/`
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

// 3. Add Product Comment
export const addProductComment = async (
  productId: number | string | undefined,
  userId: number | string | undefined,
  data: UserComment
) => {
  const result = await BaseAxios.post(
    `${productCommentsAPI}/add/${productId}/users/${userId}`,
    data
  );
  return result;
};

// 4. Get All Product Comments
export const getAllProductComments = async () => {
  const result = await axios
    .get(`${productCommentsAPI}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
  return result;
};
