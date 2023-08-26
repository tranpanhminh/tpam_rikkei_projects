import React, { useEffect, useState } from "react";
import styles from "../../AdminPage.module.css";
import { Button, Modal } from "antd";

import { Booking } from "../../../../database"; // Import your data fetching and setting functions
import axios from "axios";
import DeleteBooking from "../ManageBooking/Button/DeleteBooking/DeleteBooking";
import DetailBooking from "../ManageBooking/Button/DetailBooking/DetailBooking";
import { notification } from "antd";

function ManageBooking() {
  const getData: any = localStorage.getItem("auth");
  const getLoginData = JSON.parse(getData) || "";
  const [searchText, setSearchText] = useState<string>("");

  const [booking, setBooking] = useState<any>([]);

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
        setBooking(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchBooking();
  }, []);

  const handleDeleteBooking = (bookingId: number) => {
    axios
      .delete(`http://localhost:7373/bookings/${bookingId}`)
      .then(() => {
        notification.success({
          message: "Booking Deleted",
        });
        fetchBooking(); // Cập nhật lại dữ liệu products sau khi xóa
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
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
              booking.name
                .toLowerCase()
                .includes(searchText.trim().toLowerCase()) ||
              booking.phone
                .toString()
                .toLowerCase()
                .includes(searchText.trim().toLowerCase())
            ) {
              return true;
            }
            return false;
          });

          setBooking(filteredBooking);
        })
        .catch((error) => {
          console.log(error.message);
        });
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
            id="search-bar"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
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
              <th>Booking ID</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Booking Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {booking.map((item: any) => {
              return (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.phone}</td>
                  <td>{item.date}</td>
                  <td>{item.status}</td>
                  <td className={styles["group-btn-admin"]}>
                    {/* <button className={styles["detail-product-btn"]}>
                      Detail
                    </button>

                    <button className={styles["delete-product-btn"]}>
                      Delete
                    </button> */}
                    <Button
                      type="primary"
                      onClick={showModal}
                      className={styles["detail-product-btn"]}
                    >
                      Detail
                    </Button>
                    <Modal
                      title="Detail Booking"
                      open={isModalOpen}
                      onOk={handleOk}
                      onCancel={handleCancel}
                    >
                      <div className={styles["list-input-manage-booking"]}>
                        <div className={styles["manage-booking-input-item"]}>
                          <p>Phone</p>
                          <input type="text" disabled value={item.phone} />
                        </div>
                        <div className={styles["manage-booking-input-item"]}>
                          <p>Booking Date</p>
                          <input type="text" disabled value={item.date} />
                        </div>
                        <div className={styles["manage-booking-input-item"]}>
                          <p>Service Name</p>
                          <input
                            type="text"
                            disabled
                            value={item.booking.serviceName}
                          />
                        </div>
                        <div className={styles["manage-booking-input-item"]}>
                          <p>Service Time</p>
                          <input
                            type="text"
                            disabled
                            value={item.booking.serviceTime}
                          />
                        </div>
                        <div className={styles["manage-booking-input-item"]}>
                          <p>Service Price</p>
                          <input
                            type="text"
                            disabled
                            value={item.booking.servicePrice}
                          />
                        </div>
                        <div className={styles["manage-booking-input-item"]}>
                          <p>Status</p>
                          <select name="" id="">
                            <option value="">--Choose Status--</option>
                            <option
                              value="Done"
                              selected={item.status === "Done" ? true : false}
                            >
                              Done
                            </option>
                            <option
                              value="Processing"
                              selected={
                                item.status === "Processing" ? true : false
                              }
                            >
                              Processing
                            </option>
                            <option
                              value="Cancel"
                              selected={item.status === "Cancel" ? true : false}
                            >
                              Cancel
                            </option>
                          </select>
                        </div>
                      </div>
                    </Modal>

                    <DeleteBooking
                      value="Delete"
                      className={styles["delete-product-btn"]}
                      handleFunctionBtn={() => handleDeleteBooking(item.id)}
                    ></DeleteBooking>
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
