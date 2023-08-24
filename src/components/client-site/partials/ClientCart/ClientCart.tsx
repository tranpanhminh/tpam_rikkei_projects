import React from "react";
import styles from "./ClientCart.module.css";
import logo from "../../../../assets/images/pet-shop.png";

function ClientCart() {
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
                        Product Image
                      </th>
                      <th scope="col" style={{ minWidth: "300px" }}>
                        Product Name
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
                    <tr>
                      <th>1</th>
                      <td>
                        <img src="/assets/images/product-05.jpg" alt="" />
                      </td>
                      <td>My Alphapet Dog Poop Bags Refill Rolls</td>
                      <td>
                        <input
                          type="number"
                          min="1"
                          className={styles["product-cart-quantity"]}
                        />
                      </td>
                      <td>1000000</td>
                      <td>
                        <i
                          className="fa-solid fa-xmark"
                          id={styles["delete-product-icon"]}
                        />
                      </td>
                    </tr>
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
                  <span>Subtotal</span>
                  <span>$4798.00</span>
                </div>
                <div className={styles["card-info-item-detail"]}>
                  <span>Shipping</span>
                  <span>$20.00</span>
                </div>
                <div className={styles["card-info-item-detail"]}>
                  <span>Total(incl. taxes)</span>
                  <span>$4818.00</span>
                </div>
              </div>

              <div className={styles["card-total"]}>
                <span>$4818.00</span>
                <span>
                  Checkout
                  <i className="fa-solid fa-arrow-right arrow-right-icon"></i>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ClientCart;
