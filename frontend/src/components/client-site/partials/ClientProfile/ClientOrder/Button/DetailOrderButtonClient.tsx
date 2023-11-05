import React, { useEffect, useState } from "react";
import { Button, Modal, notification, message } from "antd";
import styles from "../../UserProfile.module.css";
import axios from "axios";
import Decimal from "decimal.js";
import BaseAxios from "../../../../../../api/apiAxiosClient";
import { useNavigate } from "react-router-dom";

// Import API

const usersAPI = process.env.REACT_APP_API_USERS;
const ordersAPI = process.env.REACT_APP_API_ORDERS;
const cancelReasonsAPI = process.env.REACT_APP_API_CANCEL_REASONS;

// -----------------------------------------------------

interface DetailOrderProps {
  orderId: number;
  handleFunctionOk: any;
}

const DetailOrderButton: React.FC<DetailOrderProps> = ({
  orderId,
  handleFunctionOk,
}) => {
  const navigate = useNavigate();
  const getData: any = localStorage.getItem("auth");
  const getLoginData = JSON.parse(getData) || "";
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reason, setReason] = useState("");
  const [cancelReasons, setCancelReasons] = useState([]);
  const [userOrder, setUserOrder] = useState<any>([]);
  const [orderItem, setOrderItem] = useState<any>([]);
  const [orderStatus, setOrderStatus] = useState("");
  const [messageApi, contextHolder] = message.useMessage();

  // Fetch API
  const fetchUserOrder = async () => {
    await BaseAxios.get(`${ordersAPI}/detail/${orderId}`)
      .then((response) => {
        setUserOrder(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchOrderItems = async () => {
    await BaseAxios.get(`${ordersAPI}/${orderId}/detail`)
      .then((response) => {
        setOrderItem(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchCancelReasons = async () => {
    await BaseAxios.get(`${cancelReasonsAPI}`)
      .then((response) => {
        setCancelReasons(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // ----------------------------------------

  useEffect(() => {
    fetchUserOrder();
    fetchOrderItems();
    fetchCancelReasons();
  }, []);

  const handleOk = () => {
    if (!reason) {
      return setIsModalOpen(false);
    }

    const orderInfo = {
      cancel_reason_id: Number(reason),
    };
    messageApi.open({
      type: "loading",
      content: "Loading...",
      duration: 0,
    });
    BaseAxios.patch(`${ordersAPI}/cancel-order/${orderId}`, orderInfo)
      .then((response) => {
        messageApi.destroy();
        handleFunctionOk();
        fetchUserOrder();
        fetchOrderItems();
        navigate(`/user/my-orders/`);
        setIsModalOpen(false);
        notification.success({
          message: `${response.data.message}`,
        });
      })
      .catch((error) => {
        notification.error({
          message: `${error.response.data.message}`,
        });
      });
  };

  const showModal = () => {
    navigate(`/user/my-orders/?detail-oder=${orderId}`);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    navigate(`/user/my-orders/`);
    setReason("");
    setIsModalOpen(false);
  };

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
      {contextHolder}
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
            <input
              type="text"
              disabled
              value={userOrder?.order_statuses?.name}
            />
          </div>
          <div className={styles["my-profile-input-item"]}>
            <p>Email Paypal</p>
            <input type="text" disabled value={userOrder?.email_paypal} />
          </div>
          {userOrder?.status_id === 1 && (
            <div className={styles["my-profile-input-item"]}>
              <p>Request Cancel</p>
              <select
                name=""
                id=""
                value={reason}
                onChange={(event) => setReason(event?.target.value)}
              >
                <option value="" selected>
                  -- Choose Reason --
                </option>
                {cancelReasons?.map((item: any) => {
                  return <option value={item.id}>{item.name}</option>;
                })}
              </select>
            </div>
          )}
          {userOrder?.order_status?.name === "Cancel" && (
            <div className={styles["my-profile-input-item"]}>
              <p>Cancel Reason</p>
              <input
                type="text"
                disabled
                value={userOrder?.cancellation_reason}
              />
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
          {/* <span className={styles["my-order-card-total-quantity"]}>
            SubTotal: ${userOrder?.bill}
          </span> */}
          <span className={styles["my-order-card-total-quantity"]}>
            Discount: ${userOrder?.discounted}
          </span>
          <span className={styles["my-order-card-total-quantity"]}>
            Total: ${userOrder?.total_bill}
          </span>
        </div>
      </Modal>
    </>
  );
};

export default DetailOrderButton;
