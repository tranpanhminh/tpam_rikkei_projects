import React from "react";
import { useState } from "react";
import { Button, Modal } from "antd";
// Import CSS
import styles from "../UserProfile.module.css";
import "../../../../../assets/bootstrap-5.3.0-dist/css/bootstrap.min.css";
function ClientNewsLetter() {
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
        <h2 className={styles["page-title"]}>My Newsletter</h2>
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
        <Button type="primary">Cancel Newsletter</Button>
      </div>
      <div className={styles["main-content"]}>
        <h3 className={styles["main-title-content"]}>List Newsletter</h3>
        <table className="table table-striped" id="table-user">
          <thead>
            <tr>
              <th>#</th>
              <th>Newsletter ID</th>
              <th>Coupon Name</th>
              <th>Coupon Code</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>1</td>
              <td>Sale Off 50%</td>
              <td>213123123123123</td>
              <td>Usable</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ClientNewsLetter;
