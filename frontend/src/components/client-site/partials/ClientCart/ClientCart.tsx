import React, { useEffect, useState } from "react";
import styles from "./ClientCart.module.css";
import logo from "../../../../assets/images/pet-shop.png";
import axios from "axios";
import { notification } from "antd";
import { format, parse } from "date-fns";
import { Button, Modal } from "antd";
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
  const fetchCart = () => {
    BaseAxios.get(`${cartsAPI}/detail/users/${getLoginData.id}`)
      .then((response) => {
        setCart(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Get User Cart
  const fetchUserCart = () => {
    axios
      .get(`${cartsAPI}/detail/users/${getLoginData.id}`)
      .then((response) => {
        setUserCart(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Get Coupons
  const fetchCoupons = () => {
    axios
      .get(`${couponsAPI}`)
      .then((response) => {
        setCoupons(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchCart();
    fetchUserCart();
    fetchCoupons();
  }, [quantity]);

  // Get List Products
  // const fetchProducts = () => {
  //   axios
  //     .get(`${productsAPI}`)
  //     .then((response) => {
  //       setProducts(response.data);
  //     })
  //     .catch((error) => {
  //       console.log(error.message);
  //     });
  // };

  // Get List Orders
  // const fetchOrders = () => {
  //   axios
  //     .get(`${ordersAPI}`)
  //     .then((response) => {
  //       setListOrders(response.data);
  //     })
  //     .catch((error) => {
  //       console.log(error.message);
  //     });
  // };

  // Get User Data
  // const fetchUser = () => {
  //   axios
  //     .get(`usersAPI/detail/${getLoginData.id}`)
  //     .then((response) => {
  //       setUser(response.data);
  //       setUserCart(response.data.cart);
  //       // setNewsletter(response.data.newsletter);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  // Get Card
  // const fetchCard = () => {
  //   axios
  //     .get(`${paymentsAPI}`)
  //     .then((response) => {
  //       setCard(response.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

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
      return findCoupons[findCoupons.length - 1];
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

  const orderMessage = (
    <div>
      <a href="/user/my-orders" style={{ textDecoration: "none" }}>
        View Order History
      </a>
    </div>
  );

  // Xoá sản phẩm
  const handleDeleteProduct = (productId: number) => {
    BaseAxios.delete(
      `${cartsAPI}/delete/products/${productId}/users/${getLoginData.id}`
    )
      .then((response) => {
        fetchCart();
        notification.success({
          message: `${response.data}`,
        });
      })
      .catch((error) => {
        notification.warning({
          message: `${error.response.data}`,
        });
      });
  };
  // --------------------------------------------------------

  // Xoá sản phẩm
  const handleQuantityInputChange = (event: any, productId: number) => {
    const cartInfo = {
      quantity: event.target.value,
    };
    BaseAxios.patch(
      `${cartsAPI}/update/products/${productId}/users/${getLoginData.id}`,
      cartInfo
    )
      .then((response) => {
        fetchCart();
      })
      .catch((error) => {
        notification.warning({
          message: `${error.response.data}`,
        });
      });

    setQuantity(event.target.value);
    console.log(productId, "PRODUCT ID");
  };
  // --------------------------------------------------------

  // CheckOut
  const handleCheckout = async () => {
    console.log(userInfo, "UISER INFO");
  };
  // --------------------------------------------------------

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
                    {cart &&
                      cart.map((item: any, index: number) => {
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
                  <span>Discount</span>
                  <span>
                    {" "}
                    {findDiscount() ? findDiscount().discount_rate : 0}%
                  </span>
                </div>
                <div className={styles["card-info-item-detail"]}>
                  <span>Discount Amount:</span>
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
                <span>$ {1}</span>
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
