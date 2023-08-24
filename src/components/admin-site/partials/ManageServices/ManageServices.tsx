import React, { useEffect, useState } from "react";
import styles from "../../AdminPage.module.css";

import { Service } from "../../../../database"; // Import your data fetching and setting functions
import axios from "axios";
import AddModalService from "./Button/AddService/AddButtonService";
import { notification } from "antd";
import DeleteButtonService from "./Button/DeleteService/DeleteButtonService";
import DetailButtonService from "./Button/DetailService/DetailButtonService";
function ManageServices() {
  const [services, setServices] = useState<null | Service[]>(null);
  const [searchText, setSearchText] = useState<string>("");

  const fetchServices = () => {
    axios
      .get("http://localhost:7373/services")
      .then((response) => {
        setServices(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleSearchServices = () => {
    if (searchText === "") {
      fetchServices();
    } else {
      axios
        .get(`http://localhost:7373/services`)
        .then((response) => {
          // Lấy dữ liệu từ response
          const allServices = response.data;

          // Tìm kiếm trong dữ liệu và cập nhật state
          const filterServices = allServices.filter((service: Service) => {
            if (
              service.name
                .toLowerCase()
                .includes(searchText.trim().toLowerCase())
            ) {
              return true;
            }
            return false;
          });

          setServices(filterServices);
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  };

  const handleAddService = (newService: Service) => {
    axios
      .post("http://localhost:7373/services", newService)
      .then(() => {
        fetchServices(); // Cập nhật lại dữ liệu products sau khi thêm
        notification.success({
          message: "Service Added",
        });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleDeleteService = (serviceId: number) => {
    axios
      .delete(`http://localhost:7373/services/${serviceId}`)
      .then(() => {
        fetchServices(); // Cập nhật lại dữ liệu products sau khi xóa
        notification.success({
          message: "Service Deleted",
        });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleUpdateService = () => {
    axios
      .get("http://localhost:7373/services")
      .then(() => {
        fetchServices(); // Cập nhật lại dữ liệu users sau khi thêm
        notification.success({
          message: "Service Updated",
        });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <>
      <div className={styles["breadcrumb"]}>
        <h2 className={styles["page-title"]}>Manage Services</h2>
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
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button
            className={`btn  ${styles["btn-outline-success"]}`}
            type="submit"
            id={styles["search-btn"]}
            onClick={handleSearchServices}
          >
            Search
          </button>
        </div>
        <AddModalService
          className={styles["add-service-btn"]}
          value="Add Service"
          title="Add Service"
          handleClickOk={handleAddService}
        />
      </div>

      <div className={styles["search-result"]}></div>

      <div className={styles["main-content"]}>
        <h3 className={styles["main-title-content"]}>List Services</h3>
        <table
          className="table table-striped"
          id={styles["table-products-manage-page"]}
        >
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
                    <img src={service.serviceImage} alt="" />
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
                  <td className={styles["group-btn-admin-manage-product"]}>
                    <DetailButtonService
                      value="Detail"
                      title="Detail Product"
                      className={styles["detail-product-btn"]}
                      getServiceId={service.id}
                      handleFunctionOk={handleUpdateService}
                    ></DetailButtonService>
                    <DeleteButtonService
                      value="Delete"
                      className={styles["delete-product-btn"]}
                      handleFunctionBtn={() => handleDeleteService(service.id)}
                    ></DeleteButtonService>
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
