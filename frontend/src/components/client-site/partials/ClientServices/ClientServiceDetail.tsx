import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import styles from "../ClientServices/ClientServiceDetail.module.css";
import {
  NavLink,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { Button, Modal, Rate, Select } from "antd";
import { Badge } from "react-bootstrap";
import { Editor } from "@tinymce/tinymce-react";
import type { DatePickerProps } from "antd";
import { DatePicker } from "antd";
import tinymce from "tinymce";
import { getDataLogin } from "../../../../api/users.api";
import { getDetailService } from "../../../../api/services.api";
import {
  addServiceComment,
  deleteServiceComment,
  getAllCommentsByService,
} from "../../../../api/serviceComments.api";
import { bookingService } from "../../../../api/bookings.api";

const moment = require("moment");

// ------------------------------------------------------------------

function ClientServiceDetail() {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [serviceComments, setServiceComments] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const [service, setService] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [userComment, setUserComment] = useState<any>({
    comment: "",
    rating: 5,
  });
  let [userInfo, setUserInfo] = useState<any>({
    user_id: "",
    service_id: "",
    name: "",
    phone: "",
    booking_date: "",
    calendar: "",
  });

  // ------------------------------------------------------------------

  // Fetch API
  const fetchUsers = async () => {
    const result = await getDataLogin();
    return setUser(result);
  };

  const fetchService = async () => {
    const result = await getDetailService(serviceId);
    return setService(result);
  };

  const fetchServiceComments = async () => {
    const result = await getAllCommentsByService(serviceId);
    return setServiceComments(result);
  };

  useEffect(() => {
    fetchService();
    fetchUsers();
    fetchServiceComments();
  }, []);

  // -----------------------------------------------------

  document.title = `${service ? `${service?.name} | PetShop` : "Loading..."}`;

  // Ẩn hiện Modal

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  // Add Comment
  const handleComment = async () => {
    const result = await addServiceComment(serviceId, user.id, userComment);
    setUserComment({
      comment: "",
      rating: 5,
    });
    const editor = tinymce.get("editorID");
    if (editor) {
      // Đặt nội dung của trình soạn thảo về trạng thái trống
      editor.setContent("");
    }
    fetchService();
    fetchServiceComments();
    return result;
  };

  const editorConfig = {
    height: "300px",
  };

  const handleRateChange = (value: number) => {
    setUserComment({
      ...userComment,
      rating: value,
    });
  };

  // -----------------------------------------------------

  // Delete Comment
  const handleDeleteComment = async (commentId: number) => {
    const result = await deleteServiceComment(commentId);
    if (result) {
      return fetchServiceComments();
    }
  };

  const checkShowDeleteCommentBtn = () => {
    if ((user && user?.role_id === 1) || (user && user?.role_id === 2)) {
      return true;
    }
    return false;
  };

  // -----------------------------------------------------

  // Function Booking Service
  const handleBooking = async (userId: number, serviceId: number) => {
    userInfo = {
      ...userInfo,
      user_id: userId,
      service_id: serviceId,
    };
    const result = await bookingService(userId, serviceId, userInfo);
    setUserInfo({
      user_id: "",
      service_id: "",
      name: "",
      phone: "",
      booking_date: "",
      calendar: "",
    });
    return result;
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
  // -----------------------------------------------------

  const filterCommentsExcludeAdmin = () => {
    let filterComments = serviceComments?.filter((item: any) => {
      return item?.users?.role_id !== 1 && item?.users?.role_id !== 2;
    });
    return filterComments ? filterComments?.length : 0;
  };

  // Pagination
  const itemsPerPage = Number(searchParams.get("limit")) || 5;
  // const itemsPerPage = 5;
  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(serviceComments?.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(serviceComments?.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, serviceComments]);

  const handlePageClick = (event: any) => {
    const newPage = event.selected + 1;
    const newOffset = event.selected * itemsPerPage;
    setItemOffset(newOffset);
    navigate(`/services/${serviceId}?page=${newPage}&limit=${itemsPerPage}`);
  };

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
                    {(user?.role_id === 1 || user?.role_id === 2) && (
                      <div className={styles["editor-post-bar"]}>
                        <NavLink
                          to={`/admin/manage-services/?edit-serviceId=${service.id}`}
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
                          <td>{service?.working_time?.morning_time}</td>
                        </tr>
                        <tr>
                          <td>{service?.working_time?.afternoon_time}</td>
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
                    user ? handleBooking(user.id, service.id) : showModal();
                  }}
                  // onClick={() => {
                  //   handleBooking(user.id, service.id);
                  // }}
                >
                  Book
                </button>
                <Modal
                  title="Notification"
                  open={isModalOpen}
                  onOk={handleOk}
                  onCancel={handleCancel}
                  width={400}
                >
                  <p>
                    Please <NavLink to="/login">Login</NavLink> to buy Product
                  </p>
                  <p>
                    <NavLink to="/signup">Don't have an account?</NavLink>
                  </p>
                </Modal>
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

              {user?.role_id === 3 && (
                <div>
                  <span className={styles["rating-text"]}>Rating: </span>
                  <Rate
                    allowHalf
                    value={userComment.rating}
                    onChange={handleRateChange}
                  />
                </div>
              )}
            </div>

            <div className={styles["comment-input"]}>
              <Editor
                init={editorConfig}
                onEditorChange={(content) =>
                  setUserComment({ ...userComment, comment: content })
                }
                value={userComment.comment}
                id="editorID"
              />
              <div className={styles["send-comment-btn"]}>
                {user ? (
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
              {currentItems &&
                currentItems?.map((item: any) => {
                  return (
                    <section className={styles["product-comment-item"]}>
                      <div className={styles["user-comment-info"]}>
                        <img
                          src={item?.users?.image_avatar}
                          alt=""
                          className={styles["user-avatar"]}
                        />

                        <span>{item?.users?.full_name.split(" ")[0]}</span>
                        {item?.users?.role_id === 1 ||
                        item?.users?.role_id === 2 ? (
                          <Badge bg="success">Admin</Badge>
                        ) : item.order_history?.length !== 0 ? (
                          <Badge bg="warning" text="dark">
                            Customer
                          </Badge>
                        ) : (
                          ""
                        )}
                        {item?.users?.role_id !== 1 &&
                          item?.users?.role_id !== 2 && (
                            <span className={styles["rating-section"]}>
                              {item.rating}
                              <i className="fa-solid fa-star"></i>
                            </span>
                          )}
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
                          </div>
                          <i
                            onClick={() => handleDeleteComment(item.id)}
                            className={`fa-solid fa-trash-can ${styles["trash-comment-icon"]}`}
                            style={{
                              display:
                                checkShowDeleteCommentBtn() === true
                                  ? "inline-block"
                                  : "none",
                            }}
                          ></i>
                        </div>
                        <div
                          className={`${styles["comment-content"]} ${styles["comment-scrollable"]}`}
                        >
                          {React.createElement("div", {
                            dangerouslySetInnerHTML: { __html: item.comment },
                          })}
                        </div>
                      </div>
                    </section>
                  );
                })}
              <div className={styles["pagination-form"]}>
                <ReactPaginate
                  nextLabel="next >"
                  previousLabel="< previous"
                  renderOnZeroPageCount={null}
                  pageRangeDisplayed={13}
                  pageCount={pageCount}
                  onPageChange={handlePageClick}
                  containerClassName="pagination"
                  pageLinkClassName="page-number"
                  previousLinkClassName="page-number"
                  nextLinkClassName="page-number"
                  activeLinkClassName={styles["active"]}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ClientServiceDetail;
