import React, { useEffect, useRef, useState } from "react";
import { Button, Modal, notification, message } from "antd";
import { useNavigate } from "react-router-dom";
import styles from "../../../AdminPage.module.css";
import { Editor } from "@tinymce/tinymce-react";
import { addPost, getAllPosts } from "../../../../../api/posts.api";
import { getAllPostStatuses } from "../../../../../api/poastStatus.api";

export interface Props {
  handleClickOk: Function;
}

// ------------------------------------------------

const AddPostButton: React.FC<Props> = ({ handleClickOk }) => {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [image, setImage] = useState(null);
  const [postInfo, setPostInfo] = useState<any>({
    title: "",
    content: "",
    thumbnail_url: "",
    author: "",
    status_id: 1,
  });
  const [posts, setPosts] = useState<any>("");
  const [postStatus, setPostStatus] = useState<any>([]);

  const fetchPosts = async () => {
    const result = await getAllPosts();
    return setPosts(result);
  };

  const fetchPostStatus = async () => {
    const result = await getAllPostStatuses();
    return setPostStatus(result);
  };

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

  const handleEditorChange = (content: string) => {
    setPostInfo({
      ...postInfo,
      content: content,
    });
  };

  const handleFileChange = (event: any) => {
    const selectedFile = event.target.files[0];
    if (!event.target.files[0].type.includes("image")) {
      fileInputRef.current.value = null; // Đặt giá trị về null
      return notification.warning({
        message: "Only file type Image is accepted",
      });
    }
    if (selectedFile && event.target.files[0].type.includes("image")) {
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

  const handleAddPost = async () => {
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

    if (!postInfo.thumbnail_url) {
      return notification.warning({
        message: "Please set thumbnail",
      });
    }

    if (!postInfo.thumbnail_url && postInfo.status_id === 2) {
      return notification.warning({
        message: "You can't set to Published until you set thumbnail",
      });
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

    if (
      (postInfo.thumbnail_url && postInfo.status_id === 1) ||
      (postInfo.thumbnail_url && postInfo.status_id === 2)
    ) {
      messageApi.open({
        type: "loading",
        content: "Adding...",
        duration: 0,
      });
    }
    const result = await addPost(formData, config);
    if (result) {
      fetchPosts();
      messageApi.destroy();
      navigate("/admin/manage-posts/");
      resetInputImage();
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
    }

    // axios
    //   .post(`${postsAPI}/add`, formData, config)
    //   .then((response) => {
    //     fetchPosts();
    //     setPosts(response.data);
    //     messageApi.destroy();
    //     notification.success({
    //       message: "Post Added",
    //     });
    //     navigate("/admin/manage-posts/");
    //     resetInputImage();
    //     setPostInfo({
    //       title: "",
    //       content: "",
    //       thumbnail_url: "",
    //       author: "",
    //       status_id: 1,
    //     });
    //     setImage(null);
    //     handleClickOk();
    //     setIsModalOpen(false);
    //   })
    //   .catch((error) => {
    //     notification.warning({
    //       message: `${error.response.data}`,
    //     });
    //   });
  };

  const editorConfig = {
    height: "600px",
  };

  return (
    <>
      {contextHolder}
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
