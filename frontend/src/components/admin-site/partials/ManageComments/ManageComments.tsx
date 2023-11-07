import React, { useEffect, useState } from "react";
import styles from "../../AdminPage.module.css";
import { Button, notification } from "antd";
import { NavLink } from "react-router-dom";
import { Badge } from "react-bootstrap";
import {
  deleteProductComment,
  getAllProductComments,
} from "../../../../api/productComments.api";
import {
  deleteServiceComment,
  getAllServiceComments,
} from "../../../../api/serviceComments.api";
const moment = require("moment");

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
    const result = await getAllProductComments();
    return setProductComments(result);
  };

  // Fecth Service Comments
  const fetchServiceComments = async () => {
    const result = await getAllServiceComments();
    return setServiceComments(result);
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
  const handleDeleteComment = async (id: number, commentType: string) => {
    if (commentType === "product") {
      const result = await deleteProductComment(id);
      if (result) {
        return fetchProductComments();
      }
    }
    if (commentType === "service") {
      const result = await deleteServiceComment(id);
      if (result) {
        return fetchServiceComments();
      }
    }
  };

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
                      <Badge bg={changeColor(comment.post_types?.name)}>
                        {comment.post_types?.name}
                      </Badge>
                    </td>
                    <td>
                      <NavLink
                        to={
                          comment?.post_types?.name === "Product"
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
                          comment?.post_types?.name === "Product"
                            ? () => handleDeleteComment(comment.id, "product")
                            : () => handleDeleteComment(comment.id, "service")
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
