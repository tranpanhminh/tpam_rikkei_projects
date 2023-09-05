import React, { useEffect, useState } from "react";
import AddModalUser from "../ManageUsers/Button/AddUser/AddModalUser";

import DetailButtonUser from "./Button/DetailUser/DetailButtonUser";
import { Button, Modal, notification } from "antd";

import styles from "../../AdminPage.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { Account } from "../../../../database";
import { Badge } from "react-bootstrap";

function ManageUsers() {
  const [users, setUsers] = useState<null | Account[]>(null);
  const [searchText, setSearchText] = useState<string>("");

  const navigate = useNavigate();

  const fetchUsers = () => {
    axios
      .get("http://localhost:7373/accounts")
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
    if (searchText === "") {
      // Nếu searchText rỗng, gọi lại fetchUsers để lấy tất cả người dùng
      fetchUsers();
    } else {
      // Nếu có searchText, thực hiện tìm kiếm và cập nhật state
      axios
        .get(`http://localhost:7373/accounts`)
        .then((response) => {
          // Lấy dữ liệu từ response
          const allUsers = response.data;

          // Tìm kiếm trong dữ liệu và cập nhật state
          const filteredUsers = allUsers.filter((user: Account) => {
            if (
              user.email
                .toLowerCase()
                .includes(searchText.trim().toLowerCase()) ||
              user.fullName
                .toLowerCase()
                .includes(searchText.trim().toLowerCase()) ||
              user.role
                .toLowerCase()
                .includes(searchText.trim().toLowerCase()) ||
              user.status
                .toLowerCase()
                .includes(searchText.trim().toLowerCase())
            ) {
              return true;
            }
            return false;
          });

          setUsers(filteredUsers);
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  };
  const handleChangeUser = (userId: number) => {
    const updatedUsers = users?.map((user) => {
      if (user.id === userId) {
        return {
          ...user,
          status: user.status === "Active" ? "Inactive" : "Active",
        };
      }
      return user;
    });

    if (updatedUsers) {
      axios
        .put(
          `http://localhost:7373/accounts/${userId}`,
          updatedUsers.find((user) => user.id === userId)
        )
        .then(() => {
          setUsers(updatedUsers);
          notification.success({
            message: "User Status Changed",
          });
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
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

  const handleDeleteUser = (userId: number) => {
    axios
      .delete(`http://localhost:7373/accounts/${userId}`)
      .then(() => {
        fetchUsers(); // Cập nhật lại dữ liệu users sau khi xóa
        notification.success({
          message: "User Deleted",
        });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const changeColor = (status: string) => {
    switch (status) {
      case "Active":
        return "success";
      case "Inactive":
        return "secondary";
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
            id="search-bar"
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
            {users?.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.email}</td>
                <td>{user.fullName}</td>
                <td>{user.role}</td>
                <td>
                  <Badge bg={changeColor(user.status)}>{user.status}</Badge>
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
                        fullName={user.fullName}
                        email={user.email}
                        role={user.role}
                        status={user.status}
                        feature="Detail"
                      ></DetailModalUserProfile>
                    }
                  ></DetailButtonUser> */}

                  {user.fullName === "Super Admin" && user.role === "admin" ? (
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
