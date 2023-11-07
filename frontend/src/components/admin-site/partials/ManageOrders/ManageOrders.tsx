import React, { useEffect, useState } from "react";
import styles from "../../AdminPage.module.css";
import DetailOrder from "./Button/DetailOrder/DetailOrder";
import { Badge } from "react-bootstrap";
import { getAllOrders } from "../../../../api/orders.api";
const moment = require("moment");

// ------------------------------------------------

function ManageOrders() {
  document.title = "Manage Orders | PetShop";
  const [orders, setOrders] = useState<any>(null);
  const [searchText, setSearchText] = useState<string>("");

  // Fetch API
  const fetchOrders = async () => {
    const result = await getAllOrders();
    return setOrders(result);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // ------------------------------------------------

  // Handle Search
  const handleSearchOrders = () => {
    if (!searchText) {
      fetchOrders(); // Không có searchText, fetch toàn bộ đơn hàng
      return;
    } else {
      const filterOrders = orders.filter((order: any) => {
        if (
          order?.customer_name
            .toLowerCase()
            .includes(searchText.trim().toLowerCase()) ||
          order?.order_status?.name
            .toLowerCase()
            .includes(searchText.trim().toLowerCase())
        ) {
          return true; // Bạn có thể sử dụng `.toLowerCase()` để làm cho tìm kiếm không phân biệt chữ hoa, chữ thường.
        }
        return false;
      });

      setOrders(filterOrders);
    }
  };
  // ------------------------------------------------

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

  const handleUpdateStatus = () => {
    fetchOrders();
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
            id={styles["search-bar"]}
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
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

        {/* <h3
          className={styles["revenue-text"]}
          data-bs-toggle="modal"
          data-bs-target="#monthlyRevenue"
        >
          Revenue: $5000
        </h3> */}
      </div>

      <div className={styles["main-content"]}>
        <h3 className={styles["main-title-content"]}>List Orders</h3>
        <table className="table table-striped" id={styles["table-order-list"]}>
          <thead>
            <tr>
              <th>#</th>
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
              orders.map((order: any, index: number) => {
                return (
                  <tr key={order.id}>
                    <td>{index + 1}</td>
                    <td>{order.customer_name}</td>
                    <td>{order.users.email}</td>
                    <td>{order.phone}</td>
                    <td>
                      {moment(order.order_date).format("YYYY-MM-DD-hh:mm:ss")}
                    </td>
                    <td>
                      <Badge bg={`${changeColor(order.order_statuses.name)}`}>
                        {order.order_statuses.name}
                      </Badge>
                    </td>
                    <td>${order.total_bill.toLocaleString()}</td>
                    <td className={styles["group-btn-admin"]}>
                      <DetailOrder
                        value="Detail"
                        getOrderId={order.id}
                        handleFunctionOk={handleUpdateStatus}
                      ></DetailOrder>
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
