// import React, { useEffect, useState } from "react";
// import { Button, Modal, notification } from "antd";
// import styles from "../../UserProfile.module.css";
// import axios from "axios";

// interface DetailOrderProps {
//   orderId: number;
//   handleFunctionOk: any;
// }

// const DetailOrderButton: React.FC<DetailOrderProps> = ({
//   orderId,
//   handleFunctionOk,
// }) => {
//   const getData: any = localStorage.getItem("auth");
//   const getLoginData = JSON.parse(getData) || "";
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [cancelReason, setCancelReason] = useState("");
//   const [user, setUser] = useState<any>(null);
//   const [orderDatabase, setOrderDatabase] = useState<any>([]);
//   const [listOrders, setListOrders] = useState<any>([]);

//   const fetchUser = () => {
//     axios
//       .get(`http://localhost:7373/accounts/${getLoginData.loginId}`)
//       .then((response) => {
//         setUser(response.data);
//         setOrderDatabase(response.data.order_history);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   const fetchOrders = () => {
//     axios
//       .get(`http://localhost:7373/orders/`)
//       .then((response) => {
//         setListOrders(response.data);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   useEffect(() => {
//     fetchUser();
//     fetchOrders();
//   }, []);

//   const handleOk = () => {
//     if (cancelReason === "" || cancelReason === "No Cancel Order") {
//       setIsModalOpen(false);
//       return;
//     }

//     if (cancelReason !== "" || cancelReason || "No Cancel Order") {
//       let findOrder = orderDatabase.find((item: any) => {
//         return item.orderId === orderId;
//       });
//       let findOrderIndex = orderDatabase.findIndex((item: any) => {
//         return item.orderId === orderId;
//       });

//       findOrder.status = "Cancel";

//       orderDatabase.splice(findOrderIndex, 1, findOrder);

//       console.log("New Order Database", orderDatabase);

//       const updateOrderDatabase = {
//         order_history: orderDatabase,
//       };
//       console.log("updateOrderDatabase", updateOrderDatabase);

//       axios
//         .patch(
//           `http://localhost:7373/accounts/${getLoginData.loginId}`,
//           updateOrderDatabase
//         )
//         .then((response) => {
//           setOrderDatabase(response.data.order_history);
//           fetchUser();
//           setUser(response.data);
//         });

//       axios
//         .patch(`http://localhost:7373/orders/${orderId}`, {
//           status: "Cancel",
//           cancel_reason: cancelReason,
//         })
//         .then((response) => {
//           console.log("response.order Data", response.data);
//           fetchOrders();
//         });
//       notification.success({
//         message: "Cancel Order Successfully",
//       });
//       // Gọi hàm cập nhật trạng thái đơn hàng
//       handleFunctionOk("Cancel", orderId);
//       setIsModalOpen(false);
//     }
//   };

//   const showModal = () => {
//     setIsModalOpen(true);
//   };

//   const handleCancel = () => {
//     setIsModalOpen(false);
//   };

//   console.log("Order ID Clicked", orderId);
//   console.log("orderDatabase", orderDatabase);

//   let findOrder = orderDatabase.find((item: any) => {
//     return item.orderId === orderId;
//   });

//   console.log("Find Order", findOrder);

//   const handleSumOrder = () => {
//     if (findOrder) {
//       const totalOrder = findOrder.orderProduct.reduce(
//         (accumulator: number, currentItem: any) => {
//           return (accumulator +=
//             currentItem.productQuantity * currentItem.price);
//         },
//         0
//       );
//       return totalOrder;
//     }
//     return 0;
//   };

//   return (
//     <>
//       <Button type="primary" onClick={showModal}>
//         Detail
//       </Button>
//       <Modal
//         title="Order Detail"
//         open={isModalOpen}
//         onOk={handleOk}
//         onCancel={handleCancel}
//         width={1200}
//       >
//         <div className={styles["list-input-my-profile"]}>
//           <div className={styles["my-profile-input-item"]}>
//             <p>Order ID</p>
//             <input type="text" disabled value={findOrder?.orderId} />
//           </div>
//           <div className={styles["my-profile-input-item"]}>
//             <p>Name</p>
//             <input type="text" disabled value={findOrder?.name} />
//           </div>
//           <div className={styles["my-profile-input-item"]}>
//             <p>Phone</p>
//             <input type="text" disabled value={findOrder?.phone} />
//           </div>
//           <div className={styles["my-profile-input-item"]}>
//             <p>Address</p>
//             <input type="text" disabled value={findOrder?.address} />
//           </div>
//           <div className={styles["my-profile-input-item"]}>
//             <p>Status</p>
//             <input type="text" disabled value={findOrder?.status} />
//           </div>
//           {findOrder?.status === "Pending" && (
//             <div className={styles["my-profile-input-item"]}>
//               <p>Request Cancel</p>
//               <select
//                 name=""
//                 id=""
//                 value={cancelReason}
//                 onChange={(event) => setCancelReason(event?.target.value)}
//               >
//                 <option value="No Cancel Order" selected>
//                   -- Choose Reason --
//                 </option>
//                 <option value="Ordered the wrong product">
//                   1. Ordered the wrong product
//                 </option>
//                 <option value="Duplicate order">2. Duplicate order</option>
//                 <option value="I don't want to buy anymore">
//                   3. I don't want to buy anymore
//                 </option>
//                 <option value="Ordered the wrong product">
//                   4. Delivery time too long
//                 </option>
//                 <option value="Ordered the wrong product">
//                   5. Another reason...
//                 </option>
//               </select>
//             </div>
//           )}
//         </div>
//         <br />
//         <table className="table table-striped" id={styles["table-user"]}>
//           <thead>
//             <tr>
//               <th>#</th>
//               <th>Product Image</th>
//               <th>Product Name</th>
//               <th>Quantity</th>
//               <th>Price</th>
//               <th>Total</th>
//             </tr>
//           </thead>

//           <tbody>
//             {findOrder &&
//               findOrder.orderProduct.map((item: any) => {
//                 return (
//                   <tr>
//                     <td>{item.productId}</td>
//                     <td>
//                       <img src={item.productImage} alt="" />
//                     </td>
//                     <td>{item.productName}</td>
//                     <td>{item.productQuantity}</td>
//                     <td>{Number(item.price)}</td>
//                     <td>
//                       ${(item.productQuantity * item.price).toLocaleString()}
//                     </td>
//                   </tr>
//                 );
//               })}
//           </tbody>
//         </table>
//         <div className={styles["my-profile-my-order-card"]}>
//           <span className={styles["my-order-card-item"]}>
//             Item: {findOrder?.length}
//           </span>
//           <span className={styles["my-order-card-total-quantity"]}>
//             Total: ${handleSumOrder().toLocaleString()}
//           </span>
//         </div>
//       </Modal>
//     </>
//   );
// };

// export default DetailOrderButton;

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
        <div className={styles["my-profile-my-order-card"]}>
          <span className={styles["my-order-card-item"]}>
            Item: {listOrders?.cart.length}
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
