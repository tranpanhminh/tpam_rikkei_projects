import React, { useEffect } from "react";
import { useState } from "react";
import { Button, Modal } from "antd";
// Import CSS
import styles from "../UserProfile.module.css";
import "../../../../../assets/bootstrap-5.3.0-dist/css/bootstrap.min.css";
import axios from "axios";
import { Account } from "../../../../../database";
function ClientOrder() {
  const getData: any = localStorage.getItem("auth");
  const getLoginData = JSON.parse(getData) || "";
  const [user, setUser] = useState<Account[]>([]);
  const fetchUser = () => {
    axios
      .get(`http://localhost:7373/accounts/${getLoginData.loginId}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchUser();
  }, []);
  console.log(user);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  console.log("User", user);
  return (
    <div>
      <div className={styles.breadcrumb}>
        <h2 className={styles["page-title"]}>My Order</h2>
        <p className={styles["page-description"]}>PetShop User Panel</p>
      </div>

      <div className={styles["user-board"]}>
        <div className="d-flex" role="search">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            id="search-bar"
            // value={searchText}
            // onChange={(e) => setSearchText(e.target.value)}
          />
          <button
            className="btn btn-outline-success"
            type="submit"
            id={styles["search-btn"]}
            // onClick={handleSearchUser}
          >
            Search
          </button>
        </div>
      </div>

      <div className={styles["main-content"]}>
        <h3 className={styles["main-title-content"]}>List Orders</h3>
        <table className="table table-striped" id="table-user">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Date</th>
              <th>Total</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {user.length > 0 &&
              user?.map((userItem: any) => {
                return userItem.order_history?.map((item: any) => {
                  return (
                    <tr>
                      <td>{item.orderId}</td>
                      <td>{item.date}</td>
                      <td>Tổng tiền</td>
                      <td>{item.status}</td>
                      <td>Pending</td>
                      <td>
                        <Button type="primary" onClick={showModal}>
                          Detail
                        </Button>
                        <Modal
                          title="Order Detail"
                          open={isModalOpen}
                          onOk={handleOk}
                          onCancel={handleCancel}
                          width={1000}
                        >
                          <div className={styles["list-input-my-profile"]}>
                            <div className={styles["my-profile-input-item"]}>
                              <p>Phone</p>
                              <input
                                type="text"
                                disabled
                                value={userItem.phone}
                              />
                            </div>
                            <div className={styles["my-profile-input-item"]}>
                              <p>Address</p>
                              <input
                                type="text"
                                disabled
                                value={userItem.address}
                              />
                            </div>
                            <div className={styles["my-profile-input-item"]}>
                              <p>Status</p>
                              <input
                                type="text"
                                disabled
                                value={userItem.status}
                              />
                            </div>
                            <div className={styles["my-profile-input-item"]}>
                              <p>Request Cancel</p>
                              <select name="" id="">
                                <option value="No Cancel Order" selected>
                                  --Choose Reason--
                                </option>
                                <option value="Ordered the wrong product">
                                  1. Ordered the wrong product
                                </option>
                                <option value="Duplicate order">
                                  2. Duplicate order
                                </option>
                                <option value="I don't want to buy anymore">
                                  3. I don't want to buy anymore
                                </option>
                                <option value="Ordered the wrong product">
                                  4. Delivery time too long
                                </option>
                                <option value="Ordered the wrong product">
                                  5. Another reason...
                                </option>
                              </select>
                            </div>
                          </div>
                          <br />
                          <table
                            className="table table-striped"
                            id={styles["table-user"]}
                          >
                            <thead>
                              <tr>
                                <th>#</th>
                                <th>Product Image</th>
                                <th>Product Name</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Total</th>
                              </tr>
                            </thead>

                            <tbody>
                              <tr>
                                <td>{item.productId}</td>
                                <td>{item.productImage}</td>
                                <td>{item.productName}</td>
                                <td>{item.productQuantity}</td>
                                <td>{item.productPrice}</td>
                                <td>
                                  {item.productQuantity * item.productPrice}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <div className={styles["my-profile-my-order-card"]}>
                            <span className={styles["my-order-card-item"]}>
                              Item: {userItem.order_history.length}
                            </span>
                            <span
                              className={styles["my-order-card-total-quantity"]}
                            >
                              Total: $270
                            </span>
                          </div>
                        </Modal>
                      </td>
                    </tr>
                  );
                });
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ClientOrder;
