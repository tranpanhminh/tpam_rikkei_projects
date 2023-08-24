import React, { useEffect, useState } from "react";
import { parse } from "date-fns";
import styles from "../../AdminPage.module.css";
import { Coupon } from "../../../../database"; // Import your data fetching and setting functions
import DeleteButtonCoupon from "./Button/DeleteCoupon/DeleteButtonCoupon";
import axios from "axios";
import { notification } from "antd";
import AddButtonCoupon from "./Button/AddCoupon/AddButtonCoupon";

function ManageNewsletter() {
  const [coupons, setCoupons] = useState<null | Coupon[]>(null);
  const [searchText, setSearchText] = useState<string>("");

  const fetchCoupons = () => {
    axios
      .get("http://localhost:7373/coupons")
      .then((response) => {
        setCoupons(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  // const handleSearchCoupons = () => {
  //   if (searchText === "") {
  //     fetchCoupons();
  //   } else {
  //     axios
  //       .get(`http://localhost:7373/coupons`)
  //       .then((response) => {
  //         // Lấy dữ liệu từ response
  //         const allCoupons = response.data;

  //         // Tìm kiếm trong dữ liệu và cập nhật state
  //         const filterCoupons = allCoupons.filter((coupon: Coupon) => {
  //           if (
  //             coupon.name
  //               .toLowerCase()
  //               .includes(searchText.trim().toLowerCase())
  //           ) {
  //             return true;
  //           }
  //           return false;
  //         });

  //         setCoupons(filterCoupons);
  //       })
  //       .catch((error) => {
  //         console.log(error.message);
  //       });
  //   }
  // };

  const handleAddCoupon = (newCoupon: Coupon) => {
    axios
      .post("http://localhost:7373/coupons", newCoupon)
      .then(() => {
        fetchCoupons(); // Cập nhật lại dữ liệu products sau khi thêm
        notification.success({
          message: "Coupon Added",
        });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleDeleteCoupon = (couponId: number) => {
    axios
      .delete(`http://localhost:7373/coupons/${couponId}`)
      .then(() => {
        fetchCoupons(); // Cập nhật lại dữ liệu products sau khi xóa
        notification.success({
          message: "Coupon Deleted",
        });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  // const handleUpdateService = () => {
  //   axios
  //     .get("http://localhost:7373/services")
  //     .then(() => {
  //       fetchServices(); // Cập nhật lại dữ liệu users sau khi thêm
  //       notification.success({
  //         message: "Service Updated",
  //       });
  //     })
  //     .catch((error) => {
  //       console.log(error.message);
  //     });
  // };
  return (
    <>
      <div className={styles["breadcrumb"]}>
        <h2 className={styles["page-title"]}>Manage Coupons</h2>
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
          />
          <button
            className={`btn  ${styles["btn-outline-success"]}`}
            type="submit"
            id={styles["search-btn"]}
          >
            Search
          </button>
        </div>
        <AddButtonCoupon
          className={styles["add-coupon-btn"]}
          value="Add Coupon"
          title="Add Coupon"
          handleClickOk={handleAddCoupon}
        />
      </div>

      <div className={styles["main-content"]}>
        <h3 className={styles["main-title-content"]}>List Coupons</h3>
        <table className="table table-striped" id={styles["table-order-list"]}>
          <thead>
            <tr>
              <th rowSpan={2}>Coupon ID</th>
              <th rowSpan={2}>Name</th>
              <th rowSpan={2}>Description</th>
              <th rowSpan={2}>Slot</th>
              <th colSpan={2}>Date</th>
              <th rowSpan={2}>Status</th>
              <th rowSpan={2}>Action</th>
            </tr>
            <tr>
              <th>Start Date</th>
              <th>End Date</th>
            </tr>
          </thead>
          <tbody>
            {coupons?.map((coupon) => {
              return (
                <tr key={coupon.id}>
                  <td>{coupon.id}</td>
                  <td>{coupon.name}</td>
                  <td>{coupon.description}</td>
                  <td> {coupon.slot === 0 ? 0 : coupon.slot || "Unlimited"}</td>
                  <td>{coupon.startDate}</td>
                  <td>{coupon.endDate}</td>
                  <td>
                    {coupon.slot === 0 ||
                    (coupon.endDate &&
                      new Date() >
                        parse(coupon.endDate, "dd/MM/yyyy", new Date()))
                      ? "Đã hết"
                      : ""}
                  </td>
                  <td className={styles["group-btn-admin"]}>
                    <button className={styles["detail-product-btn"]}>
                      Detail
                    </button>
                    <DeleteButtonCoupon
                      value="Delete"
                      className={styles["delete-coupon-btn"]}
                      handleFunctionBtn={() => handleDeleteCoupon(coupon.id)}
                    ></DeleteButtonCoupon>
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
export default ManageNewsletter;
