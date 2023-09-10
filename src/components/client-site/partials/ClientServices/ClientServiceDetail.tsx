import React, { useEffect, useState } from "react";
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

function ClientServiceDetail() {
  const getData: any = localStorage.getItem("auth");
  const getLoginData = JSON.parse(getData) || "";
  const { serviceId } = useParams();
  const [user, setUser] = useState<any>(null);
  const [services, setServices] = useState<any>(null);
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

  const fetchBooking = () => {
    axios
      .get(`http://localhost:7373/bookings/`)
      .then((response) => {
        setBookings(response.data);
        setTimeZone("Select time");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    fetchServices();
    fetchUsers();
    fetchBooking();
  }, []);

  document.title = `${services ? `${services?.name} | PetShop` : "Loading..."}`;

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

    console.log(services.comments, "dasdsa");
    let listCommentId = services.comments?.map((item: any) => {
      return item.commentId;
    });

    let maxId = services.comments?.length > 0 ? Math.max(...listCommentId) : 0;

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

    services.comments?.push(newComment);

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
  };

  // Function Delete Comment
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
    let filterComment = comments?.filter((comment: any) => {
      return comment.userRole === "customer";
    });

    let sumRating = filterComment?.reduce(
      (accumulator: number, currentValue: any) => {
        return accumulator + currentValue.rating;
      },
      0
    );
    if (sumRating === 0 || isNaN(sumRating)) {
      return "No Rating";
    } else {
      return (sumRating / filterComment?.length).toFixed(1);
    }
  };

  const totalComment = () => {
    let filterComment = comments?.filter((comment: any) => {
      return comment.userRole === "customer";
    });
    return filterComment?.length;
  };

  const editorConfig = {
    height: "300px",
  };
  console.log("TIME ZONE", timeZone);
  console.log("dateBooking", typeof dateBooking);
  
  // Function Booking Service
  const handleBooking = (userId: number, serviceId: number) => {
    if (getLoginData.role === "admin") {
      notification.warning({
        message: "Admin can't booking",
      });
      return;
    }

    if (!getLoginData) {
      notification.warning({
        message: "Pleas login to book service",
      });
      return;
    }

    if (
      getLoginData.role === "customer" &&
      getLoginData.status === "Inactive"
    ) {
      notification.warning({
        message: "You can't book service because your account is Inactive",
      });
      return;
    }

    // Định dạng ngày trong `dateBooking` (VD: '10/09/2023')
    const dateParts = dateBooking ? dateBooking.split("/") : "";
    const day = parseInt(dateParts[0], 10);
    const month = parseInt(dateParts[1], 10) - 1; // Lưu ý: Tháng trong JavaScript là từ 0 đến 11
    const year = parseInt(dateParts[2], 10);

    // Tạo một đối tượng Date từ các phần tử trích xuất
    const selectedDate = new Date(year, month, day);

    // Kiểm tra Phone & Address
    const phoneNumberPattern = /^1\d{10}$/;

    if (!phone || !name) {
      notification.warning({
        message: "Please fill Name & Phone",
      });
      return;
    } else if (!phoneNumberPattern.test(phone)) {
      notification.warning({
        message: "Invalid Phone Number (Use the format 1234567890)",
      });
      return;
    }

    if (timeZone === "" || timeZone === "Select time") {
      notification.warning({
        message: "Please choose booking time",
      });
      return;
    }

    if (!dateBooking || dateBooking === "") {
      notification.warning({
        message: "Please choose booking date",
      });
      return;
    }

    // Kiểm tra xem ngày đặt lịch có nhỏ hơn ngày hiện tại không
    const currentDate = new Date();
    if (selectedDate < currentDate) {
      notification.warning({
        message: "Notification",
        description: "You cannot choose a date in the past.",
      });
      return;
    }

    let maxBookingId = 0;

    // Tìm `bookingId` lớn nhất trong tất cả các phần tử `listBookings` của mảng `bookings`
    if (bookings.length > 0) {
      maxBookingId = bookings?.reduce((max: any, booking: any) => {
        const maxInBooking = booking.listBookings
          ? Math.max(...booking.listBookings.map((data: any) => data.bookingId))
          : 0;
        return maxInBooking > max ? maxInBooking : max;
      }, 0);
    }

    // Khi bạn thêm một người dùng mới
    // Bạn cần cập nhật `maxBookingId` bằng cách tăng giá trị hiện tại lên 1
    maxBookingId += 1;

    // Định dạng ngày giờ
    const currentDateTime = new Date();
    const formattedDateTime = format(currentDateTime, "dd/MM/yyyy HH:mm:ss");

    let newDataBooking = {
      bookingId: maxBookingId,
      bookingDate: dateBooking,
      time: formattedDateTime,
      userId: userId,
      userName: name,
      userPhone: phone,
      calendar: timeZone,
      serviceId: serviceId,
      serviceName: services.name,
      serviceImage: services.serviceImage,
      servicePrice: services.price,
      status: "Processing", // Đặt trạng thái là "Pending" ban đầu
    };

    // Kiểm tra xem dateBooking đã được tồn tại trong Data Bookings chưa
    let findDate = bookings.find((booking: any) => {
      return booking.date === dateBooking;
    });

    // Kiểm tra listBookings.length và trạng thái của các booking có khác "Cancel"
    if (findDate && findDate.listBookings.length >= 20) {
      notification.warning({
        message: "Notification",
        description: "This day is fully booked",
      });
      return;
    }

    // Kiểm tra timeZone
    if (timeZone === "09:00 AM - 11:30 AM") {
      // Kiểm tra số lượng slot đã đặt trong khung giờ này
      const bookedSlotsCount = findDate
        ? findDate.listBookings.filter(
            (booking: any) =>
              booking.calendar === timeZone && booking.status !== "Cancel"
          ).length
        : 0;

      if (bookedSlotsCount >= 10) {
        notification.warning({
          message: "Notification",
          description:
            "The time frame of 09:00 AM - 11:30 AM of this day is fully booked.",
        });
        return;
      }
    } else if (timeZone === "14:00 PM - 16:30 PM") {
      // Kiểm tra số lượng slot đã đặt trong khung giờ này
      const bookedSlotsCount = findDate
        ? findDate.listBookings.filter(
            (booking: any) =>
              booking.calendar === timeZone && booking.status !== "Cancel"
          ).length
        : 0;

      if (bookedSlotsCount >= 10) {
        notification.warning({
          message: "Notification",
          description:
            "The time frame of 14:00 PM - 16:30 PM of this day is fully booked.",
        });
        return;
      }
    }

    if (findDate) {
      // Kiểm tra xem đã có đặt lịch trong cùng ngày, cùng khung giờ và cho cùng một người dùng trước đó không
      const isDuplicateBooking = findDate.listBookings?.some((booking: any) => {
        return (
          booking.calendar === timeZone &&
          booking.status !== "Cancel" &&
          booking.userId === getLoginData.loginId
        );
      });

      if (isDuplicateBooking) {
        notification.warning({
          message: "Notification",
          description:
            "You have already booked this time slot for the selected date.",
        });
        return;
      }

      // Nếu không có đặt lịch trước đó, thêm newDataBooking vào listBookings của findDate
      findDate.listBookings.push(newDataBooking);

      // Gọi API patch để cập nhật listBookings của findDate
      axios
        .patch(`http://localhost:7373/bookings/${findDate.id}`, {
          listBookings: findDate.listBookings,
        })
        .then((response) => {
          // Lấy thông tin người dùng từ API
          axios
            .get(`http://localhost:7373/accounts/${userId}`)
            .then((userResponse) => {
              const user = userResponse.data;

              // Thêm bookingId vào booking_history của người dùng
              if (user) {
                user.booking_history.push({
                  bookingId: maxBookingId,
                  bookingDate: dateBooking,
                });

                // Cập nhật thông tin người dùng
                axios
                  .patch(`http://localhost:7373/accounts/${userId}`, user)
                  .then((updateUserResponse) => {
                    // Sau khi cập nhật thông tin người dùng, bạn có thể tiếp tục với các bước khác (nếu cần).
                    fetchBooking();
                    notification.success({
                      message: "Booked Successfully",
                    });
                    setName("");
                    setPhone("");
                    setDateBooking(null);
                    setTimeZone("Select time");
                  })
                  .catch((updateUserError) => {
                    console.error("Error updating user data:", updateUserError);
                  });
              }
            })
            .catch((error) => {
              console.error("Error fetching user data:", error);
            });
        })
        .catch((error) => {
          console.log(error.message);
        });
    } else {
      // Nếu ngày chưa tồn tại, tạo một booking mới
      const newBooking = {
        date: dateBooking,
        listBookings: [newDataBooking], // Thêm newDataBooking vào listBookings mới
      };

      axios
        .post(`http://localhost:7373/bookings/`, newBooking)
        .then((response) => {
          // Lấy thông tin người dùng từ API
          axios
            .get(`http://localhost:7373/accounts/${userId}`)
            .then((userResponse) => {
              const user = userResponse.data;

              // Thêm bookingId vào booking_history của người dùng
              if (user) {
                user.booking_history.push({
                  bookingId: maxBookingId,
                  bookingDate: dateBooking,
                });

                // Cập nhật thông tin người dùng
                axios
                  .patch(`http://localhost:7373/accounts/${userId}`, user)
                  .then((updateUserResponse) => {
                    // Sau khi cập nhật thông tin người dùng, bạn có thể tiếp tục với các bước khác (nếu cần).
                    fetchBooking();
                    notification.success({
                      message: "Booked Successfully",
                    });
                    setName("");
                    setPhone("");
                    setDateBooking("");
                    setTimeZone("Select Time");
                  })
                  .catch((updateUserError) => {
                    console.error("Error updating user data:", updateUserError);
                  });
              }
            })
            .catch((error) => {
              console.error("Error fetching user data:", error);
            });
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  };

  const onChangeDatePicker: DatePickerProps["onChange"] = (
    date,
    dateString
  ) => {
    setDateBooking(dateString);
  };

  const handleSelect = (value: string) => {
    setTimeZone(value);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:7373/accounts/`)
      .then((response) => {
        setListUser(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user avatar:", error);
      });
  }, []); // Gọi chỉ một lần khi component được tạo


  const getAvatar = (userId: number) => {
    let defaultAvatar = "https://i.ibb.co/3BtQdVD/pet-shop.png";
    let userAvatar = "";
    let findUser = listUser.find((item: any) => {
      return item.id === userId;
    });
    if (findUser) {
      userAvatar = findUser.image_avatar
        ? findUser.image_avatar
        : defaultAvatar;
    } else {
      userAvatar = defaultAvatar;
    }
    return userAvatar;
  };

  const getUserName = (userId: number) => {
    let defaultAvatar = "Anonymous";
    let userName = "";
    let findUser = listUser.find((item: any) => {
      return item.id === userId;
    });
    if (findUser) {
      userName = findUser.fullName;
    } else {
      userName = defaultAvatar;
    }
    return userName;
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
                        <img
                          src={services && services.serviceImage}
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
                      {services && services.name}
                    </h2>
                    {getLoginData.role === "admin" && (
                      <div className={styles["editor-post-bar"]}>
                        <NavLink
                          to={`/admin/manage-services/?edit-serviceId=${services.id}`}
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
                          __html: services?.description,
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
                          <td>{services?.morningTime}</td>
                        </tr>
                        <tr>
                          <td>{services?.afternoonTime}</td>
                        </tr>
                      </tbody>
                    </table>

                    <div className={styles["rating-service-section"]}>
                      <div className={styles["rating-service-section-item"]}>
                        <span className={styles["rating-service-label"]}>
                          Price:
                        </span>
                        <span style={{ fontSize: "20px" }}>
                          ${services?.price}
                        </span>
                      </div>

                      <div className={styles["rating-service-section-item"]}>
                        <span className={styles["rating-service-label"]}>
                          Rating:
                        </span>
                        <span style={{ fontSize: "20px" }}>
                          {averageRating()}
                        </span>
                        <i className="fa-solid fa-star"></i>
                        <span style={{ fontSize: "20px" }}>
                          ({totalComment()} reviews)
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
                  value={timeZone}
                  // defaultValue="Select time"
                  style={{ width: 200 }}
                  onChange={handleSelect}
                  options={[
                    {
                      value: "Select time",
                      label: "Select time",
                    },
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
                {comments?.length} comments
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
              {services &&
                services.comments?.map((item: any) => {
                  return (
                    <section className={styles["product-comment-item"]}>
                      <div className={styles["user-comment-info"]}>
                        <img
                          // src={
                          //   getLoginData.avatar ? getLoginData.avatar : avatar
                          // }
                          src={getAvatar(item.userId)}
                          alt=""
                          className={styles["user-avatar"]}
                        />

                        <span>{getUserName(item.userId).split(" ")[0]}</span>
                        {item.userRole === "admin" ? (
                          <Badge bg="success">Admin</Badge>
                        ) : item.order_history?.length !== 0 ? (
                          <Badge bg="warning" text="dark">
                            Customer
                          </Badge>
                        ) : (
                          ""
                        )}
                        {item.userRole !== "admin" && (
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
                            <Badge bg="primary">{item.date}</Badge>
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
                            dangerouslySetInnerHTML: { __html: item.content },
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
