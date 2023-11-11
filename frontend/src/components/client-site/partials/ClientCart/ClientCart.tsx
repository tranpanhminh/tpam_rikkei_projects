import React, { useEffect, useState } from "react";
import styles from "./ClientCart.module.css";
import logo from "../../../../assets/images/pet-shop.png";
import axios from "axios";
import { notification, Button, Modal, message } from "antd";
import BaseAxios from "./../../../../api/apiAxiosClient";
import { getAllCoupons } from "../../../../api/coupons.api";
import { getDataLogin } from "../../../../api/users.api";
import {
  deleteProductFromCart,
  getDetailUserCart,
  updateProductQuantityInCart,
} from "../../../../api/carts.api";

// Import API

// 2. Orders API
const ordersAPI = process.env.REACT_APP_API_ORDERS;

// -----------------------------------------------------
function ClientCart() {
  // List State
  const [user, setUser] = useState<any>(null);
  const [messageApi, contextHolder] = message.useMessage();
  const [userCart, setUserCart] = useState<any>([]);
  const [coupons, setCoupons] = useState<any>([]);
  const [quantity, setQuantity] = useState<any>("");
  const [userInfo, setUserInfo] = useState({
    phone: "",
  });

  // -----------------------------------------------------------

  // Fetch API

  // Get User
  const fetchUserAndUserCart = async () => {
    const result = await getDataLogin();
    const dataCart = await getDetailUserCart(result.id);
    setUser(result);
    setUserCart(dataCart);
    return;
  };

  // Get Coupons
  const fetchCoupons = async () => {
    const result = await getAllCoupons();
    return setCoupons(result);
  };

  useEffect(() => {
    fetchUserAndUserCart();
    fetchCoupons();
  }, []);

  // -----------------------------------------------------------

  const subTotal = () => {
    let subTotalCart = 0;
    if (userCart?.length > 0) {
      subTotalCart = userCart?.reduce((accumulator: any, item: any) => {
        return accumulator + item.quantity * item.price;
      }, 0);
      return subTotalCart;
    }
    return 0;
  };

  const findDiscount = () => {
    const total = subTotal(); // Gọi hàm subTotal() để tính tổng tiền
    if (coupons.length > 0) {
      const findCoupons = coupons.filter((item: any) => {
        return Number(total) > Number(item.min_bill);
      });
      const sortCoupons = findCoupons.sort((a: any, b: any) => {
        return b.min_bill - a.min_bill;
      });
      return sortCoupons[0];
    } else {
      return 0;
    }
  };

  const discountAmount = () => {
    if (findDiscount()) {
      return subTotal() * (Number(findDiscount().discount_rate) / 100);
    }
    return 0;
  };

  const total = () => {
    if (findDiscount()) {
      return subTotal() - discountAmount();
    }
    return subTotal();
  };

  // Xoá sản phẩm
  const handleDeleteProduct = async (productId: number) => {
    const result = await deleteProductFromCart(productId, user.id);
    fetchUserAndUserCart();
    return result;
  };
  // --------------------------------------------------------

  // Thay đổi số lượng sản phẩm trong Cart
  const handleQuantityInputChange = async (event: any, productId: number) => {
    const cartInfo = {
      quantity: event.target.value,
    };
    const result = await updateProductQuantityInCart(
      productId,
      user.id,
      cartInfo
    );
    fetchUserAndUserCart();
    setQuantity(event.target.value);
    return result;
  };
  // --------------------------------------------------------

  // CheckOut
  const handleCheckout = async () => {
    // messageApi.open({
    //   type: "loading",
    //   content: "Loading...",
    //   duration: 0,
    // });
    await BaseAxios.post(`${ordersAPI}/checkout/users/${user.id}`, userInfo)
      .then((response) => {
        setUserInfo({
          phone: "",
        });
        messageApi.open({
          type: "loading",
          content: "Redirecting to paypal...",
          duration: 0,
        });
        // messageApi.destroy();
        // Lấy URL từ response
        const url = response.data.url;
        // Redirect tại frontend
        window.location.href = url;
      })
      .catch((error) => {
        notification.warning({
          message: `${error.response.data.message}`,
        });
      });
  };

  // --------------------------------------------------------

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

  return (
    <>
      {contextHolder}
      <div className={styles["background-outside-shopping-cart"]}>
        <div className={styles["background-shopping-cart"]}>
          <div className={styles["shopping-cart-grid"]}>
            <div className={styles["left-shopping-cart-item"]}>
              <div className="table-responsive">
                <table className="table table-cart">
                  <thead>
                    <tr>
                      <th scope="col" style={{ minWidth: "20px" }}>
                        #
                      </th>
                      <th scope="col" style={{ minWidth: "100px" }}>
                        Image
                      </th>
                      <th scope="col" style={{ minWidth: "300px" }}>
                        Product
                      </th>
                      <th scope="col" style={{ minWidth: "50px" }}>
                        Quantity
                      </th>
                      <th scope="col" style={{ minWidth: "100px" }}>
                        Price
                      </th>
                      <th scope="col" style={{ minWidth: "100px" }}>
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody id={styles["table-my-cart"]}>
                    {userCart?.map((item: any, index: number) => {
                      return (
                        <tr>
                          <td>{index + 1}</td>
                          <td>
                            <img src={item.products.thumbnail_url} alt="" />
                          </td>
                          <td>{item.products.name}</td>
                          <td>
                            <input
                              type="number"
                              min="1"
                              className={styles["product-cart-quantity"]}
                              defaultValue={item.quantity}
                              onChange={(event) =>
                                handleQuantityInputChange(
                                  event,
                                  item.product_id
                                )
                              }
                            />
                          </td>
                          <td>{item.price}</td>
                          <td>
                            ${(item.quantity * item.price).toLocaleString()}
                          </td>
                          <td>
                            <i
                              className="fa-solid fa-xmark"
                              id={styles["delete-product-icon"]}
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                handleDeleteProduct(item.product_id);
                              }}
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
            <div className={styles["right-shopping-cart-item"]}>
              <div className={styles["card-detail-header"]}>
                <span>Cart Information</span>
                <img src={logo} alt="" />
              </div>

              <div className={styles["card-type"]}>
                <span>Payment Method</span>
                <div className={styles["list-card-type"]}>
                  {/* <img
                    src="https://i.pcmag.com/imagery/reviews/068BjcjwBw0snwHIq0KNo5m-15..v1602794215.png"
                    alt=""
                  /> */}
                  {/* <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Old_Visa_Logo.svg/2560px-Old_Visa_Logo.svg.png"
                    alt=""
                  /> */}
                  <img
                    src="https://www.chrisvanburen.com/wp-content/uploads/2016/12/paypal-logo.png"
                    alt="paypal"
                  />
                  {/* <img
                    src="https://www.pngall.com/wp-content/uploads/2016/07/Mastercard-Download-PNG.png"
                    alt=""
                  /> */}
                </div>
              </div>

              <div className={styles["card-info"]}>
                <div className={styles["card-info-item"]}>
                  <input
                    type="text"
                    id="typeText"
                    className="form-control form-control-lg"
                    size={16}
                    placeholder="Phone"
                    minLength={16}
                    maxLength={16}
                    value={userInfo.phone}
                    onChange={(event) => {
                      setUserInfo({
                        ...userInfo,
                        phone: event.target.value,
                      });
                    }}
                  />
                </div>
              </div>

              <div className={styles["card-info-item"]}>
                <div className={styles["card-info-item-detail"]}>
                  <span>Subtotal</span>
                  <span>${subTotal().toLocaleString()}</span>
                </div>
                <div className={styles["card-info-item-detail"]}>
                  <div>
                    <span>Discount</span>
                    &nbsp;
                    <Button type="primary" onClick={showModal}>
                      View Discount Limit
                    </Button>
                    <Modal
                      title="Discount Board"
                      open={isModalOpen}
                      onOk={handleOk}
                      onCancel={handleCancel}
                      width={330}
                    >
                      <table
                        cellPadding={10}
                        style={{ borderCollapse: "collapse" }}
                        className={styles["cart-discount-detail"]}
                      >
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Discount Rate</th>
                            <th>Min Bill</th>
                          </tr>
                        </thead>
                        <tbody>
                          {coupons &&
                            coupons?.map((coupon: any, index: number) => {
                              return (
                                <tr>
                                  <td>{index + 1}</td>
                                  <td>{coupon?.discount_rate}</td>
                                  <td>${coupon?.min_bill.toLocaleString()}</td>
                                </tr>
                              );
                            })}
                        </tbody>
                      </table>
                    </Modal>
                  </div>
                  <span>
                    {findDiscount() ? findDiscount().discount_rate : 0}%
                  </span>
                </div>
                <div className={styles["card-info-item-detail"]}>
                  <span>Discount Amount</span>
                  <span>${discountAmount().toLocaleString()} </span>
                </div>
                {/* <div className={styles["card-info-item-detail"]}>
                  <span>Shipping</span>
                  <span>${5}</span>
                </div> */}
                <div className={styles["card-info-item-detail"]}>
                  <span>Total</span>
                  <span>${total().toLocaleString()}</span>
                </div>
              </div>
              <div className={styles["card-total"]}>
                <span>${total().toLocaleString()}</span>
                <img
                  className={styles["paypal-icon"]}
                  src="https://lh3.googleusercontent.com/pw/ADCreHeukfidFFryHTtN23pvDCPdhNVkdz0pPYE3olF5RCLwxDlKi1oVJzKZAmfo8_zYQ2I1GC2wgcQq5X0Ip3sMy5B7_KQDlw6rv-vlZUr-TtsfNiOtR0U1A7Vf_-J2gHUIUKLOI6NPxr-7AeGOQBawgeWfHINEp_V_dLL8VNH0bQX6CavO58qzQXgcGRjjLBZwzWyJ5zs0Qsss2xfOlgDqpj3lVhyLfnjQ_Tf0VWEAzQQmjhHTUmlzuXiqyUeTuGdJiy1kddVIAS9oKz1QzMWAEIfd6Y1UcadFQkwyRP4_5v0amHKVYohbRpcPsBORhfWyRiYMP5IMe0RsiAGXyfM5eQZNFTGHjNkBKxgRfDHn_eQd-aF69VgZ_iJ04Lr2zaEgN3UJNxZWitFOkozqKXn5XnbrXmniBWtgv8Setka4-_m-s9r7_Ucy-mAEd2ZGAVm6YqwYSR428ERLXFk2HwVjuDvbavVpZZDNPJtmEJOY2fdkQPLLmwJARyQTBaH4VgZjRPD6m09w3J81S-pNLYx8Dg2RAewj1TRBh0p4856cWbaCx7o1Yg4gbp0JzE-mv9LUYgMKdQLphNhL2Kl_kNksshmv4M6GsObsYP3i4saUeEbbuvbw7s4btlhu0ropa5OmwHMPlDWzjfcTLypD7OE7xdh3O7w4gq2T5et0kvq3mk0NdFxrRDLutYluKu9kTK2dyuvdGRspGyekuwWhUjv5r36jKfHH1R_a0_aaKDcCs0QSQKDRt1IpDabjj-CJR8zGKpZ2ZpiP5rgEGCIrZpE-xkAYyECxWXuJyTTclWAhxpicHXP0zLzkoFguJr3hTYN238pGpY2bRFF_DiGIdNzltr7x8ETeQJYrK015hbOUrcDhXI5xNE41XOzs-ytO-24Mu5D_YPyuB83h0NxcXGYksNn39w=w1920-h704-s-no-gm?authuser=0"
                  alt=""
                  onClick={handleCheckout}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ClientCart;
