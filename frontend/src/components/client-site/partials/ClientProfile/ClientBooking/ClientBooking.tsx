import React, { useEffect } from "react";
import { useState } from "react";
import { Button, Modal, message, notification } from "antd";
// Import CSS
import styles from "../UserProfile.module.css";
import "../../../../../assets/bootstrap-5.3.0-dist/css/bootstrap.min.css";
import axios from "axios";
import { Badge } from "react-bootstrap";
import BaseAxios from "../../../../../api/apiAxiosClient";
const moment = require("moment");

// Import API

const usersAPI = process.env.REACT_APP_API_USERS;
const bookingsAPI = process.env.REACT_APP_API_BOOKINGS;
const bookingStatusAPI = process.env.REACT_APP_API_BOOKING_STATUS;

// -----------------------------------------------------

function ClientBooking() {
  document.title = "My Booking | PetShop";
  const [messageApi, contextHolder] = message.useMessage();
  const getData: any = localStorage.getItem("auth");
  const getLoginData = JSON.parse(getData) || "";
  const [searchText, setSearchText] = useState<string>("");
  const [user, setUser] = useState<any>({});
  const [userBooking, setUserBooking] = useState<any>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchUserBooking = () => {
    axios
      .get(`${bookingsAPI}/filter/users/${getLoginData.id}`)
      .then((response) => {
        setUserBooking(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchUserBooking();
  }, []);

  const handleSearchBooking = () => {
    if (!searchText) {
      // Nếu searchText rỗng, gọi lại fetchUserBooking để lấy tất cả người dùng
      fetchUserBooking();
    } else {
      // Nếu có searchText, thực hiện tìm kiếm và cập nhật state
      const filterBooking = userBooking?.filter((item: any) => {
        if (
          item.name.toLowerCase().includes(searchText.trim().toLowerCase()) ||
          item.service_name
            .toLowerCase()
            .includes(searchText.trim().toLowerCase()) ||
          item.calendar
            .toLowerCase()
            .includes(searchText.trim().toLowerCase()) ||
          item.booking_date
            .toLowerCase()
            .includes(searchText.trim().toLowerCase()) ||
          item?.booking_statuses?.name
            .toLowerCase()
            .includes(searchText.trim().toLowerCase())
        ) {
          return true;
        }
        return false;
      });
      setUserBooking(filterBooking);
    }
  };

  const handleCancelBooking = (bookingId: number) => {
    messageApi.open({
      type: "loading",
      content: "Loading...",
      duration: 0,
    });
    BaseAxios.patch(`${bookingsAPI}/cancel-booking/${bookingId}/`)
      .then((response) => {
        messageApi.destroy();
        notification.success({
          message: `${response.data}`,
        });
        fetchUserBooking();
      })
      .catch((error) => {
        notification.warning({
          message: `${error.response.data.messaage}`,
        });
      });
  };

  const changeColor = (status: string) => {
    switch (status) {
      case "Done":
        return "success";
      case "Processing":
        return "primary";
      case "Cancel":
        return "secondary";
      case "Pending":
        return "warning";
      default:
        return;
    }
  };

  return (
    <div>
      {contextHolder}
      <div className={styles.breadcrumb}>
        <h2 className={styles["page-title"]}>My Booking</h2>
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
            onChange={(event) => setSearchText(event.target.value)}
          />
          <button
            className="btn btn-outline-success"
            type="submit"
            id={styles["search-btn"]}
            onClick={handleSearchBooking}
          >
            Search
          </button>
        </div>
      </div>
      <div className={styles["main-content"]}>
        <h3 className={styles["main-title-content"]}>List Booking</h3>
        <table className="table table-striped" id="table-user">
          <thead>
            <tr>
              <th>Booking ID</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Booking Service</th>
              <th>Booking Date</th>
              <th>Booking Calendar</th>
              {/* <th>Price</th> */}
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {userBooking?.map((item: any) => {
              return (
                <tr>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.phone}</td>
                  <td>{item.service_name}</td>
                  <td>{moment(item.date).format("YYYY-MM-DD-hh:mm:ss")}</td>
                  <td>{`${item.booking_date} | ${item.calendar}`}</td>
                  {/* <td>${item.price}</td> */}
                  <td>
                    <Badge bg={changeColor(item.booking_statuses.name)}>
                      {item.booking_statuses.name}
                    </Badge>
                  </td>
                  <td>
                    {item.booking_statuses.name === "Pending" ? (
                      <Button
                        type="primary"
                        danger
                        disabled={
                          item.booking_statuses.name === "Done" ||
                          item.booking_statuses.name === "Processing" ||
                          item.booking_statuses.name === "Cancel"
                            ? true
                            : false
                        }
                        onClick={() => handleCancelBooking(item.id)}
                      >
                        Cancel
                      </Button>
                    ) : (
                      ""
                    )}
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

export default ClientBooking;
