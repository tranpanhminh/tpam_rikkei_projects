import React from "react";
import styles from "../ClientProfile.module.css";
function ClientBooking() {
  return (
    <>
      {" "}
      <>
        <div className={styles["breadcrumb"]}>
          <h2 className={styles["page-title"]}>My Booking</h2>
          <p className={styles["page-description"]}>PetShop User Panel</p>
        </div>

        <div className={styles["order-history"]}>
          {/* <h2 className="order-history-title">Order History</h2> */}
          <div className="table-responsive">
            <table className="table table-cart">
              <thead>
                <tr>
                  <th scope="col" style={{ minWidth: "20px" }}>
                    #
                  </th>
                  <th scope="col" style={{ minWidth: "100px" }}>
                    Order ID
                  </th>
                  <th scope="col" style={{ minWidth: "150px" }}>
                    Date
                  </th>
                  <th scope="col" style={{ minWidth: "100px" }}>
                    Total
                  </th>
                  <th scope="col" style={{ minWidth: "50px" }}>
                    Status
                  </th>
                  <th scope="col" style={{ minWidth: "50px" }}>
                    Action
                  </th>
                  <th scope="col" style={{ minWidth: "300px" }}>
                    Order Cancel Request
                  </th>
                </tr>
              </thead>
              <tbody id={styles["table-order-history"]}>
                <tr>
                  <th>1</th>
                  <td>4</td>
                  <td>25/05/2023</td>
                  <td>$10000</td>
                  <td>Shipped</td>
                  <td>
                    <span>Detail</span>
                    <span>Request Cancel</span>
                  </td>
                </tr>
                {/* Add more rows here */}
              </tbody>
            </table>
          </div>
        </div>
      </>
    </>
  );
}

export default ClientBooking;
