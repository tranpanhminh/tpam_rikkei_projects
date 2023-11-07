import axios from "axios";

const postsAPI = process.env.REACT_APP_API_POSTS;

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
