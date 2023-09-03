import React, { useState } from "react";
import { Button, Modal } from "antd";
import axios from "axios";
import styles from "../../../AdminPage.module.css";
import { Editor } from "@tinymce/tinymce-react";

const AddPostButton: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Add Post
      </Button>
      <Modal
        title="Add Post"
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
                // src={getPost.image_url}
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
              {/* <input type="text" disabled value={getPost.publish_date} /> */}
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
