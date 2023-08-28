import React, { useEffect } from "react";
import { useState } from "react";
import { Button, Modal } from "antd";
// Import CSS
import styles from "../UserProfile.module.css";
import "../../../../../assets/bootstrap-5.3.0-dist/css/bootstrap.min.css";
import axios from "axios";
import { Account } from "../../../../../database";
import { Badge } from "react-bootstrap";
function ClientOrder() {
  const getData: any = localStorage.getItem("auth");
  const getLoginData = JSON.parse(getData) || "";
  const [searchText, setSearchText] = useState<string>("");
  const [user, setUser] = useState<any>([]);
  const [userOrder, setUserOrder] = useState<any>([]);
  const [orderProduct, setOrderProduct] = useState<any>([]);
  const fetchUser = () => {
    axios
      .get(`http://localhost:7373/accounts/${getLoginData.loginId}`)
      .then((response) => {
        setUser(response.data);
        setUserOrder(response.data.order_history);
        setOrderProduct(response.data.order_history.orderProduct);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchUser();
  }, []);

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

  const hanldeSearchOrder = () => {
    console.log(searchText);
    if (searchText === "") {
      // Nếu searchText rỗng, gọi lại fetchUsers để lấy tất cả người dùng
      fetchUser();
    } else {
      // Nếu có searchText, thực hiện tìm kiếm và cập nhật state
      axios
        .get(`http://localhost:7373/accounts/${getLoginData.loginId}`)
        .then((response) => {
          // Tìm kiếm trong dữ liệu và cập nhật state
          const filterOrder = userOrder?.filter((item: any) => {
            if (
              item.date
                .toLowerCase()
                .includes(searchText.trim().toLowerCase()) ||
              item.status
                .toLowerCase()
                .includes(searchText.trim().toLowerCase())
            ) {
              return true;
            }
            return false;
          });
          setUserOrder(filterOrder);
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  };

  const changeColor = (status: string) => {
    switch (status) {
      case "Shipped":
        return "success";
      case "Shipping":
        return "primary";
      case "Processing":
        return "info";
      case "Pending":
        return "warning";
      case "Cancel":
        return "danger";
      default:
        return;
    }
  };

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
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button
            className="btn btn-outline-success"
            type="submit"
            id={styles["search-btn"]}
            onClick={hanldeSearchOrder}
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
            {userOrder.map((order: any) => {
              return (
                <tr>
                  <td>{order.orderId}</td>
                  <td>{order.date}</td>
                  <td>Tổng tiền</td>
                  <td>
                    <Badge bg={changeColor(order.status)}>{order.status}</Badge>
                  </td>
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
                          <input type="text" disabled value={order.phone} />
                        </div>
                        <div className={styles["my-profile-input-item"]}>
                          <p>Address</p>
                          <input type="text" disabled value={order.address} />
                        </div>
                        <div className={styles["my-profile-input-item"]}>
                          <p>Status</p>
                          <input type="text" disabled value={order.status} />
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
                          {order.orderProduct.map((item: any) => {
                            return (
                              <tr>
                                <td>{item.productId}</td>
                                <td>
                                  {" "}
                                  <img src={item.productImage} alt="" />{" "}
                                </td>
                                <td>{item.productName}</td>
                                <td>{item.productQuantity}</td>
                                <td>{Number(item.price)}</td>
                                <td>
                                  $
                                  {(
                                    item.productQuantity * item.price
                                  ).toLocaleString()}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                      <div className={styles["my-profile-my-order-card"]}>
                        <span className={styles["my-order-card-item"]}>
                          Item: {order.orderProduct.length}
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
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ClientOrder;
