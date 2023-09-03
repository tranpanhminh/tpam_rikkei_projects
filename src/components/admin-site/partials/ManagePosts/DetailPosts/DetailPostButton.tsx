import React, { useEffect, useState } from "react";
import { Button, Modal, notification } from "antd";
import axios from "axios";
import styles from "../../../AdminPage.module.css";

interface DetailModalProps {
  className?: string; // Thêm khai báo cho thuộc tính className
  value?: string; // Thêm khai báo cho thuộc tính className
  title?: string;
  // handleFunctionOk?: any;
  handleFunctionBtn?: any;
  // getOrderId: number;
}
const DetailPostButton: React.FC<DetailModalProps> = ({
  className,
  value,
  title,
  // handleFunctionOk,
  handleFunctionBtn,
  // getOrderId,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [shippingStatus, setShippingStatus] = useState("");
  const [orders, setOrders] = useState<any>(null);
  const [orderCart, setOrderCart] = useState<any>(null);
  const [userId, setUserId] = useState<any>();
  const [user, setUser] = useState<any>();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    // notification.success({
    //   message: "Shipping Status Updated Successfully",
    // });
    // setShippingStatus("");
    // setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
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
        title="Detail Post"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1200}
      >
        <div className={styles["list-input-admin-order"]}>
          <div className={styles["admin-order-input-item"]}>
            <p>Post ID</p>
            <input type="text" disabled value={orders?.id} />
          </div>
          <div className={styles["admin-order-input-item"]}>
            <p>Post Title</p>
            <input type="text" disabled value={orders?.name} />
          </div>
          <div className={styles["admin-order-input-item"]}>
            <p>Published Date</p>
            <input type="text" disabled value={orders?.phone} />
          </div>
          <div className={styles["admin-order-input-item"]}>
            <p>Author</p>
            <input type="text" disabled value={orders?.address} />
          </div>
          <div className={styles["admin-order-input-item"]}>
            <p>Status</p>
            <select
              name=""
              id=""
              onChange={(event) => setShippingStatus(event.target.value)}
            >
              <option
                value="Published"
                selected={orders?.status === "Published" ? true : false}
              >
                Shipped
              </option>
              <option
                value="Draft"
                selected={orders?.status === "Draft" ? true : false}
              >
                Shipping
              </option>
            </select>
          </div>
        </div>
        <br />
      </Modal>
    </>
  );
};

export default DetailPostButton;
