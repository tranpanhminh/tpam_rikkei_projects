import React, { useEffect, useState } from "react";
import styles from "../../client-site/ClientPage.module.css";
import { Product, Service } from "../../../database";
import axios from "axios";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import ReactPaginate from "react-paginate";

// Import API
const productsAPI = process.env.REACT_APP_API_PRODUCTS;
const servicesAPI = process.env.REACT_APP_API_SERVICES;

// -------------------------------------------------

function SearchPage() {
  const navigate = useNavigate();
  const { searchTerm } = useParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [productItems, setProductsItems] = useState<any>([]);
  const [pageProductCount, setPageProductCount] = useState(0);
  const [itemProductOffset, setItemProductOffset] = useState(0);
  const [serviceItems, setServicesItems] = useState<any>([]);
  const [pageServiceCount, setPageServiceCount] = useState(0);
  const [itemServiceOffset, setItemServiceOffset] = useState(0);

  const fetchProducts = () => {
    axios
      .get(`${productsAPI}`)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const fetchServices = () => {
    axios
      .get(`${servicesAPI}`)
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

  document.title = `${
    searchTerm ? `Search: ${searchTerm} | PetShop` : "Loading..."
  }`;

  let filterProducts: any = products.filter((item: any) => {
    return item.name.toLowerCase().includes(searchTerm?.trim().toLowerCase());
  });

  let filterServices = services.filter((item: any) => {
    return item.name.toLowerCase().includes(searchTerm?.trim().toLowerCase());
  });

  // Pagination Products
  // const itemsPerPage = Number(searchParams.get("limit")) || 5;
  const itemsPerPage = 4;
  useEffect(() => {
    const endProductOffset = itemProductOffset + itemsPerPage;
    setProductsItems(filterProducts.slice(itemProductOffset, endProductOffset));
    setPageProductCount(Math.ceil(filterProducts.length / itemsPerPage));
  }, [itemProductOffset, itemsPerPage, filterProducts]);

  const handlePageProductClick = (event: any) => {
    const newProductOffset = event.selected * itemsPerPage;
    setItemProductOffset(newProductOffset);
  };

  // Pagination Services
  // const itemsPerPage = Number(searchParams.get("limit")) || 5;
  useEffect(() => {
    const endServiceOffset = itemProductOffset + itemsPerPage;
    setServicesItems(filterServices.slice(itemServiceOffset, endServiceOffset));
    setPageServiceCount(Math.ceil(filterServices.length / itemsPerPage));
  }, [itemServiceOffset, itemsPerPage, filterServices]);

  const handlePageServiceClick = (event: any) => {
    const newServiceOffset = event.selected * itemsPerPage;
    setItemServiceOffset(newServiceOffset);
  };

  function stripHTMLTags(html: any) {
    return html.replace(/<\/?[^>]+(>|$)/g, "");
  }

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
                // display: `${filterProducts.length !== 0 ? "" : "none"}`,
              }}
            >
              {filterProducts.length !== 0
                ? `Found ${filterProducts.length} products`
                : "No product found"}
            </h4>
            {productItems &&
              productItems.map((product: any) => {
                return (
                  <div
                    className={`col-12 col-sm-12 col-md-6 col-xl-3 mt-5 px-2 ${styles["product-card"]}`}
                  >
                    <div className={styles["card"]}>
                      <NavLink to={`/products/${product.id}`}>
                        <img
                          src={product.thumbnail_url}
                          className={styles["card-img-top"]}
                          alt="..."
                        />
                      </NavLink>
                      <div className={styles["card-body"]}>
                        <NavLink to={`/products/${product.id}`}>
                          <h5 className={styles["product-title-name"]}>
                            {stripHTMLTags(product && product.name).slice(
                              0,
                              50
                            ) + "..."}
                          </h5>
                        </NavLink>
                        <p className={styles["card-price"]}>
                          Price: ${product && product?.price.toLocaleString()}
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
          <div className={styles["pagination-form"]}>
            <ReactPaginate
              breakLabel="..."
              nextLabel="next >"
              previousLabel="< previous"
              renderOnZeroPageCount={null}
              pageRangeDisplayed={5}
              pageCount={pageProductCount}
              onPageChange={handlePageProductClick}
              containerClassName="pagination"
              pageLinkClassName="page-number"
              previousLinkClassName="page-number"
              nextLinkClassName="page-number"
              activeLinkClassName={styles["active"]}
            />
          </div>
        </div>

        <div className="container text-center">
          <h4
            style={{
              textAlign: "left",
              marginTop: "50px",
              marginBottom: "50px",
              // display: `${filterServices.length !== 0 ? "" : "none"}`,
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
                            src={service.service_image}
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
              <div className={styles["pagination-form"]}>
                <ReactPaginate
                  breakLabel="..."
                  nextLabel="next >"
                  previousLabel="< previous"
                  renderOnZeroPageCount={null}
                  pageRangeDisplayed={5}
                  pageCount={pageServiceCount}
                  onPageChange={handlePageServiceClick}
                  containerClassName="pagination"
                  pageLinkClassName="page-number"
                  previousLinkClassName="page-number"
                  nextLinkClassName="page-number"
                  activeLinkClassName={styles["active"]}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SearchPage;
