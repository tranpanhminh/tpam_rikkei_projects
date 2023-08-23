import React, { useEffect, useState } from "react";
import styles from "../ClientServices/ClientServiceDetail.module.css";
import axios from "axios";
import { Product, Service } from "../../../../database";
import { useParams } from "react-router-dom";
import { tr } from "date-fns/locale";

function ClientServiceDetail() {
  const { serviceId } = useParams();
  const [services, setServices] = useState<null | Service>(null);
  const fetchServices = () => {
    axios
      .get(`http://localhost:7373/services/${serviceId}`)
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
    <div className={styles["wrap-service-detail-page"]}>
      {services && (
        <div className={styles["service-detail"]}>
          <div className="container text-center">
            <div className="row align-items-center">
              <div className="col-xl-6 col-sm-12">
                <div className="container text-center">
                  <div className="row row-cols-2">
                    <div className="col-12">
                      <img src={services && services.serviceImage} alt="" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-6 col-sm-12">
                <div className={styles["service-detail-info"]}>
                  <h2 className={styles["service-title-name"]}>
                    {services && services.name}
                  </h2>
                  <p className={styles["service-description"]}>
                    {services && services.description}
                  </p>
                  <table
                    cellPadding={10}
                    style={{ borderCollapse: "collapse" }}
                    className={styles["services-detail-table"]}
                  >
                    <thead>
                      <tr>
                        <th>Calendar</th>
                        <th>Seat</th>
                        <th>Booking</th>
                      </tr>
                    </thead>
                    <tbody>
                      {services.time.map((item) => {
                        return (
                          <tr>
                            <td>{item.calendar}</td>
                            <td>{item.seat}</td>
                            <td>
                              <button className={styles["booking-service-btn"]}>
                                Book
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  {/* <div className={styles["service-price"]}>
                    <span>Price</span>
                    <span>${services && services.price.toLocaleString()}</span>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ClientServiceDetail;
