import React, { useEffect, useState } from "react";
import styles from "./ClientCart.module.css";
import logo from "../../../../assets/images/pet-shop.png";
import axios from "axios";
import { notification } from "antd";
import { format, parse } from "date-fns";
import { Button, Modal } from "antd";
import { NavLink, useNavigate } from "react-router-dom";

function ClientCart() {
  const getData: any = localStorage.getItem("auth");
  const getLoginData = JSON.parse(getData) || "";
  const navigate = useNavigate();
  const [user, setUser] = useState<any>([]);
  const [products, setProducts] = useState<any>(null);
  const [userCart, setUserCart] = useState<any>([]);

  const [card, setCard] = useState<any>(null);

  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [expiration, setExpiration] = useState("");
  const [cvv, setCVV] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [newsletter, setNewsletter] = useState<any>(null);
  const [listOrders, setListOrders] = useState<any>(null);

  // Get List Products
  const fetchProducts = () => {
    axios
      .get(`http://localhost:7373/products/`)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  // Get List Orders
  const fetchOrders = () => {
    axios
      .get(`http://localhost:7373/orders/`)
      .then((response) => {
        setListOrders(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  // Get User Data
  const fetchUser = () => {
    axios
      .get(`http://localhost:7373/accounts/${getLoginData.loginId}`)
      .then((response) => {
        setUser(response.data);
        setUserCart(response.data.cart);
        setNewsletter(response.data.newsletter);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchCard = () => {
    axios
      .get(`http://localhost:7373/banking/`)
      .then((response) => {
        setCard(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchUser();
    fetchProducts();
    fetchCard();
    fetchOrders();
  }, []);

  // Kiểm tra Coupon Code
  let findCouponCode = newsletter?.find((item: any) => {
    return item.couponCode === couponCode;
  });
  let findCouponIndex = newsletter?.findIndex((item: any) => {
    return item.couponCode === couponCode;
  });
  console.log(findCouponIndex);

  // Lấy MaxID Của Order đưa vào order history
  // let listOrder = orderProducts?.map((order: any) => {
  //   return order.orderId;
  // });

  // let maxIdOrder = Number(Math.max(...listOrder));
  // console.log(maxIdOrder)

  let sumCart = userCart.map((item: any) => {
    return item.productQuantity * item.price;
  });

  //  Lấy MaxID của order để đưa vào List Order đẩy cho Admin
  let listOrdersDatabase = [];
  if (listOrders) {
    listOrdersDatabase = listOrders?.map((item: any) => {
      return item.id;
    });
  }

  let maxIdOrderDatabase = Number(Math.max(...listOrdersDatabase));

  const handleTotalCartNoDiscount = () => {
    let sumTotalCart = sumCart.reduce(
      (accumulator: any, currentValue: number) => {
        return (accumulator += currentValue);
      },
      0
    );
    return Number(sumTotalCart + 5);
  };

  const handleTotalCart = () => {
    let sumTotalCart = sumCart.reduce(
      (accumulator: any, currentValue: number) => {
        return (accumulator += currentValue);
      },
      0
    );

    if (findCouponCode) {
      return (sumTotalCart = Number(
        5 + sumTotalCart - (findCouponCode?.discount * sumTotalCart) / 100
      ));
    } else {
      return Number(sumTotalCart + 5);
    }
  };

  const handleDeleteProduct = (productId: number) => {
    let filterProduct = userCart.filter((item: any) => {
      return item.productId !== productId;
    });
    console.log(filterProduct);

    setUserCart(filterProduct);

    let updatedCart = {
      cart: filterProduct,
    };

    axios
      .patch(
        `http://localhost:7373/accounts/${getLoginData.loginId}`,
        updatedCart
      )
      .then(() => {
        notification.success({
          message: "Product Deleted",
        });
        fetchOrders();
        fetchUser();
        fetchProducts();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const orderMessage = (
    <div>
      <a href="/user/my-orders" style={{ textDecoration: "none" }}>
        View Order History
      </a>
    </div>
  );

  const handleCheckout = async () => {
    try {
      // Kiểm tra Phone & Address
      const phoneNumberPattern = /^1\d{10}$/;

      if (!phone || !address) {
        notification.warning({
          message: "Please fill Phone & Address",
        });
        return;
      } else if (!phoneNumberPattern.test(phone)) {
        notification.warning({
          message: "Invalid Phone Number (Use the format 1234567890)",
        });
        return;
      }

      if (userCart?.length === 0) {
        notification.warning({
          message: "Your Cart Is Empty",
        });
        return;
      }
      if (!cardName || !cardNumber || !expiration || !cvv) {
        notification.warning({
          message: "Card Payment must not be empty",
        });
        return;
      }

      const checkValidCard = card.find((item: any) => {
        return (
          item.cardName.toUpperCase() === cardName.toUpperCase() &&
          Number(item.cardNumber) === Number(cardNumber) &&
          item.expiredDate === expiration &&
          Number(item.cvv) === Number(cvv)
        );
      });
      // Kiểm tra Card có Valid hay không
      if (!checkValidCard) {
        notification.warning({
          message: "Card Is not valid",
        });
        return;
      }
      // Kiểm tra Card có còn hạn sử dụng
      const currentDateTime = new Date();
      const checkValidCardDate = parse(
        checkValidCard.expiredDate,
        "MM/yyyy",
        new Date()
      );
      const formattedDateTime = new Date(
        currentDateTime.getFullYear(),
        currentDateTime.getMonth(),
        1
      );

      if (checkValidCardDate < formattedDateTime) {
        notification.warning({
          message: "Card Is Expired",
        });
        return;
      }

      // // Kiểm tra số dư trong Card
      if (checkValidCard.balance < Number(handleTotalCart())) {
        notification.warning({
          message: "Card Balance is not enough",
        });
        return;
      }

      const newOrder = {
        orderId: listOrders.length > 0 ? maxIdOrderDatabase + 1 : 1,
      };

      const updatedUser = {
        ...user,
        order_history: [...user.order_history, newOrder],
        cart: [], // Clear the cart after creating the order
      };

      // Xử lý Post vào Orders
      let pushNewOrder = {
        // id: listOrdersDatabase.length > 0 ? maxIdOrderDatabase + 1 : 1,
        user_id: user.id,
        name: user.fullName,
        email: user.email,
        phone: phone,
        date: format(new Date(), "dd/MM/yyyy HH:mm:ss"),
        status: "Pending",
        address: address,
        cart: userCart,
        discount: findCouponCode?.discount ? findCouponCode?.discount : 0,
        sumOrderNoDiscount: handleTotalCartNoDiscount(),
        sumOrderWithDiscount: handleTotalCart(),
        cardNumber: Number(cardNumber),
      };

      // Xử lý Post vào Orders
      const response1 = await axios.post(
        `http://localhost:7373/orders/`,
        pushNewOrder
      );
      console.log(response1);
      fetchOrders();

      // user.cart = [];

      const response2 = await axios.patch(
        `http://localhost:7373/accounts/${getLoginData.loginId}`,
        updatedUser
      );
      // setUserCart([]);
      fetchUser(); // Refresh user data after the update

      // //  Xử lý giảm Balance trong Cart
      const updatedBalance = {
        balance: checkValidCard.balance - handleTotalCart(),
      };

      const response3 = await axios.patch(
        `http://localhost:7373/banking/${checkValidCard.id}`,
        updatedBalance
      );
      fetchCard();

      // // Xử lý xóa Coupon Code đã sử dụng ra khỏi Newsletter
      if (findCouponIndex !== -1) {
        newsletter.splice(findCouponIndex, 1);

        const updatedNewsletter = {
          newsletter: newsletter,
        };

        const response4 = await axios.patch(
          `http://localhost:7373/accounts/${getLoginData.loginId}`,
          updatedNewsletter
        );
        fetchUser(); // Refresh user data after the update
      }

      // Xử lý giảm hàng tồn kho cho từng sản phẩm trong userCart
      for (const product of products) {
        for (const item of userCart) {
          if (product.id === item.productId) {
            product.quantity_stock -= item.productQuantity;
            const response5 = await axios.patch(
              `http://localhost:7373/products/${product.id}`,
              {
                quantity_stock: product.quantity_stock,
              }
            );
          }
        }
      }

      notification.success({
        message: "Order Completed",
        description: orderMessage,
      });

      // Trả về rỗng
      setCardName("");
      setCardNumber("");
      setPhone("");
      setAddress("");
      setExpiration("");
      setCVV("");
      setCouponCode("");
    } catch (error) {
      console.error(error);
      // Xử lý lỗi ở đây nếu cần
    }
  };

  const handleQuantityInputChange = (event: any, item: any) => {
    const newQuantity = Number(event.target.value);

    if (!isNaN(newQuantity) && newQuantity >= 0) {
      axios
        .get(`http://localhost:7373/products/${item.productId}`)
        .then((response) => {
          const updatedProduct = response.data;

          if (newQuantity > updatedProduct.quantity_stock) {
            notification.warning({
              message: `Quantity must not exceed ${updatedProduct.quantity_stock}`,
            });
          } else {
            item.productQuantity = newQuantity;

            const updatedUserCart = userCart.map((cartItem: any) => {
              if (cartItem.productId === item.productId) {
                return {
                  ...cartItem,
                  productQuantity: newQuantity,
                };
              }
              return cartItem;
            });

            axios
              .patch(`http://localhost:7373/accounts/${getLoginData.loginId}`, {
                cart: updatedUserCart,
              })
              .then(() => {
                setUserCart(updatedUserCart);
              })
              .catch((error) => {
                console.log(error);
              });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
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
                    {userCart &&
                      userCart.map((item: any, index: number) => {
                        return (
                          <tr>
                            <td>{index + 1}</td>
                            <td>
                              <img src={item.productImage} alt="" />
                            </td>
                            <td>{item.productName}</td>
                            <td>
                              <input
                                type="number"
                                min="1"
                                className={styles["product-cart-quantity"]}
                                value={item.productQuantity}
                                onChange={(event) =>
                                  handleQuantityInputChange(event, item)
                                }
                              />
                            </td>
                            <td>{item.price}</td>
                            <td>
                              $
                              {(
                                item.productQuantity * item.price
                              ).toLocaleString()}
                            </td>
                            <td>
                              <i
                                className="fa-solid fa-xmark"
                                id={styles["delete-product-icon"]}
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                  handleDeleteProduct(item.productId);
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
                  <img
                    src="https://i.pcmag.com/imagery/reviews/068BjcjwBw0snwHIq0KNo5m-15..v1602794215.png"
                    alt=""
                  />
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Old_Visa_Logo.svg/2560px-Old_Visa_Logo.svg.png"
                    alt=""
                  />
                  <img
                    src="https://www.pngall.com/wp-content/uploads/2016/07/Mastercard-Download-PNG.png"
                    alt=""
                  />
                </div>
              </div>

              <div className={styles["card-info"]}>
                <div className={styles["card-info-item"]}>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Cardholder's Name"
                    value={cardName.toUpperCase()}
                    onChange={(event) => {
                      setCardName(event.target.value);
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
                    value={Number(cardNumber)}
                    onChange={(event) => {
                      Number(setCardNumber(event.target.value));
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
                      value={expiration}
                      onChange={(event) => {
                        setExpiration(event.target.value);
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
                      value={cvv}
                      onChange={(event) => {
                        Number(setCVV(event.target.value));
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
                    value={phone}
                    onChange={(event) => {
                      setPhone(event.target.value);
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
                    value={address}
                    onChange={(event) => {
                      setAddress(event.target.value);
                    }}
                  />
                </div>
              </div>

              <div className={styles["card-info-item"]}>
                <div className={styles["card-info-item-detail"]}>
                  <span>Coupon Code</span>
                  <input
                    type="text"
                    placeholder="code"
                    value={couponCode}
                    onChange={(event) => {
                      setCouponCode(event.target.value);
                    }}
                  />
                </div>
                <div className={styles["card-info-item-detail"]}>
                  <span>Discount</span>
                  <span>{findCouponCode?.discount}%</span>
                </div>
                <div className={styles["card-info-item-detail"]}>
                  <span>Subtotal</span>
                  <span>${handleTotalCartNoDiscount()}</span>
                </div>
                <div className={styles["card-info-item-detail"]}>
                  <span>Shipping</span>
                  <span>${5}</span>
                </div>
                <div className={styles["card-info-item-detail"]}>
                  <span>Total</span>
                  <span>${handleTotalCart()}</span>
                </div>
              </div>

              <div className={styles["card-total"]}>
                <span>$ {handleTotalCart()}</span>
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