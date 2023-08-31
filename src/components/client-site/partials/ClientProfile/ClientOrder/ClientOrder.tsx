// import React, { useEffect } from "react";
// import { useState } from "react";
// import { Button, Modal } from "antd";
// // Import CSS
// import styles from "../UserProfile.module.css";
// import "../../../../../assets/bootstrap-5.3.0-dist/css/bootstrap.min.css";
// import axios from "axios";
// import { Account } from "../../../../../database";
// import { Badge } from "react-bootstrap";
// import DetailOrderButton from "./Button/DetailOrderButton";
// function ClientOrder() {
//   const getData: any = localStorage.getItem("auth");
//   const getLoginData = JSON.parse(getData) || "";
//   const [searchText, setSearchText] = useState<string>("");
//   const [user, setUser] = useState<any>([]);
//   const [userOrder, setUserOrder] = useState<any>([]);
//   const [orderProduct, setOrderProduct] = useState<any>([]);

//   const fetchUser = () => {
//     axios
//       .get(`http://localhost:7373/accounts/${getLoginData.loginId}`)
//       .then((response) => {
//         setUser(response.data);
//         setUserOrder(response.data.order_history);
//         setOrderProduct(response.data.order_history.orderProduct);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   useEffect(() => {
//     fetchUser();
//   }, []);

//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const showModal = () => {
//     setIsModalOpen(true);
//   };

//   const handleOk = () => {
//     setIsModalOpen(false);
//   };

//   const handleCancel = () => {
//     setIsModalOpen(false);
//   };

//   console.log("USER", user);
//   console.log("userOrder", userOrder);
//   console.log("orderProduct", orderProduct);

//   const hanldeSearchOrder = () => {
//     console.log(searchText);
//     if (searchText === "") {
//       // Nếu searchText rỗng, gọi lại fetchUsers để lấy tất cả người dùng
//       fetchUser();
//     } else {
//       // Nếu có searchText, thực hiện tìm kiếm và cập nhật state
//       axios
//         .get(`http://localhost:7373/accounts/${getLoginData.loginId}`)
//         .then((response) => {
//           // Tìm kiếm trong dữ liệu và cập nhật state
//           const filterOrder = userOrder?.filter((item: any) => {
//             if (
//               item.date
//                 .toLowerCase()
//                 .includes(searchText.trim().toLowerCase()) ||
//               item.status
//                 .toLowerCase()
//                 .includes(searchText.trim().toLowerCase())
//             ) {
//               return true;
//             }
//             return false;
//           });
//           setUserOrder(filterOrder);
//         })
//         .catch((error) => {
//           console.log(error.message);
//         });
//     }
//   };

//   const handleSumOrder = (orderId: number) => {
//     // Tìm đơn hàng dựa trên orderId
//     let findOrder = userOrder.find((item: any) => {
//       return item.orderId === orderId;
//     });

//     if (findOrder) {
//       // Tính tổng giá trị của đơn hàng
//       let sumOrder = findOrder.orderProduct.reduce(
//         (accumulator: number, currentValue: any) => {
//           return (accumulator +=
//             currentValue.productQuantity * currentValue.price);
//         },
//         0
//       );

//       return sumOrder;
//     }

//     return 0; // Trả về 0 nếu không tìm thấy đơn hàng
//   };

//   const changeColor = (status: string) => {
//     switch (status) {
//       case "Shipped":
//         return "success";
//       case "Shipping":
//         return "primary";
//       case "Processing":
//         return "info";
//       case "Pending":
//         return "warning";
//       case "Cancel":
//         return "danger";
//       default:
//         return;
//     }
//   };

//   const handleUpdateStatus = (updatedStatus: string, orderId: number) => {
//     // Cập nhật trạng thái đơn hàng trong order history
//     const updatedOrderHistory = userOrder.map((order: any) => {
//       if (order.orderId === orderId) {
//         return { ...order, status: updatedStatus };
//       }
//       return order;
//     });

