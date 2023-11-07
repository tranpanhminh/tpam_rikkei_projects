import jwtDecode from "jwt-decode";
import React, { useEffect, useState } from "react";
import styles from "../BlogPost.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { Badge, Button, Form } from "react-bootstrap";
import { useParams } from "react-router-dom"; // Import useParams để lấy giá trị slug từ URL
import Page404 from "../../../../common/NotFoundPage/404";
import { getAllPosts, getDetailPost } from "../../../../../api/posts.api";
import { getDataLogin } from "../../../../../api/users.api";
const moment = require("moment");

// --------------------------------------------------

function BlogPost() {
  const [user, setUser] = useState<any>(null);
  const { postId } = useParams(); // Lấy giá trị slug từ URL
  const [post, setPost] = useState<any>(null);
  const [allPosts, setAllPosts] = useState<any>(null);

  const fetchUser = async () => {
    const result = await getDataLogin();
    setUser(result);
  };

  const fetchPost = async () => {
    const result = await getDetailPost(postId);
    return setPost(result);
  };

  const fetchAllPosts = async () => {
    const result = await getAllPosts();
    return setAllPosts(result);
  };
  useEffect(() => {
    fetchUser();
    fetchPost();
    fetchAllPosts();
  }, [postId]);

  document.title = `${post ? `${post?.title} | PetShop` : "Loading..."}`;

  return (
    <>
      {post &&
      post?.status_id === 1 &&
      user?.user_roles?.name === "Customer" ? (
        <Page404 />
      ) : (
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
              {((user && user?.role_id == 1) ||
                (user && user?.role_id == 2)) && (
                <NavLink
                  to={`/admin/manage-posts/?edit-postId=${postId}`}
                  target="_blank"
                >
                  <Badge bg="primary" style={{ fontSize: "16px" }}>
                    Edit Post
                  </Badge>
                </NavLink>
              )}
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
                if (post?.post_statuses?.name === "Published") {
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
      )}
    </>
  );
}

export default BlogPost;
