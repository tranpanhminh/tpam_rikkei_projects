import React, { useEffect, useState } from "react";
import { Button, Modal } from "antd";
import styles from "../AddVendor/AddButtonVendor.module.css";
import { addVendor, getAllVendors } from "../../../../../../api/vendors.api";

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
  const fetchVendors = async () => {
    const result = await getAllVendors();
    return setVendors(result);
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
    });
    setIsModalOpen(false);
  };

  // Handle Add Vendor
  const handleOk = async () => {
    const result = await addVendor(vendorInfo);
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
