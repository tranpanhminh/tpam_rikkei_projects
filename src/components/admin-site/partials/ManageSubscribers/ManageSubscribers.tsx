import React, { useEffect, useState } from "react";
import styles from "../../AdminPage.module.css";
import { Button, Modal } from "antd";

import { Subscriber } from "../../../../database"; // Import your data fetching and setting functions
import axios from "axios";
import { notification } from "antd";
import { Badge } from "react-bootstrap";

function ManageSubscribers() {
  document.title = "Manage Subscribers | PetShop";

  const [searchText, setSearchText] = useState<string>("");
  const [subscribers, setSubscribers] = useState<any>([]);

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

  const fetchSubscriber = () => {
    axios
      .get(`http://localhost:7373/subscribers/`)
      .then((response) => {
        setSubscribers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchSubscriber();
  }, []);

  const handleSearchSubscriber = () => {
    if (searchText === "") {
      // Nếu searchText rỗng, gọi lại fetchUsers để lấy tất cả người dùng
      fetchSubscriber();
    } else {
      // Nếu có searchText, thực hiện tìm kiếm và cập nhật state
      axios
        .get(`http://localhost:7373/subscribers`)
        .then((response) => {
          // Lấy dữ liệu từ response
          const allSubscribers = response.data;

          // Tìm kiếm trong dữ liệu và cập nhật state
          const filteredSubscribers = allSubscribers.filter(
            (subscriber: Subscriber) => {
              if (
                subscriber.email
                  .toString()
                  .toLowerCase()
                  .includes(searchText.trim().toLowerCase())
              ) {
                return true;
              }
              return false;
            }
          );

          setSubscribers(filteredSubscribers);
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  };

  const changeColor = (status: boolean) => {
    switch (status) {
      case true:
        return "success";
      case false:
        return "secondary";
      default:
        return;
    }
  };

  return (
    <>
      <div className={styles["breadcrumb"]}>
        <h2 className={styles["page-title"]}>Manage Subscribers</h2>
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
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button
            className={`btn  ${styles["btn-outline-success"]}`}
            type="submit"
            id={styles["search-btn"]}
            onClick={handleSearchSubscriber}
          >
            Search
          </button>
        </div>
      </div>

      <div className={styles["main-content"]}>
        <h3 className={styles["main-title-content"]}>List Subscribers</h3>
        <table
          className="table table-striped"
          id={styles["table-products-manage-page"]}
        >
          <thead>
            <tr>
              <th>Subscriber ID</th>
              <th>Subscriber Email</th>
              <th>Subscribe Date</th>
              <th>Subscriber Status</th>
            </tr>
          </thead>
          <tbody>
            {subscribers?.map((subscriber: any) => {
              return (
                <tr key={subscriber.id}>
                  <td>{subscriber.id}</td>
                  <td>{subscriber.email}</td>
                  <td>{subscriber.date}</td>
                  <td>
                    <Badge bg={changeColor(subscriber.status)}>
                      {subscriber.status ? "Subscribed" : "Unsubscribed"}
                    </Badge>
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
export default ManageSubscribers;
