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
  const [coupons, setCoupons] = useState<any>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [couponInfo, setCouponInfo] = useState({
    name: "",
    code: "",
    discount_rate: "",
    min_bill: "",
  });

  // Fetch API
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

  // ------------------------------------------------

  const showModal = () => {
    fetchCoupons();
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setCouponInfo({
      name: "",
      code: "",
      discount_rate: "",
      min_bill: "",
    });
    setIsModalOpen(false);
  };

  // Handle Add Coupon
  const handleOk = () => {
    const data = {
      name: couponInfo.name,
      code: couponInfo.code,
      discount_rate: Number(couponInfo.discount_rate),
      min_bill: Number(couponInfo.min_bill),
    };
    axios
      .post(`${couponsAPI}/add`, data)
      .then((response) => {
        notification.success({ message: response.data.message });
        handleClickOk();
        setIsModalOpen(false);
      })
      .catch((error) => {
        notification.warning({ message: error.response.data.message });
      });
  };
  // ------------------------------------------------

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
              type="number"
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
              type="number"
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
