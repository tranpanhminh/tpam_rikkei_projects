import React, { useEffect, useRef, useState } from "react";
import { Button, Modal, message } from "antd";
import styles from "../../../AdminPage.module.css";
import { Editor } from "@tinymce/tinymce-react";
import { useLocation, useNavigate } from "react-router-dom";
import { getDetailPost, updatePost } from "../../../../../api/posts.api";
const moment = require("moment");

// -------------------------------------------------------------

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
  const [messageApi, contextHolder] = message.useMessage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [image, setImage] = useState(null);
  const [post, setPost] = useState<any>("");
  const navigate = useNavigate();
  const [postInfo, setPostInfo] = useState<any>({
    title: "",
    content: "",
    thumbnail_url: "",
    author: "",
    status_id: "",
  });
  console.log(postInfo, "postInfo");
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const postId = searchParams.get("edit-postId");
    if (postId && Number(postId) === getPost.id) {
      setIsModalOpen(true); // Nếu có edit-postId và nó trùng với postId của post hiện tại, mở modal
    }
  }, [location.search]);

  const fetchPost = async () => {
    const result = await getDetailPost(getPost.id);
    setPostInfo({
      title: result.title,
      content: result.content,
      thumbnail_url: result.thumbnail_url,
      author: result.author,
      status_id: result.status_id,
    });
    return setPost(result);
  };

  useEffect(() => {
    fetchPost();
  }, []);

  const showModal = () => {
    navigate(`/admin/manage-posts/?edit-postId=${getPost.id}`);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    navigate("/admin/manage-posts/");
    resetInputImage();
    setIsModalOpen(false);
  };

  const editorConfig = {
    height: "600px",
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

  const handleEditContent = (content: string, editor: any) => {
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

  const handleUpdatePost = async () => {
    const formData: any = new FormData();
    formData.append("title", postInfo.title);
    formData.append("content", postInfo.content);
    formData.append("thumbnail_url", postInfo.thumbnail_url);
    formData.append("author", postInfo.author);
    formData.append("status_id", postInfo.status_id);
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

    // const result = await updatePost(getPost.id, formData, config);
    // if (result) {
    //   const getData = await getDetailPost(getPost.id);
    //   setPost(getData);
    //   messageApi.destroy();
    //   setPostInfo({
    //     title: "",
    //     content: "",
    //     thumbnail_url: "",
    //     author: "",
    //     status_id: "",
    //   });
    //   navigate("/admin/manage-posts/");
    //   handleFunctionOk();
    //   setIsModalOpen(false);
    // }

    // axios
    //   .patch(`${postsAPI}/update/${getPost.id}`, formData, config)
    //   .then((response) => {
    //     axios
    //       .get(`${postsAPI}/detail/${getPost.id}`)
    //       .then((response) => {
    //         setPost(response.data);
    //       })
    //       .catch((error) => {
    //         console.log(error, "ERRORR");
    //         notification.warning({
    //           message: `${error.response.data}`,
    //         });
    //       });
    //     notification.success({
    //       message: `Post Updated`,
    //     });

    //     setPostInfo({
    //       title: "",
    //       content: "",
    //       thumbnail_url: "",
    //       author: "",
    //       status_id: "",
    //     });
    //     navigate("/admin/manage-posts/");
    //     handleFunctionOk();
    //     setIsModalOpen(false);
    //   })
    //   .catch((error) => {
    //     console.log(error, "ERRORR");
    //     notification.warning({
    //       message: `${error.response.data}`,
    //     });
    //   });
  };

  return (
    <>
      {contextHolder}
      <Button type="primary" onClick={showModal} className={className}>
        {value}
      </Button>
      <Modal
        title="Detail Post"
        open={isModalOpen}
        onOk={handleUpdatePost}
        onCancel={handleCancel}
        width={1500}
      >
        <div className={styles["wrap-editor-post"]}>
          <div className={styles["main-editor-post"]}>
            <input
              type="text"
              placeholder="Post Title"
              className={styles["post-title-editor"]}
              defaultValue={getPost?.title}
              onChange={(event) =>
                setPostInfo({ ...postInfo, title: event.target.value })
              }
            />
            <div className={styles["post-content-editor"]}>
              <Editor
                init={editorConfig}
                initialValue={getPost?.content}
                onEditorChange={handleEditContent}
              />
            </div>
          </div>
          <div className={styles["info-editor-post"]}>
            <div className={styles["image-container"]}>
              {image ? (
                <img
                  src={image}
                  alt=""
                  className={styles["post-editor-thumbnail"]}
                />
              ) : (
                <img
                  src={getPost && getPost?.thumbnail_url}
                  alt=""
                  className={styles["post-editor-thumbnail"]}
                />
              )}

              {/* <button
                className={styles["set-thumbnail-btn"]}
                onClick={reloadThumbnail}
              >
                Reload Thumbnail
              </button> */}
            </div>
            <div className={styles["info-editor-post-item"]}>
              <span>Post ID</span>
              <input type="text" value={getPost.id} disabled />
            </div>
            <div className={styles["info-editor-post-item"]}>
              <span>Author</span>
              <input
                type="file"
                name="thumbnail"
                onChange={handleFileChange}
                id={`thumbnail`}
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
                  setPostInfo({
                    ...postInfo,
                    status_id: event.target.value,
                  })
                }
              >
                <option
                  value={2}
                  selected={
                    getPost?.post_statuses.name === "Published" ? true : false
                  }
                >
                  Published
                </option>
                <option
                  value={1}
                  selected={
                    getPost?.post_statuses.name === "Draft" ? true : false
                  }
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
                value={moment(getPost?.created_at).format(
                  "YYYY-MM-DD-hh:mm:ss"
                )}
              />
            </div>
            <div className={styles["info-editor-post-item"]}>
              <span>Author</span>
              <input
                type="text"
                defaultValue={getPost?.author}
                onChange={(event) =>
                  setPostInfo({
                    ...postInfo,
                    author: event.target.value,
                  })
                }
              />
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default DetailPostButton;
