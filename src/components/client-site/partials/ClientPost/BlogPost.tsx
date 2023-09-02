import React, { useState } from "react";
import styles from "../ClientPost/BlogPost.module.css";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { Pagination } from "antd";

function BlogPost() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const handleSearch = () => {
    navigate(`/search/${searchTerm}`);
  };
  return (
    <>
      <div className={styles["wrap-blog"]}>
        <div className={styles["list-blogs"]}>
          <div className={styles["post-item"]}>
            <div className={styles["post-thumbnail-item"]}>
              <img
                src="https://g.foolcdn.com/editorial/images/651176/shiba-inu-dogecoin-cryptocurrency-blockchain-network-getty.jpg"
                alt=""
                className={styles["img-thumbnail-item"]}
              />
            </div>

            <div className={styles["post-item-content"]}>
              <h2 className={styles["post-item-title"]}>
                Shiba Inu: Shytoshi Publishes 2nd Shibarium Blog
              </h2>
              <span className={styles["post-item-description"]}>
                The blog talks about The Breeds concept which is on the
                frontlines explaining to investors about the SHIB ecosystem’s
                developments. Explaining to investors about the SHIB ecosystem’s
                developments.
              </span>
              <div>
                <Button variant="primary">Read More</Button>
              </div>
            </div>
          </div>

          <div className={styles["post-item"]}>
            <div className={styles["post-thumbnail-item"]}>
              <img
                src="https://g.foolcdn.com/editorial/images/651176/shiba-inu-dogecoin-cryptocurrency-blockchain-network-getty.jpg"
                alt=""
                className={styles["img-thumbnail-item"]}
              />
            </div>

            <div className={styles["post-item-content"]}>
              <h2 className={styles["post-item-title"]}>
                Shiba Inu: Shytoshi Publishes 2nd Shibarium Blog
              </h2>
              <span className={styles["post-item-description"]}>
                The blog talks about The Breeds concept which is on the
                frontlines explaining to investors about the SHIB ecosystem’s
                developments. Explaining to investors about the SHIB ecosystem’s
                developments.
              </span>
              <div>
                <Button variant="primary">Read More</Button>
              </div>
            </div>
          </div>

          <div className={styles["post-item"]}>
            <div className={styles["post-thumbnail-item"]}>
              <img
                src="https://g.foolcdn.com/editorial/images/651176/shiba-inu-dogecoin-cryptocurrency-blockchain-network-getty.jpg"
                alt=""
                className={styles["img-thumbnail-item"]}
              />
            </div>

            <div className={styles["post-item-content"]}>
              <h2 className={styles["post-item-title"]}>
                Shiba Inu: Shytoshi Publishes 2nd Shibarium Blog
              </h2>
              <span className={styles["post-item-description"]}>
                The blog talks about The Breeds concept which is on the
                frontlines explaining to investors about the SHIB ecosystem’s
                developments. Explaining to investors about the SHIB ecosystem’s
                developments.
              </span>
              <div>
                <Button variant="primary">Read More</Button>
              </div>
            </div>
          </div>

          <div className={styles["post-item"]}>
            <div className={styles["post-thumbnail-item"]}>
              <img
                src="https://g.foolcdn.com/editorial/images/651176/shiba-inu-dogecoin-cryptocurrency-blockchain-network-getty.jpg"
                alt=""
                className={styles["img-thumbnail-item"]}
              />
            </div>

            <div className={styles["post-item-content"]}>
              <h2 className={styles["post-item-title"]}>
                Shiba Inu: Shytoshi Publishes 2nd Shibarium Blog
              </h2>
              <span className={styles["post-item-description"]}>
                The blog talks about The Breeds concept which is on the
                frontlines explaining to investors about the SHIB ecosystem’s
                developments. Explaining to investors about the SHIB ecosystem’s
                developments.
              </span>
              <div>
                <Button variant="primary">Read More</Button>
              </div>
            </div>
          </div>

          <div className={styles["post-item"]}>
            <div className={styles["post-thumbnail-item"]}>
              <img
                src="https://g.foolcdn.com/editorial/images/651176/shiba-inu-dogecoin-cryptocurrency-blockchain-network-getty.jpg"
                alt=""
                className={styles["img-thumbnail-item"]}
              />
            </div>

            <div className={styles["post-item-content"]}>
              <h2 className={styles["post-item-title"]}>
                Shiba Inu: Shytoshi Publishes 2nd Shibarium Blog
              </h2>
              <span className={styles["post-item-description"]}>
                The blog talks about The Breeds concept which is on the
                frontlines explaining to investors about the SHIB ecosystem’s
                developments. Explaining to investors about the SHIB ecosystem’s
                developments.
              </span>
              <div>
                <Button variant="primary">Read More</Button>
              </div>
            </div>
          </div>

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
        </div>
      </div>
    </>
  );
}

export default BlogPost;
