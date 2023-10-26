import React, { useEffect, useState } from "react";
import { Button, Modal, notification } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "../AddVendor/AddButtonVendor.module.css";

// Import API
// 1. Vendors API
const vendorsAPI = process.env.REACT_APP_API_VENDORS;

// ------------------------------------------------

interface DetailModalProps {
  className?: string;
  value?: string;
  title?: string;
  handleFunctionOk?: any;
  getVendorId?: any;
}

const DetailVendorButton: React.FC<DetailModalProps> = ({
  className,
  value,
  title,
  handleFunctionOk,
  getVendorId,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [vendor, setVendor] = useState<any>({});
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const fetchVendor = () => {
    axios
      .get(`${vendorsAPI}/detail/${getVendorId}`)
      .then((response) => {
        setVendor(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchVendor();
  }, []);

  const showModal = () => {
    navigate(`/admin/manage-vendors/?edit-vendorID=${getVendorId}`);
    setIsModalOpen(true);
    setName("");
  };

  const handleCancel = () => {
    navigate("/admin/manage-vendors/");
    setIsModalOpen(false);
    setName("");
  };

  const handleOk = () => {
    const vendorInfo = {
      name: name,
    };
    axios
      .patch(`${vendorsAPI}/update/${getVendorId}`, vendorInfo)
      .then((response) => {
        notification.success({
          message: `${response.data.message}`,
        });
        handleFunctionOk();
        setName("");
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
            <p>Vendor Name</p>
            <input
              type="text"
              defaultValue={vendor?.name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default DetailVendorButton;
