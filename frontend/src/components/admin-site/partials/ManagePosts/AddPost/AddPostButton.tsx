import React, { useEffect, useRef, useState } from "react";
import { Button, DatePicker, DatePickerProps, Modal, notification } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "../../../AdminPage.module.css";
import { Editor } from "@tinymce/tinymce-react";
import moment from "moment";

export interface Props {
  handleClickOk: Function;
}

// Import API
// 1. Products API
const postsAPI = process.env.REACT_APP_API_POSTS;
const postStatusAPI = process.env.REACT_APP_API_POST_STATUS;

// ------------------------------------------------

const AddPostButton: React.FC<Props> = ({ handleClickOk }) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [image, setImage] = useState(null);
  const [initText, setInitText] = useState("");
  const [postInfo, setPostInfo] = useState<any>({
    title: "",
    content: "",
    thumbnail_url: "",
    author: "",
    status_id: 1,
  });
  const [posts, setPosts] = useState<any>("");
  const [postStatus, setPostStatus] = useState<any>([]);

  // const [publishedDate, setPublishedDate] = useState<any>();

  const fetchPosts = () => {
    axios
      .get(`${postsAPI}`)
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const fetchPostStatus = async () => {
    await axios
      .get(`${postStatusAPI}`)
      .then((response) => {
        setPostStatus(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  console.log(postStatus, "SDAd");
  useEffect(() => {
    fetchPosts();
    fetchPostStatus();
  }, []);

  const showModal = () => {
    navigate(`/admin/manage-posts/?add`);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    handleAddPost();
    // setIsModalOpen(false);
  };

  const handleCancel = () => {
    setPostInfo({
      title: "",
      content: "",
      thumbnail_url: "",
      author: "",
      status_id: 1,
    });
    resetInputImage();
    setIsModalOpen(false);
  };

  // const onChange: DatePickerProps["onChange"] = (date, dateString) => {
  //   console.log(date, dateString);
  // };

  const handleEditorChange = (content: string) => {
    setPostInfo({
      ...postInfo,
      content: content,
    });
  };

  const handleFileChange = (event: any) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      const imageURL: any = URL.createObjectURL(selectedFile);
      setImage(imageURL);
    }

    setPostInfo({
      ...postInfo,
      thumbnail_url: event.target.files[0],
    });
  };

  const fileInputRef = useRef<any>(null);
  const resetInputImage = () => {
    if (image) {
      setPostInfo({
        ...postInfo,
        thumbnail_url: "",
      });
      setImage(null);
      fileInputRef.current.value = null; // Đặt giá trị về null
    }
  };

  const handleAddPost = () => {
    if (!postInfo.title) {
      return notification.warning({
        message: "Title must not be blank",
      });
    }
    if (!postInfo.content) {
      return notification.warning({
        message: "Content must not be blank",
      });
    }
    if (!postInfo.author) {
      return notification.warning({
        message: "Author must not be blank",
      });
    }
    if (!postInfo.status_id) {
      return notification.warning({
        message: "Status ID must not be blank",
      });
    }

    if (!postInfo.thumbnail_url && postInfo.status_id === 2) {
      return {
        data: "You can't set to Published until you set thumbnail",
        status: 406,
      };
    }

    const formData: any = new FormData();
    formData.append("title", postInfo.title);
    formData.append("content", postInfo.content);
    formData.append("thumbnail_url", postInfo.thumbnail_url);
    formData.append("author", postInfo.author);
    formData.append("status_id", postInfo.status_id);
    formData.append("_method", "POST");

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    axios
      .post(`${postsAPI}/add`, formData, config)
      .then((response) => {
        fetchPosts();
        setPosts(response.data);
        notification.success({
          message: "Post Added",
        });
        navigate("/admin/manage-posts/");
        resetInputImage();
        // const fileInput: any = document.querySelector(`#thumbnail`);
        // fileInput.value = "";
        setPostInfo({
          title: "",
          content: "",
          thumbnail_url: "",
          author: "",
          status_id: 1,
        });
        setImage(null);
        handleClickOk();
        setIsModalOpen(false);
      })
      .catch((error) => {
        notification.warning({
          message: `${error.response.data}`,
        });
      });
  };

  const editorConfig = {
    height: "600px",
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
              value={postInfo.title}
              onChange={(event) =>
                setPostInfo({ ...postInfo, title: event.target.value })
              }
            />
            <div className={styles["post-content-editor"]}>
              <Editor
                onEditorChange={handleEditorChange}
                init={editorConfig}
                value={postInfo.content}
              />
            </div>
          </div>
          <div className={styles["info-editor-post"]}>
            <div>
              {image ? (
                <img
                  src={image}
                  alt="Preview"
                  className={styles["post-editor-thumbnail"]}
                  id="thumbnail"
                />
              ) : (
                <img
                  src="https://www.its.ac.id/tmesin/wp-content/uploads/sites/22/2022/07/no-image.png"
                  alt=""
                  className={styles["post-editor-thumbnail"]}
                  id="thumbnail"
                />
              )}
            </div>
            <div className={styles["info-editor-post-item"]}>
              <span>Image URL</span>
              <input
                type="file"
                onChange={handleFileChange}
                accept="image/*"
                ref={fileInputRef}
              />
            </div>
            <div className={styles["info-editor-post-item"]}>
              <span>Status</span>
              <select
                name=""
                id=""
                className={styles["post-editor-select-status"]}
                onChange={(event) =>
                  setPostInfo({ ...postInfo, status_id: event.target.value })
                }
                value={postInfo.status_id}
              >
                {postStatus &&
                  postStatus?.map((status: any) => {
                    return <option value={status.id}>{status.name}</option>;
                  })}
              </select>
            </div>
            {/* 
            <div className={styles["info-editor-post-item"]}>
              <span>Published Date</span>
              <input
                type="text"
                value={author}
                onChange={(event) => setAuthor(event.target.value)}
              />
            </div>
            <div className={styles["test"]}>
              <span>Published Date</span>

              <DatePicker
                format="DD/MM/YYYY"
                onChange={onChangeDatePicker}
                style={{ width: "160px" }}
              />
            </div> */}

            <div className={styles["info-editor-post-item"]}>
              <span>Author</span>
              <input
                type="text"
                value={postInfo.author}
                onChange={(event) =>
                  setPostInfo({ ...postInfo, author: event.target.value })
                }
              />
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AddPostButton;
