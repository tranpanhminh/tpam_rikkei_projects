import React from "react";
import { useState } from "react";
import { Button, Modal } from "antd";
// Import CSS
import styles from "../UserProfile.module.css";
import "../../../../../assets/bootstrap-5.3.0-dist/css/bootstrap.min.css";
function ClientBooking() {
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
              <th>#</th>
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
            <tr>
              <td>1</td>
              <td>1</td>
              <td>Dog Grooming</td>
              <td>10/12/2021</td>
              <td>23/10/2023</td>
              <td>$500</td>
              <td>Processing</td>
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
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ClientBooking;
