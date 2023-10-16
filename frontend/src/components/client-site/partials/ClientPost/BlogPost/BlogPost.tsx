import jwtDecode from "jwt-decode";
import React, { useEffect, useState } from "react";
import styles from "../BlogPost.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { Badge, Button, Form } from "react-bootstrap";
import { Pagination } from "antd";
import axios from "axios";
import { useParams } from "react-router-dom"; // Import useParams để lấy giá trị slug từ URL
import Page404 from "../../../../common/NotFoundPage/404";
const moment = require("moment");

// Import API
// 1, Posts API
const postsAPI = process.env.REACT_APP_API_POSTS;

// --------------------------------------------------

function BlogPost() {
  const navigate = useNavigate();
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
  const { postId } = useParams(); // Lấy giá trị slug từ URL
  const [post, setPost] = useState<any>(null);
  const [allPosts, setAllPosts] = useState<any>(null);

  const fetchPost = () => {
    axios
      .get(`${postsAPI}/detail/${postId}`)
      .then((response) => {
        setPost(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const fetchAllPosts = () => {
    axios
      .get(`${postsAPI}`)
      .then((response) => {
        setAllPosts(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    fetchPost();
    fetchAllPosts();
  }, [postId]);

  document.title = `${post ? `${post?.title} | PetShop` : "Loading..."}`;

  return (
    <>
      {post &&
      post?.status_id === 1 &&
      (data?.role_id === 1 || data?.role_id === 2) ? (
        <div className={styles["post-content-section"]}>
          <div className={styles["main-content-section"]}>
            <h1 className={styles["post-title"]} id="post_title">
              {post?.title}
            </h1>
            <div className={styles["post-thumbnail"]}>
              <img
                src={post?.thumbnail_url}
                alt=""
                className={styles["post-thumbnail-image"]}
              />
            </div>

            <div className={styles["editor-post-bar"]}>
              <div>
                <Badge bg="warning" text="dark" style={{ fontSize: "13px" }}>
                  Published Date: &nbsp;
                  {moment(post?.created_at).format("YYYY-MM-DD-hh:mm:ss")}
                </Badge>
              </div>
              {data?.role_id === 1 ||
                (data?.role_id === 2 && (
                  <NavLink
                    to={`/admin/manage-posts/?edit-postId=${postId}`}
                    target="_blank"
                  >
                    <Badge bg="primary" style={{ fontSize: "16px" }}>
                      Edit Post
                    </Badge>
                  </NavLink>
                ))}
            </div>

            <section className={styles["post-content"]}>
              {React.createElement("div", {
                dangerouslySetInnerHTML: { __html: post?.content },
              })}
            </section>
          </div>

          <section className={styles["writer-moderator"]}>
            <section className={styles["fast-checked"]}>
              <div>
                <img
                  className={styles["moderator-thumbnail"]}
                  src="https://rabbunny.com/wp-content/uploads/2023/06/Barney-Gordon.jpg"
                  alt="Fact Checked"
                />
              </div>
              <div className={styles["moderator-info"]}>
                <span className={styles["fact-check-icon"]}>
                  <span className={styles["fact-check-text"]}>
                    ✅ Fact-Checked by
                  </span>
                </span>
                <p className={styles["moderator-check"]}>
                  <b>{post?.author}</b>
                </p>
                <p className={styles["moderator-check"]}>
                  Veterinarian, Content Moderator
                </p>
              </div>
            </section>
          </section>

          <div className={styles["related-post"]}>
            <span className={styles["related-post-headline"]}>
              Related Content
            </span>
            <div className={styles["related-post-group"]}>
              {allPosts?.slice(0, 3).map((post: any) => {
                if (post.post_status.name === "Published") {
                  return (
                    <div className={styles["related-post-item"]} key={post.id}>
                      <div className={styles["related-post-thumbnail-item"]}>
                        <img
                          src={post.thumbnail_url}
                          alt=""
                          className={styles["img-thumbnail-related-post"]}
                        />
                      </div>

                      <NavLink to={`/blogs/${post.id}`}>
                        <h2 className={styles["related-post-title"]}>
                          {post.title}
                        </h2>
                      </NavLink>
                    </div>
                  );
                }
                return null; // Xử lý cho trường hợp post.status không phải là "Published"
              })}
            </div>
          </div>
        </div>
      ) : (
        <Page404 />
      )}
    </>
  );
}

export default BlogPost;
