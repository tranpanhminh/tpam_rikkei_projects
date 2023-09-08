import React, { useEffect, useState } from "react";
import styles from "../../AdminPage.module.css";
import { Button, Modal } from "antd";

import { Booking } from "../../../../database"; // Import your data fetching and setting functions
import axios from "axios";
import DetailBooking from "../ManageBooking/Button/DetailBooking/DetailBooking";
import { notification } from "antd";
import { Badge } from "react-bootstrap";

function ManageBooking() {
  document.title = "Manage Booking | PetShop";

  const [searchText, setSearchText] = useState<string>("");
  const [bookings, setBookings] = useState<any>([]);

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

  const fetchBooking = () => {
    axios
      .get(`http://localhost:7373/bookings/`)
      .then((response) => {
        setBookings(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchBooking();
  }, []);

  // const handleDeleteBooking = (bookingId: number) => {
  //   axios
  //     .delete(`http://localhost:7373/bookings/${bookingId}`)
  //     .then(() => {
  //       notification.success({
  //         message: "Booking Deleted",
  //       });
  //       fetchBooking(); // Cập nhật lại dữ liệu products sau khi xóa
  //     })
  //     .catch((error) => {
  //       console.log(error.message);
  //     });
  // };
  const handleSearchBooking = () => {
    if (searchText === "") {
      // Nếu searchText rỗng, gọi lại fetchUsers để lấy tất cả người dùng
      fetchBooking();
    } else {
      // Nếu có searchText, thực hiện tìm kiếm và cập nhật state
      axios
        .get(`http://localhost:7373/bookings`)
        .then((response) => {
          // Lấy dữ liệu từ response
          const allBooking = response.data;

          // Tìm kiếm trong dữ liệu và cập nhật state
          const filteredBooking = allBooking.filter((booking: Booking) => {
            if (
              booking.date
                .toLowerCase()
                .includes(searchText.trim().toLowerCase())
            ) {
              return true;
            }
            return false;
          });

          setBookings(filteredBooking);
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
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

  return (
    <>
      <div className={styles["breadcrumb"]}>
        <h2 className={styles["page-title"]}>Manage Booking</h2>
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
            className={`btn  ${styles["btn-outline-success"]}`}
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
        <table
          className="table table-striped"
          id={styles["table-products-manage-page"]}
        >
          <thead>
            <tr>
              <th>Booking Date</th>
              <th>Available</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings?.map((booking: any) => {
              return (
                <tr key={1}>
                  <td>{booking.date}</td>
                  <td>{booking.listBookings.length} / 20</td>
                  <td className={styles["group-btn-admin"]}>
                    <DetailBooking
                      value="Detail"
                      title="Detail Product"
                      className={styles["detail-product-btn"]}
                      getBookingId={booking.id}
                      getBookingDate={booking.date}
                      getBooking={booking.listBookings}
                    ></DetailBooking>
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
export default ManageBooking;
