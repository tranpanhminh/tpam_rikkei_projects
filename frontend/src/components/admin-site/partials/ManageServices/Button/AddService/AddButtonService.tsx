import React, { useEffect, useRef, useState } from "react";
import { Button, Modal, notification, message } from "antd";
import styles from "../AddService/AddButtonService.module.css";
import { Editor } from "@tinymce/tinymce-react";
import { useNavigate } from "react-router-dom";
import { addService, getAllServices } from "../../../../../../api/services.api";
import { getAllWorkingTime } from "../../../../../../api/workingTime.api";

// ------------------------------------------------

interface AddModalProps {
  className?: string;
  value?: string;
  title?: string;
  handleClickOk?: any;
}

const AddModalService: React.FC<AddModalProps> = ({
  className,
  value,
  title,
  handleClickOk,
}) => {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [services, setServices] = useState<any>(null);
  const [workingTime, setWorkingTime] = useState<any>(null);
  const [image, setImage] = useState<any>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [serviceInfo, setServiceInfo] = useState({
    name: "",
    description: "",
    price: "",
    working_time_id: "",
    service_image: "",
  });

  // Fetch dữ liệu
  const fetchServices = async () => {
    const result = await getAllServices();
    return setServices(result);
  };

  const fetchWorkingTime = async () => {
    const result = await getAllWorkingTime();
    return setWorkingTime(result);
  };

  useEffect(() => {
    fetchServices();
    fetchWorkingTime();
  }, []);

  // ---------------------------------------

  // Ẩn - Hiện Modal
  const showModal = () => {
    navigate("/admin/manage-services/?add");
    setServiceInfo({
      name: "",
      description: "",
      price: "",
      working_time_id: "",
      service_image: "",
    });
    resetInputImage();
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setServiceInfo({
      name: "",
      description: "",
      price: "",
      working_time_id: "",
      service_image: "",
    });
    resetInputImage();
    setIsModalOpen(false);
    navigate("/admin/manage-services/");
  };
  // ---------------------------------------

  // Add Service

  const handleEditorChange = (content: string) => {
    setServiceInfo({ ...serviceInfo, description: content });
  };

  const handleFileChange = (event: any) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const imageURL: any = URL.createObjectURL(selectedFile);
      setImage(imageURL);
    }
    setServiceInfo({
      ...serviceInfo,
      service_image: event.target.files[0],
    });
  };

  const fileInputRef = useRef<any>(null);
  const resetInputImage = () => {
    if (image) {
      setServiceInfo({
        ...serviceInfo,
        service_image: "",
      });
      setImage(null);
      fileInputRef.current.value = null; // Đặt giá trị về null
    }
  };

  const handleAddService = async () => {
    if (!serviceInfo.name) {
      return notification.warning({
        message: "Name must not be blank",
      });
    }

    if (!serviceInfo.description) {
      return notification.warning({
        message: "Description must not be blank",
      });
    }
    if (!serviceInfo.price) {
      return notification.warning({
        message: "Price must not be blank",
      });
    }
    if (Number(serviceInfo.price) < 0) {
      return notification.warning({
        message: "Price must not be < 0",
      });
    }
    if (!serviceInfo.working_time_id) {
      return notification.warning({
        message: "Working Time must not be blank",
      });
    }

    if (!serviceInfo.service_image) {
      return notification.warning({
        message: "Service Image must not be blank",
      });
    }

    const formData = new FormData();
    formData.append("name", serviceInfo.name);
    formData.append("description", serviceInfo.description);
    formData.append("price", serviceInfo.price);
    formData.append("working_time_id", serviceInfo.working_time_id);
    formData.append("service_image", serviceInfo.service_image);
    formData.append("_method", "POST");
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    console.log(serviceInfo.service_image);
    if (serviceInfo.service_image) {
      messageApi.open({
        type: "loading",
        content: "Adding...",
        duration: 0,
      });
      const result = await addService(formData, config);
      if (result) {
        messageApi.destroy();
        fetchServices();
        handleClickOk();
        setIsModalOpen(false);
        setServiceInfo({
          name: "",
          description: "",
          price: "",
          working_time_id: "",
          service_image: "",
        });
        resetInputImage();
        navigate("/admin/manage-services/");
      }
    }
  };

  // ---------------------------------------

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
        onOk={handleAddService}
        onCancel={handleCancel}
        width={800}
      >
        <div className={styles["list-input-add-student"]}>
          <div>
            {image ? (
              <img
                src={image}
                alt="Service Thumbnail"
                className={styles["service-thumbnail"]}
                id="thumbnail"
              />
            ) : (
              <img
                src="https://www.its.ac.id/tmesin/wp-content/uploads/sites/22/2022/07/no-image.png"
                alt="Service Thumbnail"
                className={styles["service-thumbnail"]}
                id="thumbnail"
              />
            )}
          </div>
          <div className={styles["list-input-item"]}>
            <p>Service Name</p>
            <input
              type="text"
              value={serviceInfo?.name}
              onChange={(e) =>
                setServiceInfo({ ...serviceInfo, name: e.target.value })
              }
            />
          </div>
          <div className={styles["list-input-item"]}>
            <p>Description</p>
            <Editor
              onEditorChange={handleEditorChange}
              value={serviceInfo.description}
            />
          </div>
          <div className={styles["list-input-item"]}>
            <p>Price</p>
            <input
              type="number"
              value={serviceInfo?.price}
              onChange={(e) =>
                setServiceInfo({
                  ...serviceInfo,
                  price: e.target.value,
                })
              }
            />
          </div>
          <div className={styles["list-input-item"]}>
            <p>Working Time</p>

            <select
              name=""
              id=""
              className={styles["select-option"]}
              onChange={(event) => {
                setServiceInfo({
                  ...serviceInfo,
                  working_time_id: event.target.value,
                });
              }}
            >
              <option value="">Select Working Time</option>
              {workingTime &&
                workingTime.map((item: any) => {
                  return (
                    <option value={item.id}>
                      {item.morning_time} - {item.afternoon_time}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className={styles["list-input-item"]}>
            <p>Service Image</p>

            <input
              type="file"
              onChange={handleFileChange}
              accept="image/*"
              id="thumbnail"
              ref={fileInputRef}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AddModalService;
