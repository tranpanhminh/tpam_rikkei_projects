import React, { useEffect, useState } from "react";
import styles from "../ClientServices/ClientServiceDetail.module.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Button, Rate, Select, notification } from "antd";
import avatar from "../../../../assets/images/dogs-reviews-01.png";
import { Badge } from "react-bootstrap";
import { Editor } from "@tinymce/tinymce-react";
import type { DatePickerProps } from "antd";
import { DatePicker } from "antd";
import { format, parse } from "date-fns";

function ClientServiceDetail() {
  const getData: any = localStorage.getItem("auth");
  const getLoginData = JSON.parse(getData) || "";
  const { serviceId } = useParams();
  const [user, setUser] = useState<any>(null);
  const [services, setServices] = useState<any>(null);
  const [comments, setComments] = useState<any>([]);
  const [editorContent, setEditorContent] = useState("");
  const [rateValue, setRateValue] = useState(0);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [dateBooking, setDateBooking] = useState("");
  const [timeZone, setTimeZone] = useState("");

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
      serviceId: Number(serviceId),
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
    let findCommentIndex = comments.findIndex((comment: any) => {
      return comment.commentId === commentId;
    });
    console.log(findCommentIndex);

    comments.splice(findCommentIndex, 1);

    axios
      .patch(`http://localhost:7373/services/${serviceId}`, {
        comments: comments,
      })
      .then((response) => {
        fetchServices();
        setServices(response.data);
        setComments(response.data.comments);
        notification.success({
          message: "Comment Deleted",
        });
        handleEditorChange("");
        setRateValue(0);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const averageRating = () => {
    let filterComment = comments.filter((comment: any) => {
      return comment.userRole === "customer";
    });

    let sumRating = filterComment.reduce(
      (accumulator: number, currentValue: any) => {
        return accumulator + currentValue.rating;
      },
      0
    );
    if (sumRating === 0) {
      return "No Rating";
    } else {
      return (sumRating / filterComment.length).toFixed(1);
    }
  };

  const editorConfig = {
    height: "300px",
  };

  const handleBooking = (userId: number, serviceId: number) => {
    const newBooking = {
      userId: userId,
      serviceId: serviceId,
      date: dateBooking,
      timeZone: timeZone,
      price: services.price,
    };
    console.log(newBooking);
  };

  const onChangeDatePicker: DatePickerProps["onChange"] = (
    date,
    dateString
  ) => {
    console.log(date, dateString);
    setDateBooking(dateString);
  };

  const handleSelect = (value: string) => {
    console.log(`selected ${value}`);
    setTimeZone(value);
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
                          <th rowSpan={2}>Day</th>
                          <th colSpan={2}>Calendar</th>
                        </tr>
                        <tr>
                          <th>Time</th>
                          <th>Slot</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td rowSpan={2}>Monday - Saturday</td>
                          <td>09:00 AM - 11:30 AM</td>
                          <td>15</td>
                        </tr>
                        <tr>
                          <td>14:00 PM - 16:30 PM</td>
                          <td>15</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className={styles["booking-section"]}>
        <div
          className="container text-center"
          style={{ marginTop: 50, marginBottom: 50 }}
        >
          <div className={styles["booking-form"]}>
            <h3>Booking Service</h3>
            <div className={styles["booking-input-form"]}>
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(event) => {
                  setName(event.target.value);
                }}
              />
              <input
                type="text"
                placeholder="Phone"
                value={phone}
                onChange={(event) => {
                  setPhone(event.target.value);
                }}
              />
              <div className={styles["booking-calendar-pick"]}>
                <DatePicker format="DD/MM/YYYY" onChange={onChangeDatePicker} />
                <Select
                  defaultValue="09:00 AM - 11:30 AM"
                  style={{ width: 200 }}
                  onChange={handleSelect}
                  options={[
                    {
                      value: "09:00 AM - 11:30 AM",
                      label: "09:00 AM - 11:30 AM",
                    },
                    {
                      value: "14:00 PM - 16:30 PM",
                      label: "14:00 PM - 16:30 PM",
                    },
                  ]}
                />
                <button
                  className={styles["booking-btn"]}
                  onClick={() => {
                    handleBooking(getLoginData.loginId, services.id);
                  }}
                >
                  Book
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles["comment-product-section"]}>
        <div className={styles["comment-detail"]}>
          <div
            className="container text-center"
            style={{ marginTop: 50, marginBottom: 50 }}
          >
            <div className={styles["comment-heading"]}>
              <h3 className={styles["user-comment-product"]}>
                {comments.length} comments
              </h3>

              {getLoginData.role !== "admin" && (
                <div>
                  <span className={styles["rating-text"]}>Rating: </span>
                  <Rate
                    allowHalf
                    value={rateValue}
                    onChange={handleRateChange}
                  />
                </div>
              )}
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
            <div
              className={`${styles["main-content-comment"]} ${styles["comment-scrollable"]}`}
            >
              {services &&
                services.comments.map((item: any) => {
                  return (
                    <section className={styles["product-comment-item"]}>
                      <div className={styles["user-comment-info"]}>
                        <img
                          src={avatar}
                          alt=""
                          className={styles["user-avatar"]}
                        />

                        <span>{item.userName.split(" ")[0]}</span>
                        {item.userRole === "admin" ? (
                          <Badge bg="success">Admin</Badge>
                        ) : item.order_history?.length !== 0 ? (
                          <Badge bg="warning" text="dark">
                            Customer
                          </Badge>
                        ) : (
                          ""
                        )}
                        <span className={styles["rating-section"]}>
                          {item.rating}
                          <i className="fa-solid fa-star"></i>
                        </span>
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
                      <div
                        className={`${styles["comment-content"]} ${styles["comment-scrollable"]}`}
                      >
                        {React.createElement("div", {
                          dangerouslySetInnerHTML: { __html: item.content },
                        })}
                      </div>
                    </section>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ClientServiceDetail;
