import React, { useEffect } from "react";
import { useState } from "react";
import { Button, Modal, notification } from "antd";
// Import CSS
import styles from "../UserProfile.module.css";
import "../../../../../assets/bootstrap-5.3.0-dist/css/bootstrap.min.css";
import axios from "axios";
function ClientNewsLetter() {
  const getData: any = localStorage.getItem("auth");
  const getLoginData = JSON.parse(getData) || "";
  const [searchText, setSearchText] = useState<string>("");
  const [user, setUser] = useState<any>([]);
  const [subscriberId, setSubscriberId] = useState<number>(0);
  const [subscribers, setSubscribers] = useState<any>([]);
  const [userNewsletter, setUserNewsletter] = useState<any>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchUser = () => {
    axios
      .get(`http://localhost:7373/accounts/${getLoginData.loginId}`)
      .then((response) => {
        setUser(response.data);
        setUserNewsletter(response.data.newsletter);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchSubscriber = () => {
    axios
      .get(`http://localhost:7373/subscribers`)
      .then((response) => {
        setSubscribers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchUser();
    fetchSubscriber();
  }, []);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleChangeSubscribe = (userId: number) => {
    const updatedNewsletterRegister = !user.newsletter_register;
    axios
      .patch(`http://localhost:7373/accounts/${userId}`, {
        newsletter_register: updatedNewsletterRegister,
      })
      .then((response) => {
        // Cập nhật user state sau khi hoàn thành PATCH request
        setUser(response.data);
        fetchUser();
        notification.success({
          message: `${
            user.newsletter_register === true
              ? "Unsubscribed Newsletter Successfully"
              : "Subscribed Newsletter Successfully"
          }`,
        });
      })
      .catch((error) => {
        console.log(error);
      });

    let findSubscriber = subscribers?.find((subscriber: any) => {
      return subscriber.user_id === userId;
    });
    if (findSubscriber) {
      setSubscriberId(findSubscriber.id);
    }
    axios
      .patch(`http://localhost:7373/subscribers/${subscriberId}`, {
        status: !findSubscriber.status,
      })
      .then((response) => {
        fetchSubscriber();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSearchNewsletter = () => {
    console.log(searchText);
    if (searchText === "") {
      // Nếu searchText rỗng, gọi lại fetchUsers để lấy tất cả người dùng
      fetchUser();
    } else {
      // Nếu có searchText, thực hiện tìm kiếm và cập nhật state
      axios
        .get(`http://localhost:7373/accounts/${getLoginData.loginId}`)
        .then((response) => {
          // Tìm kiếm trong dữ liệu và cập nhật state
          const filterNewsletter = userNewsletter?.filter((item: any) => {
            if (
              item.couponName
                .toLowerCase()
                .includes(searchText.trim().toLowerCase()) ||
              item.discount.toString().includes(searchText.trim())
            ) {
              return true;
            }
            return false;
          });
          setUserNewsletter(filterNewsletter);
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  };

  return (
    <div>
      <div className={styles.breadcrumb}>
        <h2 className={styles["page-title"]}>My Newsletter</h2>
        <p className={styles["page-description"]}>PetShop User Panel</p>
      </div>

      <div className={styles["user-board"]}>
        <div className="d-flex" role="search">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            id="search-bar"
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
          />
          <button
            className="btn btn-outline-success"
            type="submit"
            id={styles["search-btn"]}
            onClick={handleSearchNewsletter}
          >
            Search
          </button>
        </div>
        <Button
          type="primary"
          onClick={() => handleChangeSubscribe(getLoginData.loginId)}
        >
          {user.newsletter_register === true
            ? "Unsubscribed Newsletter"
            : "Subscribed Newsletter"}
        </Button>
      </div>
      <div className={styles["main-content"]}>
        <h3 className={styles["main-title-content"]}>List Newsletter</h3>
        <table className="table table-striped" id="table-user">
          <thead>
            <tr>
              <th>Newsletter ID</th>
              <th>Coupon Name</th>
              <th>Coupon Code</th>
              <th>Discount</th>
            </tr>
          </thead>
          <tbody>
            {userNewsletter &&
              userNewsletter.map((item: any) => {
                return (
                  <tr>
                    <td>{item.id}</td>
                    <td>{item.couponName}</td>
                    <td>{item.couponCode}</td>
                    <td>{item.discount}%</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ClientNewsLetter;
