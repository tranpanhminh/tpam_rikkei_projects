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
  const navigate = useNavigate();
  const getData: any = localStorage.getItem("auth");
  const getLoginData = JSON.parse(getData) || "";
  const [users, setUsers] = useState<any>([]);
  const [user, setUser] = useState<any>({});
  const [searchText, setSearchText] = useState<string>("");

  // Fetch API
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

  const fetchUser = () => {
    axios
      .get(`${usersAPI}/detail/${getLoginData.id}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    fetchUsers();
    fetchUser();
  }, []);
  // ------------------------------------------------

  // Handle Search
  const handleSearchUser = () => {
    console.log(searchText, "SADDA");
    if (!searchText) {
      // Nếu searchText rỗng, gọi lại fetchUsers để lấy tất cả người dùng
      fetchUsers();
    } else {
      const filteredUsers = users.filter((user: any) => {
        if (
          user?.email.toLowerCase().includes(searchText.trim().toLowerCase()) ||
          user?.full_name
            .toLowerCase()
            .includes(searchText.trim().toLowerCase()) ||
          user?.user_role?.name
            .toLowerCase()
            .includes(searchText.trim().toLowerCase()) ||
          user?.user_status?.name
            .toLowerCase()
            .includes(searchText.trim().toLowerCase())
        ) {
          return true;
        }
        return false;
      });
      setUsers(filteredUsers);
    }
  };
  // ------------------------------------------------

  // Handle Change User
  const handleChangeUser = async (userId: number) => {
    await axios.patch(`${usersAPI}/change-status-account/${userId}`);
    fetchUsers();
  };
  // ------------------------------------------------

  // Handle Add User
  const handleAddUser = (newUser: Account) => {
    fetchUsers();
  };
  // ------------------------------------------------

  // Handle Delete User
  const handleDeleteUser = async (userId: number) => {
    await axios.delete(`${usersAPI}/delete/${userId}`);
    notification.success({
      message: `Deleted Completed`,
    });
    fetchUsers();
  };
  // ------------------------------------------------

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

        {user.role_id === 1 && (
          <AddModalUser
            className={styles["add-user-btn"]}
            value="Add Admin"
            title="Add Admin"
            handleClickOk={handleAddUser}
          />
        )}
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

                  {user?.role_id === 1 && user?.role_id === 2 ? (
                    ""
                  ) : (
                    <>
                      <Button
                        type="primary"
                        className={styles["change-user-btn"]}
                        onClick={() => handleChangeUser(user.id)}
                        style={{
                          display:
                            user.role_id === 1 ||
                            (getLoginData.id !== user.id && user.role_id === 2)
                              ? "none"
                              : "inline-block",
                        }}
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
                        style={{
                          display:
                            user.role_id === 1 ||
                            (getLoginData.id !== user.id && user.role_id === 2)
                              ? "none"
                              : "inline-block",
                        }}
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
