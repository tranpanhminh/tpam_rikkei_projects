import axios from "axios";
import BaseAxios from "./apiAxiosClient";
import { notification } from "antd";

const serviceCommentsAPI = process.env.REACT_APP_API_SERVICE_COMMENTS;

// ---------Interface-----------
export interface UserComment {
  comment: string;
  rating: number;
}
// -------------API-------------

// 1. Get Service Detail Comment
export const getAllCommentsByService = async (
  serviceId: string | number | undefined
) => {
  const result = await axios
    .get(`${serviceCommentsAPI}/${serviceId}/`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
  return result;
};

// 2. Delete Comment
export const deleteServiceComment = async (commentId: number) => {
  const result = await BaseAxios.delete(
    `${serviceCommentsAPI}/delete/${commentId}/`
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

// 3. Add Service Comment
export const addServiceComment = async (
  serviceId: number | string | undefined,
  userId: number | string | undefined,
  data: UserComment
) => {
  const result = await BaseAxios.post(
    `${serviceCommentsAPI}/add/${serviceId}/users/${userId}`,
    data
  );
  return result;
};

// 4. Get All Service Comments
export const getAllServiceComments = async () => {
  const result = await axios
    .get(`${serviceCommentsAPI}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
  return result;
};
