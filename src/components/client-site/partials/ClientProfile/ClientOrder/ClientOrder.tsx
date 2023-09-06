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
        // let filterUserOrder = orderDatabase?.filter((order: any) => {
        //   return order.user_id === getLoginData.loginId;
        // });
        // setUserOrder(filterUserOrder);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  console.log("Order Database", orderDatabase);

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

  // const hanldeSearchOrder = () => {
  // console.log(searchText);
  // if (searchText === "") {
  //   fetchOrders();
  // } else {
  //   const filterOrder = filterUserOrder?.filter((item: any) => {
  //     if (
  //       item.date.toLowerCase().includes(searchText.trim().toLowerCase()) ||
  //       item.status.toLowerCase().includes(searchText.trim().toLowerCase())
  //     ) {
  //       return true;
  //     }
  //     return false;
  //   });
  //   setUserOrder(filterOrder);
  // }
  // };

  const handleSearchOrder = () => {
    if (!searchText) {
      fetchOrders();
      return;
    }
    // Sao chép danh sách đơn hàng nguyên bản
    let filteredOrders = [...orderDatabase];

    // Kiểm tra nếu searchText không trống
    if (searchText.trim() !== "") {
      // Chuyển đổi searchText thành chữ thường để so sánh không phân biệt hoa thường
      const searchTextLower = searchText.trim().toLowerCase();

      // Lọc danh sách đơn hàng theo tên date hoặc status
      filteredOrders = filteredOrders.filter((order) => {
        return (
          order.date.toLowerCase().includes(searchTextLower) ||
          order.status.toLowerCase().includes(searchTextLower)
        );
      });
    }

    // Cập nhật danh sách đơn hàng sau khi tìm kiếm
    setOrderDatabase(filteredOrders);
  };

  // const handleSumOrder = (orderId: number) => {
  //   // Tìm đơn hàng dựa trên orderId
  //   let findOrder = filterUserOrder?.find((item: any) => {
  //     return item.id === orderId;
  //   });

  //   if (findOrder) {
  //     // Tính tổng giá trị của đơn hàng
  //     let sumOrder = findOrder.cart.reduce(
  //       (accumulator: number, currentValue: any) => {
  //         return (accumulator +=
  //           currentValue.productQuantity * currentValue.price);
  //       },
  //       0
  //     );

  //     return sumOrder;
  //   }

  //   return 0; // Trả về 0 nếu không tìm thấy đơn hàng
  // };

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

    // let findCard = listCard?.find((card: any) => {
    //   return Number(card.cardNumber) === Number(userOrder.cardNumber);
    // });

    // if (findCard) {
    //   axios
    //     .patch(`http://localhost:7373/banking/${findCard.id}`, {
    //       balance: findCard.balance + userOrder.sumOrderNoDiscount,
    //     })
    //     .then((response) => {
    //       fetchCard();
    //       notification.success({
    //         message: "Cancel Order Successfully",
    //       });
    //     });
    // }
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
            onClick={handleSearchOrder}
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
            {orderDatabase &&
              orderDatabase.map((order: any, index: number) => {
                return (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{order.date}</td>
                    <td>${order.sumOrderWithDiscount}</td>
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
