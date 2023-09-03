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
const DetailPostButton: React.FC<DetailModalProps> = ({
  className,
  value,
  title,
  // handleFunctionOk,
  handleFunctionBtn,
  getPost,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [postTitle, setPostTitle] = useState<any>("");
  const [image, setImage] = useState<any>("");
  const [content, setContent] = useState<any>("");
  const [status, setStatus] = useState<any>("");
  const [author, setAuthor] = useState<any>("");
  const [posts, setPosts] = useState<any>("");

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    if (title === "") {
      notification.warning({
        message: "Please fill Post Title",
      });
      return;
    }

    if (image === "") {
      notification.warning({
        message: "Please fill Image Url",
      });
      return;
    }

    if (status === "") {
      notification.warning({
        message: "Please select Post Status",
      });
      return;
    }

    if (author === "") {
      notification.warning({
        message: "Please fill Author Name",
      });
      return;
    }

    if (content === "") {
      notification.warning({
        message: "Please fill Post Content",
      });
      return;
    }

    const updatedPost = {
      post_title: postTitle !== "" ? postTitle : getPost.post_title,
      post_content: content !== "" ? content : getPost.post_content,
      author: author !== "" ? author : getPost.author,
      publish_date: getPost.publish_date,
      image_url: image !== "" ? image : getPost.image_url,
      status: status !== "" ? status : getPost.status,
    };

    console.log("Updated Post", updatedPost);

    // notification.success({
    //   message: "Shipping Status Updated Successfully",
    // });

    // setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const editorConfig = {
    height: "600px",
  };

  const handleChange = (content: string, editor: any) => {
    setContent(content);
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
        width={1500}
      >
        <div className={styles["wrap-editor-post"]}>
          <div className={styles["main-editor-post"]}>
            <input
              type="text"
              placeholder="Post Title"
              className={styles["post-title-editor"]}
              defaultValue={getPost?.post_title}
              onChange={(event) => setPostTitle(event.target.value)}
            />
            <div className={styles["post-content-editor"]}>
              <Editor
                init={editorConfig}
                initialValue={getPost?.post_content}
                onEditorChange={handleChange}
              />
            </div>
          </div>
          <div className={styles["info-editor-post"]}>
            <div>
              <img
                src={getPost?.image_url}
                alt=""
                className={styles["post-editor-thumbnail"]}
              />
            </div>
            <div className={styles["info-editor-post-item"]}>
              <span>Post ID</span>
              <input type="text" value={getPost.id} disabled />
            </div>
            <div className={styles["info-editor-post-item"]}>
              <span>Image URL</span>
              <input
                type="text"
                defaultValue={getPost?.image_url}
                onChange={(event) => setImage(event.target.value)}
              />
            </div>
            <div className={styles["info-editor-post-item"]}>
              <span>Status</span>
              <select
                name=""
                id=""
                className={styles["post-editor-select-status"]}
              >
                <option
                  defaultValue="Published"
                  selected={getPost?.status === "Published" ? true : false}
                >
                  Published
                </option>
                <option
                  defaultValue="Draft"
                  selected={getPost?.status === "Draft" ? true : false}
                >
                  Draft
                </option>
              </select>
            </div>
            <div className={styles["info-editor-post-item"]}>
              <span>Published Date</span>
              <input
                type="text"
                disabled
                defaultValue={getPost?.publish_date}
              />
            </div>
            <div className={styles["info-editor-post-item"]}>
              <span>Author</span>
              <input
                type="text"
                defaultValue={getPost?.author}
                onChange={(event) => setAuthor(event.target.value)}
              />
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default DetailPostButton;
