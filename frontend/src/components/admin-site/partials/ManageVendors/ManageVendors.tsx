import { useEffect, useState } from "react";
import styles from "../../AdminPage.module.css";
import { Button } from "antd";
import AddButtonVendor from "./Button/AddVendor/AddButtonVendor";
import DetailVendorButton from "./Button/DetailVendor/DetailVendorButton";
import { deleteVendor, getAllVendors } from "../../../../api/vendors.api";
import ReactPaginate from "react-paginate";
import { useNavigate, useSearchParams } from "react-router-dom";

// ------------------------------------------------

function ManageVendors() {
  document.title = "Manage Vendors | PetShop";
  const [vendors, setVendors] = useState<any>([]);
  const [searchText, setSearchText] = useState<string>("");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  // Fetch API
  const fetchVendors = async () => {
    const result = await getAllVendors();
    return setVendors(result);
  };

  useEffect(() => {
    fetchVendors();
  }, []);
  // ------------------------------------------------

  // Handle Search
  const handleSearchVendors = () => {
    if (!searchText) {
      fetchVendors();
    } else {
      const filterVendors = vendors.filter((vendor: any) => {
        if (
          vendor.name.toLowerCase().includes(searchText.trim().toLowerCase())
        ) {
          return true;
        }
        return false;
      });

      setVendors(filterVendors);
    }
  };
  // ------------------------------------------------

  // Handle Add
  const handleAddVendor = () => {
    fetchVendors();
  };
  // ------------------------------------------------

  // Handle Delete
  const handleDeleteVendor = async (vendorId: number) => {
    const result = await deleteVendor(vendorId);
    if (result) {
      fetchVendors();
    }
  };
  // ------------------------------------------------

  // Pagination
  const itemsPerPage = Number(searchParams.get("limit")) || 5;
  // const itemsPerPage = 5;
  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(vendors.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(vendors.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, vendors]);

  const handlePageClick = (event: any) => {
    const newPage = event.selected + 1;
    const newOffset = event.selected * itemsPerPage;
    setItemOffset(newOffset);
    navigate(`/admin/manage-vendors?page=${newPage}&limit=${itemsPerPage}`);
  };

  return (
    <>
      <div className={styles["breadcrumb"]}>
        <h2 className={styles["page-title"]}>Manage Vendors</h2>
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
            onChange={(event) => setSearchText(event.target.value)}
          />
          <button
            className={`btn  ${styles["btn-outline-success"]}`}
            type="submit"
            id={styles["search-btn"]}
            onClick={handleSearchVendors}
          >
            Search
          </button>
        </div>
        <AddButtonVendor
          className={styles["add-vendor-btn"]}
          value="Add Vendor"
          title="Add Vendor"
          handleClickOk={handleAddVendor}
        />
      </div>

      <div className={styles["main-content"]}>
        <h3 className={styles["main-title-content"]}>List Vendors</h3>
        <table className="table table-striped" id={styles["table-order-list"]}>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentItems?.map((vendor: any, index: number) => {
              return (
                <tr key={vendor?.id}>
                  <td>{vendor?.id}</td>
                  <td>{vendor?.name}</td>
                  <td className={styles["group-btn-admin"]}>
                    <DetailVendorButton
                      value="Detail"
                      title="Detail"
                      handleFunctionOk={handleAddVendor}
                      getVendorId={vendor?.id}
                    ></DetailVendorButton>
                    <Button
                      type="primary"
                      className={styles["delete-product-btn"]}
                      onClick={() => handleDeleteVendor(vendor.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className={styles["pagination-form"]}>
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          onPageChange={handlePageClick}
          containerClassName="pagination"
          pageLinkClassName="page-number"
          previousLinkClassName="page-number"
          nextLinkClassName="page-number"
          activeLinkClassName={styles["active"]}
        />
      </div>
    </>
  );
}
export default ManageVendors;
