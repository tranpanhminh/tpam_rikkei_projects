import React, { useEffect, useState } from "react";
import styles from "../../ClientPage.module.css";
import axios from "axios";
import { Product } from "../../../../database";
import { NavLink, useParams } from "react-router-dom";
import { notification } from "antd";
import { Button, Modal } from "antd";
import { Rate } from "antd";
import avatar from "../../../../assets/images/dogs-reviews-01.png";
import { Editor } from "@tinymce/tinymce-react";

function ClientProductDetail() {
  const getData: any = localStorage.getItem("auth");
  const getLoginData = JSON.parse(getData) || "";
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { productId } = useParams();
  const [user, setUser] = useState<any>(null);
  const [userCart, setUserCart] = useState<any>(null);
  const [products, setProducts] = useState<any>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [editorContent, setEditorContent] = useState("");

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

  console.log("User", user);
  console.log("User Cart", userCart);
  const handleAddToCart = () => {
    // Kiểm tra User có phải là Admin
    if (getLoginData.role === "admin") {
      notification.warning({
        message: "Admin is not allowed to buy products",
      });
    }

    // Kiểm tra User có phải là Customer và tài khoản bị Inactive
    if (
      getLoginData.role === "customer" &&
      getLoginData.status === "Inactive"
    ) {
      notification.warning({
        message:
          "Your account status is Inactive, please wait for admin's verification",
      });
      return;
    }

    // Kiểm tra số lượng hàng tồn kho
    if (products && products.quantity_stock <= 0) {
      notification.warning({
        message: "Product is out of stock",
      });
      return;
    }

    // Kiểm tra số lượng mà User nhập vào có lớn hơn hàng tồn kho không
    if (quantity > products.quantity_stock) {
      notification.warning({
        message: "Input quantity exceeds stock",
      });
      return;
    }

    // Nếu số lượng nhập vào dưới hàng tồn kho sẽ tiếp tục các logic bên dưới
    // Kiểm tra xem sản phẩm có tồn tại trong giỏ hàng hay không
    let findProduct = userCart.find((item: any) => {
      return item.productId === products.id;
    });

    // Nếu như sản phẩm không tồn tại trong giỏ hàng thì sẽ tạo ra 1 sản phẩm mới
    if (!findProduct) {
      let newProductAdd = {
        productId: products.id,
        productImage: products.productImage[0],
        productName: products.name,
        productQuantity: quantity,
        price: products.price,
      };

      console.log("1", userCart);
      userCart.push(newProductAdd);
      console.log("2", userCart);

      let updatedCart = {
        cart: userCart,
      };
      console.log(updatedCart);

      axios
        .patch(
          `http://localhost:7373/accounts/${getLoginData.loginId}`,
          updatedCart
        )
        .then((response) => {
          fetchUsers();
          setUserCart(response.data.cart);
          notification.success({
            message: "Product Added To Cart",
          });
        })
        .catch((error) => {
          console.log(error.message);
        });
    } else {
      let findCartIndex = userCart.findIndex((item: any) => {
        return item.productId === findProduct.productId;
      });

      // Cập nhật số lượng sản phẩm trong bản sao của mảng userCart
      userCart[findCartIndex].productQuantity += quantity;
      console.log("ADSAD", userCart);

      let updatedCart = {
        cart: [...userCart],
      };
      console.log(updatedCart);

      axios
        .patch(
          `http://localhost:7373/accounts/${getLoginData.loginId}`,
          updatedCart
        )
        .then((response) => {
          fetchUsers();
          setUserCart(response.data.cart);
          notification.success({
            message: `${quantity} Product Added`,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const editorConfig = {
    height: "200px", // Điều chỉnh chiều cao ở đây
    // Các tùy chọn khác bạn muốn cấu hình
  };

  const handleEditorChange = (content: string) => {
    if (content.length <= 200) {
      setEditorContent(content);
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
      <div className={styles["comment-product-section"]}>
        <div className={styles["product-detail"]}>
          <div
            className="container text-center"
            style={{ marginTop: 50, marginBottom: 50 }}
          >
            <div className={styles["comment-heading"]}>
              <h3 className={styles["user-comment-product"]}>
                Total 10 comments
              </h3>
              <div>
                <span className={styles["rating-text"]}>Rating: </span>
                <Rate allowHalf defaultValue={2.5} />
              </div>
            </div>

            <div className={styles["comment-input"]}>
              <Editor init={editorConfig} onEditorChange={handleEditorChange} />
              <div className={styles["send-comment-btn"]}>
                <Button type="primary">Comment</Button>
              </div>
            </div>

            <div className={styles["main-content-comment"]}>
              <section className={styles["product-comment-item"]}>
                <div className={styles["user-comment-info"]}>
                  <img src={avatar} alt="" className={styles["user-avatar"]} />
                  <span>User Name</span>
                </div>
                <div className={styles["comment-content"]}>
                  Absolutely delighted with this pet product! It's truly a
                  game-changer for pet owners. From the quality craftsmanship to
                  the thoughtful design, it's evident that the creators care
                  deeply about pets' well-being.
                </div>
              </section>
              <section className={styles["product-comment-item"]}>
                <div className={styles["user-comment-info"]}>
                  <img src={avatar} alt="" className={styles["user-avatar"]} />
                  <span>User Name</span>
                </div>
                <div>
                  <div className={styles["comment-content"]}>
                    Absolutely delighted with this pet product! It's truly a
                    game-changer for pet owners. From the quality craftsmanship
                    to the thoughtful design, it's evident that the creators
                    care deeply about pets' well-being.
                  </div>
                </div>
              </section>
              <section className={styles["product-comment-item"]}>
                <div className={styles["user-comment-info"]}>
                  <img src={avatar} alt="" className={styles["user-avatar"]} />
                  <span>User Name</span>
                </div>
                <div className={styles["comment-content"]}>
                  Absolutely delighted with this pet product! It's truly a
                  game-changer for pet owners. From the quality craftsmanship to
                  the thoughtful design, it's evident that the creators care
                  deeply about pets' well-being.
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ClientProductDetail;
