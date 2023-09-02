import React, { useEffect, useState } from "react";
import { Button, Modal, notification } from "antd";
import axios from "axios";
import styles from "../../../../AdminPage.module.css";

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [shippingStatus, setShippingStatus] = useState("");
  const [orders, setOrders] = useState<any>(null);
  const [orderCart, setOrderCart] = useState<any>(null);
  const [userId, setUserId] = useState<any>();
  const [user, setUser] = useState<any>();

  useEffect(() => {
    const fetchOrders = () => {
      axios
        .get(`http://localhost:7373/orders/${getOrderId}`)
        .then((response) => {
          setOrders(response.data);
          setOrderCart(response.data.cart);
          setUserId(response.data.user_id);

          fetchUser();
        })
        .catch((error) => {
          console.log(error.message);
        });
    };

    fetchOrders();
  }, [getOrderId]);

  const fetchUser = () => {
    axios
      .get(`http://localhost:7373/accounts/${userId}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  useEffect(() => {
    if (userId) {
      fetchUser();
    }
  }, [userId]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  console.log("orders", orders);
  console.log("userId", userId);
  console.log("user", user);
  const handleOk = () => {
    if (shippingStatus === "") {
      setIsModalOpen(false);
      return;
    }
    handleFunctionOk(shippingStatus, getOrderId);

    // Cập nhật trạng thái đơn hàng trong cơ sở dữ liệu của người dùng

    notification.success({
      message: "Shipping Status Updated Successfully",
    });
    setShippingStatus("");
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSumOrder = () => {
    if (orderCart) {
      const totalOrder = orderCart.reduce(
        (accumulator: number, currentItem: any) => {
          return (accumulator +=
            currentItem.productQuantity * currentItem.price);
        },
        0
      );
      return totalOrder;
    }
    return 0;
  };

  console.log("shippingStatus", shippingStatus);

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
            <input type="text" disabled value={orders?.id} />
          </div>
          <div className={styles["admin-order-input-item"]}>
            <p>Name</p>
            <input type="text" disabled value={orders?.name} />
          </div>
          <div className={styles["admin-order-input-item"]}>
            <p>Phone</p>
            <input type="text" disabled value={orders?.phone} />
          </div>
          <div className={styles["admin-order-input-item"]}>
            <p>Address</p>
            <input type="text" disabled value={orders?.address} />
          </div>
          <div className={styles["admin-order-input-item"]}>
            <p>Status</p>
            <select
              name=""
              id=""
              disabled={
                orders?.status === "Cancel" || orders?.status === "Shipped"
                  ? true
                  : false
              }
              // value={shippingStatus}
              onChange={(event) => setShippingStatus(event.target.value)}
            >
              <option
                value="Shipped"
                selected={orders?.status === "Shipped" ? true : false}
              >
                Shipped
              </option>
              <option
                value="Shipping"
                selected={orders?.status === "Shipping" ? true : false}
              >
                Shipping
              </option>
              <option
                value="Processing"
                selected={orders?.status === "Processing" ? true : false}
              >
                Processing
              </option>
              <option
                value="Pending"
                selected={orders?.status === "Pending" ? true : false}
              >
                Pending
              </option>
              <option
                value="Cancel"
                selected={orders?.status === "Cancel" ? true : false}
              >
                Cancel
              </option>
            </select>
          </div>
          {orders?.status === "Cancel" && (
            <div className={styles["admin-order-input-item"]}>
              <p>Cancel Reason</p>
              <input type="text" disabled value={orders?.cancel_reason} />
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
            {orderCart?.map((item: any, index: number) => {
              return (
                <tr>
                  <td>{index + 1}</td>
                  <td>
                    <img src={item.productImage} alt="" />
                  </td>
                  <td>{item.productName}</td>
                  <td>{item.productQuantity}</td>
                  <td>${Number(item.price)}</td>
                  <td>
                    ${(item.price * item.productQuantity).toLocaleString()}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className={styles["admin-order-my-order-card"]}>
          <span className={styles["my-order-card-item"]}>
            Item: {orderCart?.length}
          </span>
          <span className={styles["my-order-card-total-quantity"]}>
            Discount: {orders?.discount}%
          </span>
          <span className={styles["my-order-card-total-quantity"]}>
            Total: ${orders?.sumOrderWithDiscount}
          </span>
        </div>
      </Modal>
    </>
  );
};

export default DetailOrders;
