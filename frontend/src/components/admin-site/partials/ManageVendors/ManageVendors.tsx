import React, { useCallback, useEffect, useState } from "react";
import { parse } from "date-fns";
import styles from "../../AdminPage.module.css";
import axios from "axios";
import { Button, notification } from "antd";
import AddButtonVendor from "./Button/AddVendor/AddButtonVendor";

// Import API
// 1. Vendors API
const vendorsAPI = process.env.REACT_APP_API_VENDORS;

// ------------------------------------------------

function ManageVendors() {
  document.title = "Manage Vendors | PetShop";
  const [vendors, setVendors] = useState<any>([]);
  const [searchText, setSearchText] = useState<string>("");

  // Fetch API
  const fetchVendors = () => {
    axios
      .get(`${vendorsAPI}`)
      .then((response) => {
        setVendors(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
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
  const handleDeleteVendor = (vendorId: number) => {
    axios
      .delete(`${vendorsAPI}/delete/${vendorId}`)
      .then(() => {
        fetchVendors();
        notification.success({
          message: "Vendor Deleted",
          // placement: "bottomLeft",
        });
      })
      .catch((error) => {
        console.log(error.message);
      });
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
              <th>Vendor ID</th>
              <th>Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {vendors?.map((vendor: any) => {
              return (
                <tr key={vendor.id}>
                  <td>{vendor.id}</td>
                  <td>{vendor.name}</td>
                  <td className={styles["group-btn-admin"]}>
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
