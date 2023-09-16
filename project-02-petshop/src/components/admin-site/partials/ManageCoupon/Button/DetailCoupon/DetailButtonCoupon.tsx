import React, { useEffect, useState } from "react";
import { Button, Modal } from "antd";
import { Product, Service } from "../../../../../../database";
import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";
import styles from "../DetailService/DetailModalService.module.css";

interface DetailModalProps {
  className?: string; // Thêm khai báo cho thuộc tính className
  value?: string; // Thêm khai báo cho thuộc tính className
  title?: string;
  handleFunctionOk?: any;
  handleFunctionBtn?: any;
  getServiceId: number;
}
const DetailButtonService: React.FC<DetailModalProps> = ({
  className,
  value,
  title,
  handleFunctionOk,
  handleFunctionBtn,
  getServiceId,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [initName, setName] = useState("");
  const [initDescription, setDescription] = useState("");
  const [initPrice, setPrice] = useState("");
  const [initImage, setImage] = useState("");

  const [services, setServices] = useState<null | Service>(null);

  useEffect(() => {
    const fetchServices = () => {
      axios
        .get(`http://localhost:7373/services/${getServiceId}`)
        .then((response) => {
          setServices(response.data);
        })
        .catch((error) => {
          console.log(error.message);
        });
    };

    fetchServices();
  }, [getServiceId]);

  console.log(services);

  const handleChange = (content: string, editor: any) => {
    setDescription(content);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    console.log("handleSubmit is called");
    const updateService = {
      name: initName !== "" ? initName : services?.name,
    };

    axios
      .put(`http://localhost:7373/services/${getServiceId}`, updateService)
      .then((response) => {
        console.log("Service updated successfully:", response.data);
        setIsModalOpen(false); // Close the modal
      })
      .catch((error) => {
        console.error("Error updating product:", error);
      });
    if (handleFunctionOk) {
      handleFunctionOk();
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button
        type="primary"
        onClick={handleFunctionBtn || showModal}
        className={className}
      >
        {value}
      </Button>
      <Modal
        width={900}
        title={title}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {services && (
          <div className={styles["product-detail-information-container"]}>
            <div className={styles["left-product-detail-item"]}>
              <img src={services && services.serviceImage} alt="" />
            </div>

            <div className={styles["right-product-detail-item"]}>
              <div className={styles["product-info-item"]}>
                <label className={styles["label-product"]} htmlFor="">
                  Service ID
                </label>
                <input
                  type="text"
                  name="Product ID"
                  value={services && services.id}
                  disabled
                />
              </div>
              <div className={styles["product-info-item"]}>
                <label className={styles["label-product"]} htmlFor="">
                  Product Title
                </label>
                <input
                  type="text"
                  name="Product Title"
                  defaultValue={services && services.name}
                  onChange={(event) => setName(event.target.value)}
                />
              </div>
              <div className={styles["product-info-item"]}>
                <label className={styles["label-product"]} htmlFor="">
                  Description
                </label>
                <div>
                  <Editor
                    initialValue={services && services.description}
                    onEditorChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

export default DetailButtonService;
