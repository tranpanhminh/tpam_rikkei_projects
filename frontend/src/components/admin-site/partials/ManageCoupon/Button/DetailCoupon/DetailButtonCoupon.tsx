import React, { useEffect, useState } from "react";
import { Button, Modal, notification } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "../DetailCoupon/DetailModalCoupon.module.css";

// Import API
// 1. Coupons API
const couponsAPI = process.env.REACT_APP_API_COUPONS;

// ------------------------------------------------

interface DetailModalProps {
  className?: string;
  value?: string;
  title?: string;
  handleFunctionOk?: any;
  getCouponId?: any;
}

const DetailCouponButton: React.FC<DetailModalProps> = ({
  className,
  value,
  title,
  handleFunctionOk,
  getCouponId,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [coupon, setCoupon] = useState<any>({});
  const [name, setName] = useState("");
  const [couponInfo, setCouponInfo] = useState({
    name: "",
    code: "",
    discount_rate: "",
    min_bill: "",
  });
  const navigate = useNavigate();

  const fetchCoupon = () => {
    axios
      .get(`${couponsAPI}/detail/${getCouponId}`)
      .then((response) => {
        setCoupon(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  console.log(coupon, "COUIDSA");
  useEffect(() => {
    fetchCoupon();
  }, []);

  const showModal = () => {
    navigate(`/admin/manage-coupons/?edit-couponID=${getCouponId}`);
    setIsModalOpen(true);
    setCouponInfo({
      name: "",
      code: "",
      discount_rate: "",
      min_bill: "",
    });
  };

  const handleCancel = () => {
    navigate("/admin/manage-coupons/");
    setIsModalOpen(false);
    setCouponInfo({
      name: "",
      code: "",
      discount_rate: "",
      min_bill: "",
    });
  };

  const handleOk = () => {
    axios
      .patch(`${couponsAPI}/update/${getCouponId}`, couponInfo)
      .then((response) => {
        notification.success({
          message: `${response.data.message}`,
        });
        handleFunctionOk();
        setCouponInfo({
          name: "",
          code: "",
          discount_rate: "",
          min_bill: "",
        });
        setIsModalOpen(false);
      })
      .catch((error) => {
        notification.warning({
          message: `${error.response.data.message}`,
        });
      });
  };

  return (
    <>
      <Button type="primary" onClick={showModal} className={className}>
        {value}
      </Button>
      <Modal visible={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <div className={styles["list-input-add-student"]}>
          <div className={styles["list-input-item"]}>
            <p>Coupon Name</p>
            <input
              type="text"
              defaultValue={coupon?.name}
              onChange={(event) =>
                setCouponInfo({ ...couponInfo, name: event.target.value })
              }
            />
          </div>
          <div className={styles["list-input-item"]}>
            <p>Coupon Code</p>
            <input
              type="text"
              defaultValue={coupon?.code}
              onChange={(event) =>
                setCouponInfo({ ...couponInfo, code: event.target.value })
              }
            />
          </div>
          <div className={styles["list-input-item"]}>
            <p>Coupon Discount</p>
            <input
              type="text"
              defaultValue={coupon?.discount_rate}
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
              defaultValue={coupon?.min_bill}
              onChange={(event) =>
                setCouponInfo({ ...couponInfo, min_bill: event.target.value })
              }
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default DetailCouponButton;
