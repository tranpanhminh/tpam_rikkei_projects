import React, { useEffect, useState } from "react";
import { Button, Modal, notification } from "antd";
import axios from "axios";
import styles from "../../../AdminPage.module.css";
import { Editor } from "@tinymce/tinymce-react";
import { useLocation, useNavigate } from "react-router-dom";

interface DetailModalProps {
  className?: string; // Thêm khai báo cho thuộc tính className
  value?: string; // Thêm khai báo cho thuộc tính className
  title?: string;
  handleFunctionOk: any;
  getPost: any;
}
const DetailPostButton: React.FC<DetailModalProps> = ({
  className,
  value,
  title,
  handleFunctionOk,
  getPost,
}) => {
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [postTitle, setPostTitle] = useState<any>("");
  const [image, setImage] = useState<any>("");
  const [content, setContent] = useState<any>("");
  const [status, setStatus] = useState<any>("");
  const [author, setAuthor] = useState<any>("");
  const [post, setPost] = useState<any>("");
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const postId = searchParams.get("edit-postId");
    if (postId && Number(postId) === getPost.id) {
      setIsModalOpen(true); // Nếu có edit-postId và nó trùng với postId của post hiện tại, mở modal
    }
  }, [location.search]);

  const fetchPost = () => {
    axios
      .get(`http://localhost:7373/posts/${getPost.id}`)
      .then((response) => {
        setPost(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    fetchPost();
  }, [getPost.id]);

  const showModal = () => {
    navigate(`/admin/manage-posts/?edit-postId=${getPost.id}`);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    const updatedPost = {
      post_title: postTitle !== "" ? postTitle : getPost.post_title,
      post_content: content !== "" ? content : getPost.post_content,
      author: author !== "" ? author : getPost.author,
      publish_date: getPost.publish_date,
      image_url: image !== "" ? image : getPost.image_url,
      status: status !== "" ? status : getPost.status,
    };
    console.log("DSADASDSA", status);
    console.log("Updated Post", updatedPost);
    axios
      .put(`http://localhost:7373/posts/${getPost.id}`, updatedPost)
      .then((response) => {
        fetchPost();
        notification.success({
          message: "Post Updated Successfully",
        });
      })
      .catch((error) => {
        console.error("Error updating post:", error);
      });
    handleFunctionOk();
    setIsModalOpen(false); // Close the modal
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
      <Button type="primary" onClick={showModal} className={className}>
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
                onChange={(event) => setStatus(event.target.value)}
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
              <input type="text" disabled value={getPost?.publish_date} />
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
