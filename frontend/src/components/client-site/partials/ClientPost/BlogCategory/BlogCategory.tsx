import React, { useEffect, useState } from "react";
import styles from "../BlogPost.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { Pagination } from "antd";
import { useParams } from "react-router-dom"; // Import useParams để lấy giá trị slug từ URL
import { getAllPosts } from "../../../../../api/posts.api";

// --------------------------------------------------

function BlogCategory() {
  const [searchTerm, setSearchTerm] = useState("");
  const [posts, setPosts] = useState<any>([]);
  const [total, setTotal] = useState<any>("");
  const [page, setPage] = useState<any>(0); // Đặt giá trị mặc định cho page
  const [postPerPage, setPostPerPage] = useState<any>(7);
  const { pageNumber } = useParams(); // Lấy giá trị slug từ URL

  const fetchPosts = async () => {
    const result = await getAllPosts();
    setPosts(result);
    setTotal(result.length);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const navigate = useNavigate();
  const handleSearch = () => {
    navigate(`/search/${searchTerm}`);
  };

  const indexOfLastPage = page + postPerPage;
  const indexOfFirstPage = indexOfLastPage - postPerPage;
  const currentPosts = posts?.slice(indexOfFirstPage, indexOfLastPage);
  const onShowSizeChange = (current: any, pageSize: any) => {
    setPostPerPage(pageSize);
  };
  const handlePageChange = (value: number) => {
    setPage(value); // Cập nhật trang hiện tại
    window.scrollTo(0, 0);
    // window.history.replaceState({}, "", `/blogs/page/${value}`);
  };

  const itemRender = (current: any, type: any, originalElement: any) => {
    if (type === "prev") {
      return <a>Previous</a>;
    }
    if (type === "next") {
      return <a>Next</a>;
    }
    return originalElement;
  };

  function stripHTMLTags(html: any) {
    return html.replace(/<\/?[^>]+(>|$)/g, "");
  }
  return (
    <div className={styles["list-blogs"]}>
      {currentPosts &&
        currentPosts?.map((post: any) => {
          if (post.post_statuses.name === "Published") {
            return (
              <>
                <div className={styles["post-item"]}>
                  <NavLink to={`/blogs/${post.id}`}>
                    <div className={styles["post-thumbnail-item"]}>
                      <img
                        src={post.thumbnail_url}
                        alt=""
                        className={styles["img-thumbnail-item"]}
                      />
                    </div>
                  </NavLink>

                  <div className={styles["post-item-content"]}>
                    <NavLink to={`/blogs/${post.id}`}>
                      <h2 className={styles["post-item-title"]}>
                        {post.title}
                        {/* {Array.from(post.post_title).slice(0, 50).join("")} */}
                      </h2>
                    </NavLink>
                    <span className={styles["post-item-description"]}>
                      {/* {React.createElement("div", {
                        dangerouslySetInnerHTML: { __html: post?.post_content },
                      })} */}
                      {post?.content.length > 200 ? (
                        <div>
                          {stripHTMLTags(post?.content.slice(0, 200))}...
                        </div>
                      ) : (
                        <div
                          dangerouslySetInnerHTML={{
                            __html: post?.content,
                          }}
                        />
                      )}
                    </span>
                    <div>
                      <NavLink to={`/blogs/${post.id}`}>
                        <Button variant="primary">Read More</Button>
                      </NavLink>
                    </div>
                  </div>
                </div>
              </>
            );
          }
        })}

      <div className={styles["blogs-post-pagination"]}>
        <Pagination
          pageSize={postPerPage}
          total={total}
          current={page} // Sử dụng page để xác định trang hiện tại
          onChange={handlePageChange} // Sử dụng handlePageChange để cập nhật trang
          showSizeChanger
          showQuickJumper
          onShowSizeChange={onShowSizeChange}
          itemRender={itemRender}
        />
      </div>
    </div>
  );
}

export default BlogCategory;
