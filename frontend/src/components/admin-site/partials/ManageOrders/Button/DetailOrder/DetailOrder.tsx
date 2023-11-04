import React, { useEffect, useState } from "react";
import { Button, Modal, notification } from "antd";
import axios from "axios";
import styles from "../../../../AdminPage.module.css";
import { useNavigate } from "react-router-dom";

// Import API
// 1. Users API
const ordersAPI = process.env.REACT_APP_API_ORDERS;
const orderStatusAPI = process.env.REACT_APP_API_ORDER_STATUS;
const paymentsAPI = process.env.REACT_APP_API_PAYMENTS;

// ------------------------------------------------

interface DetailModalProps {
  className?: string; // Thêm khai báo cho thuộc tính className
  value?: string; // Thêm khai báo cho thuộc tính className
  title?: string;
  handleFunctionOk?: any;
  handleFunctionBtn?: any;
  getOrderId: number;
}
const DetailOrders: React.FC<DetailModalProps> = ({
  className,
  value,
  title,
  handleFunctionOk,
  handleFunctionBtn,
  getOrderId,
}) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [shippingStatus, setShippingStatus] = useState<any>("");
  const [orders, setOrders] = useState<any>(null);
  const [orderById, setOrderById] = useState<any>(null);

  // Fetch All Orders
  // 1. Get Order By ID
  const fetchOrderById = () => {
    axios
      .get(`${ordersAPI}/detail/${getOrderId}`)
      .then((response) => {
        setOrderById(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchOrderById();
  }, []);

  useEffect(() => {
    const fetchOrders = () => {
      axios
        .get(`${ordersAPI}/${getOrderId}/detail`)
        .then((response) => {
          setOrders(response.data);
        })
        .catch((error) => {
          console.log(error.message);
        });
    };

    fetchOrders();
  }, [getOrderId]);

  // ------------------------------------------------

  const showModal = () => {
    navigate(`/admin/manage-orders/?orderID=${getOrderId}`);
    setShippingStatus(orderById?.status_id);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    navigate(`/admin/manage-orders/`);
    setShippingStatus(orderById?.status_id);
    setIsModalOpen(false);
  };

  const handleOk = () => {
    const orderInfo = {
      status_id: shippingStatus,
      // updated_at: Date.now(),
    };
    axios
      .patch(`${ordersAPI}/update/${getOrderId}`, orderInfo)
      .then((response) => {
        notification.success({
          message: `${response.data.message}`,
        });
        handleFunctionOk();
        fetchOrderById();
        setShippingStatus("");
        setIsModalOpen(false);
      })
      .catch((error) => {
        console.log(error);
        notification.warning({
          message: `${error.response.data.message}`,
        });
      });
    // Cập nhật trạng thái đơn hàng trong cơ sở dữ liệu của người dùng
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
      <Button
        type="primary"
        onClick={handleFunctionBtn || showModal}
        className={className}
      >
        {value}
      </Button>
      <Modal
        title="Detail Order"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1200}
      >
        <div className={styles["list-input-admin-order"]}>
          <div className={styles["admin-order-input-item"]}>
            <p>Order ID</p>
            <input type="text" disabled value={getOrderId} />
          </div>
          <div className={styles["admin-order-input-item"]}>
            <p>Name</p>
            <input type="text" disabled value={orderById?.customer_name} />
          </div>
          <div className={styles["admin-order-input-item"]}>
            <p>Phone</p>
            <input type="text" disabled value={orderById?.phone} />
          </div>
          <div className={styles["admin-order-input-item"]}>
            <p>Address</p>
            <input type="text" disabled value={orderById?.address} />
          </div>
          <div className={styles["admin-order-input-item"]}>
            <p>Email Paypal</p>
            <input type="text" disabled value={orderById?.email_paypal} />
          </div>
          <div className={styles["admin-order-input-item"]}>
            <p>Status</p>
            <select
              name=""
              id=""
              disabled={
                orderById?.order_statuses.name === "Cancel" ||
                orderById?.order_statuses.name === "Shipped"
                  ? true
                  : false
              }
              value={shippingStatus}
              onChange={(event) =>
                setShippingStatus(Number(event.target.value))
              }
            >
              <option
                value={4}
                selected={orderById?.status_id === 4 ? true : false}
              >
                Shipped
              </option>
              <option
                value={3}
                selected={orderById?.status_id === 3 ? true : false}
              >
                Shipping
              </option>
              <option
                value={2}
                selected={orderById?.status_id === 2 ? true : false}
              >
                Processing
              </option>
              <option
                value={1}
                selected={orderById?.status_id === 1 ? true : false}
              >
                Pending
              </option>
              <option
                value={5}
                selected={orderById?.status_id === 5 ? true : false}
                disabled
              >
                Cancel
              </option>
            </select>
          </div>
          {orderById?.order_status?.name === "Cancel" && (
            <div className={styles["admin-order-input-item"]}>
              <p>Cancel Reason</p>
              <input
                type="text"
                disabled
                value={orderById?.cancellation_reason}
              />
            </div>
          )}
        </div>
        <br />
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
            {orders &&
              orders?.map((item: any, index: number) => {
                return (
                  <tr>
                    <td>{index + 1}</td>
                    <td>
                      <img src={item?.product_thumbnail} alt="" />
                    </td>
                    <td>{item?.product_name}</td>
                    <td>{item?.quantity}</td>
                    <td>${Number(item?.price)}</td>
                    <td>${(item?.price * item?.quantity).toLocaleString()}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <div className={styles["admin-order-my-order-card"]}>
          <span className={styles["my-order-card-item"]}>
            Item: {orders?.length}
          </span>
          {/* <span className={styles["my-order-card-total-quantity"]}>
            Shipping Fee: $5
          </span> */}
          <span className={styles["my-order-card-total-quantity"]}>
            Discount: ${orderById?.discounted}
          </span>
          <span className={styles["my-order-card-total-quantity"]}>
            Total: ${orderById?.total_bill}
          </span>
        </div>
      </Modal>
    </>
  );
};

export default DetailOrders;
