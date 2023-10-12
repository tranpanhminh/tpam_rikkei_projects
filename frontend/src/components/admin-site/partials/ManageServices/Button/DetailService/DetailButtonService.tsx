import React, { useEffect, useState } from "react";
import { Button, Modal, notification } from "antd";
import { Product, Service } from "../../../../../../database";
import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";
import styles from "../DetailService/DetailModalService.module.css";
import { useLocation, useNavigate } from "react-router-dom";

// Import API
// 1. Services API
const servicesAPI = process.env.REACT_APP_API_SERVICES;

// ------------------------------------------------

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
  const location = useLocation();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [initName, setName] = useState("");
  const [initDescription, setDescription] = useState("");
  const [initPrice, setPrice] = useState("");
  const [initImage, setImage] = useState("");
  const [services, setServices] = useState<null | Service>(null);
  const [serviceInfo, setServiceInfo] = useState<any>({
    name: "",
    description: "",
    price: 0,
    working_time_id: 1,
    service_image: "",
  });

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const serviceId = searchParams.get("edit-serviceId");
    if (serviceId && Number(serviceId) === getServiceId) {
      setIsModalOpen(true); // Nếu có edit-postId và nó trùng với postId của post hiện tại, mở modal
    }
  }, [location.search]);

  useEffect(() => {
    const fetchServices = () => {
      axios
        .get(`${servicesAPI}/detail/${getServiceId}`)
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
    setServiceInfo({
      ...serviceInfo,
      description: content,
    });
  };

  const showModal = () => {
    navigate(`/admin/manage-services/?edit-serviceId=${getServiceId}`);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    axios
      .patch(`${servicesAPI}/update/${getServiceId}`, serviceInfo)
      .then((response) => {
        notification.success({
          message: `Service Updated`,
        });
        setIsModalOpen(false);
        handleFunctionOk();
        setServiceInfo({
          name: "",
          description: "",
          price: 0,
          working_time_id: 1,
          service_image: "",
        });
        navigate("/admin/manage-services/");
      })
      .catch((error) => {
        notification.warning({
          message: `${error.response.data.message}`,
        });
      });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const editorConfig = {
    height: "600px",
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
        width={800}
        title={title}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {services && (
          <div className={styles["product-detail-information-container"]}>
            <img src={services && services.service_image} alt="" />
            <div className={styles["left-product-detail-item"]}></div>

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
                  Service Name
                </label>
                <input
                  type="text"
                  name="Product Title"
                  defaultValue={services && services.name}
                  onChange={(event) =>
                    setServiceInfo({
                      ...serviceInfo,
                      name: event.target.value,
                    })
                  }
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
                    init={editorConfig}
                  />
                </div>
              </div>
              <div className={styles["product-info-item"]}>
                <label className={styles["label-product"]} htmlFor="">
                  Service Price
                </label>
                <input
                  type="number"
                  min={0}
                  name="Product Title"
                  defaultValue={services && services.price}
                  onChange={(event) =>
                    setServiceInfo({
                      ...serviceInfo,
                      price: event.target.value,
                    })
                  }
                />
              </div>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

export default DetailButtonService;
