import React, { useEffect, useState } from "react";
import styles from "../Report/Report.module.css";
import axios from "axios";

// Import thư viện Chart JS
import { Chart } from "react-google-charts";

export const data = [
  ["Year", "Sales", "Expenses"],
  ["2004", 1000, 400],
  ["2005", 1170, 460],
  ["2006", 660, 1120],
  ["2007", 1030, 540],
];

export const options = {
  title: "Company Performance",
  curveType: "function",
  legend: { position: "bottom" },
};

function Report() {
  const [users, setUsers] = useState<any>([]);
  const [products, setProducts] = useState<any>([]);
  const [services, setServices] = useState<any>([]);
  const [orders, setOrders] = useState<any>([]);
  const [bookings, setBookings] = useState<any>([]);

  const fetchUsers = () => {
    axios
      .get("http://localhost:7373/accounts")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const fetchProducts = () => {
    axios
      .get("http://localhost:7373/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

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

  const fetchOrders = () => {
    axios
      .get("http://localhost:7373/orders")
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const fetchBookings = () => {
    axios
      .get("http://localhost:7373/bookings")
      .then((response) => {
        setBookings(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    fetchUsers();
    fetchProducts();
    fetchServices();
    fetchOrders();
    fetchBookings();
  }, []);

  const totalSaleOrders = () => {
    let totalSales = orders.reduce((accumulator: any, currentValue: any) => {
      return accumulator + currentValue.sumOrderWithDiscount;
    }, 0);
    return totalSales;
  };

  return (
    <>
      <div className={styles["report-overview"]}>
        <div
          className={`${styles["report-overview-item"]} ${styles["report-overview-item-orders"]}`}
        >
          <h4>Total Orders</h4>
          <span className={styles["report-number"]}>{orders?.length}</span>
        </div>
        <div
          className={`${styles["report-overview-item"]} ${styles["report-overview-item-booking"]}`}
        >
          <h4>Total Booking</h4>
          <span className={styles["report-number"]}>{bookings?.length}</span>
        </div>
        <div
          className={`${styles["report-overview-item"]} ${styles["report-overview-item-sales"]}`}
        >
          <h4>Total Sales (Orders)</h4>
          <span className={styles["report-number"]}>$ {totalSaleOrders()}</span>
        </div>
        <div
          className={`${styles["report-overview-item"]} ${styles["report-overview-item-users"]}`}
        >
          <h4>Total Users</h4>
          <span className={styles["report-number"]}>{users?.length}</span>
        </div>
      </div>

      <div>
        <Chart
          chartType="LineChart"
          width="100%"
          height="400px"
          data={data}
          options={options}
        />
      </div>
    </>
  );
}

export default Report;
