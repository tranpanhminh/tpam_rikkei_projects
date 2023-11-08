import axios from "axios";

const postStatusesAPI = process.env.REACT_APP_API_POST_STATUS;
// ----------Interface-------------

// ---------------------------------
// 1. Get All
export const getAllPostStatuses = async () => {
  const result = await axios
    .get(`${postStatusesAPI}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
  return result;
};
