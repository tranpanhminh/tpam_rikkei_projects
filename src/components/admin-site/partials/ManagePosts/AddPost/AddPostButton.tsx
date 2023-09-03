import React, { useState } from "react";
import { Button, DatePicker, DatePickerProps, Modal } from "antd";
import axios from "axios";
import styles from "../../../AdminPage.module.css";
import { Editor } from "@tinymce/tinymce-react";

const AddPostButton: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState<any>("");
  const [image, setImage] = useState<any>("");
  const [content, setContent] = useState<any>("");
  const [status, setStatus] = useState<any>("");
  const [author, setAuthor] = useState<any>("");
  const [publishedDate, setPublishedDate] = useState<any>();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    handleAddPost();
    // setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
  };

  const handleEditorChange = (content: string) => {
    setContent(content);
  };

  const onChangeDatePicker: DatePickerProps["onChange"] = (
    date,
    dateString
  ) => {
    console.log(date, dateString);
    setPublishedDate(dateString);
  };

  const handleAddPost = () => {
    const newPost = {
      post_title: title,
      post_content: content,
      author: author,
      publish_date: publishedDate,
      image_url: image,
      status: status,
    };
    console.log("New Post", newPost);
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
        width={1300}
      >
        <div className={styles["wrap-editor-post"]}>
          <div className={styles["main-editor-post"]}>
            <input
              type="text"
              placeholder="Post Title"
              className={styles["post-title-editor"]}
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
            <div className={styles["post-content-editor"]}>
              <Editor onEditorChange={handleEditorChange} value={content} />
            </div>
          </div>
          <div className={styles["info-editor-post"]}>
            <div>
              <img
                src={image}
                alt=""
                className={styles["post-editor-thumbnail"]}
              />
            </div>
            <div className={styles["info-editor-post-item"]}>
              <span>Image URL</span>
              <input
                type="text"
                value={image}
                onChange={(event) => setImage(event.target.value)}
              />
            </div>
            <div className={styles["info-editor-post-item"]}>
              <span>Status</span>
              <select
                name=""
                id=""
                className={styles["post-editor-select-status"]}
                onChange={(event) => setStatus(event.target.value)}
              >
                <option value="Select Status" selected disabled>
                  Select Status
                </option>
                <option value="Published">Published</option>
                <option value="Draft">Draft</option>
              </select>
            </div>
            <div className={styles["test"]}>
              <span>Published Date</span>

              <DatePicker
                format="DD/MM/YYYY"
                onChange={onChangeDatePicker}
                style={{ width: "160px" }}
              />
            </div>

            <div className={styles["info-editor-post-item"]}>
              <span>Author</span>
              <input
                type="text"
                value={author}
                onChange={(event) => setAuthor(event.target.value)}
              />
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AddPostButton;
