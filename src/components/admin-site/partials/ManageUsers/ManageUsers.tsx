import React, { useEffect, useState } from "react";
import logo from "../../../../assets/images/pet-shop.png";
import AddModalUser from "../ManageUsers/Button/AddUser/AddModalUser";

import DetailButtonUser from "./Button/DetailUser/DetailButtonUser";
import DetailModalUserProfile from "./Button/DetailUser/DetailModalUserProfile";
import { Modal, notification } from "antd";

import styles from "../../AdminPage.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface User {
  id: number;
  email: string;
  fullName: string;
  role: string;
  status: string;
}

function ManageUsers() {
  const [users, setUsers] = useState<null | User[]>(null);
  const [searchText, setSearchText] = useState<string>("");
  console.log(users);

  const navigate = useNavigate();

  const fetchUsers = () => {
    fetch("http://localhost:7373/accounts")
      .then((response) => response.json())
      .then((response) => {
        setUsers(response);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSearchUser = () => {
    fetch(`http://localhost:7373/accounts?search=${searchText}`)
      .then((response) => response.json())
      .then((response) => {
        setUsers(response);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleChangeUser = (userId: number) => {
    const updatedUsers: any = users?.map((user) => {
      if (user.id === userId) {
        return {
          ...user,
          status: user.status === "Active" ? "Inactive" : "Active",
        };
      }
      return user;
    });

    // Đẩy dữ liệu lên server
    axios
      .put(
        `http://localhost:7373/accounts/${userId}`,
        updatedUsers.find((user: any) => user.id === userId)
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
  };

  const handleAddUser = (newUser: User) => {
    fetch("http://localhost:7373/accounts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((response) => response.json())
      .then((response) => {
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
    try {
      await fetch(`http://localhost:7373/accounts/${userId}`, {
        method: "DELETE",
      });
  
      await fetchUsers(); // Đợi cập nhật xong trước khi hiển thị thông báo
      notification.success({
        message: "User Deleted",
      });
    } catch (error: any) {
      console.log(error.message);
    }
  };
  

  // // Tổng hợp các hàm
  // const handleSearchUser = () => {
  //   const filterUser : any = users?.filter(function (user) {
  //     if (
  //       user.email.toLowerCase().includes(searchText.trim().toLowerCase()) ||
  //       user.fullName.toLowerCase().includes(searchText.trim().toLowerCase()) ||
  //       user.role.toLowerCase().includes(searchText.trim().toLowerCase()) ||
  //       user.status.toLowerCase().includes(searchText.trim().toLowerCase())
  //     ) {
  //       return true;
  //     }
  //     return false;
  //   });

  //   setUsers(filterUser);
  // };
  // const handleChangeUser = (userId: number) => {
  //   // Tìm người dùng theo userId
  //   // const userToUpdate = users.find((user) => user.id === userId);

  //   // if (userToUpdate) {
  //   //   // Đảo ngược trạng thái
  //   //   userToUpdate.status =
  //   //     userToUpdate.status === "Active" ? "Inactive" : "Active";

  //   //   // Cập nhật dữ liệu vào mảng users
  //   //   const updatedUsers = users.map((user) =>
  //   //     user.id === userId ? userToUpdate : user
  //   //   );

  //   //   // Cập nhật dữ liệu vào localStorage
  //   //   setDataToLocal("accountsDatabase", updatedUsers);

  //   //   // Cập nhật state để render lại giao diện
  //   //   setUsers(updatedUsers);

  //   //   notification.success({
  //   //     message: "User Status Changed",
  //   //     // description: "Please use another Email.",
  //   //   });
  //   // }
  // };

  // const handleDeleteUser = (userId: number) => {
  //   // const updatedUsers = users.filter((user) => user.id !== userId);
  //   // setUsers(updatedUsers);

  //   // // Update localStorage with new user data
  //   // setDataToLocal("accountsDatabase", updatedUsers);
  //   // notification.success({
  //   //   message: "User Deleted",
  //   //   // description: "Please use another Email.",
  //   // });
  // };

  // const handleAddUser = (newUser: User) => {
  //   // const updatedUsers = [...users, newUser];
  //   // setUsers(updatedUsers);
  //   // notification.success({
  //   //   message: "User Added",
  //   //   // description: "Please use another Email.",
  //   // });
  // };
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
          onAddUser={handleAddUser}
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
                <td>{user.status}</td>
                <td className={styles["group-btn-admin"]}>
                  {user.role !== "admin" && (
                    <>
                      <DetailButtonUser
                        width={700}
                        className={styles["detail-user-btn"]}
                        value="Detail"
                        title="Manage Users"
                        handleFunctionOk={() => console.log(user.id)}
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
                      ></DetailButtonUser>

                      <DetailButtonUser
                        value="Change"
                        className={styles["change-user-btn"]}
                        handleFunctionBtn={() => handleChangeUser(user.id)}
                      ></DetailButtonUser>

                      <DetailButtonUser
                        value="Delete"
                        className={styles["delete-user-btn"]}
                        handleFunctionBtn={() => handleDeleteUser(user.id)}
                      ></DetailButtonUser>
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
