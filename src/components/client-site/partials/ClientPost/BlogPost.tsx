import React, { useEffect, useState } from "react";
import styles from "../ClientPost/BlogPost.module.css";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { Pagination } from "antd";
import axios from "axios";

function BlogPost() {
  const [searchTerm, setSearchTerm] = useState("");
  const [posts, setPosts] = useState<any>([]);
  const [total, setTotal] = useState<any>("");
  const [page, setPage] = useState<any>(1); // Đặt giá trị mặc định cho page
  const [postPerPage, setPostPerPage] = useState<any>(6);

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
        setPosts(response.data);
        setTotal(response.data.length);
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

  const indexOfLastPage = page + postPerPage;
  const indexOfFirstPage = indexOfLastPage - postPerPage;
  const currentPosts = posts.slice(indexOfFirstPage, indexOfLastPage);
  const onShowSizeChange = (current: any, pageSize: any) => {
    setPostPerPage(pageSize);
  };

  const handlePageChange = (value: number) => {
    setPage(value); // Cập nhật trang hiện tại
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
  return (
    <>
      <div className={styles["wrap-blog"]}>
        <div className={styles["list-blogs"]}>
          {currentPosts &&
            currentPosts.map((post: any) => {
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
