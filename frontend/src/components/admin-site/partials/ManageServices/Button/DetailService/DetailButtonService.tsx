import React, { useEffect, useState, useRef } from "react";
import { Button, Modal, message } from "antd";
import { Service } from "../../../../../../database";
import { Editor } from "@tinymce/tinymce-react";
import styles from "../DetailService/DetailModalService.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getDetailService,
  updateService,
} from "../../../../../../api/services.api";
import { getAllWorkingTime } from "../../../../../../api/workingTime.api";

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
  const [messageApi, contextHolder] = message.useMessage();
  const [image, setImage] = useState<any>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [services, setServices] = useState<null | Service>(null);
  const [workingTime, setWorkingTime] = useState<any>(null);
  const [serviceInfo, setServiceInfo] = useState<any>({
    name: "",
    description: "",
    price: 0,
    working_time_id: "",
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
    const fetchServices = async () => {
      const result = await getDetailService(getServiceId);
      setServiceInfo({
        name: result.name,
        description: result.description,
        price: result.price,
        working_time_id: result.working_time_id,
        service_image: result.service_image,
      });
      return setServices(result);
    };
    fetchServices();
  }, [getServiceId]);

  useEffect(() => {
    const fetchWorkingTime = async () => {
      const result = await getAllWorkingTime();
      return setWorkingTime(result);
    };
    fetchWorkingTime();
  }, []);

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

  const fileInputRef = useRef<any>(null);
  const resetInputImage = () => {
    if (image) {
      setServiceInfo({
        ...serviceInfo,
        service_image: "",
      });
      setImage(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = ""; // Đảm bảo rằng phần tử input tồn tại trước khi đặt giá trị.
      }
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
      service_image: event.target.files[0],
    });
  };

  const handleUpdate = async () => {
    const formData: any = new FormData();
    formData.append("name", serviceInfo.name);
    formData.append("description", serviceInfo.description);
    formData.append("price", serviceInfo.price);
    formData.append("working_time_id", serviceInfo.working_time_id);
    formData.append("service_image", serviceInfo.service_image);
    formData.append("_method", "PATCH");
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    messageApi.open({
      type: "loading",
      content: "Updating...",
      duration: 0,
    });

    const result = await updateService(getServiceId, formData, config);
    if (result) {
      const getData = await getDetailService(getServiceId);
      setServices(getData);
      setIsModalOpen(false);
      handleFunctionOk();
      messageApi.destroy();
      setServiceInfo({
        name: "",
        description: "",
        price: 0,
        working_time_id: "",
        service_image: "",
      });
      resetInputImage();
      navigate("/admin/manage-services/");
    }
  };

  // ------------------------------------------------

  return (
    <>
      {contextHolder}
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
              </div>{" "}
              <div className={styles["product-info-item"]}>
                <label className={styles["label-product"]} htmlFor="">
                  Working Time
                </label>
                <select
                  style={{ padding: 5 }}
                  name=""
                  id=""
                  defaultValue={services && Number(services.working_time_id)}
                  onChange={(event) =>
                    setServiceInfo({
                      ...serviceInfo,
                      working_time_id: event.target.value,
                    })
                  }
                >
                  <option value="none" disabled>
                    -- Select Working Time --
                  </option>

                  {workingTime &&
                    workingTime.map((item: any) => {
                      return (
                        <option
                          value={item.id}
                          selected={
                            services?.working_time_id === item.id ? true : false
                          }
                        >
                          {item.morning_time} | {item.afternoon_time}
                        </option>
                      );
                    })}
                </select>

                {/* <input
                  type="number"
                  min={0}
                  name="Product Title"
                  defaultValue={services && services.price}
                  onChange={(event) =>
                    setServiceInfo({
                      ...serviceInfo,
                      working_time_id: event.target.value,
                    })
                  }
                /> */}
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
                    ref={fileInputRef}
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
