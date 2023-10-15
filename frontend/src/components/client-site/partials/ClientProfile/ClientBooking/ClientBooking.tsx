import React, { useEffect } from "react";
import { useState } from "react";
import { Button, Modal } from "antd";
// Import CSS
import styles from "../UserProfile.module.css";
import "../../../../../assets/bootstrap-5.3.0-dist/css/bootstrap.min.css";
import axios from "axios";
import { Badge } from "react-bootstrap";

// Import API

const usersAPI = process.env.REACT_APP_API_USERS;
const bookingsAPI = process.env.REACT_APP_API_BOOKINGS;
const bookingStatusAPI = process.env.REACT_APP_API_BOOKING_STATUS;

// -----------------------------------------------------

function ClientBooking() {
  document.title = "My Booking | PetShop";

  const getData: any = localStorage.getItem("auth");
  const getLoginData = JSON.parse(getData) || "";
  const [searchText, setSearchText] = useState<string>("");
  const [user, setUser] = useState<any>({});
  const [userBooking, setUserBooking] = useState<any>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchBookings = () => {
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
    fetchBookings();
  }, []);

  const handleSearchBooking = () => {
    // if (!searchText) {
    //   // Nếu searchText rỗng, gọi lại fetchUser để lấy tất cả người dùng
    //   fetchUser();
    // } else {
    //   // Nếu có searchText, thực hiện tìm kiếm và cập nhật state
    //   const filterBooking = listUserBooking?.filter((item: any) => {
    //     if (
    //       item.serviceName
    //         .toLowerCase()
    //         .includes(searchText.trim().toLowerCase()) ||
    //       item.calendar
    //         .toLowerCase()
    //         .includes(searchText.trim().toLowerCase()) ||
    //       item.time.toLowerCase().includes(searchText.trim().toLowerCase()) ||
    //       item.bookingDate
    //         .toLowerCase()
    //         .includes(searchText.trim().toLowerCase()) ||
    //       item?.status.toLowerCase().includes(searchText.trim().toLowerCase())
    //     ) {
    //       return true;
    //     }
    //     return false;
    //   });
    //   setListUserBooking(filterBooking);
    // }
  };

  const handleCancelBooking = (bookingId: number, bookingDate: string) => {
    // // Tìm kiếm các lịch đặt theo ngày
    // const filterBooking = dataBooking?.find(
    //   (item: any) => item.date === bookingDate
    // );
    // console.log("FilterBooking", filterBooking);
    // if (filterBooking) {
    //   const bookingToUpdate = filterBooking.listBookings.find((item: any) => {
    //     return item.bookingId === bookingId;
    //   });
    //   if (bookingToUpdate) {
    //     bookingToUpdate.status = "Cancel";
    //     axios
    //       .patch(`http://localhost:7373/bookings/${filterBooking.id}`, {
    //         listBookings: filterBooking.listBookings,
    //       })
    //       .then((response) => {
    //         fetchBookings();
    //       })
    //       .catch((error) => {
    //         console.log(error);
    //       });
    //   }
    // }
  };

  const changeColor = (status: string) => {
    switch (status) {
      case "Done":
        return "success";
      case "Processing":
        return "primary";
      case "Cancel":
        return "secondary";
      default:
        return;
    }
  };

  // const dataUserBooking: any[] = [];

  return (
    <div>
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
              <th>Price</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {userBooking?.map((item: any) => {
              return (
                <tr>
                  <td>{item.id}</td>
                  <td>{item.userName}</td>
                  <td>{item.userPhone}</td>
                  <td>{item.serviceName}</td>
                  <td>{item.time}</td>
                  <td>{`${item.bookingDate} | ${item.calendar}`}</td>
                  <td>${item.servicePrice}</td>
                  <td>
                    <Badge bg={changeColor(item.status)}>{item.status}</Badge>
                  </td>
                  <td>
                    {item.status === "Processing" ? (
                      <Button
                        type="primary"
                        danger
                        disabled={
                          item.status === "Done" || item.status === "Cancel"
                            ? true
                            : false
                        }
                        onClick={() =>
                          handleCancelBooking(item.bookingId, item.bookingDate)
                        }
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
