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
              ? "Subscribed Newsletter Successfully"
              : "Unsubscribed Newsletter Successfully"
          }`,
        });
      })
      .catch((error) => {
        console.log(error);
      });

    let findSubscriber = subscribers?.find((subscriber: any) => {
      return subscriber.user_id === userId;
    });
    console.log(findSubscriber);
    if (findSubscriber) {
      setSubscriberId(findSubscriber.id);
    }
    console.log(subscriberId);
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
            // value={searchText}
            // onChange={(e) => setSearchText(e.target.value)}
          />
          <button
            className="btn btn-outline-success"
            type="submit"
            id={styles["search-btn"]}
            // onClick={handleSearchUser}
          >
            Search
          </button>
        </div>
        <Button
          type="primary"
          onClick={() => handleChangeSubscribe(getLoginData.loginId)}
        >
          {user.newsletter_register === true
            ? "Subscribed Newsletter"
            : "Unsubscribed Newsletter"}
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
              <th>Status</th>
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
                    <td>{item.status}</td>
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
