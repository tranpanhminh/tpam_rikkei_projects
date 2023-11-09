import { useEffect, useState } from "react";
import styles from "../../ClientPage.module.css";
import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import { Rate } from "antd";
import { getAllProducts } from "../../../../api/products.api";
import ReactPaginate from "react-paginate";

// ------------------------------------------------------------------

function ClientListProducts() {
  document.title = "Products | PetShop";
  const [products, setProducts] = useState<any>([]);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  const fetchProducts = async () => {
    const result = await getAllProducts();
    return setProducts(result);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Pagination
  const itemsPerPage = Number(searchParams.get("limit")) || 8;
  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(products.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(products.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, products]);

  const handlePageClick = (event: any) => {
    const newPage = event.selected + 1;
    const newOffset = event.selected * itemsPerPage;
    setItemOffset(newOffset);
    navigate(`/products/?page=${newPage}&limit=${itemsPerPage}`);
  };

  return (
    <>
      <div
        className={styles["list-products"]}
        style={{ marginTop: 0, marginBottom: 100 }}
      >
        <div className="container text-center">
          <div
            className="row align-items-start"
            id="container-product-homepage"
          >
            {currentItems &&
              currentItems.map((product: any) => {
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
                            {product && product.name}
                          </h5>
                        </NavLink>
                        <p className={styles["card-price"]}>
                          Price: ${product && product.price.toLocaleString()}
                        </p>
                        <p className={styles["card-price"]}>
                          <Rate disabled defaultValue={product?.avg_rating} />
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
          <div className={styles["pagination-form"]} style={{ marginTop: 50 }}>
            <ReactPaginate
              nextLabel="next >"
              previousLabel="< previous"
              renderOnZeroPageCount={null}
              pageRangeDisplayed={13}
              pageCount={pageCount}
              onPageChange={handlePageClick}
              containerClassName="pagination"
              pageLinkClassName="page-number"
              previousLinkClassName="page-number"
              nextLinkClassName="page-number"
              activeLinkClassName={styles["active"]}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default ClientListProducts;
