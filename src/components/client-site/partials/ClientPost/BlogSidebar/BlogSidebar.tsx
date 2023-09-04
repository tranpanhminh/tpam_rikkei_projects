import React, { useEffect, useState } from "react";
import styles from "../BlogPost.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { Pagination } from "antd";
import axios from "axios";
import { useParams } from "react-router-dom"; // Import useParams để lấy giá trị slug từ URL

function BlogSidebar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState<any>([]);
  const [services, setServices] = useState<any>([]);

  const navigate = useNavigate();
  const handleSearch = () => {
    navigate(`/search/${searchTerm}`);
  };

  const fetchProducts = () => {
    axios
      .get(`http://localhost:7373/products/`)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const fetchServices = () => {
    axios
      .get(`http://localhost:7373/services/`)
      .then((response) => {
        setServices(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    fetchProducts();
    fetchServices();
  });

  return (
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

      <div className={styles["sidebar-featured-product"]}>
        <h3 className={styles["sidebar-featured-product-headline"]}>
          Featured Products
        </h3>
        {products?.slice(0, 3).map((product: any) => {
          return (
            <div className={styles["sidebar-featured-product-item"]}>
              <NavLink to={`http://localhost:3000/products/${product.id}`}>
                <img src={product.productImage[0]} alt="" />
              </NavLink>

              <NavLink to={`http://localhost:3000/products/${product.id}`}>
                <p className={styles["sidebar-featured-product-name"]}>
                  {product.name}
                </p>
              </NavLink>
            </div>
          );
        })}
      </div>

      <div className={styles["sidebar-featured-product"]}>
        <h3 className={styles["sidebar-featured-product-headline"]}>
          Featured Services
        </h3>
        {services?.slice(0, 3).map((service: any) => {
          return (
            <div className={styles["sidebar-featured-product-item"]}>
              <NavLink to={`http://localhost:3000/services/${service.id}`}>
                <img src={service.serviceImage} alt="" />
              </NavLink>

              <NavLink to={`http://localhost:3000/products/${service.id}`}>
                <p className={styles["sidebar-featured-product-name"]}>
                  {service.name}
                </p>
              </NavLink>
            </div>
          );
        })}
      </div>

      <div className={styles["sidebar-featured-product"]}>
        <h3 className={styles["sidebar-featured-product-headline"]}>Banner</h3>
        <img
          className={styles["sidebar-banner-image"]}
          src="https://cdn.create.vista.com/downloads/9843fa52-e875-4557-86e2-c92a06787e27_640.jpeg"
          alt=""
        />
      </div>
    </div>
  );
}

export default BlogSidebar;
