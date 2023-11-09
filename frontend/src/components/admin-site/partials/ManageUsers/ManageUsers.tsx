import { useEffect, useState } from "react";
import AddModalUser from "../ManageUsers/Button/AddUser/AddModalUser";
import { Button } from "antd";
import styles from "../../AdminPage.module.css";
import { Badge } from "react-bootstrap";
import {
  changeStatusUser,
  deleteUser,
  getAllUsers,
  getDataLogin,
} from "../../../../api/users.api";
import { useNavigate, useSearchParams } from "react-router-dom";
import ReactPaginate from "react-paginate";

// ------------------------------------------------
function ManageUsers() {
  document.title = "Manage Users | PetShop";
  const [users, setUsers] = useState<any>([]);
  const [user, setUser] = useState<any>({});
  const [searchText, setSearchText] = useState<string>("");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  // Fetch API
  const fetchUsers = async () => {
    const users = await getAllUsers();
    return setUsers(users);
  };

  const fetchUser = async () => {
    const user = await getDataLogin();
    return setUser(user);
  };

  useEffect(() => {
    fetchUsers();
    fetchUser();
  }, []);
  // ------------------------------------------------

  // Handle Search
  const handleSearchUser = async () => {
    if (!searchText) {
      // Nếu searchText rỗng, gọi lại fetchUsers để lấy tất cả người dùng
      await fetchUsers();
    } else {
      const filteredUsers = users.filter((user: any) => {
        if (
          user?.email.toLowerCase().includes(searchText.trim().toLowerCase()) ||
          user?.full_name
            .toLowerCase()
            .includes(searchText.trim().toLowerCase()) ||
          user?.user_roles?.name
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
    const result = await changeStatusUser(userId);
    await fetchUsers();
    return result;
  };
  // ------------------------------------------------

  // Handle Add User
  const handleAddUser = async () => {
    await fetchUsers();
  };

  // Handle Delete User
  const handleDeleteUser = async (userId: number) => {
    const result = await deleteUser(userId);
    fetchUsers();
    return result;
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

  // Pagination
  const itemsPerPage = Number(searchParams.get("limit")) || 5;
  // const itemsPerPage = 5;
  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(users.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(users.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, users]);

  const handlePageClick = (event: any) => {
    const newPage = event.selected + 1;
    const newOffset = event.selected * itemsPerPage;
    setItemOffset(newOffset);
    navigate(`/admin/manage-users?page=${newPage}&limit=${itemsPerPage}`);
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
            {currentItems?.map((user: any, index: number) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.email}</td>
                <td>{user.full_name}</td>
                <td>
                  <Badge bg={changeColorUser(user?.user_roles?.name)}>
                    {user?.user_roles?.name}
                  </Badge>
                </td>
                <td>
                  <Badge bg={changeColor(user?.user_statuses?.name)}>
                    {user?.user_statuses?.name}
                  </Badge>
                </td>
                <td className={styles["group-btn-admin"]}>
                  {user?.role_id === 2 ? (
                    user?.role_id === 1 ? (
                      <div>
                        <Button
                          type="primary"
                          className={styles["change-user-btn"]}
                          onClick={() => handleChangeUser(user.id)}
                          style={{
                            display:
                              user?.role_id === 1 ? "none" : "inline-block",
                          }}
                        >
                          Change
                        </Button>
                        &nbsp;
                        <Button
                          type="primary"
                          className={styles["delete-user-btn"]}
                          onClick={() => handleDeleteUser(user.id)}
                          style={{
                            display:
                              user?.role_id === 1 ? "none" : "inline-block",
                          }}
                        >
                          Delete
                        </Button>
                      </div>
                    ) : (
                      <div>
                        <Button
                          type="primary"
                          className={styles["change-user-btn"]}
                          onClick={() => handleChangeUser(user.id)}
                          style={{
                            display:
                              user?.role_id === 1 || user?.role_id === 2
                                ? "none"
                                : "inline-block",
                          }}
                        >
                          Change
                        </Button>
                        &nbsp;
                        <Button
                          type="primary"
                          className={styles["delete-user-btn"]}
                          onClick={() => handleDeleteUser(user.id)}
                          style={{
                            display:
                              user?.role_id === 1 || user?.role_id === 2
                                ? "none"
                                : "inline-block",
                          }}
                        >
                          Delete
                        </Button>
                      </div>
                    )
                  ) : (
                    <div>
                      <Button
                        type="primary"
                        className={styles["change-user-btn"]}
                        onClick={() => handleChangeUser(user.id)}
                        style={{
                          display:
                            user?.role_id === 1 ? "none" : "inline-block",
                        }}
                      >
                        Change
                      </Button>
                      &nbsp;
                      <Button
                        type="primary"
                        className={styles["delete-user-btn"]}
                        onClick={() => handleDeleteUser(user.id)}
                        style={{
                          display:
                            user?.role_id === 1 ? "none" : "inline-block",
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles["pagination-form"]}>
        <ReactPaginate
          nextLabel="next >"
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          pageRangeDisplayed={13}
          pageCount={pageCount}
          onPageChange={handlePageClick}
          containerClassName="pagination"
          pageLinkClassName="page-number"
          previousLinkClassName="page-number"
          nextLinkClassName="page-number"
          activeLinkClassName={styles["active"]}
        />
      </div>
    </>
  );
}

export default ManageUsers;
