import { useEffect, useState } from "react";
import styles from "../../AdminPage.module.css";
import { Button } from "antd";
import AddButtonCoupon from "./Button/AddCoupon/AddButtonCoupon";
import DetailCouponButton from "./Button/DetailCoupon/DetailButtonCoupon";
import { deleteCoupon, getAllCoupons } from "../../../../api/coupons.api";

// ------------------------------------------------

function ManageNewsletter() {
  document.title = "Manage Coupons | PetShop";
  const [coupons, setCoupons] = useState<any>([]);
  const [searchText, setSearchText] = useState<string>("");

  // Fetch API
  const fetchCoupons = async () => {
    const result = await getAllCoupons();
    setCoupons(result);
  };

  useEffect(() => {
    fetchCoupons();
  }, []);
  // ------------------------------------------------

  // Handle Search
  const handleSearchCoupons = () => {
    if (!searchText) {
      fetchCoupons();
    } else {
      const filterCoupons = coupons.filter((coupon: any) => {
        if (
          coupon.name.toLowerCase().includes(searchText.trim().toLowerCase())
        ) {
          return true;
        }
        return false;
      });

      setCoupons(filterCoupons);
    }
  };
  // ------------------------------------------------

  // Handle Add
  const handleAddCoupon = () => {
    fetchCoupons();
  };
  // ------------------------------------------------

  // Handle Delete
  const handleDeleteCoupon = async (couponId: number) => {
    const result = await deleteCoupon(couponId);
    if (result) {
      return fetchCoupons(); // Cập nhật lại dữ liệu products sau khi xóa
    }
  };
  // ------------------------------------------------

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
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
          />
          <button
            className={`btn  ${styles["btn-outline-success"]}`}
            type="submit"
            id={styles["search-btn"]}
            onClick={handleSearchCoupons}
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
              <th>#</th>
              <th>Name</th>
              <th>Code</th>
              <th>Discount</th>
              <th>Min Bill</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {coupons?.map((coupon: any, index: number) => {
              return (
                <tr key={coupon.id}>
                  <td>{index + 1}</td>
                  <td>{coupon.name}</td>
                  <td>{coupon.code}</td>
                  <td>{coupon.discount_rate}%</td>
                  <td>${coupon.min_bill}</td>
                  <td className={styles["group-btn-admin"]}>
                    <DetailCouponButton
                      title="Detail"
                      value="Detail"
                      handleFunctionOk={handleAddCoupon}
                      getCouponId={coupon.id}
                    ></DetailCouponButton>
                    <Button
                      type="primary"
                      className={styles["delete-product-btn"]}
                      onClick={() => handleDeleteCoupon(coupon.id)}
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
export default ManageNewsletter;
