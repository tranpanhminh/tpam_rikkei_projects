// --------------------------------------------------------- //
import React, { useEffect, useState } from "react";
import { Button, Modal, notification } from "antd";
import styles from "../../UserProfile.module.css";
import axios from "axios";
import Decimal from "decimal.js";

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
  const [listOrders, setListOrders] = useState<any>(null);
  const [listCard, setListCard] = useState<any>([]);
  const [userOrder, setUserOrder] = useState<any>([]);

  const fetchOrders = () => {
    axios
      .get(`http://localhost:7373/orders/${orderId}`)
      .then((response) => {
        setListOrders(response.data);
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
    fetchOrders();
    fetchCard();
  }, []);

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
    if (cancelReason === "" || cancelReason === "No Cancel Order") {
      setIsModalOpen(false);
      return;
    }

    axios
      .patch(`http://localhost:7373/orders/${orderId}`, {
        status: "Cancel",
        cancel_reason: cancelReason,
      })
      .then((response) => {
        // Order status updated successfully
        fetchOrders();
        setUserOrder(response.data);

        // Find the associated card for the order
        let findCard = listCard.find((card: any) => {
          return Number(card.cardNumber) === Number(listOrders.cardNumber);
        });

        if (findCard) {
          // Update the banking data using Decimal
          const newBalance = new Decimal(findCard.balance)
            .plus(new Decimal(listOrders.sumOrderWithDiscount))
            .toNumber(); // Convert back to number

          axios
            .patch(`http://localhost:7373/banking/${findCard.id}`, {
              balance: newBalance,
            })
            .then(() => {
              fetchCard();
              notification.success({
                message: "Cancel Order Successfully",
              });
            })
            .catch((error) => {
              console.log(error);
            });
        }

        // Gọi hàm cập nhật trạng thái đơn hàng
        handleFunctionOk(cancelReason, orderId);
        setIsModalOpen(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  console.log("LIST ORDER", listOrders);

  const handleSumOrder = () => {
    if (listOrders) {
      const totalOrder = listOrders.cart.reduce(
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
            <input type="text" disabled value={listOrders?.id} />
          </div>
          <div className={styles["my-profile-input-item"]}>
            <p>Name</p>
            <input type="text" disabled value={listOrders?.name} />
          </div>
          <div className={styles["my-profile-input-item"]}>
            <p>Phone</p>
            <input type="text" disabled value={listOrders?.phone} />
          </div>
          <div className={styles["my-profile-input-item"]}>
            <p>Address</p>
            <input type="text" disabled value={listOrders?.address} />
          </div>
          <div className={styles["my-profile-input-item"]}>
            <p>Status</p>
            <input type="text" disabled value={listOrders?.status} />
          </div>
          {listOrders?.status === "Pending" && (
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
          )}
          {listOrders?.status === "Cancel" && (
            <div className={styles["my-profile-input-item"]}>
              <p>Cancel Reason</p>
              <input type="text" disabled value={listOrders?.cancel_reason} />
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
              {listOrders &&
                listOrders.cart.map((item: any, index: number) => {
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
                        ${(item.productQuantity * item.price).toLocaleString()}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
        <div className={styles["my-profile-my-order-card"]}>
          <span className={styles["my-order-card-item"]}>
            Item: {listOrders?.cart.length}
          </span>
          <span className={styles["my-order-card-total-quantity"]}>
            Shipping Fee: $5
          </span>
          <span className={styles["my-order-card-total-quantity"]}>
            Discount: {listOrders?.discount}%
          </span>
          <span className={styles["my-order-card-total-quantity"]}>
            Total: ${listOrders?.sumOrderWithDiscount}
          </span>{" "}
        </div>
      </Modal>
    </>
  );
};

export default DetailOrderButton;
