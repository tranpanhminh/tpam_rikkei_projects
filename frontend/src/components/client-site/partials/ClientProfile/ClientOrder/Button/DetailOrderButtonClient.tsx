// --------------------------------------------------------- //
import React, { useEffect, useState } from "react";
import { Button, Modal, notification } from "antd";
import styles from "../../UserProfile.module.css";
import axios from "axios";
import Decimal from "decimal.js";
import BaseAxios from "../../../../../../api/apiAxiosClient";

// Import API

const usersAPI = process.env.REACT_APP_API_USERS;
const ordersAPI = process.env.REACT_APP_API_ORDERS;

// -----------------------------------------------------

interface DetailOrderProps {
  orderId: number;
  handleFunctionOk: any;
}

const DetailOrderButton: React.FC<DetailOrderProps> = ({
  orderId,
  handleFunctionOk,
}) => {
  const getData: any = localStorage.getItem("auth");
  const getLoginData = JSON.parse(getData) || "";
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cancelReason, setCancelReason] = useState("");

  const [userOrder, setUserOrder] = useState<any>([]);
  const [orderItem, setOrderItem] = useState<any>([]);

  // Fetch API
  const fetchUserOrder = () => {
    BaseAxios.get(`${ordersAPI}/${orderId}`)
      .then((response) => {
        setUserOrder(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  console.log(userOrder, "USER ORDER");

  const fetchOrderItems = () => {
    BaseAxios.get(`${ordersAPI}/detail/${orderId}`)
      .then((response) => {
        setOrderItem(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // ----------------------------------------

  useEffect(() => {
    fetchUserOrder();
    fetchOrderItems();
  }, []);

  console.log(userOrder, "AAAA");

  // const handleOk = () => {
  //   if (cancelReason === "" || cancelReason === "No Cancel Order") {
  //     setIsModalOpen(false);
  //     return;
  //   }
  //   axios
  //     .patch(`http://localhost:7373/orders/${orderId}`, {
  //       status: "Cancel",
  //       cancel_reason: cancelReason,
  //     })
  //     .then((response) => {
  //       fetchOrders();
  //       setUserOrder(response.data);
  //     });

  //   handleFunctionOk(cancelReason, orderId);

  //   setIsModalOpen(false);
  // };

  const handleOk = () => {
    // if (cancelReason === "" || cancelReason === "No Cancel Order") {
    //   setIsModalOpen(false);
    //   return;
    // }
    // axios
    //   .patch(`http://localhost:7373/orders/${orderId}`, {
    //     status: "Cancel",
    //     cancel_reason: cancelReason,
    //   })
    //   .then((response) => {
    //     // Order status updated successfully
    //     fetchOrders();
    //     setUserOrder(response.data);
    //     // Find the associated card for the order
    //     let findCard = listCard.find((card: any) => {
    //       return Number(card.cardNumber) === Number(listOrders.cardNumber);
    //     });
    //     if (findCard) {
    //       // Update the banking data using Decimal
    //       const newBalance = new Decimal(findCard.balance)
    //         .plus(new Decimal(listOrders.sumOrderWithDiscount))
    //         .toNumber(); // Convert back to number
    //       axios
    //         .patch(`http://localhost:7373/banking/${findCard.id}`, {
    //           balance: newBalance,
    //         })
    //         .then(() => {
    //           fetchCard();
    //           notification.success({
    //             message: "Cancel Order Successfully",
    //           });
    //         })
    //         .catch((error) => {
    //           console.log(error);
    //         });
    //     }
    //     // Gọi hàm cập nhật trạng thái đơn hàng
    //     handleFunctionOk(cancelReason, orderId);
    //     setIsModalOpen(false);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSumOrder = () => {};

  function maskCardNumber(cardNumber: string) {
    if (cardNumber && cardNumber.length === 16) {
      // Lấy 4 số đầu và 4 số cuối
      const firstFour = cardNumber.slice(0, 4);
      const lastFour = cardNumber.slice(-4);

      // Tạo một chuỗi sao mặt định là '*' với độ dài 8 ký tự (số ẩn ở giữa)
      const middle = "********";

      // Kết hợp chuỗi số đầu, chuỗi số ẩn và chuỗi số cuối
      return `${firstFour} ${middle} ${lastFour}`;
    } else {
      // Nếu số thẻ không hợp lệ, hiển thị giá trị ban đầu
      return cardNumber;
    }
  }

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Detail
      </Button>
      <Modal
        title="Order Detail"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1200}
      >
        <div className={styles["list-input-my-profile"]}>
          <div className={styles["my-profile-input-item"]}>
            <p>Order ID</p>
            <input type="text" disabled value={userOrder?.id} />
          </div>
          <div className={styles["my-profile-input-item"]}>
            <p>Name</p>
            <input type="text" disabled value={userOrder?.customer_name} />
          </div>
          <div className={styles["my-profile-input-item"]}>
            <p>Phone</p>
            <input type="text" disabled value={userOrder?.phone} />
          </div>
          <div className={styles["my-profile-input-item"]}>
            <p>Address</p>
            <input type="text" disabled value={userOrder?.address} />
          </div>
          <div className={styles["my-profile-input-item"]}>
            <p>Status</p>
            <input type="text" disabled value={userOrder?.order_status.name} />
          </div>
          <div className={styles["my-profile-input-item"]}>
            <p>Card Number</p>
            <input
              type="text"
              disabled
              value={maskCardNumber((userOrder?.card_number).toString())}
            />
          </div>
          {userOrder?.status === "Pending" && (
            <div className={styles["my-profile-input-item"]}>
              <p>Request Cancel</p>
              <select
                name=""
                id=""
                value={cancelReason}
                onChange={(event) => setCancelReason(event?.target.value)}
              >
                <option value="No Cancel Order" selected>
                  -- Choose Reason --
                </option>
                <option value="Ordered the wrong product">
                  1. Ordered the wrong product
                </option>
                <option value="Duplicate order">2. Duplicated order</option>
                <option value="I don't want to buy anymore">
                  3. I don't want to buy anymore
                </option>
                <option value="Ordered the wrong product">
                  4. Delivery time too long
                </option>
                <option value="Ordered the wrong product">
                  5. Another reason...
                </option>
              </select>
            </div>
          )}
          {userOrder?.status === "Cancel" && (
            <div className={styles["my-profile-input-item"]}>
              <p>Cancel Reason</p>
              <input type="text" disabled value={userOrder?.cancel_reason} />
            </div>
          )}
        </div>
        <br />
        <div className={styles["order-detail-table"]}>
          <table className="table table-striped" id={styles["table-user"]}>
            <thead>
              <tr>
                <th>#</th>
                <th>Product Image</th>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>

            <tbody>
              {orderItem &&
                orderItem.map((item: any, index: number) => {
                  return (
                    <tr>
                      <td>{index + 1}</td>
                      <td>
                        <img src={item.product_thumbnail} alt="" />
                      </td>
                      <td>{item.product_name}</td>
                      <td>{item.quantity}</td>
                      <td>${Number(item.price)}</td>
                      <td>${(item.quantity * item.price).toLocaleString()}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
        <div className={styles["my-profile-my-order-card"]}>
          <span className={styles["my-order-card-item"]}>
            Item: {orderItem.length}
          </span>
          <span className={styles["my-order-card-total-quantity"]}>
            Shipping Fee: $5
          </span>
          <span className={styles["my-order-card-total-quantity"]}>
            {/* Discount: {userOrder?.discount}% */}
          </span>
          <span className={styles["my-order-card-total-quantity"]}>
            {/* Total: ${userOrder?.sumOrderWithDiscount} */}
          </span>
        </div>
      </Modal>
    </>
  );
};

export default DetailOrderButton;
