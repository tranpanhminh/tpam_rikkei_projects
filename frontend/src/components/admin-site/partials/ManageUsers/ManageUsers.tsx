import React, { useEffect, useState } from "react";
import AddModalUser from "../ManageUsers/Button/AddUser/AddModalUser";

import DetailButtonUser from "./Button/DetailUser/DetailButtonUser";
import { Button, Modal, notification } from "antd";

import styles from "../../AdminPage.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Account } from "../../../../database";
import { Badge } from "react-bootstrap";

// Import API
// 1. Users API
const usersAPI = process.env.REACT_APP_API_USERS;

// ------------------------------------------------
function ManageUsers() {
  document.title = "Manage Users | PetShop";

  const [users, setUsers] = useState<any>(null);
  const [searchText, setSearchText] = useState<string>("");

  const navigate = useNavigate();

  const fetchUsers = () => {
    axios
      .get(`${usersAPI}`)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSearchUser = () => {
    // if (searchText === "") {
    //   // Nếu searchText rỗng, gọi lại fetchUsers để lấy tất cả người dùng
    //   fetchUsers();
    // } else {
    //   // Nếu có searchText, thực hiện tìm kiếm và cập nhật state
    //   axios
    //     .get(`http://localhost:7373/accounts`)
    //     .then((response) => {
    //       // Lấy dữ liệu từ response
    //       const allUsers = response.data;
    //       // Tìm kiếm trong dữ liệu và cập nhật state
    //       const filteredUsers = allUsers.filter((user: Account) => {
    //         if (
    //           user.email
    //             .toLowerCase()
    //             .includes(searchText.trim().toLowerCase()) ||
    //           user.full_name
    //             .toLowerCase()
    //             .includes(searchText.trim().toLowerCase()) ||
    //           user.role
    //             .toLowerCase()
    //             .includes(searchText.trim().toLowerCase()) ||
    //           user.status
    //             .toLowerCase()
    //             .includes(searchText.trim().toLowerCase())
    //         ) {
    //           return true;
    //         }
    //         return false;
    //       });
    //       setUsers(filteredUsers);
    //     })
    //     .catch((error) => {
    //       console.log(error.message);
    //     });
    // }
  };
  
  const handleChangeUser = async (userId: number) => {
    await axios.patch(`${usersAPI}/change-status-account/${userId}`);
    fetchUsers();
  };

  const handleAddUser = (newUser: Account) => {
    axios
      .post("http://localhost:7373/accounts", newUser)
      .then(() => {
        fetchUsers(); // Cập nhật lại dữ liệu users sau khi thêm
        notification.success({
          message: "User Added",
        });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleDeleteUser = async (userId: number) => {
    await axios.delete(`${usersAPI}/delete/${userId}`);
    fetchUsers();
  };

  const changeColor = (status: string) => {
    switch (status) {
      case "Active":
        return "info";
      case "Inactive":
        return "dark";
      default:
        return;
    }
  };

  const changeColorUser = (role: string) => {
    switch (role) {
      case "Super Admin":
        return "success";
      case "Admin":
        return "primary";
      case "Customer":
        return "warning";
      default:
        return;
    }
  };
  return (
    <>
      <div className={styles["breadcrumb"]}>
        <h2 className={styles["page-title"]}>Manage User</h2>
        <p className={styles["page-description"]}>PetShop Admin Panel</p>
      </div>

      <div className={styles["user-board"]}>
        <div className="d-flex" role="search">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            id={styles["search-bar"]}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button
            className="btn btn-outline-success"
            type="submit"
            id={styles["search-btn"]}
            onClick={handleSearchUser}
          >
            Search
          </button>
        </div>

        <AddModalUser
          className={styles["add-user-btn"]}
          value="Add User"
          title="Add User"
          handleClickOk={handleAddUser}
        />
      </div>
      <div className={styles["search-result"]}></div>

      <div className={styles["main-content"]}>
        <h3 className={styles["main-title-content"]}>List Users</h3>
        <table className="table table-striped" id="table-user">
          <thead>
            <tr>
              <th>#</th>
              <th>Email</th>
              <th>Full Name</th>
              <th>Role</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user: any) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.email}</td>
                <td>{user.full_name}</td>
                <td>
                  <Badge bg={changeColorUser(user.user_role.name)}>
                    {user.user_role.name}
                  </Badge>
                </td>
                <td>
                  <Badge bg={changeColor(user.user_status.name)}>
                    {user.user_status.name}
                  </Badge>
                </td>
                <td className={styles["group-btn-admin"]}>
                  {/* <DetailButtonUser
                    className={styles["detail-user-btn"]}
                    value="Detail"
                    title="Edit Profile"
                    handleFunctionOk={() => handleUpdateUser()}
                    getUser={user}
                    content={
                      <DetailModalUserProfile
                        userId={user.id}
                        fullName={user.full_name}
                        email={user.email}
                        role={user.role}
                        status={user.status}
                        feature="Detail"
                      ></DetailModalUserProfile>
                    }
                  ></DetailButtonUser> */}

                  {user.full_name === "Super Admin" && user.role === "admin" ? (
                    ""
                  ) : (
                    <>
                      <Button
                        type="primary"
                        className={styles["change-user-btn"]}
                        onClick={() => handleChangeUser(user.id)}
                      >
                        Change
                      </Button>
                      {/* <DetailButtonUser
                        value="Change"
                        className={styles["change-user-btn"]}
                        handleFunctionBtn={() => handleChangeUser(user.id)}
                      /> */}

                      <Button
                        type="primary"
                        className={styles["delete-user-btn"]}
                        onClick={() => handleDeleteUser(user.id)}
                      >
                        Delete
                      </Button>

                      {/* <DetailButtonUser
                        value="Delete"
                        className={styles["delete-user-btn"]}
                        handleFunctionBtn={() => handleDeleteUser(user.id)}
                      /> */}
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ManageUsers;
