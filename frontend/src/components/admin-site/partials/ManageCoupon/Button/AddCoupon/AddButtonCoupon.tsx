import React, { useEffect, useState } from "react";
import { Button, Modal } from "antd";
import styles from "../AddCoupon/AddButtonCoupon.module.css";
import { addCoupon, getAllCoupons } from "../../../../../../api/coupons.api";

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
  const fetchCoupons = async () => {
    const result = await getAllCoupons();
    setCoupons(result);
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
  const handleOk = async () => {
    const data = {
      name: couponInfo.name,
      code: couponInfo.code,
      discount_rate: Number(couponInfo.discount_rate),
      min_bill: Number(couponInfo.min_bill),
    };

    const result = await addCoupon(data);
    if (result) {
      handleClickOk();
      setIsModalOpen(false);
    }
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
