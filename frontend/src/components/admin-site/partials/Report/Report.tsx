import React, { useEffect, useState } from "react";
import styles from "../Report/Report.module.css";
import axios from "axios";

// Import thư viện Chart JS
import { Chart } from "react-google-charts";
import { Badge } from "react-bootstrap";
import { NavLink } from "react-router-dom";

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

  useEffect(() => {
    fetchUsers();
    fetchProducts();
    fetchServices();
    fetchOrders();
    fetchBookings();
    fetchSellingProduct();
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
  console.log(bestSellingProduct, "BEST :S");
  // --------------------------------------------------

  // 2. Sort Product Avg Rating
  const listProductRating = () => {
    const sortProducts = products.sort((a: any, b: any) => {
      return b.avg_rating - a.avg_rating;
    });
    return sortProducts;
  };
  console.log(listProductRating(), "BEST :S");
  // --------------------------------------------------

  // // Tạo một đối tượng Map để lưu trữ dữ liệu theo tháng
  // const monthMap = new Map();

  // // Lặp qua mảng đơn hàng ban đầu
  // orders.forEach((order: any) => {
  //   const dateParts = order.date.split(" "); // Tách ngày và thời gian
  //   const monthYear = dateParts[0].split("/").slice(1).join("/"); // Lấy tháng và năm

  //   // Kiểm tra xem tháng đã tồn tại trong Map chưa
  //   if (monthMap.has(monthYear)) {
  //     // Nếu tồn tại, thêm đơn hàng vào mảng order của tháng đó
  //     monthMap.get(monthYear).order.push(order);
  //     // Cộng tổng giá trị đơn hàng có giảm giá vào sumorderwithdiscount của tháng
  //     monthMap.get(monthYear).sumorderwithdiscount +=
  //       order.sumOrderWithDiscount;
  //   } else {
  //     // Nếu chưa tồn tại, tạo một tháng mới với đơn hàng đầu tiên
  //     monthMap.set(monthYear, {
  //       month: monthYear,
  //       sumorderwithdiscount: order.sumOrderWithDiscount,
  //       order: [order],
  //     });
  //   }
  // });

  // // Chuyển dữ liệu từ Map sang mảng kết quả
  // const resultArray = Array.from(monthMap.values());

  // // In ra kết quả
  // console.log(resultArray);

  // // Tạo mảng dữ liệu cho biểu đồ
  // const saleOrderData = [["Month", "Sales", "Orders"]];

  // // Lặp qua mảng kết quả
  // resultArray.forEach((item: any) => {
  //   saleOrderData.push([
  //     item.month,
  //     item.sumorderwithdiscount,
  //     item.order?.length,
  //   ]);
  // });

  // const saleOrderDataOption = {
  //   curveType: "function",
  //   legend: { position: "bottom" },
  // };

  // // Khởi tạo mảng của Service Booking
  // // Khởi tạo đối tượng Map để lưu trữ số lần booking của từng dịch vụ theo tháng
  // const serviceCountByMonth = new Map();

  // // Lặp qua mảng bookings
  // bookings.forEach((booking: any) => {
  //   const { date, listBookings } = booking;

  //   // Khởi tạo biến đếm cho các dịch vụ
  //   let countVeterinarian = 0;
  //   let countPetGrooming = 0;
  //   let countPetSitting = 0;

  //   // Lặp qua danh sách đặt lịch trong mỗi ngày
  //   listBookings.forEach((bookingItem: any) => {
  //     // Đếm số lần booking của từng dịch vụ
  //     switch (bookingItem.serviceName) {
  //       case "Veterinarian":
  //         countVeterinarian++;
  //         break;
  //       case "Pet Grooming":
  //         countPetGrooming++;
  //         break;
  //       case "Pet Sitting":
  //         countPetSitting++;
  //         break;
  //       default:
  //         break;
  //     }
  //   });

  //   // Chuyển đổi ngày thành đối tượng Date
  //   const dateParts = date.split("/");
  //   const year = parseInt(dateParts[2], 10);
  //   const month = parseInt(dateParts[1], 10) - 1; // Lưu ý: Tháng trong JavaScript là 0-based (0: Tháng 1, 1: Tháng 2, ...)

  //   // Tạo khóa dựa trên tháng và năm
  //   const monthYear = `${(month + 1).toString().padStart(2, "0")}/${year}`; // Định dạng tháng và năm thành "MM/YYYY"

  //   // Kiểm tra xem tháng đã tồn tại trong Map chưa
  //   if (serviceCountByMonth.has(monthYear)) {
  //     // Nếu tồn tại, cập nhật số lần booking của các dịch vụ
  //     const existingData = serviceCountByMonth.get(monthYear);
  //     existingData.countVeterinarian += countVeterinarian;
  //     existingData.countPetGrooming += countPetGrooming;
  //     existingData.countPetSitting += countPetSitting;
  //   } else {
  //     // Nếu chưa tồn tại, tạo một bản ghi mới
  //     serviceCountByMonth.set(monthYear, {
  //       Month: monthYear, // Thay đổi Month để hiển thị đúng định dạng "MM/YYYY"
  //       countVeterinarian,
  //       countPetGrooming,
  //       countPetSitting,
  //     });
  //   }
  // });

  // // Chuyển dữ liệu từ Map sang mảng kết quả
  // const serviceBookingByMonth = Array.from(serviceCountByMonth.values());

  // // Tạo mảng dữ liệu cho biểu đồ
  // const bookingService = [
  //   ["Month", "Veterinarian", "Pet Grooming", "Pet Sitting"],
  // ];

  // // Thêm dữ liệu vào mảng data2
  // serviceBookingByMonth.forEach((item) => {
  //   const { Month, countVeterinarian, countPetGrooming, countPetSitting } =
  //     item;
  //   bookingService.push([
  //     Month,
  //     countVeterinarian,
  //     countPetGrooming,
  //     countPetSitting,
  //   ]);
  // });

  // // 1. Tìm sản phẩm bán chạy nhất (Tổng số lần bán ra)
  // let totalProductIdArray = orders.map((order: any) => {
  //   return {
  //     status: order.status,
  //     listProductId: order.cart,
  //     sumOrderWithDiscount: order.sumOrderWithDiscount,
  //   };
  // });

  // let filterTotalProductShipped = totalProductIdArray.filter((item: any) => {
  //   return item.status === "Shipped";
  // });

  // let listProductIdArray = filterTotalProductShipped.map((item: any) => {
  //   return item.listProductId;
  // });

  // let allProductId: any = [];

  // listProductIdArray.forEach((item: any) => {
  //   allProductId = [...allProductId, ...item];
  //   return allProductId;
  // });

  // let listProductArrayWithCount = allProductId.map((item: any) => {
  //   let loopAllProductId = allProductId.filter((product: any) => {
  //     return item.productId === product.productId;
  //   });

  //   return {
  //     productId: item.productId,
  //     productName: item.productName,
  //     productImage: item.productImage,
  //     productPrice: item.price,
  //     count: loopAllProductId.length,
  //   };
  // });

  // const uniqueProductIds = new Set();
  // const uniqueProductArray = listProductArrayWithCount.filter((item: any) => {
  //   if (!uniqueProductIds.has(item.productId)) {
  //     uniqueProductIds.add(item.productId);
  //     return true;
  //   }
  //   return false;
  // });

  // const sortUniqueProductArray = uniqueProductArray.sort((a: any, b: any) => {
  //   return b.count - a.count;
  // });

  // // 2. Tìm sản phẩm rating cao nhất
  // let filterProduct = products.map((product: any) => {
  //   return {
  //     id: product.id,
  //     productImage: product.productImage,
  //     name: product.name,
  //     price: product.price,
  //     comments: product.comments.filter((item: any) => {
  //       return item.userRole === "customer";
  //     }),
  //     averateRating: product.comments.reduce(
  //       (accumulator: any, currentValue: any) => {
  //         return accumulator + currentValue.rating;
  //       },
  //       0
  //     ),
  //   };
  // });

  // let filterProductWithAverateRating = filterProduct.map((product: any) => {
  //   return {
  //     ...product,
  //     averateRating: Number(
  //       (product.averateRating / product.comments.length).toFixed(1)
  //     ),
  //     totalReviews: Number(product.comments.length),
  //   };
  // });

  // const sortProductRating = filterProductWithAverateRating.sort(
  //   (a: any, b: any) => {
  //     return b.averateRating - a.averateRating;
  //   }
  // );

  // // 3. Tìm dịch vụ có số lần booking nhiều nhất
  // let filterBooking = bookings.map((booking: any) => {
  //   return booking.listBookings;
  // });

  // let listBookings: any = [];
  // filterBooking.forEach((booking: any) => {
  //   listBookings = [...listBookings, ...booking];
  // });

  // let filterBookingDone = listBookings.filter((item: any) => {
  //   return item.status === "Done";
  // });

  // let listServcieArrayWithCount = filterBookingDone.map((item: any) => {
  //   let loopAllServiceId = filterBookingDone.filter((service: any) => {
  //     return item.serviceId === service.serviceId;
  //   });

  //   return {
  //     serviceId: item.serviceId,
  //     serviceName: item.serviceName,
  //     serviceImage: item.serviceImage,
  //     servicePrice: item.servicePrice,
  //     count: loopAllServiceId.length,
  //   };
  // });

  // const uniqueBookingId = new Set();
  // const uniqueBookingArray = listServcieArrayWithCount.filter((item: any) => {
  //   if (!uniqueBookingId.has(item.serviceId)) {
  //     uniqueBookingId.add(item.serviceId);
  //     return true;
  //   }
  //   return false;
  // });

  // const sortUniqueBooking = uniqueBookingArray.sort((a: any, b: any) => {
  //   return b.count - a.count;
  // });

  // // 4. Tìm dịch vụ có tổng điểm rating cao nhất
  // let filterService = services.map((service: any) => {
  //   return {
  //     id: service.id,
  //     serviceImage: service.serviceImage,
  //     name: service.name,
  //     price: service.price,
  //     comments: service.comments.filter((item: any) => {
  //       return item.userRole === "customer";
  //     }),
  //     averateRating: service.comments.reduce(
  //       (accumulator: any, currentValue: any) => {
  //         return accumulator + currentValue.rating;
  //       },
  //       0
  //     ),
  //   };
  // });

  // let filterServiceWithAverateRating = filterService.map((service: any) => {
  //   return {
  //     ...service,
  //     averateRating: Number(
  //       (service.averateRating / service.comments.length).toFixed(1)
  //     ),
  //     totalReviews: Number(service.comments.length),
  //   };
  // });

  // const sortServiceRating = filterServiceWithAverateRating.sort(
  //   (a: any, b: any) => {
  //     return b.averateRating - a.averateRating;
  //   }
  // );

  // // Tính Total Sales Orders
  // const totalSaleOrders = () => {
  //   let totalSales = filterTotalProductShipped?.reduce(
  //     (accumulator: any, currentValue: any) => {
  //       return accumulator + currentValue.sumOrderWithDiscount;
  //     },
  //     0
  //   );
  //   return totalSales.toFixed(1);
  // };

  return (
    <>
      <div className={styles["report-overview"]}>
        <div
          className={`${styles["report-overview-item"]} ${styles["report-overview-item-orders"]}`}
        >
          <h4>Total Orders</h4>
          <span className={styles["report-number"]}>{orders.length || 0}</span>
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
            // data={saleOrderData} // Sử dụng saleOrderData thay cho data
            // options={saleOrderDataOption} // Sử dụng saleOrderDataOption thay cho options
          />
        </div>
        <div className={styles["double-chart-item"]}>
          <h4>Booking Services Statistic</h4>
          <Chart
            chartType="Bar"
            width="100%"
            height="400px"
            // data={bookingService}
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
          <NavLink to={`/products/`} target="_blank">
            <img
              // src={sortProductRating[0]?.productImage || 0}
              alt=""
              className={styles["best-report-image"]}
            />
          </NavLink>
          <NavLink to={`/products/`} target="_blank">
            <p className={styles["best-report-overview-name"]}>
              {/* {sortProductRating[0]?.name || 0} */}
            </p>
          </NavLink>
          <div className={styles["best-report-overview-statistic"]}>
            <div>
              <Badge
                bg="primary"
                className={styles["best-report-overview-badge"]}
              >
                {/* Avg Rating: {sortProductRating[0]?.averateRating || 0} */}
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
                {/* Total reviews: {sortProductRating[0]?.totalReviews || 0} */}
              </Badge>
            </div>
          </div>
        </div>
        <div className={styles["best-report-overview-item"]}>
          <h4>Best Booking Service</h4>
          {/* <NavLink
            // to={`/services/${sortUniqueBooking[0]?.serviceId}`}
            target="_blank"
          >
            <img
              // src={sortUniqueBooking[0]?.serviceImage || 0}
              alt=""
              className={styles["best-report-image"]}
            />
          </NavLink> */}
          <NavLink
            // to={`/services/${sortUniqueBooking[0]?.serviceId}`}
            target="_blank"
          >
            <p className={styles["best-report-overview-name"]}>
              {/* {sortUniqueBooking[0]?.serviceName || 0} */}
            </p>
          </NavLink>
          <div className={styles["best-report-overview-statistic"]}>
            <div>
              <Badge
                bg="primary"
                className={styles["best-report-overview-badge"]}
              >
                {/* Total Booked: {sortUniqueBooking[0]?.count || 0} */}
              </Badge>
            </div>
            <div>
              <Badge
                bg="warning"
                text="dark"
                className={styles["best-report-overview-badge"]}
              >
                {/* Price: ${sortUniqueBooking[0]?.servicePrice || 0} */}
              </Badge>
            </div>
          </div>
        </div>
        <div className={styles["best-report-overview-item"]}>
          <h4>Best Rating Service</h4>
          <NavLink to={`/services/`} target="_blank">
            <img
              // src={sortServiceRating[0]?.serviceImage || 0}
              alt=""
              className={styles["best-report-image"]}
            />
          </NavLink>
          <NavLink to={`/services/`} target="_blank">
            <p className={styles["best-report-overview-name"]}>
              {/* {sortServiceRating[0]?.name || 0} */}
            </p>
          </NavLink>
          <div className={styles["best-report-overview-statistic"]}>
            <div>
              <Badge
                bg="primary"
                className={styles["best-report-overview-badge"]}
              >
                {/* Rating: {sortServiceRating[0]?.averateRating.toFixed(1) || 0} */}
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
                {/* Total reviews: {sortServiceRating[0]?.totalReviews || 0} */}
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Report;
