import jwtDecode from "jwt-decode";
import React, { useEffect, useState } from "react";
import styles from "../../ClientPage.module.css";
import axios from "axios";
import { Product } from "../../../../database";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { notification, Button, Modal } from "antd";
import {} from "antd";
import { Rate } from "antd";
import { Editor } from "@tinymce/tinymce-react";
import { Badge } from "react-bootstrap";
import BaseAxios from "./../../../../api/apiAxiosClient";
import tinymce from "tinymce";
const moment = require("moment");

// Import API
const usersAPI = process.env.REACT_APP_API_USERS;
const productsAPI = process.env.REACT_APP_API_PRODUCTS;
const productCommentsAPI = process.env.REACT_APP_API_PRODUCT_COMMENTS;
const cartsAPI = process.env.REACT_APP_API_CARTS;

// ----------------------------------------------------------------------
function ClientProductDetail() {
  // List States
  const navigate = useNavigate();
  const getData: any = localStorage.getItem("auth");
  const getLoginData = JSON.parse(getData) || "";
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { productId } = useParams();
  const [user, setUser] = useState<any>(null);
  const [productComments, setProductComments] = useState<any>([]);
  const [products, setProducts] = useState<any>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [userComment, setUserComment] = useState<any>({
    comment: "",
    rating: 5,
  });

  // --------------------------------------------------------

  document.title = `${products ? `${products?.name} | PetShop` : "Loading..."}`;
  // Check Token
  const token: any = localStorage.getItem("token") || "";
  let data: any;
  if (token) {
    try {
      data = jwtDecode(token);

      // Đây là một đối tượng được giải mã từ token
      console.log(data);

      // Kiểm tra thời hạn của token
      const currentTimestamp = Math.floor(Date.now() / 1000);
      if (data.exp < currentTimestamp) {
        console.log("Token is expired.");
      } else {
        console.log("Token is valid.");
      }
    } catch (error) {
      navigate("/");
    }
  } else {
    console.log("Token Not Found.");
  }
  // --------------------------------------------------------

  // Ẩn hiện Modal

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  // --------------------------------------------------------

  // Fetch API
  const fetchProducts = async () => {
    await axios
      .get(`${productsAPI}/detail/${productId}`)
      .then((response) => {
        setProducts(response.data);
        // setComments(response.data.comments);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  const fetchUsers = async () => {
    await axios
      .get(`${usersAPI}/detail/${getLoginData.id}`)
      .then((response) => {
        setUser(response.data);
        // setUserCart(response.data.cart);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const fetchProductComments = async () => {
    await axios
      .get(`${productCommentsAPI}/${productId}`)
      .then((response) => {
        setProductComments(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    fetchProducts();
    fetchUsers();
    fetchProductComments();
  }, []);

  // --------------------------------------------------------

  // Add To Cart
  const handleAddToCart = async () => {
    const dataCart = {
      quantity: quantity,
    };
    await BaseAxios.post(
      `${cartsAPI}/add/products/${productId}/users/${getLoginData.id}`,
      dataCart
    )
      .then((response) => {
        notification.success({
          message: `${response.data.message}`,
        });
      })
      .catch((error) => {
        console.log(error);
        notification.warning({
          message: `${error.response.data.message}`,
        });
      });
  };
  // --------------------------------------------------------

  // Add Comment
  const handleComment = () => {
    BaseAxios.post(
      `${productCommentsAPI}/add/${productId}/users/${getLoginData.id}`,
      userComment
    )
      .then((response) => {
        notification.success({ message: response.data.message });
        setUserComment({
          comment: "",
          rating: 5,
        });
        const editor = tinymce.get("editorID");
        if (editor) {
          // Đặt nội dung của trình soạn thảo về trạng thái trống
          editor.setContent("");
        }
        fetchProducts();
        fetchProductComments();
      })
      .catch((error) => {
        notification.warning({ message: error.response.data.message });
      });
  };
  const editorConfig = {
    height: "300px",
    // plugins: "maxlength", // Sử dụng plugin maxlength
    // toolbar: "undo redo | bold italic | maxlength", // Thêm nút maxlength vào thanh công cụ
    // max_chars: 200, // Giới hạn số ký tự
    // // Các tùy chọn khác bạn muốn cấu hình
  };

  const handleRateChange = (value: number) => {
    setUserComment({
      ...userComment,
      rating: value,
    });
  };

  // --------------------------------------------------------

  // Function Delete Comment
  const handleDeleteComment = (commentId: number) => {
    BaseAxios.delete(`${productCommentsAPI}/delete/${commentId}`)
      .then((response) => {
        console.log(response);
        notification.success({ message: response.data.message });
        fetchProductComments();
      })
      .catch((error) => {
        console.log(error, "EROR");
        notification.warning({ message: error.data.message });
      });
  };

  const checkShowDeleteCommentBtn = () => {
    if (
      (getLoginData && user?.role_id === 1) ||
      (getLoginData && user?.role_id === 2)
    ) {
      return true;
    }
    return false;
  };

  // --------------------------------------------------------

  const filterCommentsExcludeAdmin = () => {
    let filterComments = productComments.filter((item: any) => {
      return item?.users.role_id !== 1 && item?.users.role_id !== 2;
    });
    return filterComments?.length || 0;
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
                      <img
                        src={products && products?.product_images[0]?.image_url}
                        alt=""
                      />
                    </div>
                    <div className="col">
                      <img
                        src={products && products?.product_images[1]?.image_url}
                        alt=""
                      />
                    </div>
                    <div className="col">
                      <img
                        src={products && products?.product_images[2]?.image_url}
                        alt=""
                      />
                    </div>
                    <div className="col">
                      <img
                        src={products && products?.product_images[3]?.image_url}
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-sm-12">
                <div className={styles["product-detail-info"]}>
                  <h2 className={styles["product-title-name"]}>
                    {products && products.name}
                  </h2>
                  {(data?.role_id === 1 || data?.role_id === 2) && (
                    <div className={styles["editor-post-bar"]}>
                      <NavLink
                        to={`/admin/manage-products/?edit-productId=${products.id}`}
                        target="_blank"
                      >
                        <Badge bg="primary" style={{ fontSize: "16px" }}>
                          Edit Product
                        </Badge>
                      </NavLink>
                    </div>
                  )}
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
                    <span>{products && products.vendor_name}</span>
                  </div>
                  {/* <div className={styles["product-sku"]}>
                    <span>SKU:</span>
                    <span>{products && products.sku}</span>
                  </div> */}
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
                  <div className={styles["product-rating"]}>
                    <span>Rating:</span>
                    <div className={styles["product-rating-section"]}>
                      {products.avg_rating}
                      <i className="fa-solid fa-star"></i>
                      <span>({filterCommentsExcludeAdmin()} reviews)</span>
                    </div>
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
        <div className={styles["comment-detail"]}>
          <div
            className={`container text-center  ${styles["container-comment"]}`}
            style={{ marginTop: 50, marginBottom: 50 }}
          >
            <div className={styles["comment-heading"]}>
              <h3 className={styles["user-comment-product"]}>
                {productComments?.length} comments
              </h3>

              {user?.role_id === 3 && (
                <div>
                  <span className={styles["rating-text"]}>Rating: </span>
                  <Rate
                    allowHalf
                    value={userComment.rating}
                    onChange={handleRateChange}
                  />
                </div>
              )}
            </div>

            <div className={styles["comment-input"]}>
              <Editor
                init={editorConfig}
                onEditorChange={(content) =>
                  setUserComment({ ...userComment, comment: content })
                }
                value={userComment.comment}
                id="editorID"
              />
              <div className={styles["send-comment-btn"]}>
                {getLoginData ? (
                  <Button type="primary" onClick={handleComment}>
                    Comment
                  </Button>
                ) : (
                  <NavLink to="/login">
                    <Button type="primary">Login to comment</Button>
                  </NavLink>
                )}
              </div>
            </div>
            <div
              className={`${styles["main-content-comment"]} ${styles["comment-scrollable"]}`}
            >
              {productComments &&
                productComments?.map((item: any) => {
                  return (
                    <section className={styles["product-comment-item"]}>
                      <div className={styles["user-comment-info"]}>
                        <img
                          src={item.users?.image_avatar}
                          alt=""
                          className={styles["user-avatar"]}
                        />

                        <span>{item.users?.full_name.split(" ")[0]}</span>
                        {item?.users.role_id === 1 ||
                        item?.users.role_id === 2 ? (
                          <Badge bg="success">Admin</Badge>
                        ) : item.order_history?.length !== 0 ? (
                          <Badge bg="warning" text="dark">
                            Customer
                          </Badge>
                        ) : (
                          ""
                        )}

                        {item?.users.role_id !== 1 &&
                          item?.users.role_id !== 2 && (
                            <span className={styles["rating-section"]}>
                              {item.rating}
                              <i className="fa-solid fa-star"></i>
                            </span>
                          )}
                      </div>
                      <div>
                        <div className={styles["comment-content-headline"]}>
                          <div
                            className={styles["comment-content-headline-item"]}
                          >
                            <Badge bg="primary">
                              {moment(item.created_at).format(
                                "YYYY-MM-DD-hh:mm:ss"
                              )}
                            </Badge>
                          </div>

                          <i
                            onClick={() => handleDeleteComment(item?.id)}
                            className={`fa-solid fa-trash-can ${styles["trash-comment-icon"]}`}
                            style={{
                              display:
                                checkShowDeleteCommentBtn() === true
                                  ? "inline-block"
                                  : "none",
                            }}
                          ></i>
                        </div>
                        <div
                          className={`${styles["comment-content"]} ${styles["comment-scrollable"]}`}
                        >
                          {React.createElement("div", {
                            dangerouslySetInnerHTML: { __html: item?.comment },
                          })}
                        </div>
                      </div>
                    </section>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ClientProductDetail;
