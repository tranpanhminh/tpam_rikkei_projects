import axios from "axios";
import jwtDecode from "jwt-decode";
import BaseAxios from "./apiAxiosClient";
import { message, notification } from "antd";

const usersAPI = process.env.REACT_APP_API_USERS;

// ----------------Interface----------------

export interface UserPassword {
  old_password: string;
  new_password: string;
}

export interface DataLogin {
  email: string;
  password: string;
}

export interface UserRegister {
  email: string;
  full_name: string;
  password: string;
  re_password: string;
}
// -----------------------------------------

// 1. Lấy thông tin người dùng đăng nhập
export const getDataLogin = async () => {
  const token: any = localStorage.getItem("token") || "";
  let data: any;
  if (token) {
    try {
      data = jwtDecode(token);
      // Kiểm tra thời hạn của token
      // const currentTimestamp = Math.floor(Date.now() / 1000);
      // if (data.exp < currentTimestamp) {
      //   console.log("Token is expired.");
      // } else {
      //   console.log("Token is valid.");
      // }
      const result = await axios
        .get(`${usersAPI}/detail/${data.id}`)
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          return error;
        });
      const { password, ...dataUser } = result;
      return (data = dataUser);
    } catch (error) {
      return error;
    }
  } else {
    console.log("Invalid Token");
  }
  return data;
};

// 2. Get All Users
export const getAllUsers = async () => {
  const result = await axios
    .get(`${usersAPI}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
  return result;
};

// 3. Get Detail User
export const getDetailUser = async (id: number) => {
  const result = await axios
    .get(`${usersAPI}/detail/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
  return result;
};

// 4. Change User Status
export const changeStatusUser = async (id: number) => {
  await BaseAxios.patch(`${usersAPI}/change-status-account/${id}`)
    .then((response) => {
      notification.success({
        message: response.data.message,
      });
    })
    .catch((error) => {
      notification.warning({
        message: error.response.data.message,
      });
    });
};

// 4. Delete User
export const deleteUser = async (id: number) => {
  const result = await BaseAxios.delete(`${usersAPI}/delete/${id}`)
    .then((response) => {
      notification.success({
        message: response.data.message,
      });
    })
    .catch((error) => {
      notification.warning({
        message: error.response.data.message,
      });
    });
  return result;
};

// 5. Add Admin
export const addUser = async (data: any) => {
  const result = await BaseAxios.post(`${usersAPI}/add/`, data)
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

// 6. Change Password
export const changeUserPassword = async (
  userId: number | string | undefined,
  data: UserPassword
) => {
  const result = await BaseAxios.patch(
    `${usersAPI}/change-password/${userId}`,
    data
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

// 7. Change Avatar
export const changeUserAvatar = async (id: number, data: any, config: any) => {
  const result = await BaseAxios.patch(
    `${usersAPI}/edit-avatar/${id}`,
    data,
    config
  )
    .then((response) => {
      notification.success({
        message: response.data.message,
      });
    })
    .catch((error) => {
      notification.warning({
        message: error.response.data.message,
      });
    });
  return result;
};

// 8. Change Avatar
export const changeUserName = async (id: number, data: any) => {
  const result = await BaseAxios.patch(`${usersAPI}/update/${id}`, data)
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

// 9. Google Login
export const googleLogin = async () => {
  const result = await axios.get(`${usersAPI}/google`);
  window.location.href = result.data.url;
};

// 10. Google Callback
export const googleCallback = async () => {
  const result = await axios.get(`${usersAPI}/google/callback`);
  return result.data.accessToken;
};

// 11. Google Data
export const getUserGoogleProfile = async (token: string) => {
  try {
    const response = await axios.get("/google/user-data", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 12. Login (Thường)
export const login = async (dataLogin: DataLogin) => {
  const result = await axios
    .post(`${usersAPI}/login`, dataLogin)
    .then((response) => {
      localStorage.setItem("token", response.data.accessToken);
      message.open({
        type: "success",
        content: "Login Successfully",
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

// 13. User Register
export const userRegister = async (userInfo: UserRegister) => {
  const result = await axios
    .post(`${usersAPI}/register`, userInfo)
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

// 14. Request Reset Password Link
export const requestResetPassword = async (email: any) => {
  const result = axios
    .post(`${usersAPI}/reset-password`, email)
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

// 15. Reset Password
export const resetPassword = async (token: any, data: any) => {
  const result = await axios
    .post(`${usersAPI}/reset-password/${token}`, data)
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

// 16. Validate Token
export const validateResetPasswordToken = async (token: any) => {
  const decodedToken: any = await jwtDecode(token);
  if (Date.now() >= decodedToken.exp * 1000) {
    return false;
  }
  const checkExistToken = await axios
    .get(`${usersAPI}/reset-token/${token}`)
    .then((response) => {
      return true;
    })
    .catch((error) => {
      notification.warning({
        message: `This reset password link is expired, please request a new link`,
      });
      return false;
    });
  return checkExistToken;
};

// 17. Validate Google Login Token
export const validateGoogleLoginToken = async (token: any) => {
  let data: any;
  if (token) {
    try {
      data = jwtDecode(token);
      const result = await axios
        .get(`${usersAPI}/detail/${data.id}`)
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          return error;
        });
    } catch (error) {
      return error;
    }
  } else {
    return false;
  }
  return data;
};
