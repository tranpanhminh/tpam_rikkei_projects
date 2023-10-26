import React, { useEffect, useState } from "react";

import styles from "../../ClientPage.module.css";
import axios from "axios";
import { Service } from "../../../../database";
import { NavLink } from "react-router-dom";

// Import API
const servicesAPI = process.env.REACT_APP_API_SERVICES;
console.log(servicesAPI, "SERVICES API");
// ------------------------------------------------------------------

function ClientListServices() {
  const [services, setServices] = useState<Service[]>([]);
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
  return (
    <>
      <div
        className={styles["for-your-pet"]}
        style={{ marginTop: 0, marginBottom: 100 }}
      >
        <div className="container text-center">
          <div className="row align-items-start">
            {services &&
              services.map((service) => {
                return (
                  <div className="col-12 col-sm-12 col-md-6 col-xl-4 px-3 my-2">
                    <div className={styles["collection-item"]}>
                      <img
                        src={service.service_image}
                        alt=""
                        className="collection-image"
                      />
                      <div className={styles["collection-caption"]}>
                        <NavLink to={`/services/${service.id}`}>
                          <p className={styles["collection-title"]}>
                            {service.name}
                          </p>
                        </NavLink>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
}

export default ClientListServices;
