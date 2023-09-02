import React, { useEffect, useState } from "react";
import styles from "../ClientPost/BlogPost.module.css";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { Pagination } from "antd";
import axios from "axios";

function BlogPost() {
  const [searchTerm, setSearchTerm] = useState("");
  const [listPosts, setListPosts] = useState<any>([]);
  const [listProducts, setListProducts] = useState<any>([]);
  const [listServices, setListServices] = useState<any>([]);

  const fetchProducts = () => {
    axios
      .get(`http://localhost:7373/products`)
      .then((response) => {
        setListProducts(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const fetchPosts = () => {
    axios
      .get(`http://localhost:7373/posts`)
      .then((response) => {
        setListPosts(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const fetchServices = () => {
    axios
      .get(`http://localhost:7373/products`)
      .then((response) => {
        setListServices(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    fetchPosts();
    fetchProducts();
    fetchServices();
  }, []);

  const navigate = useNavigate();
  const handleSearch = () => {
    navigate(`/search/${searchTerm}`);
  };
  return (
    <>
      <div className={styles["wrap-blog"]}>
        <div className={styles["list-blogs"]}>
          {listPosts &&
            listPosts.map((post: any) => {
              return (
                <>
                  <div className={styles["post-item"]}>
                    <div className={styles["post-thumbnail-item"]}>
                      <img
                        src={post.image_url}
                        alt=""
                        className={styles["img-thumbnail-item"]}
                      />
                    </div>

                    <div className={styles["post-item-content"]}>
                      <h2 className={styles["post-item-title"]}>
                        {post.post_title}
                      </h2>
                      <span className={styles["post-item-description"]}>
                        {Array.from(post.post_content).slice(0, 200).join("")}
                      </span>
                      <div>
                        <Button variant="primary">Read More</Button>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}

          <div className={styles["blogs-post-pagination"]}>
            <Pagination defaultCurrent={6} total={500} />
          </div>
        </div>

        <div className={styles["blog-sidebar"]}>
          <div>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                value={searchTerm}
                onChange={(event) => {
                  setSearchTerm(event.target.value);
                }}
              />
              <Button variant="outline-success" onClick={handleSearch}>
                Search
              </Button>
            </Form>
          </div>

          <div>
            <p>Products</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default BlogPost;