//     // Cập nhật trạng thái đơn hàng trong cơ sở dữ liệu
//     axios
//       .patch(`http://localhost:7373/accounts/${getLoginData.loginId}`, {
//         order_history: updatedOrderHistory,
//       })
//       .then((response) => {
//         setUserOrder(updatedOrderHistory);
//         // Gọi handleFunctionOk để đóng modal sau khi cập nhật
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   return (
//     <div>
//       <div className={styles.breadcrumb}>
//         <h2 className={styles["page-title"]}>My Order</h2>
//         <p className={styles["page-description"]}>PetShop User Panel</p>
//       </div>

//       <div className={styles["user-board"]}>
//         <div className="d-flex" role="search">
//           <input
//             className="form-control me-2"
//             type="search"
//             placeholder="Search"
//             aria-label="Search"
//             id="search-bar"
//             value={searchText}
//             onChange={(e) => setSearchText(e.target.value)}
//           />
//           <button
//             className="btn btn-outline-success"
//             type="submit"
//             id={styles["search-btn"]}
//             onClick={hanldeSearchOrder}
//           >
//             Search
//           </button>
//         </div>
//       </div>

//       <div className={styles["main-content"]}>
//         <h3 className={styles["main-title-content"]}>List Orders</h3>
//         <table className="table table-striped" id="table-user">
//           <thead>
//             <tr>
//               <th>#</th>
//               <th>Date</th>
//               <th>Total</th>
//               <th>Status</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {userOrder.map((order: any, index: number) => {
//               return (
//                 <tr>
//                   <td>{index + 1}</td>
//                   <td>{order.date}</td>
//                   <td>${handleSumOrder(order.orderId).toLocaleString()}</td>
//                   <td>
//                     <Badge bg={changeColor(order.status)}>{order.status}</Badge>
//                   </td>
//                   <td>
//                     <DetailOrderButton
//                       orderId={order.orderId}
//                       handleFunctionOk={handleUpdateStatus}
//                     ></DetailOrderButton>
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default ClientOrder;

import React, { useEffect } from "react";
import { useState } from "react";
import { Button, Modal, notification } from "antd";
// Import CSS
import styles from "../UserProfile.module.css";
import "../../../../../assets/bootstrap-5.3.0-dist/css/bootstrap.min.css";
import axios from "axios";
import { Account } from "../../../../../database";
import { Badge } from "react-bootstrap";
import DetailOrderButton from "./Button/DetailOrderButtonClient";
function ClientOrder() {
  const getData: any = localStorage.getItem("auth");
  const getLoginData = JSON.parse(getData) || "";
  const [searchText, setSearchText] = useState<string>("");
  const [user, setUser] = useState<any>([]);
  const [orderDatabase, setOrderDatabase] = useState<any>(null);
  const [userOrder, setUserOrder] = useState<any>([]);
  const [userOrderId, setUserOrderId] = useState<number>(0);
  const [listCard, setListCard] = useState<any>([]);

  const fetchUser = () => {
    axios
      .get(`http://localhost:7373/accounts/${getLoginData.loginId}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchOrders = () => {
    axios
      .get(`http://localhost:7373/orders/`)
      .then((response) => {
        setOrderDatabase(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchCard = () => {
    axios
      .get(`http://localhost:7373/banking/`)
      .then((response) => {
        setListCard(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchCard();
    fetchOrders();
    fetchUser();
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  let filterUserOrder = orderDatabase?.filter((order: any) => {
    return order.user_id === getLoginData.loginId;
  });

  console.log("USER", user);
  console.log("orderDatabase", orderDatabase);
  console.log("userOrder", userOrder);
  console.log("filterUserOrder", filterUserOrder);
  console.log("listCard", listCard);

  const hanldeSearchOrder = () => {
    console.log(searchText);
    if (searchText === "") {
      fetchOrders();
    } else {
      const filterOrder = filterUserOrder?.filter((item: any) => {
        if (
          item.date.toLowerCase().includes(searchText.trim().toLowerCase()) ||
          item.status.toLowerCase().includes(searchText.trim().toLowerCase())
        ) {
          return true;
        }
        return false;
      });
      setUserOrder(filterOrder);
    }
  };

  const handleSumOrder = (orderId: number) => {
    // Tìm đơn hàng dựa trên orderId
    let findOrder = filterUserOrder?.find((item: any) => {
      return item.id === orderId;
    });

    if (findOrder) {
      // Tính tổng giá trị của đơn hàng
      let sumOrder = findOrder.cart.reduce(
        (accumulator: number, currentValue: any) => {
          return (accumulator +=
            currentValue.productQuantity * currentValue.price);
        },
        0
      );

      return sumOrder;
    }

    return 0; // Trả về 0 nếu không tìm thấy đơn hàng
  };

  const changeColor = (status: string) => {
    switch (status) {
      case "Shipped":
        return "success";
      case "Shipping":
        return "primary";
      case "Processing":
        return "info";
      case "Pending":
        return "warning";
      case "Cancel":
        return "danger";
      default:
        return;
    }
  };

  const handleUpdateStatus = (updatedStatus: string, orderId: number) => {
    axios
      .patch(`http://localhost:7373/orders/${orderId}`, {
        status: "Cancel",
        cancel_reason: updatedStatus,
      })
      .then((response) => {
        fetchOrders();
        setUserOrder(response.data);
      });

    let findCard = listCard?.find((card: any) => {
      return card.cardNumber === userOrder.cardNumber;
    });

    if (findCard) {
      console.log("FINDCARDID", findCard?.id);
      console.log("findCard?.balance", findCard?.balance);
      console.log("userOrder.sumOrderNoDiscount", userOrder.sumOrderNoDiscount);
      let updatedBalance = {
        balance: findCard?.balance + userOrder.sumOrderNoDiscount,
      };

      axios
        .patch(`http://localhost:7373/orders/${findCard?.id}`, {
          updatedBalance,
        })
        .then((response) => {
          fetchCard();
        });
      notification.success({
        message: "Cancel Order Successfully",
      });
    }
  };

  return (
    <div>
      <div className={styles.breadcrumb}>
        <h2 className={styles["page-title"]}>My Order</h2>
        <p className={styles["page-description"]}>PetShop User Panel</p>
      </div>

      <div className={styles["user-board"]}>
        <div className="d-flex" role="search">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            id="search-bar"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button
            className="btn btn-outline-success"
            type="submit"
            id={styles["search-btn"]}
            onClick={hanldeSearchOrder}
          >
            Search
          </button>
        </div>
      </div>

      <div className={styles["main-content"]}>
        <h3 className={styles["main-title-content"]}>List Orders</h3>
        <table className="table table-striped" id="table-user">
          <thead>
            <tr>
              <th>#</th>
              <th>Date</th>
              <th>Total</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filterUserOrder &&
              filterUserOrder.map((order: any, index: number) => {
                return (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{order.date}</td>
                    <td>${handleSumOrder(order.id).toLocaleString()}</td>
                    <td>
                      <Badge bg={changeColor(order.status)}>
                        {order.status}
                      </Badge>
                    </td>
                    <td>
                      <DetailOrderButton
                        orderId={order.id}
                        handleFunctionOk={handleUpdateStatus}
                      ></DetailOrderButton>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ClientOrder;
