import { useEffect, useState } from "react";
import styles from "../../AdminPage.module.css";
import { Button } from "antd";
import AddButtonVendor from "./Button/AddVendor/AddButtonVendor";
import DetailVendorButton from "./Button/DetailVendor/DetailVendorButton";
import { deleteVendor, getAllVendors } from "../../../../api/vendors.api";

// ------------------------------------------------

function ManageVendors() {
  document.title = "Manage Vendors | PetShop";
  const [vendors, setVendors] = useState<any>([]);
  const [searchText, setSearchText] = useState<string>("");

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
            {vendors?.map((vendor: any, index: number) => {
              return (
                <tr key={vendor?.id}>
                  <td>{index + 1}</td>
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
    </>
  );
}
export default ManageVendors;
