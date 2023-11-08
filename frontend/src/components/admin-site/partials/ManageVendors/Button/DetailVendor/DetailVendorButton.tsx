import React, { useEffect, useState } from "react";
import { Button, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import styles from "../AddVendor/AddButtonVendor.module.css";
import {
  getDetailVendor,
  updateVendor,
} from "../../../../../../api/vendors.api";

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

  const fetchVendor = async () => {
    const result = await getDetailVendor(getVendorId);
    return setVendor(result);
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

  const handleOk = async () => {
    const vendorInfo = {
      name: name,
    };
    const result = await updateVendor(getVendorId, vendorInfo);
    if (result) {
      handleFunctionOk();
      setName("");
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
