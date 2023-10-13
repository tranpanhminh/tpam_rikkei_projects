import React, { useEffect, useState } from "react";
import styles from "../../AdminPage.module.css";
import axios from "axios";
import { Button, notification } from "antd";
import { Badge } from "react-bootstrap";
import DetailPostButton from "./DetailPost/DetailPostButton";
import AddPostButton from "./AddPost/AddPostButton";
import { NavLink, useNavigate } from "react-router-dom";

// Import API
// 1. Products API
const postsAPI = process.env.REACT_APP_API_POSTS;

// ------------------------------------------------

function ManagePosts() {
  document.title = "Manage Posts | PetShop";

  const [searchText, setSearchText] = useState<string>("");
  const [posts, setPosts] = useState<any>([]);
  const navigate = useNavigate();

  const fetchPosts = async () => {
    await axios
      .get(`${postsAPI}`)
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

  // Function Search Posts
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

  // Function Add Post
  const handleAddPost = () => {
    axios
      .get(`http://localhost:7373/posts/`)
      .then((response) => {
        fetchPosts();
        setPosts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Function Delete Post
  const handleDeletePost = (postId: number) => {
    axios
      .delete(`http://localhost:7373/posts/${postId}`)
      .then((response) => {
        fetchPosts();
        notification.success({
          message: "Post Deleted",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Function Update After Add Post
  const handleUpdatePost = () => {
    fetchPosts();
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
            id={styles["search-bar"]}
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

        <AddPostButton handleClickOk={handleAddPost} />
      </div>

      <div className={styles["main-content"]}>
        <h3 className={styles["main-title-content"]}>
          List Posts: {posts.length}
        </h3>
        <table
          className="table table-striped"
          id={styles["table-products-manage-page"]}
        >
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
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
                  <td>
                    <img src={post.thumbnail_url} alt="" />
                  </td>
                  <td>{post.title}</td>
                  <td>
                    <Badge bg={`${changeColor(post.post_status.name)}`}>
                      {post.post_status.name}
                    </Badge>
                  </td>
                  <td className={styles["group-btn-admin-manage-posts"]}>
                    <NavLink to={`/blogs/${post.id}`} target="_blank">
                      <Button
                        type="primary"
                        style={{ backgroundColor: "#0c337c" }}
                      >
                        View
                      </Button>
                    </NavLink>
                    <DetailPostButton
                      value="Detail"
                      getPost={post}
                      handleFunctionOk={handleUpdatePost}
                    />
                    <Button
                      type="primary"
                      className={styles["delete-product-btn"]}
                      onClick={() => handleDeletePost(post.id)}
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
