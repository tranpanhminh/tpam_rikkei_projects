import React, { useEffect, useState } from "react";
import styles from "./ClientCart.module.css";
import logo from "../../../../assets/images/pet-shop.png";
import axios from "axios";

function ClientCart() {
  const getData: any = localStorage.getItem("auth");
  const getLoginData = JSON.parse(getData) || "";
  const [user, setUser] = useState<any>([]);
  const [userCart, setUserCart] = useState<any>([]);

  const fetchUser = () => {
    axios
      .get(`http://localhost:7373/accounts/${getLoginData.loginId}`)
      .then((response) => {
        setUser(response.data);
        setUserCart(response.data.cart);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchUser();
  }, []);

  console.log("UserCart", userCart);
  const handleTotalCart = () => {
    let totalCart = userCart.reduce((accumulator: any, currentItem: any) => {
      return (accumulator += currentItem.productQuantity * currentItem.price);
    }, 0);
    return totalCart;
  };

  const handleDeleteProduct = (productId: number) => {
    console.log(productId);
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
                      userCart.map((item: any) => {
                        return (
                          <tr>
                            <td>{item.productId}</td>
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
                    />
                  </div>
                  <div className={styles["card-info-item-special-detail"]}>
                    <label htmlFor="">CVV</label>
                    <input
                      type="password"
                      id="typeText"
                      className="form-control form-control-lg"
                      placeholder="&#9679;&#9679;&#9679;"
                      size={1}
                      minLength={3}
                      maxLength={3}
                    />
                  </div>
                </div>
              </div>

              <div className={styles["card-info-item"]}>
                <div className={styles["card-info-item-detail"]}>
                  <span>Coupon Code</span>
                  <input type="text" placeholder="code" />
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
                <span>$4818.00</span>
                <button>Checkout</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ClientCart;
