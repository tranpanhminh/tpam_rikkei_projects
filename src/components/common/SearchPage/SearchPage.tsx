import React, { useEffect, useState } from "react";
import styles from "../../client-site/ClientPage.module.css";
import { Product, Service } from "../../../database";
import axios from "axios";
import { NavLink, useNavigate, useParams } from "react-router-dom";

function SearchPage() {
  const navigate = useNavigate();
  const { searchTerm } = useParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [allProductService, setAllProductService] = useState<any>([]);
  console.log("Search Term", searchTerm);
  const fetchProducts = () => {
    axios
      .get("http://localhost:7373/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const fetchServices = () => {
    axios
      .get("http://localhost:7373/services")
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
  }, []);

  // useEffect(() => {
  //   setAllProductService([...products, ...services]);
  // }, [products, services]);

  // Kiểm tra Search Term
  // let filterProductService = allProductService.filter((item: any) => {
  //   return item.name.toLowerCase().includes(searchTerm?.trim().toLowerCase());
  // });
  // console.log(filterProductService);

  let filterProducts = products.filter((item: any) => {
    return item.name.toLowerCase().includes(searchTerm?.trim().toLowerCase());
  });

  let filterServices = services.filter((item: any) => {
    return item.name.toLowerCase().includes(searchTerm?.trim().toLowerCase());
  });

  return (
    <>
      <div
        className={styles["list-products"]}
        style={{
          marginTop: 0,
          marginBottom: 100,
        }}
      >
        <div className="container text-center">
          <div
            className="row align-items-start"
            id="container-product-homepage"
          >
            <h1 style={{ marginTop: 50 }}>Search: {searchTerm}</h1>
            <h4
              style={{
                marginTop: "50px",
                textAlign: "left",
                display: `${filterProducts.length !== 0 ? "" : "none"}`,
              }}
            >
              {filterProducts.length !== 0
                ? `Found ${filterProducts.length} products`
                : "No product found"}
            </h4>
            {filterProducts &&
              filterProducts.map((product) => {
                return (
                  <div
                    className={`col-12 col-sm-12 col-md-6 col-xl-3 mt-5 px-2 ${styles["product-card"]}`}
                  >
                    <div className={styles["card"]}>
                      <NavLink to={`/products/${product.id}`}>
                        <img
                          src={product.productImage[0]}
                          className={styles["card-img-top"]}
                          alt="..."
                        />
                      </NavLink>
                      <div className={styles["card-body"]}>
                        <NavLink to={`/products/${product.id}`}>
                          <h5 className={styles["product-title-name"]}>
                            {product && product.name}
                          </h5>
                        </NavLink>
                        <p className={styles["card-price"]}>
                          Price: ${product && product.price.toLocaleString()}
                        </p>
                      </div>
                      <div className={styles["card-foot"]}>
                        <button
                          onClick={() => navigate(`/products/${product.id}`)}
                          className={`${styles["btn"]} ${styles["btn-primary"]} ${styles["detail-btn"]}`}
                        >
                          Detail
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        <div className="container text-center">
          <h4
            style={{
              textAlign: "left",
              marginTop: "50px",
              marginBottom: "50px",
              display: `${filterServices.length !== 0 ? "" : "none"}`,
            }}
          >
            {filterServices.length !== 0
              ? `Found ${filterServices.length} servies`
              : "No service found"}
          </h4>
          <div
            className="row align-items-start"
            id="container-product-homepage"
          >
            <div className="container text-center">
              <div className="row align-items-start">
                {filterServices &&
                  filterServices.map((service) => {
                    return (
                      <div className="col-12 col-sm-12 col-md-6 col-xl-4 px-3 my-2">
                        <div className={styles["collection-item"]}>
                          <img
                            src={service.serviceImage}
                            alt=""
                            className="collection-image"
                          />
                          <div className={styles["collection-caption"]}>
                            <NavLink to={`/services/${service.id}`}>
                              <p className={styles["collection-title"]}>
                                {service.name}
                              </p>
                            </NavLink>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SearchPage;
