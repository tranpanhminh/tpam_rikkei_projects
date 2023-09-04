import React, { useEffect, useState } from "react";
import styles from "../../ClientPage.module.css";
import axios from "axios";
import { Product } from "../../../../database";
import { NavLink, useParams } from "react-router-dom";
import { notification, Button, Modal } from "antd";
import {} from "antd";
import { Rate } from "antd";
import avatar from "../../../../assets/images/dogs-reviews-01.png";
import { Editor } from "@tinymce/tinymce-react";
import { Badge } from "react-bootstrap";
import { format } from "date-fns";

function ClientProductDetail() {
  const getData: any = localStorage.getItem("auth");
  const getLoginData = JSON.parse(getData) || "";
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { productId } = useParams();
  const [user, setUser] = useState<any>(null);
  const [userCart, setUserCart] = useState<any>(null);
  const [products, setProducts] = useState<any>(null);
  const [comments, setComments] = useState<any>([]);
  const [quantity, setQuantity] = useState<number>(1);
  const [editorContent, setEditorContent] = useState("");
  const [rateValue, setRateValue] = useState(0);
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
        setComments(response.data.comments);
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
  }, [editorContent]);

  console.log("User", user);
  console.log("User Cart", userCart);
  const handleAddToCart = () => {
    if (quantity === 0) {
      notification.warning({
        message: "Quantity must be at least 1",
      });
      return;
    }

    // Kiểm tra User có phải là Admin
    if (getLoginData.role === "admin") {
      notification.warning({
        message: "Admin is not allowed to buy products",
      });
      return;
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
    height: "300px",
    // plugins: "maxlength", // Sử dụng plugin maxlength
    // toolbar: "undo redo | bold italic | maxlength", // Thêm nút maxlength vào thanh công cụ
    // max_chars: 200, // Giới hạn số ký tự
    // // Các tùy chọn khác bạn muốn cấu hình
  };

  const handleEditorChange = (content: string) => {
    setEditorContent(content);
  };

  const handleRateChange = (value: number) => {
    setRateValue(value);
    console.log(value);
  };

  const handleComment = () => {
    if (!getLoginData) {
      notification.warning({
        message: `Please login to comment`,
      });
      return;
    }

    if (editorContent === "") {
      notification.warning({
        message: "Please fill comment",
      });
      return;
    }

    console.log(products.comments, "dasdsa");

    // Kiểm tra nếu products.comments là undefined hoặc null, thì khởi tạo nó là một mảng rỗng
    if (!products.comments) {
      products.comments = [];
    }

    let listCommentId = products.comments.map((item: any) => {
      return item.commentId;
    });

    let maxId = products.comments.length > 0 ? Math.max(...listCommentId) : 0;

    const newComment = {
      commentId: maxId + 1,
      productId: Number(productId),
      userId: getLoginData.loginId,
      userName: getLoginData.fullName,
      userRole: getLoginData.role,
      content: editorContent,
      rating: rateValue,
      date: format(new Date(), "dd/MM/yyyy HH:mm:ss"),
      type: "product",
    };

    console.log("New Comment", newComment);

    products.comments.push(newComment);

    console.log("Products", products);

    axios
      .patch(`http://localhost:7373/products/${productId}`, {
        comments: products.comments,
      })
      .then((response) => {
        fetchProducts();
        setProducts(response.data);
        handleEditorChange("");
        setRateValue(0);
      })
      .catch((error) => {
        console.log(error.message);
      });
    console.log("Update Products", products);
  };

  const handleDeleteComment = (commentId: number) => {
    let findCommentIndex = comments.findIndex((comment: any) => {
      return comment.commentId === commentId;
    });
    console.log(findCommentIndex);

    comments.splice(findCommentIndex, 1);

    axios
      .patch(`http://localhost:7373/products/${productId}`, {
        comments: comments,
      })
      .then((response) => {
        fetchProducts();
        setProducts(response.data);
        setComments(response.data.comments);
        notification.success({
          message: "Comment Deleted",
        });
        handleEditorChange("");
        setRateValue(0);
      })
      .catch((error) => {
        console.log(error.message);
      });
    console.log("Update Products", products);
  };

  const averageRating = () => {
    let filterComment = comments?.filter((comment: any) => {
      return comment.userRole === "customer";
    });

    let sumRating = filterComment?.reduce(
      (accumulator: number, currentValue: any) => {
        return accumulator + currentValue.rating;
      },
      0
    );
    if (sumRating === 0 || isNaN(sumRating)) {
      return "No Rating";
    } else {
      return (sumRating / filterComment?.length).toFixed(1);
    }
  };

  const totalComment = () => {
    let filterComment = comments?.filter((comment: any) => {
      return comment.userRole === "customer";
    });
    return filterComment.length;
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
                  <div className={styles["product-rating"]}>
                    <span>Rating:</span>
                    <div className={styles["rating-section"]}>
                      {averageRating()}
                      <i className="fa-solid fa-star"></i>
                      <span>({totalComment()} reviews)</span>
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
            className="container text-center"
            style={{ marginTop: 50, marginBottom: 50 }}
          >
            <div className={styles["comment-heading"]}>
              <h3 className={styles["user-comment-product"]}>
                {comments?.length} comments
              </h3>

              {getLoginData.role !== "admin" && (
                <div>
                  <span className={styles["rating-text"]}>Rating: </span>
                  <Rate
                    allowHalf
                    value={rateValue}
                    onChange={handleRateChange}
                  />
                </div>
              )}
            </div>

            <div className={styles["comment-input"]}>
              <Editor
                init={editorConfig}
                onEditorChange={handleEditorChange}
                value={editorContent}
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
              {products &&
                products.comments?.map((item: any) => {
                  return (
                    <section className={styles["product-comment-item"]}>
                      <div className={styles["user-comment-info"]}>
                        <img
                          src={
                            getLoginData.avatar ? getLoginData.avatar : avatar
                          }
                          alt=""
                          className={styles["user-avatar"]}
                        />

                        <span>{item.userName.split(" ")[0]}</span>
                        {item.userRole === "admin" ? (
                          <Badge bg="success">Admin</Badge>
                        ) : item.order_history?.length !== 0 ? (
                          <Badge bg="warning" text="dark">
                            Customer
                          </Badge>
                        ) : (
                          ""
                        )}
                        {item.userRole !== "admin" && (
                          <span className={styles["rating-section"]}>
                            {item.rating}
                            <i className="fa-solid fa-star"></i>
                          </span>
                        )}
                        {user?.role === "admin" && (
                          <Button
                            type="primary"
                            className={styles["delete-comment-btn"]}
                            onClick={() => handleDeleteComment(item.commentId)}
                          >
                            Delete
                          </Button>
                        )}
                      </div>
                      <div>
                        <div className={styles["comment-content-headline"]}>
                          <div>
                            <Badge bg="primary">{item.date}</Badge>
                          </div>
                        </div>
                        <div
                          className={`${styles["comment-content"]} ${styles["comment-scrollable"]}`}
                        >
                          {React.createElement("div", {
                            dangerouslySetInnerHTML: { __html: item.content },
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
