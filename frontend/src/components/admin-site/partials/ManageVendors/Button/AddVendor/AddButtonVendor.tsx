import React, { useEffect, useState } from "react";
import { Button, Modal, Space, notification, DatePicker } from "antd";
import styles from "../AddVendor/AddButtonVendor.module.css";
import axios from "axios";
import dayjs, { Dayjs } from "dayjs";

// Import API
// 1. Vendors API
const vendorsAPI = process.env.REACT_APP_API_VENDORS;

// ------------------------------------------------

interface AddModalProps {
  className?: string;
  value?: string;
  title?: string;
  handleClickOk?: any;
}

const AddModalVendor: React.FC<AddModalProps> = ({
  className,
  value,
  title,
  handleClickOk,
}) => {
  const [vendors, setVendors] = useState<any>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [vendorInfo, setVendorInfo] = useState({
    name: "",
  });

  // Fetch API
  const fetchVendors = () => {
    axios
      .get(`${vendorsAPI}`)
      .then((response) => {
        setVendors(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    fetchVendors();
  }, []);

  // ------------------------------------------------

  const showModal = () => {
    fetchVendors();
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setVendorInfo({
      name: "",
      code: "",
      discount_rate: "",
      min_bill: "",
    });
    setIsModalOpen(false);
  };

  // Handle Add Vendor
  const handleOk = () => {
    axios
      .post(`${vendorsAPI}/add`, vendorInfo)
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
          <div className={styles["list-input-item"]}>
            <p>Vendor Name</p>
            <input
              type="text"
              value={vendorInfo.name}
              onChange={(event) =>
                setVendorInfo({ ...vendorInfo, name: event.target.value })
              }
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AddModalVendor;
