import React, { useState } from "react";
import {
  initializeDatabase,
  getDataFromLocal,
  setDataToLocal,
  Service,
} from "../../../../database"; // Import your data fetching and setting functions

function ManageServices() {
  const [database, setDatabase] = useState(initializeDatabase);
  const [services, setServices] = useState<Service[]>(
    getDataFromLocal<Service[]>("servicesDatabase" || [])
  );
  console.log(services);
  return (
    <>
      <div className="breadcrumb">
        <h2 className="page-title">Manage Services</h2>
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

        <button className="add-product-btn">Add Service</button>
      </div>

      <div className="search-result"></div>

      <div className="main-content">
        <h3 className="main-title-content">List Services</h3>
        <table className="table table-striped" id="table-products-manage-page">
          <thead>
            <tr>
              <th rowSpan={2}>#</th>
              <th rowSpan={2}>Image</th>
              <th rowSpan={2}>Name</th>
              <th rowSpan={2}>Price</th>
              <th colSpan={2}>Time</th>
              <th rowSpan={2}>Action</th>
            </tr>
            <tr>
              <th style={{ width: "250px" }}>Calendar</th>
              <th>Seat</th>
            </tr>
          </thead>
          <tbody>
            {services &&
              services.map((service) => (
                <tr key={service.id}>
                  <td>{service.id}</td>
                  <td>
                    <img
                      src={require(`../../../../assets/images/${service.serviceImage}`)}
                      alt=""
                    />
                  </td>
                  <td>{service.name}</td>
                  <td>{service.price}</td>
                  <td>
                    {service.time &&
                      service.time.map((item, index) => (
                        <tr key={`${service.id}-calendar-${index}`}>
                          <td>{item.calendar}</td>
                        </tr>
                      ))}
                  </td>
                  <td>
                    {service.time &&
                      service.time.map((item, index) => (
                        <tr key={`${service.id}-seat-${index}`}>
                          <td>{item.seat}</td>
                        </tr>
                      ))}
                  </td>
                  <td>
                    <button className="detail-product-btn">Detail</button>
                    <button className="delete-product-btn">Delete</button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
export default ManageServices;
