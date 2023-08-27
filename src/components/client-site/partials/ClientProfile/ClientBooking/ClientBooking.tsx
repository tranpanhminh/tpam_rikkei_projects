import React, { useEffect } from "react";
import { useState } from "react";
import { Button, Modal } from "antd";
// Import CSS
import styles from "../UserProfile.module.css";
import "../../../../../assets/bootstrap-5.3.0-dist/css/bootstrap.min.css";
import axios from "axios";
function ClientBooking() {
  const getData: any = localStorage.getItem("auth");
  const getLoginData = JSON.parse(getData) || "";
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

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
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
            // value={searchText}
            // onChange={(e) => setSearchText(e.target.value)}
          />
          <button
            className="btn btn-outline-success"
            type="submit"
            id={styles["search-btn"]}
            // onClick={handleSearchUser}
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
                    <td>{item.status}</td>
                    <td>
                      <Button type="primary" onClick={showModal}>
                        Detail
                      </Button>
                      <Modal
                        title="Cancel Booking"
                        open={isModalOpen}
                        onOk={handleOk}
                        onCancel={handleCancel}
                        width={500}
                      >
                        <div className={styles["list-input-my-profile"]}>
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

export default ClientBooking;
