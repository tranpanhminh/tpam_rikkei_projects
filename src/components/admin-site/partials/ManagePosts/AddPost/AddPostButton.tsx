import React, { useEffect, useState } from "react";
import { Button, Modal, notification } from "antd";
import axios from "axios";
import styles from "../../../AdminPage.module.css";
import { Editor } from "@tinymce/tinymce-react";

interface DetailModalProps {
  className?: string; // Thêm khai báo cho thuộc tính className
  value?: string; // Thêm khai báo cho thuộc tính className
  title?: string;
  // handleFunctionOk?: any;
  handleFunctionBtn?: any;
  getPost: any;
}
const AddPostButton: React.FC<DetailModalProps> = ({
  className,
  value,
  title,
  // handleFunctionOk,
  handleFunctionBtn,
  getPost,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [shippingStatus, setShippingStatus] = useState("");
  const [orders, setOrders] = useState<any>(null);
  const [orderCart, setOrderCart] = useState<any>(null);
  const [userId, setUserId] = useState<any>();
  const [user, setUser] = useState<any>();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    // notification.success({
    //   message: "Shipping Status Updated Successfully",
    // });
    // setShippingStatus("");
    // setIsModalOpen(false);
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
        title="Detail Post"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1200}
      >
        <div className={styles["wrap-editor-post"]}>
          <div className={styles["main-editor-post"]}>
            <input
              type="text"
              placeholder="Post Title"
              className={styles["post-title-editor"]}
            />
            <div className={styles["post-content-editor"]}>
              <Editor />
            </div>
          </div>
          <div className={styles["info-editor-post"]}>
            <div>
              <img
                src={getPost.image_url}
                alt=""
                className={styles["post-editor-thumbnail"]}
              />
            </div>
            <div className={styles["info-editor-post-item"]}>
              <span>Image URL</span>
              <input type="text" />
            </div>
            <div className={styles["info-editor-post-item"]}>
              <span>Status</span>
              <select
                name=""
                id=""
                className={styles["post-editor-select-status"]}
              >
                <option value="Published">Published</option>
                <option value="Draft">Draft</option>
              </select>
            </div>
            <div className={styles["info-editor-post-item"]}>
              <span>Published Date</span>
              <input type="text" disabled value={getPost.publish_date} />
            </div>
            <div className={styles["info-editor-post-item"]}>
              <span>Author</span>
              <input type="text" />
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AddPostButton;
