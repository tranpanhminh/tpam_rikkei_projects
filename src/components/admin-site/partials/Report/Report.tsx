import React, { useEffect, useState } from "react";
import styles from "../Report/Report.module.css";
import axios from "axios";

// Import thư viện Chart JS
import { Chart } from "react-google-charts";
import { Badge } from "react-bootstrap";

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

  // Tạo một đối tượng Map để lưu trữ dữ liệu theo tháng
  const monthMap = new Map();

  // Lặp qua mảng đơn hàng ban đầu
  orders.forEach((order: any) => {
    const dateParts = order.date.split(" "); // Tách ngày và thời gian
    const monthYear = dateParts[0].split("/").slice(1).join("/"); // Lấy tháng và năm

    // Kiểm tra xem tháng đã tồn tại trong Map chưa
    if (monthMap.has(monthYear)) {
      // Nếu tồn tại, thêm đơn hàng vào mảng order của tháng đó
      monthMap.get(monthYear).order.push(order);
      // Cộng tổng giá trị đơn hàng có giảm giá vào sumorderwithdiscount của tháng
      monthMap.get(monthYear).sumorderwithdiscount +=
        order.sumOrderWithDiscount;
    } else {
      // Nếu chưa tồn tại, tạo một tháng mới với đơn hàng đầu tiên
      monthMap.set(monthYear, {
        month: monthYear,
        sumorderwithdiscount: order.sumOrderWithDiscount,
        order: [order],
      });
    }
  });

  // Chuyển dữ liệu từ Map sang mảng kết quả
  const resultArray = Array.from(monthMap.values());

  // In ra kết quả
  console.log(resultArray);

  // Tạo mảng dữ liệu cho biểu đồ
  const saleOrderData = [["Month", "Sales", "Orders"]];

  // Lặp qua mảng kết quả
  resultArray.forEach((item: any) => {
    saleOrderData.push([
      item.month,
      item.sumorderwithdiscount,
      item.order.length,
    ]);
  });

  const saleOrderDataOption = {
    curveType: "function",
    legend: { position: "bottom" },
  };

  // Khởi tạo mảng của Service Booking
  // Khởi tạo đối tượng Map để lưu trữ số lần booking của từng dịch vụ theo tháng
  const serviceCountByMonth = new Map();

  // Lặp qua mảng bookings
  bookings.forEach((booking: any) => {
    const { date, listBookings } = booking;

    // Khởi tạo biến đếm cho các dịch vụ
    let countVeterinarian = 0;
    let countPetGrooming = 0;
    let countPetSitting = 0;

    // Lặp qua danh sách đặt lịch trong mỗi ngày
    listBookings.forEach((bookingItem: any) => {
      // Đếm số lần booking của từng dịch vụ
      switch (bookingItem.serviceName) {
        case "Veterinarian":
          countVeterinarian++;
          break;
        case "Pet Grooming":
          countPetGrooming++;
          break;
        case "Pet Sitting":
          countPetSitting++;
          break;
        default:
          break;
      }
    });

    // Chuyển đổi ngày thành đối tượng Date
    const dateParts = date.split("/");
    const year = parseInt(dateParts[2], 10);
    const month = parseInt(dateParts[1], 10) - 1; // Lưu ý: Tháng trong JavaScript là 0-based (0: Tháng 1, 1: Tháng 2, ...)

    // Tạo khóa dựa trên tháng và năm
    const monthYear = `${(month + 1).toString().padStart(2, "0")}/${year}`; // Định dạng tháng và năm thành "MM/YYYY"

    // Kiểm tra xem tháng đã tồn tại trong Map chưa
    if (serviceCountByMonth.has(monthYear)) {
      // Nếu tồn tại, cập nhật số lần booking của các dịch vụ
      const existingData = serviceCountByMonth.get(monthYear);
      existingData.countVeterinarian += countVeterinarian;
      existingData.countPetGrooming += countPetGrooming;
      existingData.countPetSitting += countPetSitting;
    } else {
      // Nếu chưa tồn tại, tạo một bản ghi mới
      serviceCountByMonth.set(monthYear, {
        Month: monthYear, // Thay đổi Month để hiển thị đúng định dạng "MM/YYYY"
        countVeterinarian,
        countPetGrooming,
        countPetSitting,
      });
    }
  });

  // Chuyển dữ liệu từ Map sang mảng kết quả
  const serviceBookingByMonth = Array.from(serviceCountByMonth.values());

  // Tạo mảng dữ liệu cho biểu đồ
  const bookingService = [
    ["Month", "Veterinarian", "Pet Grooming", "Pet Sitting"],
  ];

  // Thêm dữ liệu vào mảng data2
  serviceBookingByMonth.forEach((item) => {
    const { Month, countVeterinarian, countPetGrooming, countPetSitting } =
      item;
    bookingService.push([
      Month,
      countVeterinarian,
      countPetGrooming,
      countPetSitting,
    ]);
  });

  // In ra kết quả
  console.log(bookingService);

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
            data={bookingService}
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
              <Badge
                bg="primary"
                className={styles["best-report-overview-badge"]}
              >
                Total Sold: 250
              </Badge>
            </div>
            <div>
              <Badge
                bg="warning"
                text="dark"
                className={styles["best-report-overview-badge"]}
              >
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
              <Badge
                bg="primary"
                className={styles["best-report-overview-badge"]}
              >
                Rating: 5
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
              <Badge
                bg="primary"
                className={styles["best-report-overview-badge"]}
              >
                Total Booked: 10
              </Badge>
            </div>
            <div>
              <Badge
                bg="warning"
                text="dark"
                className={styles["best-report-overview-badge"]}
              >
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
              <Badge
                bg="primary"
                className={styles["best-report-overview-badge"]}
              >
                Rating: 5
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
