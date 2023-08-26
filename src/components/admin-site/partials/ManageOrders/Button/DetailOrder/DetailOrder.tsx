import React, { useEffect, useState } from "react";
import { Button, Modal } from "antd";
import axios from "axios";
import { Order } from "../../../../../../database";
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

  const [orders, setOrders] = useState<any>(null);
  const [orderCart, setOrderCart] = useState<any>(null);

  useEffect(() => {
    const fetchOrders = () => {
      axios
        .get(`http://localhost:7373/orders/${getOrderId}`)
        .then((response) => {
          setOrders(response.data);
          setOrderCart(response.data.cart);
        })
        .catch((error) => {
          console.log(error.message);
        });
    };

    fetchOrders();
  }, [getOrderId]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    console.log("handleSubmit is called");

    if (handleFunctionOk) {
      handleFunctionOk();
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSumOrder = () => {
    if (orderCart) {
      const totalOrder = orderCart.reduce(
        (accumulator: number, currentItem: any) => {
          return (
            accumulator = currentItem.productQuantity * currentItem.productPrice
          );
        },
        0
      );
      return totalOrder;
    }
    return 0;
  };

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
        width={800}
      >
        <div className={styles["list-input-admin-order"]}>
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
            <select name="" id="">
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
            {orderCart?.map((item: any) => {
              return (
                <tr>
                  <td>{item.productId}</td>
                  <td>
                    <img src={item.productImage} alt="" />
                  </td>
                  <td>{item.productName}</td>
                  <td>{item.productQuantity}</td>
                  <td>${item.productPrice.toLocaleString()}</td>
                  <td>
                    $
                    {(
                      item.productPrice * item.productQuantity
                    ).toLocaleString()}
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
            Total: ${handleSumOrder().toLocaleString()}
          </span>
        </div>
      </Modal>
    </>
  );
};

export default DetailOrders;
