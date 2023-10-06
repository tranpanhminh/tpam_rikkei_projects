import React, { useCallback, useEffect, useState } from "react";
import { parse } from "date-fns";
import styles from "../../AdminPage.module.css";
import { Coupon } from "../../../../database"; // Import your data fetching and setting functions
import axios from "axios";
import { Button, notification } from "antd";
import AddButtonCoupon from "./Button/AddCoupon/AddButtonCoupon";

function ManageNewsletter() {
  document.title = "Manage Coupons | PetShop";

  const [coupons, setCoupons] = useState<null | Coupon[]>(null);
  const [users, setUsers] = useState<any>(null);
  const [searchText, setSearchText] = useState<string>("");
  const [sentCoupons, setSentCoupons] = useState<number[]>([]);
  const [clickedCoupons, setClickedCoupons] = useState<number[]>([]);

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

  // useEffect(() => {
  //   fetchCoupons();
  //   fetchUsers();
  // }, []);

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

  const handleAddCoupon = () => {
    axios
      .get("http://localhost:7373/coupons")
      .then((response) => {
        fetchCoupons(); // Cập nhật lại dữ liệu products sau khi thêm
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
          // placement: "bottomLeft",
        });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  // const handleSendCoupon = useCallback(
  //   (couponId: number) => {
  //     if (sentCoupons.includes(couponId)) {
  //       return;
  //     }

  //     setSentCoupons([...sentCoupons, couponId]);

  //     if (clickedCoupons.includes(couponId)) {
  //       return;
  //     }

  //     setClickedCoupons([...clickedCoupons, couponId]);

  //     let findCoupon = coupons?.find((coupon) => {
  //       return coupon.id === couponId;
  //     });

  //     let filterUserRegister = users.filter((user: any) => {
  //       return user.newsletter_register === true;
  //     });

  //     // filterUserRegister.forEach((user: any) => {
  //     filterUserRegister.map((user: any) => {
  //       let maxNewsletterId = Math.max(
  //         ...user.newsletter.map((item: any) => item.id),
  //         0
  //       );

  //       const newCoupon = {
  //         id: maxNewsletterId + 1,
  //         couponName: findCoupon?.name,
  //         couponCode: findCoupon?.code,
  //         discount: findCoupon?.discount,
  //       };

  //       axios
  //         .patch(`http://localhost:7373/accounts/${user.id}`, {
  //           newsletter: [...user.newsletter, newCoupon],
  //         })
  //         .then((response) => {
  //           fetchUsers();
  //         })
  //         .catch((error) => {
  //           console.log(error);
  //         });
  //     });
  //     notification.success({
  //       message: `Coupon sent successfully`,
  //     });
  //   },
  //   [sentCoupons, clickedCoupons, coupons, users]
  // );

  const handleSendCoupon = async (couponId: number) => {
    try {
      const response = await axios.patch(
        `http://localhost:7373/coupons/${couponId}`,
        {
          status: "Sended",
        }
      );

      fetchCoupons();

      const findCoupon = coupons?.find((coupon) => coupon.id === couponId);

      const filterUserRegister = users.filter(
        (user: any) => user.newsletter_register === true
      );

      for (let user of filterUserRegister) {
        let maxNewsletterId = Math.max(
          ...user.newsletter.map((item: any) => item.id),
          0
        );

        const newCoupon = {
          id: maxNewsletterId + 1,
          couponName: findCoupon?.name,
          couponCode: findCoupon?.code,
          discount: findCoupon?.discount,
          status: findCoupon?.status,
        };

        const response = await axios.patch(
          `http://localhost:7373/accounts/${user.id}`,
          {
            newsletter: [...user.newsletter, newCoupon],
          }
        );

        fetchUsers();
      }

      notification.success({
        message: `Coupon sent successfully`,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCoupons();
    fetchUsers();
  }, []);

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
                      disabled={coupon.status === "Sended" ? true : false}
                    >
                      Send
                    </Button>
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