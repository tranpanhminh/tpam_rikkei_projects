import React, { useEffect, useRef, useState } from "react";
import styles from "../Report/Report.module.css";
import { Button } from "antd";
import axios from "axios";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useReactToPrint } from "react-to-print";

// Import thư viện Chart JS
import { Chart } from "react-google-charts";
import { Badge } from "react-bootstrap";
import { NavLink } from "react-router-dom";
const moment = require("moment");

// Import API
// 1. Users API
const usersAPI = process.env.REACT_APP_API_USERS;
const ordersAPI = process.env.REACT_APP_API_ORDERS;
const orderItemsAPI = process.env.REACT_APP_API_ORDER_ITEMS;
const bookingsAPI = process.env.REACT_APP_API_BOOKINGS;
const productsAPI = process.env.REACT_APP_API_PRODUCTS;
const servicesAPI = process.env.REACT_APP_API_SERVICES;

// ------------------------------------------------

function Report() {
  document.title = "Reports | PetShop";

  const [users, setUsers] = useState<any>([]);
  const [products, setProducts] = useState<any>([]);
  const [services, setServices] = useState<any>([]);
  const [orders, setOrders] = useState<any>([]);
  const [bookings, setBookings] = useState<any>([]);
  const [bestSellingProduct, setBestSellingProduct] = useState<any>([]);
  const [bestBookingService, setBestBookingService] = useState<any>([]);
  const [loader, setLoader] = useState<boolean>(false);

  // Fetch API
  const fetchUsers = () => {
    axios
      .get(`${usersAPI}`)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const fetchProducts = () => {
    axios
      .get(`${productsAPI}`)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

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

  const fetchOrders = () => {
    axios
      .get(`${ordersAPI}`)
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const fetchBookings = () => {
    axios
      .get(`${bookingsAPI}`)
      .then((response) => {
        setBookings(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const fetchSellingProduct = () => {
    axios
      .get(`${orderItemsAPI}/report`)
      .then((response) => {
        setBestSellingProduct(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchBookingService = () => {
    axios
      .get(`${bookingsAPI}/report`)
      .then((response) => {
        setBestBookingService(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchUsers();
    fetchProducts();
    fetchServices();
    fetchOrders();
    fetchBookings();
    fetchSellingProduct();
    fetchBookingService();
  }, []);

  // --------------------------------------------------
  // 1. Total Orders
  const totalSales = () => {
    const totalSales = orders.reduce((accumulator: number, order: any) => {
      if (order.status_id === 5) {
        return accumulator + order.total_bill;
      }
      return accumulator; // Thêm dòng này để trả về accumulator khi điều kiện không thỏa mãn
    }, 0); // 0 là giá trị khởi tạo cho accumulator
    return totalSales;
  };

  // --------------------------------------------------
  let bestProductRating: any = [];
  let bestServiceRating: any = [];
  const listProductRating = () => {
    const sortProducts = products.sort((a: any, b: any) => {
      return b.avg_rating - a.avg_rating;
    });
    bestProductRating = sortProducts;

    const sortService = services.sort((a: any, b: any) => {
      return b.avg_rating - a.avg_rating;
    });
    bestServiceRating = sortService;
  };
  listProductRating();

  // Biểu đồ Sale - Order
  // Tạo một đối tượng Map để lưu trữ dữ liệu theo tháng
  const monthMap = new Map();

  // Lặp qua mảng đơn hàng ban đầu
  orders.forEach((order: any) => {
    const orderDate = moment(order.order_date).format("DD/MM/YYYY");
    const dateParts = orderDate.split(" "); // Tách ngày và thời gian
    const monthYear = dateParts[0].split("/").slice(1).join("/"); // Lấy tháng và năm

    // Kiểm tra xem tháng đã tồn tại trong Map chưa
    if (monthMap.has(monthYear)) {
      // Nếu tồn tại, thêm đơn hàng vào mảng order của tháng đó
      monthMap.get(monthYear).order.push(order);
      // Cộng tổng giá trị đơn hàng có giảm giá vào sumorderwithdiscount của tháng
      monthMap.get(monthYear).total_bill += order.total_bill;
    } else {
      // Nếu chưa tồn tại, tạo một tháng mới với đơn hàng đầu tiên
      monthMap.set(monthYear, {
        month: monthYear,
        total_bill: order.total_bill,
        order: [order],
      });
    }
  });

  // Chuyển dữ liệu từ Map sang mảng kết quả
  const resultArray = Array.from(monthMap.values());

  // Tạo mảng dữ liệu cho biểu đồ
  const saleOrderData = [["Month", "Sales", "Orders"]];

  // Lặp qua mảng kết quả
  resultArray.forEach((item: any) => {
    saleOrderData.push([item.month, item.total_bill, item.order?.length]);
  });

  const saleOrderDataOption = {
    curveType: "function",
    legend: { position: "bottom" },
  };
  // --------------------------------------------------

  // Biểu đồ Booking - Date
  // Tạo một đối tượng Map để lưu trữ dữ liệu theo tháng
  const monthBookingMap = new Map();

  // Lặp qua mảng đơn hàng ban đầu
  bookings.forEach((booking: any) => {
    const bookingDate = moment(booking.booking_date).format("DD/MM/YYYY");
    const dateParts = bookingDate.split(" "); // Tách ngày và thời gian
    const monthYear = dateParts[0].split("/").slice(1).join("/"); // Lấy tháng và năm

    // Kiểm tra xem tháng đã tồn tại trong Map chưa
    if (monthBookingMap.has(monthYear)) {
      // Nếu tồn tại, thêm đơn hàng vào mảng order của tháng đó
      monthBookingMap.get(monthYear).booking.push(booking);
      // Cộng tổng giá trị đơn hàng có giảm giá vào sumorderwithdiscount của tháng
      monthBookingMap.get(monthYear).service_price += booking.service_price;
    } else {
      // Nếu chưa tồn tại, tạo một tháng mới với đơn hàng đầu tiên
      monthBookingMap.set(monthYear, {
        month: monthYear,
        service_price: booking.service_price,
        booking: [booking],
      });
    }
  });

  // Chuyển dữ liệu từ Map sang mảng kết quả
  const resultBookingArray = Array.from(monthBookingMap.values());

  // Tạo mảng dữ liệu cho biểu đồ
  const bookingData = [["Month", "Booking"]];

  // Lặp qua mảng kết quả
  resultBookingArray.forEach((item: any) => {
    bookingData.push([item.month, item.booking?.length]);
  });

  const bookingDataOption = {
    curveType: "function",
    legend: { position: "bottom" },
  };
  // --------------------------------------------------

  // Export PDF
  // const componentPDF: any = useRef();
  // const exportPDF = useReactToPrint({
  //   content: () => componentPDF.current,
  //   documentTitle: "Report",
  //   onBeforeGetContent: () => setLoader(true),
  //   onBeforePrint: () => setLoader(true),
  //   onAfterPrint: () => setLoader(false),
  // });

  // --------------------------------------------------
  return (
    <>
      {/* <div
        ref={componentPDF}
        style={{ width: "100%", height: "100%", padding: "40px" }}
      > */}
      <div className={styles["report-overview"]}>
        <div
          className={`${styles["report-overview-item"]} ${styles["report-overview-item-orders"]}`}
        >
          <h4>Total Orders</h4>
          <span className={styles["report-number"]}>{orders?.length || 0}</span>
        </div>
        <div
          className={`${styles["report-overview-item"]} ${styles["report-overview-item-booking"]}`}
        >
          <h4>Total Booking</h4>
          <span className={styles["report-number"]}>
            {bookings?.length || 0}
          </span>
        </div>
        <div
          className={`${styles["report-overview-item"]} ${styles["report-overview-item-sales"]}`}
        >
          <h4>Total Sales (Orders)</h4>
          <span className={styles["report-number"]}>$ {totalSales()}</span>
        </div>
        <div
          className={`${styles["report-overview-item"]} ${styles["report-overview-item-users"]}`}
        >
          <h4>Total Users</h4>
          <span className={styles["report-number"]}>{users?.length || 0}</span>
        </div>
      </div>
      <div className={styles["double-chart"]}>
        <div className={styles["double-chart-item"]}>
          <h4>Oders & Sales Statistic</h4>
          <Chart
            chartType="LineChart"
            width="100%"
            height="400px"
            data={saleOrderData} // Sử dụng saleOrderData thay cho data
            options={saleOrderDataOption} // Sử dụng saleOrderDataOption thay cho options
          />
        </div>
        <div className={styles["double-chart-item"]}>
          <h4>Booking Services Statistic</h4>
          <Chart
            chartType="Bar"
            width="100%"
            height="400px"
            data={bookingData} // Sử dụng saleOrderData thay cho data
            options={bookingDataOption} // Sử dụng saleOrderDataOption thay cho optio
          />
        </div>
      </div>
      <div className={styles["best-report-overview"]}>
        <div className={styles["best-report-overview-item"]}>
          <h4>Best Selling Product</h4>
          <NavLink
            to={`/products/${bestSellingProduct[0]?.product_id}`}
            target="_blank"
          >
            <img
              src={bestSellingProduct[0]?.thumbnail_url}
              alt=""
              className={styles["best-report-image"]}
            />
          </NavLink>
          <NavLink
            to={`/products/${bestSellingProduct[0]?.product_id}`}
            target="_blank"
          >
            <p className={styles["best-report-overview-name"]}>
              {bestSellingProduct[0]?.name || 0}
            </p>
          </NavLink>
          <div className={styles["best-report-overview-statistic"]}>
            <div>
              <Badge
                bg="primary"
                className={styles["best-report-overview-badge"]}
              >
                Total Sold: {bestSellingProduct[0]?.total_quantity_sold || 0}
              </Badge>
            </div>
            <div>
              <Badge
                bg="warning"
                text="dark"
                className={styles["best-report-overview-badge"]}
              >
                Price: ${bestSellingProduct[0]?.price || 0}
              </Badge>
            </div>
          </div>
        </div>
        <div className={styles["best-report-overview-item"]}>
          <h4>Best Rating Product</h4>
          <NavLink to={`/products/${bestProductRating[0]?.id}`} target="_blank">
            <img
              src={bestProductRating[0]?.thumbnail_url || 0}
              alt=""
              className={styles["best-report-image"]}
            />
          </NavLink>
          <NavLink to={`/products/${bestProductRating[0]?.id}`} target="_blank">
            <p className={styles["best-report-overview-name"]}>
              {bestProductRating[0]?.name || 0}
            </p>
          </NavLink>
          <div className={styles["best-report-overview-statistic"]}>
            <div>
              <Badge
                bg="primary"
                className={styles["best-report-overview-badge"]}
              >
                Avg Rating: {bestProductRating[0]?.avg_rating || 0}
                <i
                  className={`fa-solid fa-star  ${styles["best-rating-star-icon"]}`}
                ></i>
              </Badge>
            </div>
            <div>
              <Badge
                bg="warning"
                text="dark"
                className={styles["best-report-overview-badge"]}
              >
                Total Reviews: {bestProductRating[0]?.total_reviews || 0}
              </Badge>
            </div>
          </div>
        </div>
        <div className={styles["best-report-overview-item"]}>
          <h4>Best Booking Service</h4>
          <NavLink
            to={`/services/${bestBookingService[0]?.service_id}`}
            target="_blank"
          >
            <img
              src={bestBookingService[0]?.service_image || 0}
              alt=""
              className={styles["best-report-image"]}
            />
          </NavLink>
          <NavLink
            to={`/services/${bestBookingService[0]?.service_id}`}
            target="_blank"
          >
            <p className={styles["best-report-overview-name"]}>
              {bestBookingService[0]?.name || 0}
            </p>
          </NavLink>
          <div className={styles["best-report-overview-statistic"]}>
            <div>
              <Badge
                bg="primary"
                className={styles["best-report-overview-badge"]}
              >
                Total Booked: {bestBookingService[0]?.book_count || 0}
              </Badge>
            </div>
            <div>
              <Badge
                bg="warning"
                text="dark"
                className={styles["best-report-overview-badge"]}
              >
                Price: ${bestBookingService[0]?.price || 0}
              </Badge>
            </div>
          </div>
        </div>
        <div className={styles["best-report-overview-item"]}>
          <h4>Best Rating Service</h4>
          <NavLink to={`/services/${bestServiceRating[0]?.id}`} target="_blank">
            <img
              src={bestServiceRating[0]?.service_image || 0}
              alt=""
              className={styles["best-report-image"]}
            />
          </NavLink>
          <NavLink to={`/services/${bestServiceRating[0]?.id}`} target="_blank">
            <p className={styles["best-report-overview-name"]}>
              {bestServiceRating[0]?.name || 0}
            </p>
          </NavLink>
          <div className={styles["best-report-overview-statistic"]}>
            <div>
              <Badge
                bg="primary"
                className={styles["best-report-overview-badge"]}
              >
                Rating: {bestServiceRating[0]?.avg_rating || 0}
                <i
                  className={`fa-solid fa-star  ${styles["best-rating-star-icon"]}`}
                ></i>
              </Badge>
            </div>
            <div>
              <Badge
                bg="warning"
                text="dark"
                className={styles["best-report-overview-badge"]}
              >
                Total reviews: {bestServiceRating[0]?.total_reviews || 0}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <br />
      {/* <Button
        type="primary"
        danger
        onClick={exportPDF}
        // disabled={!(loader === false)}
        style={{ display: loader ? "none" : "inline-block" }}
      >
        Export PDF
      </Button> */}
      {/* </div> */}
    </>
  );
}

export default Report;
