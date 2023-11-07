import React, { useEffect, useState } from "react";
import { Button, Modal, notification } from "antd";
import { useNavigate } from "react-router-dom";
import styles from "../DetailCoupon/DetailModalCoupon.module.css";
import {
  getDetailCoupon,
  updateCoupon,
} from "../../../../../../api/coupons.api";

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
  const [couponInfo, setCouponInfo] = useState({
    name: "",
    code: "",
    discount_rate: "",
    min_bill: "",
  });
  const navigate = useNavigate();

  const fetchCoupon = async () => {
    const result = await getDetailCoupon(getCouponId);
    setCouponInfo({
      name: result.name,
      code: result.code,
      discount_rate: result.discount_rate,
      min_bill: result.min_bill,
    });
    return setCoupon(result);
  };
  useEffect(() => {
    fetchCoupon();
  }, []);

  const showModal = () => {
    navigate(`/admin/manage-coupons/?edit-couponID=${getCouponId}`);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    navigate("/admin/manage-coupons/");
    setIsModalOpen(false);
  };

  const handleOk = async () => {
    const data = {
      name: couponInfo.name,
      code: couponInfo.code,
      discount_rate: Number(couponInfo.discount_rate),
      min_bill: Number(couponInfo.min_bill),
    };
    const result = await updateCoupon(getCouponId, data);
    if (result) {
      handleFunctionOk();

      setIsModalOpen(false);
    }
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
              value={couponInfo?.name}
              onChange={(event) =>
                setCouponInfo({ ...couponInfo, name: event.target.value })
              }
            />
          </div>
          <div className={styles["list-input-item"]}>
            <p>Coupon Code</p>
            <input
              type="text"
              value={couponInfo?.code}
              onChange={(event) =>
                setCouponInfo({ ...couponInfo, code: event.target.value })
              }
            />
          </div>
          <div className={styles["list-input-item"]}>
            <p>Coupon Discount</p>
            <input
              type="text"
              value={couponInfo?.discount_rate}
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
              value={couponInfo?.min_bill}
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
