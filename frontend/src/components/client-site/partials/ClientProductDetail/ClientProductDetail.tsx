import { io } from "socket.io-client";
import React, { useEffect, useState } from "react";
import styles from "../../ClientPage.module.css";
import ReactPaginate from "react-paginate";
import ClipLoader from "react-spinners/ClipLoader";
import LazyLoad from "react-lazy-load";
import {
  NavLink,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { Button, Modal } from "antd";
import {} from "antd";
import { Rate } from "antd";
import { Editor } from "@tinymce/tinymce-react";
import { Badge } from "react-bootstrap";
import tinymce from "tinymce";
import { getDataLogin } from "../../../../api/users.api";
import {
  addProductComment,
  deleteProductComment,
  getAllCommentsByProduct,
} from "../../../../api/productComments.api";
import { addProductToCart } from "../../../../api/carts.api";
import { getDetailProduct } from "../../../../api/products.api";
import Page404 from "../../../common/NotFoundPage/404";
const socket = io(`${process.env.REACT_APP_BACK_END}`);
const moment = require("moment");

// ----------------------------------------------------------------------
function ClientProductDetail() {
  // List States
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { productId } = useParams();
  const [productComments, setProductComments] = useState<any>([]);
  const [product, setProduct] = useState<any>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [userComment, setUserComment] = useState<any>({
    comment: "",
    rating: 5,
  });

  // --------------------------------------------------------
  // Get User
  const fetchUser = async () => {
    const result = await getDataLogin();
    return setUser(result);
  };

  useEffect(() => {
    fetchUser();
  }, []);

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
  const fetchProduct = async () => {
    const result = await getDetailProduct(productId);
    return setProduct(result);
  };

  const fetchProductComments = async () => {
    const result = await getAllCommentsByProduct(productId);
    return setProductComments(result);
  };

  useEffect(() => {
    fetchProduct();
    fetchUser();
    fetchProductComments();

    socket.on("newProductComment", () => {
      fetchProduct();
      // fetchUser();
      fetchProductComments();
    });

    socket.on("deleteProductComment", () => {
      fetchProduct();
      // fetchUser();
      fetchProductComments();
    });
    return () => {
      socket.off();
    };
  }, []);

  document.title = `${product ? `${product?.name} | PetShop` : "Loading..."}`;

  // --------------------------------------------------------

  // Add To Cart
  const handleAddToCart = async () => {
    const dataCart = {
      quantity: quantity,
    };
    const result = await addProductToCart(productId, user.id, dataCart);
    return result;
  };
  // --------------------------------------------------------

  // Add Comment
  const handleComment = async () => {
    const result = await addProductComment(productId, user.id, userComment);
    if (result) {
      setUserComment({
        comment: "",
        rating: 5,
      });
      const editor = tinymce.get("editorID");
      if (editor) {
        // Đặt nội dung của trình soạn thảo về trạng thái trống
        editor.setContent("");
      }
      fetchProduct();
      fetchProductComments();
      socket.emit("newProductComment");
    }
  };

  // Function Delete Comment
  const handleDeleteComment = async (commentId: number) => {
    const result = await deleteProductComment(commentId);
    if (result) {
      fetchProductComments();
      socket.emit("deleteProductComment");
    }
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

  const checkShowDeleteCommentBtn = () => {
    if ((user && user?.role_id === 1) || (user && user?.role_id === 2)) {
      return true;
    }
    return false;
  };

  // Pagination
  const itemsPerPage = Number(searchParams.get("limit")) || 5;
  // const itemsPerPage = 5;
  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(productComments.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(productComments?.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, productComments]);

  const handlePageClick = (event: any) => {
    const newPage = event.selected + 1;
    const newOffset = event.selected * itemsPerPage;
    setItemOffset(newOffset);
    navigate(`/products/${productId}?page=${newPage}&limit=${itemsPerPage}`);
  };

  // --------------------------------------------------------
  if (product === null) {
    return (
      <div
        className={styles["product-detail"]}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          style={{ width: "200px" }}
          src="https://media.tenor.com/JBgYqrobdxsAAAAi/loading.gif"
          alt=""
        />
      </div>
    );
  }
  if (product) {
    return (
      <>
        {product && (
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
                          src={product && product?.product_images[0]?.image_url}
                          alt=""
                        />
                      </div>
                      <div className="col">
                        <img
                          src={product && product?.product_images[1]?.image_url}
                          alt=""
                        />
                      </div>
                      <div className="col">
                        <img
                          src={product && product?.product_images[2]?.image_url}
                          alt=""
                        />
                      </div>
                      <div className="col">
                        <img
                          src={product && product?.product_images[3]?.image_url}
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-4 col-sm-12">
                  <div className={styles["product-detail-info"]}>
                    <h2 className={styles["product-title-name"]}>
                      {product && product.name}
                    </h2>
                    {(user?.role_id === 1 || user?.role_id === 2) && (
                      <div className={styles["editor-post-bar"]}>
                        <NavLink
                          to={`/admin/manage-products/?edit-productId=${product.id}`}
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
                        dangerouslySetInnerHTML: {
                          __html: product.description,
                        },
                      })}
                    </p>
                    <div className={styles["product-price"]}>
                      <span>Price</span>
                      <span>${product && product.price.toLocaleString()}</span>
                    </div>
                    <div className={styles["product-vendor"]}>
                      <span>Vendor:</span>
                      <span>{product && product.vendors?.name}</span>
                    </div>
                    <div className={styles["product-sku"]}>
                      <span>Stock:</span>
                      <span>{product && product.quantity_stock}</span>
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
                        {product.avg_rating}
                        <i className="fa-solid fa-star"></i>
                        <span>({product.total_reviews} reviews)</span>
                      </div>
                    </div>
                    <button
                      className={styles["product-detail-page-add-to-cart-btn"]}
                      onClick={() => {
                        user ? handleAddToCart() : showModal();
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
                        Please <NavLink to="/login">Login</NavLink> to buy
                        Product
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
                  {user ? (
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
              {productComments.length !== 0 ? (
                <div
                  className={`${styles["main-content-comment"]} ${styles["comment-scrollable"]}`}
                >
                  {currentItems &&
                    currentItems?.map((item: any) => {
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
                                className={
                                  styles["comment-content-headline-item"]
                                }
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
                                dangerouslySetInnerHTML: {
                                  __html: item?.comment,
                                },
                              })}
                            </div>
                          </div>
                        </section>
                      );
                    })}
                  <div className={styles["pagination-form"]}>
                    <ReactPaginate
                      breakLabel="..."
                      nextLabel="next >"
                      previousLabel="< previous"
                      renderOnZeroPageCount={null}
                      pageRangeDisplayed={5}
                      pageCount={pageCount}
                      onPageChange={handlePageClick}
                      containerClassName="pagination"
                      pageLinkClassName="page-number"
                      previousLinkClassName="page-number"
                      nextLinkClassName="page-number"
                      activeLinkClassName={styles["active"]}
                    />
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return <Page404 />;
  }
}

export default ClientProductDetail;
