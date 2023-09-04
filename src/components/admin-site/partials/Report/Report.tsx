import React, { useEffect, useState } from "react";
import styles from "../Report/Report.module.css";
import axios from "axios";

// Import thư viện Chart JS
import { Chart } from "react-google-charts";
import { Badge } from "react-bootstrap";

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
          <img
            src="https://tm-shopify037-clothes.myshopify.com/cdn/shop/products/glendan_dog_brush_cat_brush_slicker_pet_grooming_brush_shedding_grooming_tools_1_640x_crop_top.jpg?v=1625752641"
            alt=""
            className={styles["best-report-image"]}
          />
          <p className={styles["best-report-overview-name"]}>
            Glendan Dog Brush Cat Brush Slicker
          </p>
          <div className={styles["best-report-overview-statistic"]}>
            <div>
              <Badge bg="primary">Total Sold: 250</Badge>
            </div>
            <div>
              <Badge bg="warning" text="dark">
                Price: $9
              </Badge>
            </div>
          </div>
        </div>
        <div className={styles["best-report-overview-item"]}>
          <h4>Best Rating Product</h4>
          <img
            src="https://tm-shopify037-clothes.myshopify.com/cdn/shop/products/senye_retractable_dog_leash_16ft_dog_traction_rope_1_640x_crop_top.jpg?v=1625752616"
            alt=""
            className={styles["best-report-image"]}
          />
          <p className={styles["best-report-overview-name"]}>
            Senye Retractable Dog Leash 16ft Dog Traction Rope
          </p>
          <div className={styles["best-report-overview-statistic"]}>
            <div>
              <Badge bg="primary">
                Rating: 5
                <i
                  className={`fa-solid fa-star  ${styles["best-rating-star-icon"]}`}
                ></i>
              </Badge>
            </div>
            <div>
              <Badge bg="warning" text="dark">
                Total reviews: 25
              </Badge>
            </div>
          </div>
        </div>
        <div className={styles["best-report-overview-item"]}>
          <h4>Best Service</h4>
          <img
            src="https://i.ibb.co/F5N9LXC/dog-grooming-service.jpg"
            alt=""
            className={styles["best-report-image"]}
          />
          <p className={styles["best-report-overview-name"]}>Pet Grooming</p>
          <div className={styles["best-report-overview-statistic"]}>
            <div>
              <Badge bg="primary">Total Booked: 10</Badge>
            </div>
            <div>
              <Badge bg="warning" text="dark">
                Price: $300
              </Badge>
            </div>
          </div>
        </div>
        <div className={styles["best-report-overview-item"]}>
          <h4>Best Rating Service</h4>
          <img
            src="https://i.ibb.co/2Y4LnrD/veterinary-service.jpg"
            alt=""
            className={styles["best-report-image"]}
          />
          <p className={styles["best-report-overview-name"]}>Veterinarian</p>
          <div className={styles["best-report-overview-statistic"]}>
            <div>
              <Badge bg="primary">
                Rating: 5
                <i
                  className={`fa-solid fa-star  ${styles["best-rating-star-icon"]}`}
                ></i>
              </Badge>
            </div>
            <div>
              <Badge bg="warning" text="dark">
                Total reviews: 25
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Report;
