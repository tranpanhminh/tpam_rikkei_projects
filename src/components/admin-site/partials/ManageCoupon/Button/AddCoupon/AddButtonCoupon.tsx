import React, { useEffect, useState } from "react";
import { Button, Modal, notification } from "antd";
import styles from "../AddCoupon/AddButtonCoupon.module.css";
import { Coupon, Service } from "../../../../../../database";
import axios from "axios";
import { Editor } from "@tinymce/tinymce-react";

interface AddModalProps {
  className?: string;
  value?: string;
  title?: string;
  handleClickOk?: (newService: Service) => void;
}

const AddModalCoupon: React.FC<AddModalProps> = ({
  className,
  value,
  title,
  handleClickOk,
}) => {
  const [coupons, setCoupons] = useState<null | Coupon[]>(null);
  const [editorInitialValue, setEditorInitialValue] = useState("");
  const [newCoupon, setNewCoupon] = useState<Coupon>({
    id: 0,
    name: "",
    serviceImage: "",
    description: "",
    price: 0,
    time: [
      {
        id: 0,
        calendar: "",
        seat: 0,
      },
    ],
  });

  const fetchServices = () => {
    axios
      .get("http://localhost:7373/coupons")
      .then((response) => {
        setServices(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const maxId = services
    ? Math.max(...services.map((service) => service.id))
    : 0;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    // Kiểm tra thông tin đầy đủ
    if (
      !newService.name ||
      !newService.description ||
      newService.price <= 0 ||
      newService.price <= 0
    ) {
      notification.warning({
        message: "Notification",
        description:
          "Please make sure all information filled, Seat must be integer",
      });
      return;
    }

    const updatedService = {
      ...newService,
      id: maxId + 1,
    };

    const updatedServices = services ? [...services, updatedService] : null;

    setServices(updatedServices);
    setIsModalOpen(false);
    if (handleClickOk) {
      handleClickOk(updatedService);
    }
    setNewService({
      id: 0,
      name: "",
      serviceImage: "",
      description: "",
      price: 0,
      time: [
        {
          id: 0,
          calendar: "",
          seat: 0,
        },
      ],
    });
    setEditorInitialValue("Type service description here.........");
  };

  const handleCancel = () => {
    setIsModalOpen(false);
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
            <p>Product Name</p>
            <input
              type="text"
              value={newService.name}
              onChange={(e) =>
                setNewService({ ...newService, name: e.target.value })
              }
            />
          </div>
          <div className={styles["list-input-item"]}>
            <p>Description</p>
            <Editor
              onEditorChange={(content) =>
                setNewService({ ...newService, description: content })
              }
              initialValue={editorInitialValue}
            />
          </div>
          <div className={styles["list-input-item"]}>
            <p>Price</p>
            <input
              type="text"
              value={newService.price}
              onChange={(e) =>
                setNewService({ ...newService, price: Number(e.target.value) })
              }
            />
          </div>
          <div className={styles["list-input-item"]}>
            <p>Service Image</p>
            <input
              type="text"
              value={newService.serviceImage}
              onChange={(e) =>
                setNewService({ ...newService, serviceImage: e.target.value })
              }
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AddModalCoupon;
