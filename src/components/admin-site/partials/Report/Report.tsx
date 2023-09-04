import React, { useEffect, useState } from "react";
import styles from "../Report/Report.module.css";
import axios from "axios";

// Import thư viện Chart JS
import { Chart } from "react-google-charts";

// Orders & Sales Chart
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

// Booking Chart
export const data2 = [
  ["Year", "Sales", "Expenses", "Profit"],
  ["2014", 1000, 400, 200],
  ["2015", 1170, 460, 250],
  ["2016", 660, 1120, 300],
  ["2017", 1030, 540, 350],
];

export const options2 = {
  chart: {
    title: "Company Performance",
    subtitle: "Sales, Expenses, and Profit: 2014-2017",
  },
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

      <div className={styles["double-chart"]}>
        <div className={styles["double-chart-item"]}>
          <h4>Oders & Sales Statistic</h4>
          <Chart
            chartType="LineChart"
            width="100%"
            height="400px"
            data={data}
            options={options}
          />
        </div>
        <div className={styles["double-chart-item"]}>
          <h4>Booking Services Statistic</h4>
          <Chart
            chartType="Bar"
            width="100%"
            height="400px"
            data={data2}
            options={options2}
          />
        </div>
      </div>

      <div className={styles["best-report-overview"]}>
        <div className={styles["best-report-overview-item"]}>
          <h4>Best Selling Product</h4>
        </div>
        <div className={styles["best-report-overview-item"]}>
          <h4>Best Rating Product</h4>
        </div>
        <div className={styles["best-report-overview-item"]}>
          <h4> Best Service</h4>
        </div>
        <div className={styles["best-report-overview-item"]}>
          <h4>Best Rating Service</h4>
        </div>
      </div>
    </>
  );
}

export default Report;
