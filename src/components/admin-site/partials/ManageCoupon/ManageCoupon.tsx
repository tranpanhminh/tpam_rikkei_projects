import React, { useEffect, useState } from "react";
import { parse } from "date-fns";
import styles from "../../AdminPage.module.css";
import { Coupon } from "../../../../database"; // Import your data fetching and setting functions
import DeleteButtonCoupon from "./Button/DeleteCoupon/DeleteButtonCoupon";
import axios from "axios";
import { Button, notification } from "antd";
import AddButtonCoupon from "./Button/AddCoupon/AddButtonCoupon";

function ManageNewsletter() {
  const [coupons, setCoupons] = useState<null | Coupon[]>(null);
  const [users, setUsers] = useState<any>(null);
  const [searchText, setSearchText] = useState<string>("");

  const fetchUsers = () => {
    axios
      .get("http://localhost:7373/accounts")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

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
    fetchUsers();
  }, []);

  const handleSearchCoupons = () => {
    if (searchText === "") {
      fetchCoupons();
    } else {
      axios
        .get(`http://localhost:7373/coupons`)
        .then((response) => {
          // Lấy dữ liệu từ response
          const allCoupons = response.data;

          // Tìm kiếm trong dữ liệu và cập nhật state
          const filterCoupons = allCoupons.filter((coupon: Coupon) => {
            if (
              coupon.name
                .toLowerCase()
                .includes(searchText.trim().toLowerCase())
            ) {
              return true;
            }
            return false;
          });

          setCoupons(filterCoupons);
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  };

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

  const handleSendCoupon = (couponId: number) => {
    let newCoupon = coupons?.find((coupon) => {
      return coupon.id === couponId;
    });
    console.log(newCoupon);

    // Push Coupon vào newsletter của tất cả người dùng đã đăng ký, với điều kiện Subscribed là true
    // B1: Lọc lấy ra những User có newsletter_register là true
    let filterUserRegister = users.filter((user: any) => {
      return user.newsletter_register === true;
    });

    console.log(filterUserRegister);

    // B2: Xác định ID lớn nhất trong Newsletter của từng User

    // B3: Push Coupon vào newsletter của các phần tử trong mảng đã tìm ở trên
  };

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
              <th>Coupon ID</th>
              <th>Name</th>
              <th>Code</th>
              <th>Discount</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {coupons?.map((coupon) => {
              return (
                <tr key={coupon.id}>
                  <td>{coupon.id}</td>
                  <td>{coupon.name}</td>
                  <td>{coupon.code}</td>
                  <td>{coupon.discount}%</td>
                  <td className={styles["group-btn-admin"]}>
                    <Button
                      type="primary"
                      className={styles["detail-product-btn"]}
                      onClick={() => {
                        handleSendCoupon(coupon.id);
                      }}
                    >
                      Send
                    </Button>
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
