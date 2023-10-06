import React, { useEffect, useState } from "react";
import styles from "../BlogPost.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { Badge, Button, Form } from "react-bootstrap";
import { Pagination } from "antd";
import axios from "axios";
import { useParams } from "react-router-dom"; // Import useParams để lấy giá trị slug từ URL
import Page404 from "../../../../common/NotFoundPage/404";

function BlogPost() {
  const getData: any = localStorage.getItem("auth");
  const getLoginData = JSON.parse(getData) || "";
  const { postId } = useParams(); // Lấy giá trị slug từ URL
  const [post, setPost] = useState<any>(null);
  const [allPosts, setAllPosts] = useState<any>(null);

  const fetchPost = () => {
    axios
      .get(`http://localhost:7373/posts/${postId}`)
      .then((response) => {
        setPost(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const fetchAllPosts = () => {
    axios
      .get(`http://localhost:7373/posts/`)
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

  document.title = `${post ? `${post?.post_title} | PetShop` : "Loading..."}`;

  return (
    <>
      {/* <div className={styles["post-content-section"]}>
        <div className={styles["main-content-section"]}>
          <h1 className={styles["post-title"]} id="post_title">
            {post?.post_title}
          </h1>
          <div className={styles["post-thumbnail"]}>
            <img
              src={post?.image_url}
              alt=""
              className={styles["post-thumbnail-image"]}
            />
          </div>

          <div className={styles["editor-post-bar"]}>
            <div>
              <Badge bg="warning" text="dark" style={{ fontSize: "13px" }}>
                Published Date: {post?.publish_date}
              </Badge>
            </div>
            {getLoginData.role === "admin" && (
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
              dangerouslySetInnerHTML: { __html: post?.post_content },
            })}
          </section>
        </div>

        <section className={styles["writer-moderator"]}>
          <section className={styles["fast-checked"]}>
            <div>
              <img
                className={styles["moderator-thumbnail"]}
                src="https://rabbunny.com/wp-content/uploads/2023/06/Barney-Gordon.jpg"
                alt="Fact Checked by Barney Gordon"
              />
            </div>
            <div className={styles["moderator-info"]}>
              <span className={styles["fact-check-icon"]}>
                <span className={styles["fact-check-text"]}>
                  ✅ Fact-Checked by
                </span>
              </span>
              <p className={styles["moderator-check"]}>
                <b>Barney Gordon</b>
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
              if (post.status === "Published") {
                return (
                  <div className={styles["related-post-item"]} key={post.id}>
                    <div className={styles["related-post-thumbnail-item"]}>
                      <img
                        src={post.image_url}
                        alt=""
                        className={styles["img-thumbnail-related-post"]}
                      />
                    </div>

                    <NavLink to={`/blogs/${post.id}`}>
                      <h2 className={styles["related-post-title"]}>
                        {post.post_title}
                      </h2>
                    </NavLink>
                  </div>
                );
              }
              return null; // Xử lý cho trường hợp post.status không phải là "Published"
            })}
          </div>
        </div>
      </div> */}

      {(post && post.status === "Draft" && getLoginData.role !== "admin") ||
      !post?.id ? (
        // <Page404 />
        <Page404 />
      ) : (
        <div className={styles["post-content-section"]}>
          <div className={styles["main-content-section"]}>
            <h1 className={styles["post-title"]} id="post_title">
              {post?.post_title}
            </h1>
            <div className={styles["post-thumbnail"]}>
              <img
                src={post?.image_url}
                alt=""
                className={styles["post-thumbnail-image"]}
              />
            </div>

            <div className={styles["editor-post-bar"]}>
              <div>
                <Badge bg="warning" text="dark" style={{ fontSize: "13px" }}>
                  Published Date: {post?.publish_date}
                </Badge>
              </div>
              {getLoginData.role === "admin" && (
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
                dangerouslySetInnerHTML: { __html: post?.post_content },
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
                  <b>{post.author}</b>
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
                if (post.status === "Published") {
                  return (
                    <div className={styles["related-post-item"]} key={post.id}>
                      <div className={styles["related-post-thumbnail-item"]}>
                        <img
                          src={post.image_url}
                          alt=""
                          className={styles["img-thumbnail-related-post"]}
                        />
                      </div>

                      <NavLink to={`/blogs/${post.id}`}>
                        <h2 className={styles["related-post-title"]}>
                          {post.post_title}
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