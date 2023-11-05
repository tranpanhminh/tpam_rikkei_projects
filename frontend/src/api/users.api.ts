import axios from "axios";

const usersAPI = process.env.REACT_APP_API_USERS;

// ---------------------------------
export class UsersApi {
  getAllUsers = async () => {
    await axios
      .get(`${usersAPI}`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error;
      });
  };

  getDetailUser = async (id: number) => {
    await axios
      .get(`${usersAPI}/detail/${id}`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error;
      });
  };
}
