import React, { useEffect, useState, useRef } from "react";
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
  const [image, setImage] = useState<any>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [thumbnail, setThumbnail] = useState<any>(null);
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

  // Ẩn - hiện Modal
  const showModal = () => {
    navigate(`/admin/manage-services/?edit-serviceId=${getServiceId}`);
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
    navigate(`/admin/manage-services/`);
  };

  // ------------------------------------------------

  const editorConfig = {
    height: "600px",
  };

  // Update thông tin Service
  // let fileUploaded = false;

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

  const handleFileChange = (event: any) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const imageURL: any = URL.createObjectURL(selectedFile);
      setImage(imageURL);
    }

    setServiceInfo({
      ...serviceInfo,
      service_thumbnail: event.target.files[0],
    });
  };

  const handleUpdate = () => {
    const formData: any = new FormData();
    formData.append("name", serviceInfo.name);
    formData.append("description", serviceInfo.description);
    formData.append("price", serviceInfo.price);
    formData.append("working_time_id", serviceInfo.working_time_id);
    formData.append("service_image", serviceInfo.service_thumbnail);
    formData.append("_method", "PATCH");
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    console.log(getServiceId, "FORMD");
    axios
      .patch(`${servicesAPI}/update/${getServiceId}`, formData, config)
      .then((response) => {
        // Đặt giá trị của input type file về rỗng
        axios
          .get(`${servicesAPI}/detail/${getServiceId}`)
          .then((response) => {
            setServices(response.data);
            setIsModalOpen(false);
            handleFunctionOk();
          })
          .catch((error) => {
            // notification.warning({
            //   message: `${error.response.data}`,
            // });
          });
        notification.success({
          message: `Service Updated`,
        });
        setServiceInfo({
          name: "",
          description: "",
          price: 0,
          working_time_id: 1,
          service_image: "",
        });
        resetInputImage();

        navigate("/admin/manage-services/");
      })
      .catch((error) => {
        console.log(error);
        // notification.warning({
        //   message: `${error.response.data}`,
        // });
      });
  };

  // ------------------------------------------------

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
        onOk={handleUpdate}
        onCancel={handleCancel}
      >
        {services && (
          <div className={styles["product-detail-information-container"]}>
            {image ? (
              <img src={image} alt="" className={styles["service-thumbnail"]} />
            ) : (
              <img
                src={services && services.service_image}
                alt=""
                className={styles["service-thumbnail"]}
              />
            )}

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
              <div className={styles["product-info-item"]}>
                <label className={styles["label-product"]} htmlFor="">
                  Thumbnail
                </label>
                <div className={styles["upload-image-form"]}>
                  <input
                    type="file"
                    name="image-01"
                    onChange={handleFileChange}
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
