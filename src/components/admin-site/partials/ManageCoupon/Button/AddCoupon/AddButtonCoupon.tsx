import React, { useEffect, useState } from "react";
import { Button, Modal, Space, notification, DatePicker } from "antd";
import styles from "../AddCoupon/AddButtonCoupon.module.css";
import { Coupon } from "../../../../../../database";
import axios from "axios";
import dayjs, { Dayjs } from "dayjs";
const { RangePicker } = DatePicker;

interface AddModalProps {
  className?: string;
  value?: string;
  title?: string;
  handleClickOk?: (newCoupon: Coupon) => void;
}

const AddModalCoupon: React.FC<AddModalProps> = ({
  className,
  value,
  title,
  handleClickOk,
}) => {
  const [selectedDateRange, setSelectedDateRange] = useState<
    [Dayjs | null, Dayjs | null]
  >([null, null]);

  const handleDateRangeChange = (
    dates: [Dayjs | null, Dayjs | null],
    dateStrings: [string, string]
  ) => {
    setSelectedDateRange(dates);

    if (dates[0] && dates[1]) {
      const startDate = dates[0];
      const endDate = dates[1];
      console.log("Start Date:", startDate.format("DD/MM/YYYY"));
      console.log("End Date:", endDate.format("DD/MM/YYYY"));
    }
  };

  const [coupons, setCoupons] = useState<null | Coupon[]>(null);
  const [editorInitialValue, setEditorInitialValue] = useState("");
  const [newCoupon, setNewCoupon] = useState<Coupon>({
    id: 0,
    name: "",
    code: "",
    discount: 0,
    slot: 0,
    startDate: "",
    endDate: "",
  });

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
  }, []);

  const maxId = coupons ? Math.max(...coupons.map((coupon) => coupon.id)) : 0;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    // Kiểm tra thông tin đầy đủ
    if (!newCoupon.name || !newCoupon.code || newCoupon.discount <= 0) {
      notification.warning({
        message: "Notification",
        description:
          "Please make sure all information filled, Discount must be integer",
      });
      return;
    }

    const updatedCoupon = {
      ...newCoupon,
      id: maxId + 1,
    };

    const updatedCoupons = coupons ? [...coupons, updatedCoupon] : null;

    setCoupons(updatedCoupons);
    setIsModalOpen(false);
    if (handleClickOk) {
      handleClickOk(updatedCoupon);
    }
    setNewCoupon({
      id: 0,
      name: "",
      code: "",
      discount: 0,
      slot: 0,
      startDate: "",
      endDate: "",
    });
    setEditorInitialValue("Type service description here.........");
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const dateTime = (start: string, end: string) => {
    console.log(start, end);
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
        width={800}
      >
        <div className={styles["list-input-add-student"]}>
          <div className={styles["list-input-item"]}>
            <p>User ID</p>
            <input type="text" value={maxId + 1} disabled />
          </div>
          <div className={styles["list-input-item"]}>
            <p>Coupon Name</p>
            <input
              type="text"
              value={newCoupon.name}
              onChange={(e) =>
                setNewCoupon({ ...newCoupon, name: e.target.value })
              }
            />
          </div>
          <div className={styles["list-input-item"]}>
            <p>Code</p>
            <input
              type="text"
              value={newCoupon.code}
              onChange={(e) =>
                setNewCoupon({ ...newCoupon, code: e.target.value })
              }
            />
          </div>
          <div className={styles["list-input-item"]}>
            <p>Discount</p>
            <input
              type="number"
              min={1}
              value={newCoupon.discount}
              onChange={(e) =>
                setNewCoupon({ ...newCoupon, discount: Number(e.target.value) })
              }
            />
          </div>
          <div className={styles["list-input-item"]}>
            <p>Slot</p>
            <input
              type="text"
              value={newCoupon.slot}
              onChange={(e) =>
                setNewCoupon({ ...newCoupon, slot: Number(e.target.value) })
              }
            />
          </div>
          <div className={styles["list-input-item"]}>
            <p>Select Date</p>
            <Space direction="vertical" size={12}>
              <RangePicker onChange={() => handleDateRangeChange} />
            </Space>
          </div>{" "}
        </div>
      </Modal>
    </>
  );
};

export default AddModalCoupon;
