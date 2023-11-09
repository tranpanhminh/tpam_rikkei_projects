import { useEffect, useState } from "react";
import DetailButtonProduct from "./Button/DetailProduct/DetailButtonProduct";
import { Button, message } from "antd";
import AddModalProduct from "../ManageProducts/Button/AddProduct/AddModalProduct";
import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "../../AdminPage.module.css";
import { NavLink } from "react-router-dom";
import { deleteProduct, getAllProducts } from "../../../../api/products.api";
import ReactPaginate from "react-paginate";
import ImportModalProduct from "./Button/ImportProducts/ImportProducts";

// ------------------------------------------------
function ManageProducts() {
  document.title = "Manage Products | PetShop";
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState<any>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [messageApi, contextHolder] = message.useMessage();
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  // Fetch API
  const fetchProducts = async () => {
    const result = await getAllProducts();
    return setProducts(result);
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  // ------------------------------------------------

  // Handle Search
  const handleSearchProduct = () => {
    if (!searchText) {
      // Nếu searchText rỗng, gọi lại fetchProducts để lấy tất cả người dùng
      fetchProducts();
    } else {
      const filterProducts = products.filter((product: any) => {
        if (
          product?.name
            .toLowerCase()
            .includes(searchText.trim().toLowerCase()) ||
          product?.price.toString().includes(searchText.trim()) ||
          product?.vendor?.name
            .toLowerCase()
            .includes(searchText.trim().toLowerCase()) ||
          product?.quantity_stock.toString().includes(searchText.trim())
        ) {
          return true;
        }
        return false;
      });

      setProducts(filterProducts);
    }
  };
  // ------------------------------------------------

  // Handle Delete Product
  const handleDeleteProduct = async (productId: number) => {
    messageApi.open({
      type: "loading",
      content: "Deleting...",
      duration: 0,
    });
    const result = await deleteProduct(productId);
    if (result) {
      fetchProducts(); // Cập nhật lại dữ liệu products sau khi xóa
      messageApi.destroy();
    }
  };

  // ------------------------------------------------

  // Handle Update Product
  const handleUpdateProduct = () => {
    navigate("/admin/manage-products/");
    fetchProducts();
  };

  // Pagination
  const itemsPerPage = Number(searchParams.get("limit")) || 5;
  // const itemsPerPage = 5;
  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(products.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(products.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, products]);

  const handlePageClick = (event: any) => {
    const newPage = event.selected + 1;
    const newOffset = event.selected * itemsPerPage;
    setItemOffset(newOffset);
    navigate(`/admin/manage-products?page=${newPage}&limit=${itemsPerPage}`);
  };

  // ------------------------------------------------

  return (
    <div>
      {contextHolder}
      <div className={styles["breadcrumb"]}>
        <h2 className={styles["page-title"]}>Manage Products</h2>
        <p className={styles["page-description"]}>PetShop Admin Panel</p>
      </div>
      <div className={styles["product-panel"]}>
        <div className="d-flex" role="search">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            id={styles["search-bar"]}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button
            className="btn btn-outline-success"
            type="submit"
            id={styles["search-btn"]}
            onClick={handleSearchProduct}
          >
            Search
          </button>
        </div>

        <div>
          <AddModalProduct
            className={styles["add-product-btn"]}
            value="Add Product"
            title="Add Product"
            handleClickOk={handleUpdateProduct}
          />{" "}
          <ImportModalProduct
            className={styles["add-product-btn"]}
            value="Import CSV"
            title="Import CSV"
            handleClickOk={handleUpdateProduct}
          />
        </div>
      </div>

      <div className={styles["search-result"]}></div>

      <div className={styles["main-content"]}>
        <h3 className={styles["main-title-content"]}>List Products</h3>
        <table className="table table-striped" id="table-products-manage-page">
          <thead>
            <tr>
              <th>ID</th>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentItems?.map((product: any, index: number) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>
                  <img src={product.thumbnail_url} alt="" />
                </td>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>{product.quantity_stock}</td>
                <td className={styles["group-btn-admin-manage-product"]}>
                  <NavLink to={`/products/${product.id}`} target="_blank">
                    <Button
                      type="primary"
                      style={{ backgroundColor: "#0c337c" }}
                    >
                      View
                    </Button>
                  </NavLink>
                  <DetailButtonProduct
                    value="Detail"
                    title="Detail Product"
                    getProductId={product.id}
                    handleFunctionOk={handleUpdateProduct}
                  ></DetailButtonProduct>
                  <Button
                    type="primary"
                    className={styles["delete-product-btn"]}
                    onClick={() => handleDeleteProduct(product.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles["pagination-form"]}>
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
  );
}

export default ManageProducts;
