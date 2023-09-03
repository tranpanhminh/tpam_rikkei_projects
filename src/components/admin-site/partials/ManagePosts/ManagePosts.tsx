import React, { useEffect, useState } from "react";
import styles from "../../AdminPage.module.css";
import axios from "axios";
import { Button } from "antd";
import { Badge } from "react-bootstrap";
import DetailPostButton from "./DetailPosts/DetailPostButton";

function ManagePosts() {
  const [searchText, setSearchText] = useState<string>("");
  const [posts, setPosts] = useState<any>([]);

  const fetchPosts = () => {
    axios
      .get(`http://localhost:7373/posts/`)
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSearchPosts = () => {
    if (searchText === "") {
      // Nếu searchText rỗng, gọi lại fetchUsers để lấy tất cả người dùng
      fetchPosts();
    } else {
      // Nếu có searchText, thực hiện tìm kiếm và cập nhật state
      axios
        .get(`http://localhost:7373/posts`)
        .then((response) => {
          // Lấy dữ liệu từ response
          const allPosts = response.data;

          // Tìm kiếm trong dữ liệu và cập nhật state
          const filteredPosts = allPosts.filter((post: any) => {
            if (
              post.post_title
                .toLowerCase()
                .includes(searchText.trim().toLowerCase())
            ) {
              return true;
            }
            return false;
          });

          setPosts(filteredPosts);
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  };

  const changeColor = (status: string) => {
    switch (status) {
      case "Published":
        return "success";
      case "Draft":
        return "secondary";
      default:
        return;
    }
  };

  return (
    <>
      <div className={styles["breadcrumb"]}>
        <h2 className={styles["page-title"]}>Manage Posts</h2>
        <p className={styles["page-description"]}>PetShop Admin Panel</p>
      </div>

      <div className={styles["product-panel"]}>
        <div className="d-flex" role="search">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            id="search-bar"
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
          />
          <button
            className={`btn  ${styles["btn-outline-success"]}`}
            type="submit"
            id={styles["search-btn"]}
            onClick={handleSearchPosts}
          >
            Search
          </button>
        </div>
      </div>

      <div className={styles["main-content"]}>
        <h3 className={styles["main-title-content"]}>List Posts</h3>
        <table
          className="table table-striped"
          id={styles["table-products-manage-page"]}
        >
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {posts?.map((post: any, index: number) => {
              return (
                <tr key={1}>
                  <td>{index + 1}</td>
                  <td>{post.post_title}</td>
                  <td>
                    <Badge bg={`${changeColor(post.status)}`}>
                      {post.status}
                    </Badge>
                  </td>
                  <td className={styles["group-btn-admin-manage-posts"]}>
                    <DetailPostButton value="Detail" />
                    <Button
                      type="primary"
                      className={styles["delete-product-btn"]}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ManagePosts;
