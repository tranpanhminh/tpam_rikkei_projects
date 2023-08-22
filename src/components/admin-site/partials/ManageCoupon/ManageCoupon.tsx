import React, { useState } from "react";
import { parse } from "date-fns";

import {
  initializeDatabase,
  getDataFromLocal,
  setDataToLocal,
  Coupon,
} from "../../../../database"; // Import your data fetching and setting functions

function ManageNewsletter() {
  const [database, setDatabase] = useState(initializeDatabase);
  const [coupons, setCoupons] = useState<Coupon[]>(
    getDataFromLocal<Coupon[]>("couponsDatabase" || [])
  );

  return (
    <>
      <div className="breadcrumb">
        <h2 className="page-title">Manage Coupons</h2>
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
        <h3 className="main-title-content">List Coupons</h3>
        <table className="table table-striped" id="table-order-list">
          <thead>
            <tr>
              <th rowSpan={2}>Coupon ID</th>
              <th rowSpan={2}>Name</th>
              <th rowSpan={2}>Description</th>
              <th rowSpan={2}>Slot</th>
              <th colSpan={2}>Date</th>
              <th rowSpan={2}>Status</th>
              <th rowSpan={2}>Action</th>
            </tr>
            <tr>
              <th>Start Date</th>
              <th>End Date</th>
            </tr>
          </thead>
          <tbody>
            {coupons.map((coupon) => {
              return (
                <tr key={coupon.id}>
                  <td>{coupon.id}</td>
                  <td>{coupon.name}</td>
                  <td>{coupon.description}</td>
                  <td> {coupon.slot === 0 ? 0 : coupon.slot || "Unlimited"}</td>
                  <td>{coupon.startDate}</td>
                  <td>{coupon.endDate}</td>
                  <td>
                    {coupon.slot === 0 ||
                    (coupon.endDate &&
                      new Date() >
                        parse(coupon.endDate, "dd/MM/yyyy", new Date()))
                      ? "Đã hết"
                      : ""}
                  </td>
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
export default ManageNewsletter;
