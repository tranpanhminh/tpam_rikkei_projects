import React, { useEffect, useState } from "react";
import styles from "../BlogPost.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { Pagination } from "antd";
import axios from "axios";
import { useParams } from "react-router-dom"; // Import useParams để lấy giá trị slug từ URL

function BlogPost() {
  const [searchTerm, setSearchTerm] = useState("");
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
  }, []);

  const navigate = useNavigate();
  const handleSearch = () => {
    navigate(`/search/${searchTerm}`);
  };

  return (
    <>
      <div className={styles["post-content-section"]}>
        <div className={styles["main-content-section"]}>
          <h1 className={styles["post-title"]}>{post?.post_title}</h1>
          <div className={styles["post-thumbnail"]}>
            <img
              src={post?.image_url}
              alt=""
              className={styles["post-thumbnail-image"]}
            />
          </div>
          <section className={styles["post-content"]}>
            {/* {post?.post_content} */}
            <h2>
              1. Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id,
              turpis.
            </h2>

            <h3>
              Integer aliquet, massa id lobortis convallis, tortor risus dapibus
              augue, vel accumsan tellus nisi eu orci.
            </h3>

            <h3>
              Mauris lacinia sapien quis libero. Nullam sit amet turpis
              elementum ligula vehicula consequat.
            </h3>

            <h3>
              Morbi a ipsum. Integer a nibh. In quis justo. Maecenas rhoncus
              aliquam lacus.
            </h3>

            <h3>
              Morbi quis tortor id nulla ultrices aliquet. Maecenas leo odio,
              condimentum id, luctus nec, molestie sed, justo.
            </h3>

            <ul>
              <li>Pellentesque viverra pede ac diam.</li>
              <li>Cras pellentesque volutpat dui.</li>
              <li>
                Maecenas tristique, est et tempus semper, est quam pharetra
                magna, ac consequat metus sapien ut nunc.
              </li>
              <li>
                Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
                posuere cubilia Curae;
              </li>
            </ul>

            <h2>
              Donec pharetra, magna vestibulum aliquet ultrices, erat tortor
              sollicitudin mi, sit amet lobortis sapien sapien non mi.
            </h2>

            <h3>
              Integer ac neque. Duis bibendum. Morbi non quam nec dui luctus
              rutrum. Nulla tellus.
            </h3>

            <h3>
              In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet
              at, feugiat non, pretium quis, lectus.
            </h3>

            <h3>
              Suspendisse potenti. In eleifend quam a odio. In hac habitasse
              platea dictumst. Maecenas ut massa quis augue luctus tincidunt.
            </h3>

            <ul>
              <li>Nulla mollis molestie lorem.</li>
              <li>Quisque ut erat.</li>
              <li>Curabitur gravida nisi at nibh.</li>
            </ul>

            <h3>
              In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin
              vitae, consectetuer eget, rutrum at, lorem.
            </h3>

            <h2>
              Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut,
              suscipit a, feugiat et, eros.
            </h2>

            <h3>
              Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue,
              diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat
              sapien arcu sed augue.
            </h3>
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
            {allPosts &&
              allPosts.slice(0, 3).map((post: any) => {
                return (
                  <div className={styles["related-post-item"]}>
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
                        {/* {Array.from(post.post_title).slice(0, 50).join("")} */}
                      </h2>
                    </NavLink>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
}

export default BlogPost;
