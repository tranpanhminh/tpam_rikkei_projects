import React, { useEffect, useState } from "react";

import styles from "../../ClientPage.module.css";
import { Service } from "../../../../database";
import { NavLink } from "react-router-dom";
import { getAllServices } from "../../../../api/services.api";

function ClientServices() {
  const [services, setServices] = useState<null | Service[]>(null);
  const fetchServices = async () => {
    const result = await getAllServices();
    return setServices(result);
  };

  useEffect(() => {
    fetchServices();
  }, []);
  return (
    <>
      <div className={styles["for-your-pet"]}>
        <div className={styles["group-title-category"]}>
          <h3 className={styles["headline-title-category"]}>For your pets!</h3>
          <p className={styles["headline-category"]}>Our Favorite Services</p>
        </div>

        <div className="container text-center">
          <div className="row align-items-start">
            {services &&
              services?.slice(0, 3)?.map((service) => {
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

export default ClientServices;