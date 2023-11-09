import { useEffect, useState } from "react";
import styles from "../../AdminPage.module.css";
import { Button, message } from "antd";
import { Badge } from "react-bootstrap";
import DetailPostButton from "./DetailPost/DetailPostButton";
import AddPostButton from "./AddPost/AddPostButton";
import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import { deletePost, getAllPosts } from "../../../../api/posts.api";
import ReactPaginate from "react-paginate";
const moment = require("moment");

// ------------------------------------------------

function ManagePosts() {
  document.title = "Manage Posts | PetShop";
  const [searchText, setSearchText] = useState<string>("");
  const [messageApi, contextHolder] = message.useMessage();
  const [posts, setPosts] = useState<any>([]);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  // Fetch API
  const fetchPosts = async () => {
    const result = await getAllPosts();
    return setPosts(result);
  };

  useEffect(() => {
    fetchPosts();
  }, []);
  // ------------------------------------------------

  // Handle Search
  const handleSearchPosts = () => {
    if (!searchText) {
      // Nếu searchText rỗng, gọi lại fetchUsers để lấy tất cả người dùng
      fetchPosts();
    } else {
      const filteredPosts = posts.filter((post: any) => {
        if (
          post.title.toLowerCase().includes(searchText.trim().toLowerCase())
        ) {
          return true;
        }
        return false;
      });

      setPosts(filteredPosts);
    }
  };

  // ------------------------------------------------

  // Function Delete Post
  const handleDeletePost = async (postId: number) => {
    messageApi.open({
      type: "loading",
      content: "Deleting...",
      duration: 0,
    });
    const result = await deletePost(postId);
    if (result) {
      fetchPosts();
      messageApi.destroy();
    }
  };
  // ------------------------------------------------

  // Function Update After Add Post
  const handleUpdatePost = () => {
    fetchPosts();
  };
  // ------------------------------------------------

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

  // Pagination
  const itemsPerPage = Number(searchParams.get("limit")) || 5;
  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(posts.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(posts.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, posts]);

  const handlePageClick = (event: any) => {
    const newPage = event.selected + 1;
    const newOffset = event.selected * itemsPerPage;
    setItemOffset(newOffset);
    navigate(`/admin/manage-posts?page=${newPage}&limit=${itemsPerPage}`);
  };

  return (
    <>
      {contextHolder}
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

        <AddPostButton handleClickOk={handleUpdatePost} />
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
              <th>Date</th>
              <th>Author</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentItems &&
              currentItems?.map((post: any, index: number) => {
                return (
                  <tr key={1}>
                    <td>{post?.id}</td>
                    <td>
                      <img src={post.thumbnail_url} alt="" />
                    </td>
                    <td>{post.title}</td>
                    <td>{moment(post.created_at).format("YYYY-MM-DD")}</td>
                    <td>{post.author}</td>
                    <td>
                      <Badge bg={`${changeColor(post?.post_statuses?.name)}`}>
                        {post?.post_statuses?.name}
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
                        getPostId={post.id}
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
      <div className={styles["pagination-form"]}>
        <ReactPaginate
          nextLabel="next >"
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          pageRangeDisplayed={13}
          pageCount={pageCount}
          onPageChange={handlePageClick}
          containerClassName="pagination"
          pageLinkClassName="page-number"
          previousLinkClassName="page-number"
          nextLinkClassName="page-number"
          activeLinkClassName={styles["active"]}
        />
      </div>
    </>
  );
}

export default ManagePosts;
