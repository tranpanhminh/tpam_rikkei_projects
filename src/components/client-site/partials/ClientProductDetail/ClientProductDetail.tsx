import React, { useEffect, useState } from "react";
import styles from "../../ClientPage.module.css";
import axios from "axios";
import { Product } from "../../../../database";
import { NavLink, useParams } from "react-router-dom";
import { notification } from "antd";
import { Button, Modal } from "antd";

function ClientProductDetail() {
  const getData: any = localStorage.getItem("auth");
  const getLoginData = JSON.parse(getData) || "";
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { productId } = useParams();
  const [user, setUser] = useState<any>(null);
  const [userCart, setUserCart] = useState<any>(null);
  const [products, setProducts] = useState<any>(null);
  const [quantity, setQuantity] = useState<number>(1);

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const fetchProducts = () => {
    axios
      .get(`http://localhost:7373/products/${productId}`)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const fetchUsers = () => {
    axios
      .get(`http://localhost:7373/accounts/${getLoginData.loginId}`)
      .then((response) => {
        setUser(response.data);
        setUserCart(response.data.cart);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    fetchProducts();
    fetchUsers();
  }, []);
  console.log(user);
  console.log("User Cart", userCart);
  console.log("Mã sản phẩm", productId);


  const handleAddToCart = () => {
    if (getLoginData.role === "admin") {
      notification.warning({
        message: "Admin is not allowed to buy product",
      });
    } else if (
      getLoginData.role === "customer" &&
      getLoginData.status === "Inactive"
    ) {
      notification.warning({
        message:
          "Your account status is Inactive, please wait for admin's verification",
      });
    } else {
      if (products?.quantity_stock <= 0) {
        notification.warning({
          message: "Product is out of stock",
        });
        return;
      } else {
        if (quantity > products.quantity_stock) {
          notification.warning({
            message: "Quantity exceed Stock",
          });
        } else {
          let findProduct = userCart.find((item: any) => {
            return item.productId === products.id;
          });
          console.log("FindProduct", findProduct);

          if (findProduct) {
            let findCart = userCart.findIndex((item: any) => {
              return item.productId === findProduct.productId;
            });
            userCart[findCart].productQuantity += quantity;
            let updatedCart = {
              cart: userCart,
            };
            products.quantity_stock -= quantity;
            let updatedStock = {
              quantity_stock: products.quantity_stock,
            };

            // Cập nhật productQuantity trong giỏ hàng của người dùng trực tiếp trong cơ sở dữ liệu

            // Gửi request PATCH để cập nhật productQuantity
            axios
              .patch(
                `http://localhost:7373/products/${productId}`,
                updatedStock
              )
              .then((response) => {
                // Cập nhật userCart trong state hoặc gửi request fetch lại giỏ hàng
                fetchProducts();
              })
              .catch((error) => {
                console.log(error);
              });

            axios
              .patch(
                `http://localhost:7373/accounts/${getLoginData.loginId}`,
                updatedCart
              )
              .then((response) => {
                console.log("User", user);
                // Cập nhật userCart trong state hoặc gửi request fetch lại giỏ hàng
                fetchUsers();
                notification.success({
                  message: `${quantity} Product Added`,
                });
              })
              .catch((error) => {
                console.log(error);
              });
          } else {
            let newProductAdd = {
              productId: products.id,
              productImage: products.productImage,
              productName: products.name,
              productQuantity: quantity,
              price: products.price,
            };
            userCart.push(newProductAdd);
            let updatedCart = {
              cart: userCart,
            };
            axios
              .patch(
                `http://localhost:7373/accounts/${getLoginData.loginId}/`,
                updatedCart
              )
              .then(() => {
                fetchProducts();
                fetchUsers();
                notification.success({
                  message: "New Product Added To Cart",
                });
              })
              .catch((error) => {
                console.log(error.message);
              });
          }
          // notification.success({
          //   message: "Product Added",
          // });
        }
      }
    }
  };

  return (
    <>
      {products && (
        <div className={styles["product-detail"]}>
          <div
            className="container text-center"
            style={{ marginTop: 50, marginBottom: 50 }}
          >
            <div className="row align-items-center">
              <div className="col-xl-8 col-sm-12">
                <div className="container text-center">
                  <div className="row row-cols-2">
                    <div className="col">
                      <img src={products && products.productImage[0]} alt="" />
                    </div>
                    <div className="col">
                      <img src={products && products.productImage[1]} alt="" />
                    </div>
                    <div className="col">
                      <img src={products && products.productImage[2]} alt="" />
                    </div>
                    <div className="col">
                      <img src={products && products.productImage[3]} alt="" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-sm-12">
                <div className={styles["product-detail-info"]}>
                  <h2 className={styles["product-title-name"]}>
                    {products && products.name}
                  </h2>
                  <p className={styles["product-description"]}>
                    {React.createElement("div", {
                      dangerouslySetInnerHTML: { __html: products.description },
                    })}
                  </p>
                  <div className={styles["product-price"]}>
                    <span>Price</span>
                    <span>${products && products.price.toLocaleString()}</span>
                  </div>
                  <div className={styles["product-vendor"]}>
                    <span>Vendor:</span>
                    <span>{products && products.vendor}</span>
                  </div>
                  <div className={styles["product-sku"]}>
                    <span>SKU:</span>
                    <span>{products && products.sku}</span>
                  </div>
                  <div className={styles["product-sku"]}>
                    <span>Stock:</span>
                    <span>{products && products.quantity_stock}</span>
                  </div>
                  <div className={styles["product-add-quantity"]}>
                    <p>Quantity:</p>
                    <input
                      type="number"
                      min={1}
                      defaultValue={1}
                      value={Number(quantity)}
                      onChange={(event) =>
                        setQuantity(Number(event.target.value))
                      }
                    />
                  </div>
                  <button
                    className={styles["product-detail-page-add-to-cart-btn"]}
                    onClick={() => {
                      getLoginData ? handleAddToCart() : showModal();
                    }}
                  >
                    Add To Cart
                  </button>
                  <Modal
                    title="Notification"
                    open={isModalOpen}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    width={400}
                  >
                    <p>
                      Please <NavLink to="/login">Login</NavLink> to buy Product
                    </p>
                    <p>
                      <NavLink to="/signup">Don't have an account?</NavLink>
                    </p>
                  </Modal>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ClientProductDetail;
