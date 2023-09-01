import React, { useEffect, useState } from "react";
import styles from "../ClientServices/ClientServiceDetail.module.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Button, Rate, notification } from "antd";
import avatar from "../../../../assets/images/dogs-reviews-01.png";
import { Badge } from "react-bootstrap";
import { Editor } from "@tinymce/tinymce-react";

function ClientServiceDetail() {
  const getData: any = localStorage.getItem("auth");
  const getLoginData = JSON.parse(getData) || "";
  const { serviceId } = useParams();
  const [user, setUser] = useState<any>(null);
  const [services, setServices] = useState<any>(null);
  const [comments, setComments] = useState<any>([]);
  const [editorContent, setEditorContent] = useState("");
  const [rateValue, setRateValue] = useState(0);

  const fetchUsers = () => {
    axios
      .get(`http://localhost:7373/accounts/${getLoginData.loginId}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const fetchServices = () => {
    axios
      .get(`http://localhost:7373/services/${serviceId}`)
      .then((response) => {
        setServices(response.data);
        setComments(response.data.comments);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    fetchServices();
    fetchUsers();
  }, []);

  const handleEditorChange = (content: string) => {
    setEditorContent(content);
  };

  const handleRateChange = (value: number) => {
    setRateValue(value);
    console.log(value);
  };

  const handleComment = () => {
    if (!getLoginData) {
      notification.warning({
        message: `Please login to comment`,
      });
      return;
    }

    if (editorContent === "") {
      notification.warning({
        message: "Please fill comment",
      });
      return;
    }

    console.log(services.comments, "dasdsa");
    let listCommentId = services.comments.map((item: any) => {
      return item.commentId;
    });

    let maxId = services.comments.length > 0 ? Math.max(...listCommentId) : 0;

    const newComment = {
      commentId: maxId + 1,
      productId: Number(serviceId),
      userId: getLoginData.loginId,
      userName: getLoginData.fullName,
      userRole: getLoginData.role,
      content: editorContent,
      rating: rateValue,
    };

    console.log("New Comment", newComment);

    services.comments.push(newComment);

    console.log("services", services);

    axios
      .patch(`http://localhost:7373/services/${serviceId}`, {
        comments: services.comments,
      })
      .then((response) => {
        fetchServices();
        setServices(response.data);
        handleEditorChange("");
        setRateValue(0);
      })
      .catch((error) => {
        console.log(error.message);
      });
    console.log("Update Products", services);
  };

  const handleDeleteComment = (commentId: number) => {
    console.log("Comment ID", commentId);
  };

  const editorConfig = {
    height: "300px",
  };

  return (
    <>
      <div className={styles["wrap-service-detail-page"]}>
        {services && (
          <div className={styles["service-detail"]}>
            <div className="container text-center">
              <div className="row align-items-center">
                <div className="col-xl-6 col-sm-12">
                  <div className="container text-center">
                    <div className="row row-cols-2">
                      <div className="col-12">
                        <img src={services && services.serviceImage} alt="" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-6 col-sm-12">
                  <div className={styles["service-detail-info"]}>
                    <h2 className={styles["service-title-name"]}>
                      {services && services.name}
                    </h2>
                    <p className={styles["service-description"]}>
                      {services && services.description}
                    </p>
                    <table
                      cellPadding={10}
                      style={{ borderCollapse: "collapse" }}
                      className={styles["services-detail-table"]}
                    >
                      <thead>
                        <tr>
                          <th>Calendar</th>
                          <th>Seat</th>
                          <th>Booking</th>
                        </tr>
                      </thead>
                      <tbody>
                        {services.time.map((item: any) => {
                          return (
                            <tr>
                              <td>{item.calendar}</td>
                              <td>{item.seat}</td>
                              <td>
                                <button
                                  className={styles["booking-service-btn"]}
                                >
                                  Book
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className={styles["comment-product-section"]}>
        <div className={styles["comment-detail"]}>
          <div
            className="container text-center"
            style={{ marginTop: 50, marginBottom: 50 }}
          >
            <div className={styles["comment-heading"]}>
              <h3 className={styles["user-comment-product"]}>
                Total {comments.length} comments
              </h3>
              <div>
                <span className={styles["rating-text"]}>Rating: </span>
                <Rate allowHalf value={rateValue} onChange={handleRateChange} />
              </div>
            </div>

            <div className={styles["comment-input"]}>
              <Editor
                init={editorConfig}
                onEditorChange={handleEditorChange}
                value={editorContent}
              />
              <div className={styles["send-comment-btn"]}>
                <Button type="primary" onClick={handleComment}>
                  Comment
                </Button>
              </div>
            </div>
            {services &&
              services.comments.map((item: any) => {
                return (
                  <div className={styles["main-content-comment"]}>
                    <section className={styles["product-comment-item"]}>
                      <div className={styles["user-comment-info"]}>
                        <img
                          src={avatar}
                          alt=""
                          className={styles["user-avatar"]}
                        />

                        <span>{item.userName}</span>
                        {item.userRole === "admin" ? (
                          <Badge bg="success">Admin</Badge>
                        ) : item.order_history?.length !== 0 ? (
                          <Badge bg="warning" text="dark">
                            Loyal Customer
                          </Badge>
                        ) : (
                          ""
                        )}
                        {user?.role === "admin" && (
                          <Button
                            type="primary"
                            className={styles["delete-comment-btn"]}
                            onClick={() => handleDeleteComment(item.commentId)}
                          >
                            Delete
                          </Button>
                        )}
                      </div>
                      <div className={styles["comment-content"]}>
                        {React.createElement("div", {
                          dangerouslySetInnerHTML: { __html: item.content },
                        })}
                      </div>
                    </section>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
}

export default ClientServiceDetail;
