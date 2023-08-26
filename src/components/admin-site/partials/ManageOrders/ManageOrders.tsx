import React, { useEffect, useState } from "react";
import { Button, Modal } from "antd";
import styles from "../../AdminPage.module.css";
import { Order } from "../../../../database"; // Import your data fetching and setting functions
import axios from "axios";
import DeleteOrder from "./Button/DeleteOrder/DeleteOrder";
import { notification } from "antd";
import DetailOrder from "./Button/DetailOrder/DetailOrder";

function ManageOrders() {
  const [orders, setOrders] = useState<null | Order[]>(null);
  const [searchText, setSearchText] = useState<string>("");

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

  const fetchOrders = () => {
    axios
      .get("http://localhost:7373/orders")
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleSearchOrders = () => {
    if (searchText === "") {
      fetchOrders();
    } else {
      axios
        .get(`http://localhost:7373/orders`)
        .then((response) => {
          // Lấy dữ liệu từ response
          const allOrders = response.data;

          // Tìm kiếm trong dữ liệu và cập nhật state
          const filterOrders = allOrders.filter((order: Order) => {
            if (
              order.name.toLowerCase().includes(searchText.trim().toLowerCase())
            ) {
              return true;
            }
            return false;
          });

          setOrders(filterOrders);
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  };

  const handleDeleteOrder = (orderId: number) => {
    axios
      .delete(`http://localhost:7373/orders/${orderId}`)
      .then(() => {
        fetchOrders(); // Cập nhật lại dữ liệu products sau khi xóa
        notification.success({
          message: "Order Deleted",
        });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <>
      <div className={styles["breadcrumb"]}>
        <h2 className={styles["page-title"]}>Manage Orders</h2>
        <p className={styles["page-description"]}>PetShop Admin Panel</p>
      </div>

      <div className={styles["product-panel"]}>
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
            onClick={handleSearchOrders}
          >
            Search
          </button>
        </div>

        <h3
          className={styles["revenue-text"]}
          data-bs-toggle="modal"
          data-bs-target="#monthlyRevenue"
        >
          Revenue: $5000
        </h3>
      </div>

      <div className={styles["main-content"]}>
        <h3 className={styles["main-title-content"]}>List Orders</h3>
        <table className="table table-striped" id={styles["table-order-list"]}>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Date</th>
              <th>Status</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders &&
              orders.map((order) => {
                return (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.name}</td>
                    <td>{order.email}</td>
                    <td>{order.phone}</td>
                    <td>{order.date}</td>
                    <td>{order.status}</td>
                    <td>Chưa tính</td>
                    <td className={styles["group-btn-admin"]}>
                      <DetailOrder
                        value="Detail"
                        getOrderId={order.id}
                      ></DetailOrder>
                      <DeleteOrder
                        value="Delete"
                        className={styles["delete-order-btn"]}
                        handleFunctionBtn={() => handleDeleteOrder(order.id)}
                      ></DeleteOrder>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
}
export default ManageOrders;
