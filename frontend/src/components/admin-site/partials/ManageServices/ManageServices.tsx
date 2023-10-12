import React, { useEffect, useState } from "react";
import styles from "../../AdminPage.module.css";

import { Service } from "../../../../database"; // Import your data fetching and setting functions
import axios from "axios";
import AddButtonService from "./Button/AddService/AddButtonService";
import { Button, notification } from "antd";
import DetailButtonService from "./Button/DetailService/DetailButtonService";
import { NavLink } from "react-router-dom";

// Import API
// 1. Services API
const servicesAPI = process.env.REACT_APP_API_SERVICES;

// ------------------------------------------------

function ManageServices() {
  document.title = "Manage Services | PetShop";

  const [services, setServices] = useState<any>(null);
  const [searchText, setSearchText] = useState<string>("");

  const fetchServices = () => {
    axios
      .get(`${servicesAPI}`)
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
        .get(`http://localhost:7373/api/services`)
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
      .post("http://localhost:7373/api/services", newService)
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
      .delete(`http://localhost:7373/api/services/detail/${serviceId}`)
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
      .get("http://localhost:7373/api/services")
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
        <AddButtonService
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
              <th>#</th>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {services &&
              services.map((service) => (
                <tr key={service.id}>
                  <td>{service.id}</td>
                  <td>
                    <img src={service.service_image} alt="" />
                  </td>
                  <td>{service.name}</td>
                  <td>{service.price}</td>
                  <td>
                    <p>{service.working_time.morning_time}</p>
                    <p>{service.working_time.morning_time}</p>
                  </td>
                  <td className={styles["group-btn-admin-manage-product"]}>
                    <NavLink to={`/services/${service.id}`} target="_blank">
                      <Button
                        type="primary"
                        style={{ backgroundColor: "#0c337c" }}
                      >
                        View
                      </Button>
                    </NavLink>
                    <DetailButtonService
                      value="Detail"
                      title="Detail Service"
                      getServiceId={service.id}
                      handleFunctionOk={handleUpdateService}
                    ></DetailButtonService>
                    <Button
                      type="primary"
                      className={styles["delete-product-btn"]}
                      onClick={() => handleDeleteService(service.id)}
                    >
                      Delete
                    </Button>
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
