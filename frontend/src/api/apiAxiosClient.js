import axios from "axios";

const BaseAxios = axios.create({
  baseURL: "http://localhost:7373",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
BaseAxios.defaults.withCredentials = true;

BaseAxios.interceptors.request.use(
  async (config) => {
    let token;
    try {
      token = await localStorage.getItem("token");
    } catch (e) {}

    if (token !== null) config.headers.Authorization = `Bearer ${token}`;

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);
// after send request
BaseAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default BaseAxios;
