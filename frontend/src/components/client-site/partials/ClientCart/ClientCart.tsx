import React, { useEffect, useState } from "react";
import styles from "./ClientCart.module.css";
import logo from "../../../../assets/images/pet-shop.png";
import axios from "axios";
import { notification, Button, Modal } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import BaseAxios from "./../../../../api/apiAxiosClient";

// Import API
// 1. Products API
const productsAPI = process.env.REACT_APP_API_PRODUCTS;
// 2. Orders API
const ordersAPI = process.env.REACT_APP_API_ORDERS;
// 3. Carts API
const cartsAPI = process.env.REACT_APP_API_CARTS;
// 4. Order Item API
const orderItemsAPI = process.env.REACT_APP_API_ORDER_ITEMS;
// 5. Payments API
const paymentsAPI = process.env.REACT_APP_API_PAYMENTS;
// 6. Users API
const usersAPI = process.env.REACT_APP_API_USERS;
// 7. Coupons API
const couponsAPI = process.env.REACT_APP_API_COUPONS;

// -----------------------------------------------------
function ClientCart() {
  const getData: any = localStorage.getItem("auth");
  const getLoginData = JSON.parse(getData) || "";
  const navigate = useNavigate();

  // List State
  const [cart, setCart] = useState([]);
  const [userCart, setUserCart] = useState<any>([]);
  const [coupons, setCoupons] = useState<any>([]);
  const [quantity, setQuantity] = useState<any>("");
  const [userInfo, setUserInfo] = useState({
    user_id: "",
    customer_name: "",
    address: "",
    phone: "",
    cardholder_name: "",
    card_number: "",
    expiry_date: "",
    cvv: "",
  });

  // -----------------------------------------------------------

  // Fetch API

  // Get User Cart
  // const fetchCart = () => {
  //   BaseAxios.get(`${cartsAPI}/detail/users/${getLoginData.id}`)
  //     .then((response) => {
  //       setCart(response.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  // Get User Cart
  const fetchUserCart = () => {
    BaseAxios.get(`${cartsAPI}/detail/users/${getLoginData.id}`)
      .then((response) => {
        setUserCart(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  console.log(userCart, "p---");

  // Get Coupons
  const fetchCoupons = () => {
    BaseAxios.get(`${couponsAPI}`)
      .then((response) => {
        setCoupons(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchUserCart();
    fetchCoupons();
  }, []);

  // -----------------------------------------------------------

  const subTotal = () => {
    let subTotalCart = 0;
    if (userCart.length > 0) {
      subTotalCart = userCart.reduce((accumulator: any, item: any) => {
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

  // const orderMessage = (
  //   <div>
  //     <NavLink to="/user/my-orders" style={{ textDecoration: "none" }}>
  //       View Order History
  //     </NavLink>
  //   </div>
  // );

  // Xoá sản phẩm
  const handleDeleteProduct = (productId: number) => {
    BaseAxios.delete(
      `${cartsAPI}/delete/products/${productId}/users/${getLoginData.id}`
    )
      .then((response) => {
        notification.success({
          message: `${response.data.message}`,
        });
        fetchUserCart();
      })
      .catch((error) => {
        notification.warning({
          message: `${error.response.data.message}`,
        });
      });
  };
  // --------------------------------------------------------

  // Xoá sản phẩm
  const handleQuantityInputChange = (event: any, productId: number) => {
    const cartInfo = {
      quantity: event.target.value,
    };
    axios
      .patch(
        `${cartsAPI}/update/products/${productId}/users/${getLoginData.id}`,
        cartInfo
      )
      .then((response) => {
        fetchUserCart();
      })
      .catch((error) => {
        notification.warning({
          message: `${error.response.data.message}`,
        });
      });

    setQuantity(event.target.value);
    console.log(productId, "PRODUCT ID");
  };
  // --------------------------------------------------------

  // CheckOut
  const handleCheckout = async () => {
    BaseAxios.post(`${ordersAPI}/checkout/users/${getLoginData.id}`, userInfo)
      .then((response) => {
        fetchUserCart();
        setUserInfo({
          user_id: "",
          customer_name: "",
          address: "",
          phone: "",
          cardholder_name: "",
          card_number: "",
          expiry_date: "",
          cvv: "",
        });
        notification.success({
          message: `${response.data.message}`,
        });
        navigate("/user/my-orders");
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
                            <img src={item.product.thumbnail_url} alt="" />
                          </td>
                          <td>{item.product.name}</td>
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
                <span>Card Details</span>
                <img src={logo} alt="" />
              </div>

              <div className={styles["card-type"]}>
                <span>Card Type</span>
                <div className={styles["list-card-type"]}>
                  {/* <img
                    src="https://i.pcmag.com/imagery/reviews/068BjcjwBw0snwHIq0KNo5m-15..v1602794215.png"
                    alt=""
                  /> */}
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Old_Visa_Logo.svg/2560px-Old_Visa_Logo.svg.png"
                    alt=""
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
                    className="form-control form-control-lg"
                    placeholder="Cardholder's Name"
                    value={userInfo.cardholder_name.toUpperCase()}
                    onChange={(event) => {
                      setUserInfo({
                        ...userInfo,
                        cardholder_name: event.target.value,
                      });
                    }}
                  />
                </div>
                <div className={styles["card-info-item"]}>
                  <input
                    type="text"
                    id="typeText"
                    className="form-control form-control-lg"
                    size={17}
                    placeholder="Card Numbers"
                    minLength={16}
                    maxLength={16}
                    value={Number(userInfo.card_number)}
                    onChange={(event) => {
                      setUserInfo({
                        ...userInfo,
                        card_number: event.target.value,
                      });
                    }}
                  />
                </div>
                <div className={styles["card-info-item-special"]}>
                  <div className={styles["card-info-item-special-detail"]}>
                    <label htmlFor="">Expiration</label>
                    <input
                      type="text"
                      id="typeExp"
                      className="form-control form-control-lg"
                      placeholder="MM/YYYY"
                      size={7}
                      minLength={7}
                      maxLength={7}
                      value={userInfo.expiry_date}
                      onChange={(event) => {
                        setUserInfo({
                          ...userInfo,
                          expiry_date: event.target.value,
                        });
                      }}
                    />
                  </div>
                  <div className={styles["card-info-item-special-detail"]}>
                    <label htmlFor="">CVV</label>
                    <input
                      type="password"
                      id="typeText"
                      className="form-control form-control-lg"
                      placeholder="&#9679;&#9679;&#9679;"
                      minLength={3}
                      maxLength={3}
                      value={userInfo.cvv}
                      onChange={(event) => {
                        setUserInfo({
                          ...userInfo,
                          cvv: event.target.value,
                        });
                      }}
                    />
                  </div>
                </div>
                <div className={styles["card-info-item"]}>
                  <input
                    type="text"
                    id="typeText"
                    className="form-control form-control-lg"
                    placeholder="Customer Name"
                    value={userInfo.customer_name}
                    onChange={(event) => {
                      setUserInfo({
                        ...userInfo,
                        customer_name: event.target.value,
                      });
                    }}
                  />
                </div>
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
                <div className={styles["card-info-item"]}>
                  <input
                    type="text"
                    id="typeText"
                    className="form-control form-control-lg"
                    size={17}
                    placeholder="Address"
                    minLength={16}
                    maxLength={16}
                    value={userInfo.address}
                    onChange={(event) => {
                      setUserInfo({
                        ...userInfo,
                        address: event.target.value,
                      });
                    }}
                  />
                </div>
              </div>

              <div className={styles["card-info-item"]}>
                {/* <div className={styles["card-info-item-detail"]}>
                  <span>Coupon Code</span>
                  <input
                    type="text"
                    placeholder="code"
                    value={couponCode}
                    onChange={(event) => {
                      setCouponCode(event.target.value);
                    }}
                  />
                </div> */}
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
                      width={380}
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
                <button onClick={handleCheckout}>Checkout</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ClientCart;
