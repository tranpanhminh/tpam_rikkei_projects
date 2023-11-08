import axios from "axios";
import BaseAxios from "./apiAxiosClient";
import { notification } from "antd";

const postsAPI = process.env.REACT_APP_API_POSTS;

export interface PostInfo {
  title: string;
  content: string;
  thumbnail_url: string;
  author: string;
  status_id: string;
}
// ---------------------------------
// 1. Get All Posts
export const getAllPosts = async () => {
  const result = await axios
    .get(`${postsAPI}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
  return result;
};

// 2. Get Detail Post
export const getDetailPost = async (id: number | string | undefined) => {
  const result = await axios
    .get(`${postsAPI}/detail/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
  return result;
};

// 3. Delete Post
export const deletePost = async (postId: string | number | undefined) => {
  const result = await BaseAxios.delete(`${postsAPI}/delete/${postId}`)
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
      return false;
    });
  return result;
};

// 4. Update Post
export const updatePost = async (
  id: number | string | undefined,
  formData: any,
  config: any
) => {
  const result = await BaseAxios.patch(
    `${postsAPI}/update/${id}`,
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
      return false;
    });
  return result;
};

// 5. Add
export const addPost = async (formData: any, config: any) => {
  const result = await BaseAxios.post(`${postsAPI}/add`, formData, config)
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
