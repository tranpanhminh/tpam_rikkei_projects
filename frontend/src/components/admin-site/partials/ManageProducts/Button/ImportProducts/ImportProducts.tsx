import React, { useRef, useState } from "react";
import { Button, Modal, notification, Spin, message } from "antd";
import styles from "../AddProduct/AddModalProduct.module.css";
import { useNavigate } from "react-router-dom";
import { importProducts } from "../../../../../../api/products.api";

// ------------------------------------------------

interface AddModalProps {
  className?: string;
  value?: string;
  title?: string;
  handleClickOk?: any;
}

const ImportModalProduct: React.FC<AddModalProps> = ({
  className,
  value,
  title,
  handleClickOk,
}) => {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [file, setFile] = useState<any>("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    navigate(`/admin/manage-products/?import`);
    if (file) {
      resetFile();
    }
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    navigate(`/admin/manage-products/`);
    setFile("");
    if (file) {
      resetFile();
    }
    setIsModalOpen(false);
  };

  const fileInputRef = useRef<any>(null);
  const resetFile = () => {
    fileInputRef.current.value = null; // Đặt giá trị về null
  };

  const handleFileChange = (event: any) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const fileType = selectedFile.type;
      if (fileType !== "text/csv") {
        return notification.warning({
          message: `Only CSV File is accepted`,
        });
      }
    }
    setFile(selectedFile);
  };

  // Handle Add Product
  const handleOk = async () => {
    const formData: any = new FormData();
    formData.append("file", file);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    if (!file) {
      return notification.warning({
        message: `Please upload file`,
      });
    }
    if (file.type !== "text/csv") {
      return notification.warning({
        message: `Only CSV File is accepted`,
      });
    }
    const result = await importProducts(formData, config);
    if (result) {
      navigate("/admin/manage-products/");
      setFile("");
      handleCancel();
      resetFile();
      handleClickOk();
    }
  };

  return (
    <>
      {contextHolder}
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
            <p>Images</p>
            <input
              type="file"
              onChange={handleFileChange}
              accept=".csv"
              ref={fileInputRef}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ImportModalProduct;
