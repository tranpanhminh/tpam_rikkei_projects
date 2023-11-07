import axios from "axios";
import jwtDecode from "jwt-decode";
import BaseAxios from "./apiAxiosClient";
import { notification } from "antd";

const postsAPI = process.env.REACT_APP_API_POSTS;

// ---------------------------------
// 1. Get All Posts
export const getAllPosts = async () => {
  const result = await axios.get(`${postsAPI}`);
  return result.data;
};

// 2. Get Detail Post
export const getDetailPost = async (id: number | string | undefined) => {
  const result = await axios.get(`${postsAPI}/detail/${id}`);
  return result.data;
};
