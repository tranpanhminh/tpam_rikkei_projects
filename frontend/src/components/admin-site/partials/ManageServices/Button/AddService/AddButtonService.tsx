import React, { useEffect, useState } from "react";
import { Button, Modal, notification } from "antd";
import styles from "../AddService/AddButtonService.module.css";
import { Service } from "../../../../../../database";
import axios from "axios";
import { Editor } from "@tinymce/tinymce-react";

// Import API
// 1. Services API
const servicesAPI = process.env.REACT_APP_API_SERVICES;
const workingTimeAPI = process.env.REACT_APP_API_WORKING_TIME;

// ------------------------------------------------

interface AddModalProps {
  className?: string;
  value?: string;
  title?: string;
  handleClickOk?: (newService: Service) => void;
}

const AddModalService: React.FC<AddModalProps> = ({
  className,
  value,
  title,
  handleClickOk,
}) => {
  const [services, setServices] = useState<any>(null);
  const [workingTime, setWorkingTime] = useState<any>(null);
  const [editorInitialValue, setEditorInitialValue] = useState("");
  const [newService, setNewService] = useState<any>(null);
  const [image, setImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [serviceInfo, setServiceInfo] = useState({
    name: "",
    description: "",
    price: "",
    working_time_id: "",
    service_image: "",
  });

  const fetchServices = () => {
    axios
      .get(`${servicesAPI}`)
      .then((response) => {
        setServices(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const fetchWorkingTime = () => {
    axios
      .get(`${workingTimeAPI}`)
      .then((response) => {
        setWorkingTime(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    fetchServices();
    fetchWorkingTime();
  }, []);

  const showModal = () => {
    fetchServices();
    setIsModalOpen(true);
  };

  const handleAddService = () => {
    // // Kiểm tra thông tin đầy đủ
    // if (
    //   !newService?.name ||
    //   !newService?.description ||
    //   newService?.price <= 0
    // ) {
    //   notification.warning({
    //     message: "Notification",
    //     description:
    //       "Please make sure all information filled, Seat must be integer",
    //   });
    //   return;
    // }
    // const morningTime = "09:00 AM - 11:30 AM";
    // const afternoonTime = "14:00 PM - 16:30 PM";
    // const updatedService = {
    //   ...newService,
    //   morningTime: morningTime,
    //   afternoonTime: afternoonTime,
    //   id: maxId + 1,
    //   comments: [],
    // };
    // const updatedServices = services ? [...services, updatedService] : null;
    // setServices(updatedServices);
    // setIsModalOpen(false);
    // if (handleClickOk) {
    //   handleClickOk(updatedService);
    // }
    // setNewService({
    //   // id: 0,
    //   name: "",
    //   serviceImage: "",
    //   description: handleEditorChange(""),
    //   price: 0,
    //   morningTime: "",
    //   // morningSlot: 0,
    //   afternoonTime: "",
    //   // afternoonSlot: 0,
    //   comments: [],
    // });
    // // setEditorInitialValue("");
  };

  const handleCancel = () => {
    setNewService({
      // id: 0,
      name: "",
      serviceImage: "",
      description: handleEditorChange(""),
      price: 0,
      morningTime: "",
      // morningSlot: 0,
      afternoonTime: "",
      // afternoonSlot: 0,
      comments: [],
    });
    setIsModalOpen(false);
  };

  const handleEditorChange = (content: string) => {
    setNewService({ ...serviceInfo, description: content });
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
              value={newService?.price}
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

            <select name="" id="" className={styles["select-option"]}>
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

            <input type="file" onChange={handleFileChange} accept="image/*" />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AddModalService;
