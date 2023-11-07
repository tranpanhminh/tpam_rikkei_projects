import axios from "axios";

const pagesAPI = process.env.REACT_APP_API_PAGES;

// ---------------------------------
// 1. Get All Pages
export const getAllPages = async () => {
  const result = await axios
    .get(`${pagesAPI}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
  return result;
};

// 2. Get Detail Page
export const getDetailPage = async (id: number | string | undefined) => {
  const result = await axios
    .get(`${pagesAPI}/detail/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
  return result;
};
