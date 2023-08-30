import React, { useEffect, useState } from "react";
import { Button, Modal } from "antd";
import styles from "../../UserProfile.module.css";
import axios from "axios";

interface DetailOrderProps {
  orderId: number;
}

const DetailOrderButton: React.FC<DetailOrderProps> = ({ orderId }) => {
  const getData: any = localStorage.getItem("auth");
  const getLoginData = JSON.parse(getData) || "";
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

  const [user, setUser] = useState<any>(null);
  const [orderDatabase, setOrderDatabase] = useState<any>([]);
  const fetchUser = () => {
    axios
      .get(`http://localhost:7373/accounts/${getLoginData.loginId}`)
      .then((response) => {
        setUser(response.data);
        setOrderDatabase(response.data.order_history);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchUser();
  }, []);

  console.log("Order ID Clicked", orderId);
  console.log("orderDatabase", orderDatabase);

  let findOrder = orderDatabase.find((item: any) => {
    return item.orderId === orderId;
  });

  console.log("Find Order", findOrder);

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Detail
      </Button>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1200}
      >
        <div className={styles["list-input-my-profile"]}>
          <div className={styles["my-profile-input-item"]}>
            <p>Phone</p>
            <input type="text" disabled value={findOrder?.phone} />
          </div>
          <div className={styles["my-profile-input-item"]}>
            <p>Address</p>
            <input type="text" disabled value={findOrder?.address} />
          </div>
          <div className={styles["my-profile-input-item"]}>
            <p>Status</p>
            <input type="text" disabled value={findOrder?.status} />
          </div>
          <div className={styles["my-profile-input-item"]}>
            <p>Request Cancel</p>
            <select name="" id="">
              <option value="No Cancel Order" selected>
                --Choose Reason--
              </option>
              <option value="Ordered the wrong product">
                1. Ordered the wrong product
              </option>
              <option value="Duplicate order">2. Duplicate order</option>
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
            {findOrder &&
              findOrder.orderProduct.map((item: any) => {
                return (
                  <tr>
                    <td>{item.productId}</td>
                    <td>
                      <img src={item.productImage} alt="" />
                    </td>
                    <td>{item.productName}</td>
                    <td>{item.productQuantity}</td>
                    <td>{Number(item.price)}</td>
                    <td>
                      ${(item.productQuantity * item.price).toLocaleString()}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <div className={styles["my-profile-my-order-card"]}>
          <span className={styles["my-order-card-item"]}>
            Item: {findOrder?.length}
          </span>
          <span className={styles["my-order-card-total-quantity"]}>
            Total: $270
          </span>
        </div>
      </Modal>
    </>
  );
};

export default DetailOrderButton;
