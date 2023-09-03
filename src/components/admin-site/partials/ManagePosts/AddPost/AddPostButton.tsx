import React, { useEffect, useState } from "react";
import { Button, DatePicker, DatePickerProps, Modal, notification } from "antd";
import axios from "axios";
import styles from "../../../AdminPage.module.css";
import { Editor } from "@tinymce/tinymce-react";
import moment from "moment";

export interface Props {
  handleClickOk: Function;
}

const AddPostButton: React.FC<Props> = ({ handleClickOk }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState<any>("");
  const [image, setImage] = useState<any>("");
  const [content, setContent] = useState<any>("");
  const [status, setStatus] = useState<any>("");
  const [author, setAuthor] = useState<any>("");
  const [posts, setPosts] = useState<any>("");
  // const [publishedDate, setPublishedDate] = useState<any>();

  const fetchPosts = () => {
    axios
      .get("http://localhost:7373/posts")
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    fetchPosts();
  }, []);

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

  // const onChangeDatePicker: DatePickerProps["onChange"] = (
  //   date,
  //   dateString
  // ) => {
  //   console.log(date, dateString);
  //   setPublishedDate(dateString);
  // };

  const handleAddPost = () => {
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

    const currentDate = moment().format("DD/MM/YYYY HH:mm:ss");

    const newPost = {
      post_title: title,
      post_content: content,
      author: author,
      publish_date: currentDate,
      image_url: image,
      status: status,
    };

    axios
      .post(`http://localhost:7373/posts`, newPost)
      .then((response) => {
        fetchPosts();
        setPosts(response.data);
        notification.success({
          message: "Post Added",
        });
      })
      .catch((error) => {
        console.log(error.message);
      });
    handleClickOk();
  };

  console.log("Updated Posts", posts);

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

            {/* <div className={styles["info-editor-post-item"]}>
              <span>Published Date</span>
              <input
                type="text"
                value={author}
                onChange={(event) => setAuthor(event.target.value)}
              />
            </div> */}
            {/* <div className={styles["test"]}>
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
