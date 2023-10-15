import React, { useEffect, useState, useRef } from "react";
import styles from "../ClientServices/ClientServiceDetail.module.css";
import axios from "axios";
import { NavLink, useLocation, useParams } from "react-router-dom";
import { Button, Rate, Select, notification } from "antd";
import avatar from "../../../../assets/images/dogs-reviews-01.png";
import { Badge } from "react-bootstrap";
import { Editor } from "@tinymce/tinymce-react";
import type { DatePickerProps } from "antd";
import { DatePicker } from "antd";
import { format, parse } from "date-fns";
import BaseAxios from "../../../../api/apiAxiosClient";

const moment = require("moment");

// Import API
const usersAPI = process.env.REACT_APP_API_USERS;
const serviceAPI = process.env.REACT_APP_API_SERVICES;
const serviceCommentsAPI = process.env.REACT_APP_API_SERVICE_COMMENTS;
const bookingsAPI = process.env.REACT_APP_API_BOOKINGS;

// ------------------------------------------------------------------

function ClientServiceDetail() {
  const getData: any = localStorage.getItem("auth");
  const getLoginData = JSON.parse(getData) || "";
  const { serviceId } = useParams();
  const [serviceComments, setServiceComments] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const [service, setService] = useState<any>(null);
  const [comments, setComments] = useState<any>([]);
  const [editorContent, setEditorContent] = useState<any>("");
  const [rateValue, setRateValue] = useState<any>(0);
  const [name, setName] = useState<any>("");
  const [phone, setPhone] = useState<any>("");
  const [dateBooking, setDateBooking] = useState<any>("");
  const [timeZone, setTimeZone] = useState<any>("");
  const [bookings, setBookings] = useState<any>([]);
  // const [dataBookings, setDataBookings] = useState<any>([]);
  // const [dataBookingId, setDataBookingId] = useState<any>([]);
  // const location = useLocation();
  const [listUser, setListUser] = useState<any>([]); // Sử dụng useState để quản lý userAvatar

  let [userInfo, setUserInfo] = useState<any>({
    user_id: "",
    service_id: "",
    name: "",
    phone: "",
    booking_date: "",
    calendar: "",
  });

  // Fetch API
  const fetchUsers = async () => {
    await axios
      .get(`${usersAPI}/detail/${getLoginData.id}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const fetchService = async () => {
    await axios
      .get(`${serviceAPI}/detail/${serviceId}`)
      .then((response) => {
        setService(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const fetchBooking = async () => {
    await axios
      .get(`${bookingsAPI}`)
      .then((response) => {
        setBookings(response.data);
        setTimeZone("Select time");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const fetchServiceComments = async () => {
    await axios
      .get(`${serviceCommentsAPI}/${serviceId}`)
      .then((response) => {
        setServiceComments(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchService();
    fetchUsers();
    fetchBooking();
    fetchServiceComments();
  }, []);

  useEffect(() => {
    axios
      .get(`${usersAPI}`)
      .then((response) => {
        setListUser(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user avatar:", error);
      });
  }, []); // Gọi chỉ một lần khi component được tạo
  // ---------------------------------------------------

  document.title = `${service ? `${service?.name} | PetShop` : "Loading..."}`;

  const handleEditorChange = (content: string) => {
    setEditorContent(content);
  };

  const handleRateChange = (value: number) => {
    setRateValue(value);
    console.log(value);
  };

  // Function Comment
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

    if (!rateValue) {
      notification.warning({
        message: "Please rate",
      });
      return;
    }

    console.log(service.comments, "dasdsa");
    let listCommentId = service.comments?.map((item: any) => {
      return item.commentId;
    });

    let maxId = service.comments?.length > 0 ? Math.max(...listCommentId) : 0;

    const newComment = {
      commentId: maxId + 1,
      serviceId: Number(serviceId),
      userId: getLoginData.loginId,
      userName: getLoginData.fullName,
      userRole: getLoginData.role,
      content: editorContent,
      rating: rateValue,
      date: format(new Date(), "dd/MM/yyyy HH:mm:ss"),
      type: "service",
    };

    console.log("New Comment", newComment);

    service.comments?.push(newComment);

    console.log("service", service);

    axios
      .patch(`http://localhost:7373/service/${serviceId}`, {
        comments: service.comments,
      })
      .then((response) => {
        fetchService();
        setService(response.data);
        handleEditorChange("");
        setRateValue(0);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  // Function Delete Comment
  const handleDeleteComment = (commentId: number) => {
    let findCommentIndex = comments.findIndex((comment: any) => {
      return comment.commentId === commentId;
    });
    console.log(findCommentIndex);

    comments.splice(findCommentIndex, 1);

    axios
      .patch(`http://localhost:7373/service/${serviceId}`, {
        comments: comments,
      })
      .then((response) => {
        fetchService();
        setService(response.data);
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

  const filterCommentsExcludeAdmin = () => {
    let filterComments = serviceComments?.filter((item: any) => {
      return item.user_role_id !== 1 && item.user_role_id !== 2;
    });
    return filterComments ? filterComments?.length : 0;
  };

  const editorConfig = {
    height: "300px",
  };

  // Function Booking Service
  const handleBooking = (userId: number, serviceId: number) => {
    userInfo = {
      ...userInfo,
      user_id: userId,
      service_id: serviceId,
    };
    console.log(userInfo, "USER INFO");

    BaseAxios.post(
      `${bookingsAPI}/add/users/${userId}/services/${serviceId}`,
      userInfo
    )
      .then((response) => {
        console.log(response, "RES");
        notification.success({
          message: `${response.data.message}`,
        });
        setUserInfo({
          user_id: "",
          service_id: "",
          name: "",
          phone: "",
          booking_date: "",
          calendar: "",
        });
      })
      .catch((error) => {
        console.log(error, "EROR");
        notification.warning({
          message: `${error.response.data.message}`,
        });
      });
  };

  const bookingDate: DatePickerProps["onChange"] = (date, dateString) => {
    setUserInfo({
      ...userInfo,
      booking_date: dateString,
    });
  };

  const handleSelectTime = (value: string) => {
    setUserInfo({
      ...userInfo,
      calendar: value,
    });
  };
  console.log(DatePicker, "DATE ");
  return (
    <>
      <div className={styles["wrap-service-detail-page"]}>
        {service && (
          <div className={styles["service-detail"]}>
            <div className="container text-center">
              <div className="row align-items-center">
                <div className="col-xl-6 col-sm-12">
                  <div className="container text-center">
                    <div className="row row-cols-2">
                      <div className="col-12">
                        <img
                          src={service.service_image}
                          alt=""
                          className={styles["service-image"]}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-6 col-sm-12">
                  <div className={styles["service-detail-info"]}>
                    <h2 className={styles["service-title-name"]}>
                      {service && service.name}
                    </h2>
                    {getLoginData.role === "admin" && (
                      <div className={styles["editor-post-bar"]}>
                        <NavLink
                          to={`/admin/manage-service/?edit-serviceId=${service.id}`}
                          target="_blank"
                        >
                          <Badge bg="primary" style={{ fontSize: "16px" }}>
                            Edit Service
                          </Badge>
                        </NavLink>
                      </div>
                    )}
                    <p className={styles["service-description"]}>
                      {React.createElement("div", {
                        dangerouslySetInnerHTML: {
                          __html: service?.description,
                        },
                      })}
                    </p>
                    <table
                      cellPadding={10}
                      style={{ borderCollapse: "collapse" }}
                      className={styles["services-detail-table"]}
                    >
                      <thead>
                        <tr>
                          <th>Day</th>
                          <th>Calendar</th>
                        </tr>
                      </thead>

                      <tbody>
                        <tr>
                          <td rowSpan={2}>Monday - Saturday</td>
                          <td>{service?.working_time.morning_time}</td>
                        </tr>
                        <tr>
                          <td>{service?.working_time.afternoon_time}</td>
                        </tr>
                      </tbody>
                    </table>

                    <div className={styles["rating-service-section"]}>
                      <div className={styles["rating-service-section-item"]}>
                        <span className={styles["rating-service-label"]}>
                          Price:
                        </span>
                        <span style={{ fontSize: "20px" }}>
                          ${service?.price}
                        </span>
                      </div>

                      <div className={styles["rating-service-section-item"]}>
                        <span className={styles["rating-service-label"]}>
                          Rating:
                        </span>
                        <span style={{ fontSize: "20px" }}>
                          {service.avg_rating}
                        </span>
                        <i className="fa-solid fa-star"></i>
                        <span style={{ fontSize: "20px" }}>
                          ({filterCommentsExcludeAdmin()} reviews)
                        </span>
                      </div>
                    </div>
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
                value={userInfo.name}
                onChange={(event) => {
                  setUserInfo({ ...userInfo, name: event.target.value });
                }}
              />
              <input
                type="text"
                placeholder="Phone"
                value={userInfo.phone}
                onChange={(event) => {
                  setUserInfo({ ...userInfo, phone: event.target.value });
                }}
              />
              <div className={styles["booking-calendar-pick"]}>
                <DatePicker
                  format="YYYY-MM-DD"
                  onChange={bookingDate}
                  value={
                    userInfo.booking_date !== ""
                      ? moment(userInfo.booking_date)
                      : null
                  }
                  // defaultValue={userInfo.booking_date}
                />
                <Select
                  style={{ width: 200 }}
                  value={userInfo.calendar}
                  onChange={handleSelectTime}
                  options={[
                    {
                      value: "",
                      label: "Select time",
                    },
                    {
                      value: `${service?.working_time.morning_time}`,
                      label: `${service?.working_time.morning_time}`,
                    },
                    {
                      value: `${service?.working_time.afternoon_time}`,
                      label: `${service?.working_time.afternoon_time}`,
                    },
                  ]}
                />
                <button
                  className={styles["booking-btn"]}
                  onClick={() => {
                    handleBooking(getLoginData.id, service.id);
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
                {serviceComments?.length} comments
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
                {getLoginData ? (
                  <Button type="primary" onClick={handleComment}>
                    Comment
                  </Button>
                ) : (
                  <NavLink to="/login">
                    <Button type="primary">Login to comment</Button>
                  </NavLink>
                )}
              </div>
            </div>
            <div
              className={`${styles["main-content-comment"]} ${styles["comment-scrollable"]}`}
            >
              {serviceComments &&
                serviceComments?.map((item: any) => {
                  return (
                    <section className={styles["product-comment-item"]}>
                      <div className={styles["user-comment-info"]}>
                        <img
                          // src={
                          //   getLoginData.avatar ? getLoginData.avatar : avatar
                          // }
                          src={item.user.image_avatar}
                          alt=""
                          className={styles["user-avatar"]}
                        />

                        <span>{item.user.full_name.split(" ")[0]}</span>
                        {item.user_role_id === 1 || item.user_role_id === 2 ? (
                          <Badge bg="success">Admin</Badge>
                        ) : item.order_history?.length !== 0 ? (
                          <Badge bg="warning" text="dark">
                            Customer
                          </Badge>
                        ) : (
                          ""
                        )}
                        {item.user_role_id !== 1 && item.user_role_id !== 2 && (
                          <span className={styles["rating-section"]}>
                            {item.rating}
                            <i className="fa-solid fa-star"></i>
                          </span>
                        )}
                        {/* {user?.role === "admin" && (
                          <Button
                            type="primary"
                            className={styles["delete-comment-btn"]}
                            onClick={() => handleDeleteComment(item.commentId)}
                          >
                            Delete
                          </Button>
                        )} */}
                      </div>
                      <div>
                        <div className={styles["comment-content-headline"]}>
                          <div
                            className={styles["comment-content-headline-item"]}
                          >
                            <Badge bg="primary">
                              {moment(item.created_at).format(
                                "YYYY-MM-DD-hh:mm:ss"
                              )}
                            </Badge>
                            {user?.role === "admin" && (
                              <i
                                onClick={() =>
                                  handleDeleteComment(item.commentId)
                                }
                                className={`fa-solid fa-trash-can ${styles["trash-comment-icon"]}`}
                              ></i>
                            )}
                          </div>
                        </div>
                        <div
                          className={`${styles["comment-content"]} ${styles["comment-scrollable"]}`}
                        >
                          {React.createElement("div", {
                            dangerouslySetInnerHTML: { __html: item.comment },
                          })}
                        </div>
                      </div>
                      {/* <div>{item.date}</div> */}
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
