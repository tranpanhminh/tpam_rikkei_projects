import React, { useEffect, useState } from "react";
import styles from "./ClientCart.module.css";
import logo from "../../../../assets/images/pet-shop.png";
import axios from "axios";
import { notification } from "antd";
import { format, parse } from "date-fns";
import { Button, Modal } from "antd";
import { NavLink } from "react-router-dom";

function ClientCart() {
  const getData: any = localStorage.getItem("auth");
  const getLoginData = JSON.parse(getData) || "";
  const [user, setUser] = useState<any>([]);
  const [products, setProducts] = useState<any>(null);
  const [userCart, setUserCart] = useState<any>([]);
  const [initQuantity, setInitQuantity] = useState<any>(0);
  const [card, setCard] = useState<any>(null);

  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiration, setExpiration] = useState("");
  const [cvv, setCVV] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [newsletter, setNewsletter] = useState<any>(null);

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
  }, []);
  console.log("List Card", card);

  const handleTotalCart = () => {
    let totalCart = userCart.reduce((accumulator: any, currentItem: any) => {
      return (accumulator += currentItem.productQuantity * currentItem.price);
    }, 0);
    return totalCart;
  };

  const handleDeleteProduct = (productId: number) => {
    let findProductIndexIncart = userCart.findIndex((item: any) => {
      return item.productId === productId;
    });
    console.log(findProductIndexIncart);
    let findProductIndex = products.findIndex((item: any) => {
      return item.id === productId;
    });

    products[findProductIndex].quantity_stock += Number(
      userCart[findProductIndexIncart].productQuantity
    );

    userCart.splice(findProductIndexIncart, 1);
    const updatedCart = {
      cart: userCart,
    };
    const updatedProducts = {
      quantity_stock: products[findProductIndex].quantity_stock,
    };

    axios
      .patch(
        `http://localhost:7373/accounts/${getLoginData.loginId}`,
        updatedCart
      )
      .then((response) => {
        fetchUser();
        fetchProducts();
        setUserCart(response.data.cart);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .patch(`http://localhost:7373/products/${productId}`, updatedProducts)
      .then((response) => {
        notification.success({
          message: "Product Deleted",
        });
        fetchUser();
        fetchProducts();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  console.log(newsletter);
  // Kiểm tra Coupon Code
  let findCouponCode = newsletter?.find((item: any) => {
    return item.couponCode === couponCode;
  });

  console.log(findCouponCode);
  const handleCheckout = () => {
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
    console.log(checkValidCard);
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

    // Kiểm tra số dư trong Card
    if (checkValidCard.balance < Number(handleTotalCart() + 5)) {
      notification.warning({
        message: "Card Balance is not enough",
      });
      return;
    }

    // notification.success({
    //   message: "Order Completed",
    // });
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
                                onChange={(event) => {
                                  const newQuantity = parseInt(
                                    event.target.value
                                  );
                                  if (newQuantity >= 1) {
                                    const updatedUserCart = userCart.map(
                                      (cartItem: any) => {
                                        if (
                                          cartItem.productId === item.productId
                                        ) {
                                          return {
                                            ...cartItem,
                                            productQuantity: newQuantity,
                                          };
                                        }
                                        return cartItem;
                                      }
                                    );
                                    setUserCart(updatedUserCart);
                                    console.log("New User Cart", userCart);
                                  }
                                }}
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
                  {/* <label htmlFor="">Cardholder's Name</label> */}
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
                  {/* <label htmlFor="">Card Number</label> */}
                  <input
                    type="text"
                    id="typeText"
                    className="form-control form-control-lg"
                    size={17}
                    placeholder="Card Numbers"
                    minLength={16}
                    maxLength={16}
                    value={cardNumber}
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
                  <span>${Number(handleTotalCart()).toLocaleString()}</span>
                </div>
                <div className={styles["card-info-item-detail"]}>
                  <span>Shipping</span>
                  <span>${5}</span>
                </div>
                <div className={styles["card-info-item-detail"]}>
                  <span>Total</span>
                  <span>${Number(handleTotalCart() + 5).toLocaleString()}</span>
                </div>
              </div>

              <div className={styles["card-total"]}>
                <span>${Number(handleTotalCart() + 5).toLocaleString()}</span>
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
