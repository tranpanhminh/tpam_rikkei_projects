import React, { useEffect } from "react";
import { useState } from "react";
import { Button, Modal } from "antd";
// Import CSS
import styles from "../UserProfile.module.css";
import "../../../../../assets/bootstrap-5.3.0-dist/css/bootstrap.min.css";
import axios from "axios";
import { Badge } from "react-bootstrap";
function ClientBooking() {
  const getData: any = localStorage.getItem("auth");
  const getLoginData = JSON.parse(getData) || "";
  const [searchText, setSearchText] = useState<string>("");
  const [user, setUser] = useState<any>([]);
  const [userBooking, setUserBooking] = useState<any>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchUser = () => {
    axios
      .get(`http://localhost:7373/accounts/${getLoginData.loginId}`)
      .then((response) => {
        setUser(response.data);
        setUserBooking(response.data.booking_history);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleSearchBooking = () => {
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
          const filterBooking = userBooking?.filter((item: any) => {
            if (
              item.bookingService
                .toLowerCase()
                .includes(searchText.trim().toLowerCase()) ||
              item.bookingDate
                .toLowerCase()
                .includes(searchText.trim().toLowerCase()) ||
              item.bookingCalendar
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
          console.log("ABC", filterBooking);
          setUserBooking(filterBooking);
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  };

  const handleCancelBooking = (bookingId: number) => {
    console.log(bookingId);
    let findBooking = userBooking.find((booking: any) => {
      return booking.id === bookingId;
    });
    if (findBooking) {
      findBooking.status = "Cancel";
    }
    console.log(findBooking);
    let findIndexBooking = userBooking.findIndex((booking: any) => {
      return booking.id === bookingId;
    });
    userBooking.splice(findIndexBooking, 1, findBooking);
    console.log("ABC", userBooking);

    // Cập nhật lại lên API
    axios
      .patch(`http://localhost:7373/accounts/${getLoginData.loginId}`, {
        booking_history: userBooking,
      })
      .then((response) => {
        fetchUser();
      })
      .catch((error) => {
        console.log(error.message);
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
      default:
        return;
    }
  };

  console.log("User", user);
  console.log("User Booking", userBooking);
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
              <th>Booking Service</th>
              <th>Booking Date</th>
              <th>Booking Calendar</th>
              <th>Price</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {userBooking &&
              userBooking.map((item: any) => {
                return (
                  <tr>
                    <td>{item.id}</td>
                    <td>{item.bookingService}</td>
                    <td>{item.bookingDate}</td>
                    <td>{item.bookingCalendar}</td>
                    <td>{item.bookingPrice}</td>
                    <td>
                      <Badge bg={changeColor(item.status)}>{item.status}</Badge>
                    </td>
                    <td>
                      {item.status === "Processing" ? (
                        <Button
                          type="primary"
                          disabled={
                            item.status === "Done" || item.status === "Cancel"
                              ? true
                              : false
                          }
                          onClick={() => handleCancelBooking(item.id)}
                        >
                          Cancel Booking
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
