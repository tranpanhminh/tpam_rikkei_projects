import React, { useEffect, useState } from "react";
import { Button, Modal, Space, notification, DatePicker } from "antd";
import styles from "../AddCoupon/AddButtonCoupon.module.css";
import { Coupon } from "../../../../../../database";
import axios from "axios";
import dayjs, { Dayjs } from "dayjs";
const { RangePicker } = DatePicker;

// Import API
// 1. Coupons API
const couponsAPI = process.env.REACT_APP_API_COUPONS;

// ------------------------------------------------

interface AddModalProps {
  className?: string;
  value?: string;
  title?: string;
  handleClickOk?: any;
}

const AddModalCoupon: React.FC<AddModalProps> = ({
  className,
  value,
  title,
  handleClickOk,
}) => {
  const [couponName, setCouponName] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [couponDiscount, setCouponDiscount] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [couponInfo, setCouponInfo] = useState({
    name: "",
    code: "",
    discount_rate: "",
    min_bill: "",
  });

  const [coupons, setCoupons] = useState<any>([]);

  const fetchCoupons = () => {
    axios
      .get(`${couponsAPI}`)
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

  const showModal = () => {
    fetchCoupons();
    setIsModalOpen(true);
  };

  const handleOk = () => {
    if (couponDiscount > 100) {
      notification.warning({
        message: "Notification",
        description: "Discount must be <= 100",
      });
      return;
    }

    // Kiểm tra thông tin đầy đủ
    if (couponName === "" || couponCode === "" || couponDiscount <= 0) {
      notification.warning({
        message: "Notification",
        description:
          "Please make sure all information filled, Discount must be integer",
        // placement: "bottomLeft",
      });
      return;
    } else {
      const updatedCoupon = {
        name: couponName,
        code: couponCode,
        discount: couponDiscount,
        status: "New",
      };
      axios
        .post("http://localhost:7373/coupons", updatedCoupon)
        .then((response) => {
          fetchCoupons(); // Cập nhật lại dữ liệu products sau khi thêm
          notification.success({
            message: "Coupon Added",
            // placement: "bottomLeft",
          });
        })
        .catch((error) => {
          console.log(error.message);
        });
      handleClickOk();

      setIsModalOpen(false);
      setCouponName("");
      setCouponCode("");
      setCouponDiscount(1);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button
        type="primary"
        onClick={showModal}
        className={styles[`${className}`]}
      >
        {value}
      </Button>
      <Modal
        title={title}
        visible={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={500}
      >
        <div className={styles["list-input-add-student"]}>
          {/* <div className={styles["list-input-item"]}>
            <p>Coupon ID</p>
            <input type="text" disabled />
          </div> */}
          <div className={styles["list-input-item"]}>
            <p>Coupon Name</p>
            <input
              type="text"
              value={couponInfo.name}
              onChange={(event) =>
                setCouponInfo({ ...couponInfo, name: event.target.value })
              }
            />
          </div>
          <div className={styles["list-input-item"]}>
            <p>Code</p>
            <input
              type="text"
              value={couponInfo.code}
              onChange={(event) =>
                setCouponInfo({ ...couponInfo, code: event.target.value })
              }
            />
          </div>
          <div className={styles["list-input-item"]}>
            <p>Discount</p>
            <input
              type="text"
              value={couponInfo.discount_rate}
              onChange={(event) =>
                setCouponInfo({
                  ...couponInfo,
                  discount_rate: event.target.value,
                })
              }
            />
          </div>
          <div className={styles["list-input-item"]}>
            <p>Min Bill</p>
            <input
              type="text"
              value={couponInfo.min_bill}
              onChange={(event) =>
                setCouponInfo({
                  ...couponInfo,
                  min_bill: event.target.value,
                })
              }
            />
          </div>
          {/* <div className={styles["list-input-item"]}>
            <p>Slot</p>
            <input
              type="text"
              value={Number(couponSlot)}
              onChange={(event) => setCouponSlot(Number(event.target.value))}
            />
          </div> */}
          {/* <div className={styles["list-input-item"]}>
            <p>Select Date</p>
            <Space direction="vertical" size={12}>
              <RangePicker onChange={(values) => console.log(values)} />
            </Space>
          </div>{" "} */}
        </div>
      </Modal>
    </>
  );
};

export default AddModalCoupon;
