import React, { useState } from "react";

import {
  initializeDatabase,
  getDataFromLocal,
  setDataToLocal,
  Booking,
} from "../../../../database"; // Import your data fetching and setting functions

function ManageBooking() {
  const [database, setDatabase] = useState(initializeDatabase);
  const [booking, setBooking] = useState<Booking[]>(
    getDataFromLocal<Booking[]>("bookingDatabase" || [])
  );

  return (
    <>
      <div className="breadcrumb">
        <h2 className="page-title">Manage Booking</h2>
        <p className="page-description">PetShop Admin Panel</p>
      </div>

      <div className="product-panel">
        <div className="d-flex" role="search">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            id="search-bar"
          />
          <button
            className="btn btn-outline-success"
            type="submit"
            id="search-btn"
          >
            Search
          </button>
        </div>
      </div>

      <div className="main-content">
        <h3 className="main-title-content">List Booking</h3>
        <table className="table table-striped" id="table-order-list">
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
            {booking.map((item) => {
              return (
                <tr key={item.bookingId}>
                  <td>{item.bookingId}</td>
                  <td>{item.name}</td>
                  <td>{item.phone}</td>
                  <td>{item.date}</td>
                  <td>{item.status}</td>
                  <td className="group-btn-admin">
                    <button className="detail-order-btn">Detail</button>
                    <button className="delete-order-btn">Delete</button>
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
