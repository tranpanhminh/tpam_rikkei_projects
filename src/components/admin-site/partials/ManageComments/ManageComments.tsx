import React, { useCallback, useEffect, useState } from "react";
import { parse } from "date-fns";
import styles from "../../AdminPage.module.css";
import { Coupon } from "../../../../database"; // Import your data fetching and setting functions
import axios from "axios";
import { Button, notification } from "antd";
import { NavLink } from "react-router-dom";

function ManageComments() {
  const [searchText, setSearchText] = useState<string>("");
  const [listProducts, setListProducts] = useState<any>([]);
  const [productComments, setProductComments] = useState<any>([]);
  const [listServices, setListServices] = useState<any>([]);
  const [serviceComments, setServiceComments] = useState<any>([]);
  const [filteredComments, setFilteredComments] = useState<any>([]);

  let allComments: any[] = [];

  const fetchProducts = () => {
    axios
      .get(`http://localhost:7373/products`)
      .then((response) => {
        setListProducts(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const fetchServices = () => {
    axios
      .get(`http://localhost:7373/services`)
      .then((response) => {
        setListServices(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    fetchProducts();
    fetchServices();
  }, []);

  listProducts.forEach((product: any) => {
    allComments = [...allComments, ...product?.comments];
  });

  listServices.forEach((service: any) => {
    allComments = [...allComments, ...service?.comments];
  });
  console.log("All Comments", allComments);

  const handleSearchComment = () => {
    // Tìm kiếm dựa trên searchText và cập nhật filteredComments
    const filterComment = allComments.filter((comment) => {
      return comment.content
        .toString()
        .toLowerCase()
        .includes(searchText.trim().toLowerCase());
    });

    // Cập nhật trạng thái filteredComments với kết quả tìm kiếm
    setFilteredComments(filterComment);
  };

  function stripHTMLTags(html: any) {
    return html.replace(/<\/?[^>]+(>|$)/g, "");
  }

  // const handleDeleteComment = (
  //   id: number,
  //   commentId: number,
  //   commentType: string
  // ) => {
  //   // Xóa Comment của Product
  //   if (commentType === "product") {
  //     axios
  //       .get(`http://localhost:7373/products/${id}`)
  //       .then((response) => {
  //         setProductComments(response.data.comments);
  //       })
  //       .catch((error) => {
  //         console.log(error.message);
  //       });

  //     let findCommentIndex = productComments.findIndex((comment: any) => {
  //       return comment.commentId === commentId;
  //     });
  //     console.log(findCommentIndex);

  //     productComments.splice(findCommentIndex, 1);

  //     axios
  //       .patch(`http://localhost:7373/products/${id}`, {
  //         comments: productComments,
  //       })
  //       .then((response) => {
  //         fetchProducts();
  //         setProductComments(response.data.comments);
  //         notification.success({
  //           message: "Comment Deleted",
  //         });
  //       })
  //       .catch((error) => {
  //         console.log(error.message);
  //       });
  //     return;
  //   }

  //   // Xóa Comment của Service
  //   if (commentType === "service") {
  //     axios
  //       .get(`http://localhost:7373/services/${id}`)
  //       .then((response) => {
  //         setServiceComments(response.data.comments);
  //       })
  //       .catch((error) => {
  //         console.log(error.message);
  //       });

  //     let findCommentIndex = serviceComments.findIndex((comment: any) => {
  //       return comment.commentId === commentId;
  //     });
  //     console.log(findCommentIndex);

  //     serviceComments.splice(findCommentIndex, 1);

  //     axios
  //       .patch(`http://localhost:7373/services/${id}`, {
  //         comments: serviceComments,
  //       })
  //       .then((response) => {
  //         fetchServices();
  //         setServiceComments(response.data.comments);
  //         notification.success({
  //           message: "Comment Deleted",
  //         });
  //       })
  //       .catch((error) => {
  //         console.log(error.message);
  //       });
  //     return;
  //   }
  // };

  const handleDeleteComment = (
    id: number,
    commentId: number,
    commentType: string
  ) => {
    let updatedComments = []; // Danh sách comment đã được cập nhật

    // Xóa Comment của Product
    if (commentType === "product") {
      axios
        .get(`http://localhost:7373/products/${id}`)
        .then((response) => {
          // Lấy danh sách comment từ máy chủ
          const productComments = response.data.comments;

          // Loại bỏ comment cần xóa
          updatedComments = productComments.filter((comment: any) => {
            return comment.commentId !== commentId;
          });

          // Cập nhật trạng thái sản phẩm với danh sách mới
          setProductComments(updatedComments);

          // Gọi yêu cầu PATCH để cập nhật danh sách comment trên máy chủ
          axios
            .patch(`http://localhost:7373/products/${id}`, {
              comments: updatedComments,
            })
            .then((response) => {
              fetchProducts(); // Lấy sản phẩm lại để cập nhật dữ liệu
              notification.success({
                message: "Comment Deleted",
              });
            })
            .catch((error) => {
              console.log(error.message);
            });
        })
        .catch((error) => {
          console.log(error.message);
        });
    }

    // Tương tự cho việc xóa Comment của Service
    if (commentType === "service") {
      axios
        .get(`http://localhost:7373/services/${id}`)
        .then((response) => {
          const serviceComments = response.data.comments;
          updatedComments = serviceComments.filter((comment: any) => {
            return comment.commentId !== commentId;
          });
          setServiceComments(updatedComments);
          axios
            .patch(`http://localhost:7373/services/${id}`, {
              comments: updatedComments,
            })
            .then((response) => {
              fetchServices();
              notification.success({
                message: "Comment Deleted",
              });
            })
            .catch((error) => {
              console.log(error.message);
            });
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  };

  return (
    <>
      <div className={styles["breadcrumb"]}>
        <h2 className={styles["page-title"]}>Manage Comments</h2>
        <p className={styles["page-description"]}>PetShop Admin Panel</p>
      </div>

      <div className={styles["product-panel"]}>
        <div className="d-flex" role="search">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            id={styles["search-bar"]}
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
          />
          <button
            className={`btn  ${styles["btn-outline-success"]}`}
            type="submit"
            id={styles["search-btn"]}
            onClick={handleSearchComment}
          >
            Search
          </button>
        </div>
      </div>

      <div className={styles["main-content"]}>
        <h3 className={styles["main-title-content"]}>List Coupons</h3>
        <table className="table table-striped" id={styles["table-order-list"]}>
          <thead>
            <tr>
              <th>#</th>
              <th>Comment</th>
              <th>Url Comment</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {(filteredComments.length > 0 ? filteredComments : allComments).map(
              (comment: any, index: any) => {
                return (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{stripHTMLTags(comment.content)}</td>
                    <td>
                      {comment.type === "product" ? (
                        <NavLink
                          to={`/products/${comment.productId}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ textDecoration: "none" }}
                        >
                          Link
                        </NavLink>
                      ) : (
                        <NavLink
                          to={`/services/${comment.serviceId}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ textDecoration: "none" }}
                        >
                          Link
                        </NavLink>
                      )}
                    </td>
                    <td>{comment.date}</td>
                    <td>
                      <Button
                        type="primary"
                        className={styles["delete-product-btn"]}
                        onClick={
                          comment.type === "product"
                            ? () =>
                                handleDeleteComment(
                                  comment.productId,
                                  comment.commentId,
                                  comment.type
                                )
                            : () =>
                                handleDeleteComment(
                                  comment.serviceId,
                                  comment.commentId,
                                  comment.type
                                )
                        }
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
export default ManageComments;
