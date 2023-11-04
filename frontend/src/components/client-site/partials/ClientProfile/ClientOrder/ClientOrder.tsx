import React, { useEffect } from "react";
import { useState } from "react";
import { Button, Modal, notification } from "antd";
// Import CSS
import styles from "../UserProfile.module.css";
import "../../../../../assets/bootstrap-5.3.0-dist/css/bootstrap.min.css";
import axios from "axios";
import { Account } from "../../../../../database";
import { Badge } from "react-bootstrap";
import DetailOrderButton from "./Button/DetailOrderButtonClient";
import BaseAxios from "./../../../../../api/apiAxiosClient";
const moment = require("moment");

// Import API

const usersAPI = process.env.REACT_APP_API_USERS;
const ordersAPI = process.env.REACT_APP_API_ORDERS;

// -----------------------------------------------------
function ClientOrder() {
  document.title = "My Orders | PetShop";

  const getData: any = localStorage.getItem("auth");
  const getLoginData = JSON.parse(getData) || "";
  const [searchText, setSearchText] = useState<string>("");
  const [user, setUser] = useState<any>([]);
  const [userOrder, setUserOrder] = useState<any>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch Data
  const fetchUser = () => {
    BaseAxios.get(`${usersAPI}/detail/${getLoginData.id}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchUserOrder = () => {
    BaseAxios.get(`${ordersAPI}/users/${getLoginData.id}`)
      .then((response) => {
        setUserOrder(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchUserOrder();
    fetchUser();
  }, []);
  // -----------------------------------------------------------

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
    if (!searchText) {
      fetchUserOrder();
    } else {
      const filterOrder = userOrder?.filter((item: any) => {
        if (
          item.order_date
            .toLowerCase()
            .includes(searchText.trim().toLowerCase()) ||
          item.order_status.name
            .toLowerCase()
            .includes(searchText.trim().toLowerCase())
        ) {
          return true;
        }
        return false;
      });
      setUserOrder(filterOrder);
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

  const handleUpdateStatus = () => {
    fetchUserOrder();
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
              <th>#</th>
              <th>Date</th>
              <th>Total</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {userOrder &&
              userOrder?.map((order: any, index: number) => {
                return (
                  <tr>
                    <td>{index + 1}</td>
                    <td>
                      {moment(order.order_date).format("YYYY-MM-DD-hh:mm:ss")}
                    </td>
                    <td>${order.total_bill}</td>
                    <td>
                      <Badge bg={changeColor(order.order_statuses.name)}>
                        {order.order_statuses.name}
                      </Badge>
                    </td>
                    <td>
                      <DetailOrderButton
                        orderId={order.id}
                        handleFunctionOk={handleUpdateStatus}
                      ></DetailOrderButton>
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
