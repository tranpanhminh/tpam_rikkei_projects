import React, { useState } from "react";

import {
  initializeDatabase,
  getDataFromLocal,
  setDataToLocal,
  Order,
} from "../../../../database"; // Import your data fetching and setting functions

function ManageOrders() {
  const [database, setDatabase] = useState(initializeDatabase);
  const [orders, setOrders] = useState<Order[]>(
    getDataFromLocal<Order[]>("ordersDatabase" || [])
  );

  return (
    <>
      <div className="breadcrumb">
        <h2 className="page-title">Manage Orders</h2>
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

        <h3
          className="revenue-text"
          data-bs-toggle="modal"
          data-bs-target="#monthlyRevenue"
        >
          Revenue: $5000
        </h3>
      </div>

      <div className="main-content">
        <h3 className="main-title-content">List Orders</h3>
        <table className="table table-striped" id="table-order-list">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Date</th>
              <th>Status</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => {
              return (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.name}</td>
                  <td>{order.email}</td>
                  <td>{order.phone}</td>
                  <td>{order.date}</td>
                  <td>{order.status}</td>
                  <td>Chưa tính</td>
                  <td className="group-btn-admin">
                    <button
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      className="detail-order-btn"
                    >
                      Detail
                    </button>
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
export default ManageOrders;
