import React, { useCallback, useEffect, useState } from "react";
import { parse } from "date-fns";
import styles from "../../AdminPage.module.css";
import { Coupon } from "../../../../database"; // Import your data fetching and setting functions
import axios from "axios";
import { Button, notification } from "antd";
import { NavLink } from "react-router-dom";
import { Badge } from "react-bootstrap";
const moment = require("moment");

// Import API
// 1. Product Comments API
const postCommentsAPI = process.env.REACT_APP_API_PRODUCT_COMMENTS;

// 2. Service Comments API
const serviceCommentsAPI = process.env.REACT_APP_API_SERVICE_COMMENTS;

// ------------------------------------------------

function ManageComments() {
  document.title = "Manage Comments | PetShop";
  const [searchText, setSearchText] = useState<string>("");
  const [productComments, setProductComments] = useState<any>([]);
  const [serviceComments, setServiceComments] = useState<any>([]);
  const [filteredComments, setFilteredComments] = useState<any>([]);
  let allComments: any[] = [];
  // Fetch API
  // Fecth Product Comments
  const fetchProductComments = async () => {
    axios
      .get(`${postCommentsAPI}`)
      .then((response) => {
        setProductComments(response.data);
      })
      .then((error) => {
        console.log(error);
      });
  };

  // Fecth Service Comments
  const fetchServiceComments = async () => {
    axios
      .get(`${serviceCommentsAPI}`)
      .then((response) => {
        setServiceComments(response.data);
      })
      .then((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchProductComments();
    fetchServiceComments();
  }, []);
  // ------------------------------------------------

  allComments = productComments.concat(serviceComments);

  // Function Search Comment
  const handleSearchComment = () => {
    // Tìm kiếm dựa trên searchText và cập nhật filteredComments
    const filterComment = allComments.filter((comment) => {
      return comment.comment
        .toString()
        .toLowerCase()
        .includes(searchText.trim().toLowerCase());
    });

    // Cập nhật trạng thái filteredComments với kết quả tìm kiếm
    setFilteredComments(filterComment);
  };

  // Function Delete Comment
  const handleDeleteComment = (
    id: number,
    commentId: number,
    commentType: string
  ) => {};

  function stripHTMLTags(html: any) {
    return html.replace(/<\/?[^>]+(>|$)/g, "");
  }

  const changeColor = (type: string) => {
    switch (type) {
      case "Product":
        return "warning";
      case "Service":
        return "info";
      default:
        return;
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
        <h3 className={styles["main-title-content"]}>List Comments</h3>
        <table className="table table-striped" id={styles["table-order-list"]}>
          <thead>
            <tr>
              <th>#</th>
              <th>Comment</th>
              <th>Comment Type</th>
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
                    <td>
                      {stripHTMLTags(comment.comment).slice(0, 60) + "..."}
                    </td>
                    <td>
                      <Badge bg={changeColor(comment.post_type.name)}>
                        {comment.post_type.name}
                      </Badge>
                    </td>
                    <td>
                      <NavLink
                        to={
                          comment.post_type.name === "Product"
                            ? `/products/${comment.post_id}`
                            : `/services/${comment.post_id}`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ textDecoration: "none" }}
                      >
                        <Button type="primary">View</Button>
                      </NavLink>
                    </td>
                    <td>
                      {moment(comment.created_at).format("YYYY-MM-DD-hh:mm:ss")}
                    </td>
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
