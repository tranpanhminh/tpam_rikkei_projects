import React, { useEffect, useState } from "react";

import styles from "../../ClientPage.module.css";
import { Service } from "../../../../database";
import { NavLink } from "react-router-dom";
import { getAllServices } from "../../../../api/services.api";

// ------------------------------------------------------------------

function ClientListServices() {
  const [services, setServices] = useState<Service[]>([]);
  const fetchServices = async () => {
    const result = await getAllServices();
    return setServices(result);
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
