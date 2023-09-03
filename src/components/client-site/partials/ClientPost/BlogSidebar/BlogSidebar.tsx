import React, { useEffect, useState } from "react";
import styles from "../BlogPost.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { Pagination } from "antd";
import axios from "axios";
import { useParams } from "react-router-dom"; // Import useParams để lấy giá trị slug từ URL

function BlogSidebar() {
  const [searchTerm, setSearchTerm] = useState("");
  //   const [posts, setPosts] = useState<any>([]);
  //   const [total, setTotal] = useState<any>("");
  //   const [page, setPage] = useState<any>(1); // Đặt giá trị mặc định cho page
  //   const [postPerPage, setPostPerPage] = useState<any>(6);
  //   const { pageNumber } = useParams(); // Lấy giá trị slug từ URL

  //   const [listProducts, setListProducts] = useState<any>([]);
  //   const [listServices, setListServices] = useState<any>([]);

  //   const fetchProducts = () => {
  //     axios
  //       .get(`http://localhost:7373/products`)
  //       .then((response) => {
  //         setListProducts(response.data);
  //       })
  //       .catch((error) => {
  //         console.log(error.message);
  //       });
  //   };

  //   const fetchPosts = () => {
  //     axios
  //       .get(`http://localhost:7373/posts`)
  //       .then((response) => {
  //         setPosts(response.data);
  //         setTotal(response.data.length);
  //       })
  //       .catch((error) => {
  //         console.log(error.message);
  //       });
  //   };

  //   const fetchServices = () => {
  //     axios
  //       .get(`http://localhost:7373/products`)
  //       .then((response) => {
  //         setListServices(response.data);
  //       })
  //       .catch((error) => {
  //         console.log(error.message);
  //       });
  //   };

  //   useEffect(() => {
  //     fetchPosts();
  //     fetchProducts();
  //     fetchServices();
  //   }, []);

  const navigate = useNavigate();
  const handleSearch = () => {
    navigate(`/search/${searchTerm}`);
  };

  //   const indexOfLastPage = page + postPerPage;
  //   const indexOfFirstPage = indexOfLastPage - postPerPage;
  //   const currentPosts = posts.slice(indexOfFirstPage, indexOfLastPage);
  //   const onShowSizeChange = (current: any, pageSize: any) => {
  //     setPostPerPage(pageSize);
  //   };

  //   const handlePageChange = (value: number) => {
  //     setPage(value); // Cập nhật trang hiện tại
  //     window.history.replaceState({}, "", `/blogs/page/${value}`);
  //   };

  //   const itemRender = (current: any, type: any, originalElement: any) => {
  //     if (type === "prev") {
  //       return <a>Previous</a>;
  //     }
  //     if (type === "next") {
  //       return <a>Next</a>;
  //     }
  //     return originalElement;
  //   };
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
        <div className={styles["sidebar-featured-product-item"]}>
          <NavLink to="http://localhost:3000/products/1">
            <img
              src="https://tm-shopify037-clothes.myshopify.com/cdn/shop/products/blueberry_pet_essentials_zoo_fun_dog_collars_2_640x_crop_top.jpg?v=1625752583"
              alt=""
            />
          </NavLink>

          <NavLink to="http://localhost:3000/products/1">
            <p className={styles["sidebar-featured-product-name"]}>
              Blueberry Pet Essentials Zoo Fun Dog Collars
            </p>
          </NavLink>
        </div>

        <div className={styles["sidebar-featured-product-item"]}>
          <NavLink to="http://localhost:3000/products/2">
            <img
              src="https://tm-shopify037-clothes.myshopify.com/cdn/shop/products/glendan_dog_brush_cat_brush_slicker_pet_grooming_brush_shedding_grooming_tools_1_640x_crop_top.jpg?v=1625752641"
              alt=""
            />
          </NavLink>

          <NavLink to="http://localhost:3000/products/2">
            <p className={styles["sidebar-featured-product-name"]}>
              Glendan Dog Brush Cat Brush Slicker
            </p>
          </NavLink>
        </div>

        <div className={styles["sidebar-featured-product-item"]}>
          <NavLink to="http://localhost:3000/products/3">
            <img
              src="https://tm-shopify037-clothes.myshopify.com/cdn/shop/products/senye_retractable_dog_leash_16ft_dog_traction_rope_1_640x_crop_top.jpg?v=1625752616"
              alt=""
            />
          </NavLink>

          <NavLink to="http://localhost:3000/products/3">
            <p className={styles["sidebar-featured-product-name"]}>
              Senye Retractable Dog Leash 16ft Dog Traction Rope
            </p>
          </NavLink>
        </div>
      </div>

      <div className={styles["sidebar-featured-product"]}>
        <h3 className={styles["sidebar-featured-product-headline"]}>
          Featured Services
        </h3>
        <div className={styles["sidebar-featured-product-item"]}>
          <NavLink to="http://localhost:3000/services/1">
            <img src="https://i.ibb.co/2Y4LnrD/veterinary-service.jpg" alt="" />
          </NavLink>

          <NavLink to="http://localhost:3000/services/1">
            <p className={styles["sidebar-featured-product-name"]}>
              Veterinarian
            </p>
          </NavLink>
        </div>

        <div className={styles["sidebar-featured-product-item"]}>
          <NavLink to="http://localhost:3000/services/2">
            <img
              src="https://i.ibb.co/F5N9LXC/dog-grooming-service.jpg"
              alt=""
            />{" "}
          </NavLink>

          <NavLink to="http://localhost:3000/services/2">
            <p className={styles["sidebar-featured-product-name"]}>
              Pet Grooming
            </p>
          </NavLink>
        </div>

        <div className={styles["sidebar-featured-product-item"]}>
          <NavLink to="http://localhost:3000/services/3">
            <img
              src="https://i.ibb.co/PjQbR00/pet-sitting-service.png"
              alt=""
            />
          </NavLink>

          <NavLink to="http://localhost:3000/services/3">
            <p className={styles["sidebar-featured-product-name"]}>
              Pet Sitting
            </p>
          </NavLink>
        </div>
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
