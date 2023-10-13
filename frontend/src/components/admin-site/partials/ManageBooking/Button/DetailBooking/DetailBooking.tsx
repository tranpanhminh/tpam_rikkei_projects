import React, { useEffect, useState } from "react";
import { Button, Modal, notification } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "../../../../AdminPage.module.css";
import { Badge, Table } from "react-bootstrap";
const moment = require("moment");

// Import API
// 1. Booking API
const bookingsAPI = process.env.REACT_APP_API_BOOKINGS;
const bookingStatusAPI = process.env.REACT_APP_API_BOOKING_STATUS;

// -----------------------------------------------------

interface DetailModalProps {
  className?: string; // Thêm khai báo cho thuộc tính className
  value?: string; // Thêm khai báo cho thuộc tính className
  title?: string;
  handleFunctionOk?: any;
  handleFunctionBtn?: any;
  getBookingId?: number;
  getBookingDate?: any;
}
const DetailBooking: React.FC<DetailModalProps> = ({
  className,
  value,
  title,
  handleFunctionOk,
  handleFunctionBtn,
  getBookingDate,
  getBookingId,
}) => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [booking, setBooking] = useState<any>(null);
  const [listBooking, setListBooking] = useState<any>(null);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [isModalOpenUpdateStatus, setIsModalOpenUpdateStatus] = useState(false);
  const [groupBookingDate, setGroupBookingDate] = useState<any>([]);
  const [bookingStatus, setBookingStatus] = useState<any>([]);
  const [status, setStatus] = useState("");

  const fetchBookingByDate = async () => {
    await axios
      .get(`${bookingsAPI}/filter/date/${getBookingDate}`)
      .then((response) => {
        setGroupBookingDate(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchBookingStatus = async () => {
    await axios
      .get(`${bookingStatusAPI}`)
      .then((response) => {
        setBookingStatus(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // const fetchBookings = () => {
  //   axios
  //     .get(`http://localhost:7373/bookings/${getBookingId}`)
  //     .then((response) => {
  //       setBooking(response.data);
  //       setListBooking(response.data.listBookings);
  //     })
  //     .catch((error) => {
  //       console.log(error.message);
  //     });
  // };

  useEffect(() => {
    fetchBookingStatus();
    fetchBookingByDate();
  }, []);

  const showModal = () => {
    navigate(`/admin/manage-booking/?date=${getBookingDate}`);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const customStyles = {
    Done: {
      backgroundColor: "green", // Màu nền xanh lá cây cho 'Done'
      color: "white", // Màu văn bản trắng cho 'Done'
    },
    Processing: {
      backgroundColor: "blue", // Màu nền xanh cho 'Processing'
      color: "white", // Màu văn bản trắng cho 'Processing'
    },
    Cancel: {
      backgroundColor: "red", // Màu nền đỏ cho 'Cancel'
      color: "white", // Màu văn bản trắng cho 'Cancel'
    },
  };

  const changeColor = (status: string) => {
    switch (status) {
      case "Done":
        return "success";
      case "Processing":
        return "primary";
      case "Cancel":
        return "danger";
      case "Pending":
        return "warning";
      default:
        return;
    }
  };

  const handleDetailClick = (serviceId: any) => {
    navigate(
      `/admin/manage-booking/?date=${getBookingDate}/?bookingId=${serviceId}`
    );
    axios
      .get(`${bookingsAPI}/detail/${serviceId}`)
      .then((response) => {
        setSelectedBooking(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    setIsModalOpenUpdateStatus(true);
  };

  const updateBookingStatus = (bookingId: number, status: string) => {
    // Gửi yêu cầu cập nhật trạng thái đặt hàng lên máy chủ
    return axios.patch(`http://localhost:7373/bookings/${bookingId}`, {
      status: status,
    });
  };

  const handleOkUpdateStatus = () => {
    console.log(status, "STATUS");
    const updateBooking = {
      status_id: status,
    };
    axios
      .patch(`${bookingsAPI}/update/${selectedBooking?.id}`, updateBooking)
      .then((response) => {
        notification.success({
          message: `Booking Updated`,
        });
      })
      .catch((error) => {
        notification.warning({
          message: `${error.response.data.message}`,
        });
      });
  };

  const handleCancelUpdateStatus = () => {
    setIsModalOpenUpdateStatus(false);
  };

  // const handleSearchBooking = () => {
  //   // if (searchText === "") {
  //   //   // Nếu searchText rỗng, gọi lại fetchUsers để lấy tất cả người dùng
  //   //   fetchBookings();
  //   // } else {
  //   //   // Nếu có searchText, thực hiện tìm kiếm và cập nhật state
  //   //   axios
  //   //     .get(`http://localhost:7373/bookings/detail/${getBookingId}`)
  //   //     .then((response) => {
  //   //       // Lấy dữ liệu từ response
  //   //       const allBooking = response.data;
  //   //       // Tìm kiếm trong dữ liệu và cập nhật state
  //   //       const filteredBooking = allBooking.listBookings.filter(
  //   //         (booking: any) => {
  //   //           if (
  //   //             booking.bookingId
  //   //               .toString()
  //   //               .includes(searchText.trim().toLowerCase()) ||
  //   //             booking.userName
  //   //               .toLowerCase()
  //   //               .includes(searchText.trim().toLowerCase()) ||
  //   //             booking.userPhone
  //   //               .toString()
  //   //               .includes(searchText.trim().toLowerCase()) ||
  //   //             booking.serviceName
  //   //               .toLowerCase()
  //   //               .includes(searchText.trim().toLowerCase())
  //   //           ) {
  //   //             return true;
  //   //           }
  //   //           return false;
  //   //         }
  //   //       );
  //   //       setListBooking(filteredBooking);
  //   //     })
  //   //     .catch((error) => {
  //   //       console.log(error.message);
  //   //     });
  //   // }
  // };

  return (
    <>
      <Button
        type="primary"
        onClick={handleFunctionBtn || showModal}
        className={className}
      >
        {value}
      </Button>
      <Modal
        title="Detail Booking"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1200}
      >
        <div>
          <div>
            <h3 className={styles["booking-headline"]}>
              List Booking: {getBookingDate}
            </h3>

            <div className={styles["sub-headline-booking"]}>
              <div className={styles["search-booking-item-group"]}>
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  id="search-bar"
                  value={searchText}
                  onChange={(event) => setSearchText(event.target.value)}
                />
                <button
                  className={`btn  ${styles["btn-outline-success"]}`}
                  type="submit"
                  id={styles["search-btn"]}
                  // onClick={handleSearchBooking}
                >
                  Search
                </button>
              </div>

              <div className={styles["group-total-booking"]}>
                <span>Total Booking: {groupBookingDate.length}</span>
              </div>
            </div>
          </div>
          <div style={{ maxHeight: "500px", overflowY: "auto" }}>
            <Table striped bordered hover variant="dark" responsive>
              <thead>
                <tr>
                  <th>Booking ID</th>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Booking Time</th>
                  <th>Booking Date</th>
                  <th>Service</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {groupBookingDate &&
                  groupBookingDate?.map((item: any) => {
                    return (
                      <>
                        <tr>
                          <td>{item?.id}</td>
                          <td>{item?.name}</td>
                          <td>{item?.phone}</td>
                          <td>
                            {moment(item?.date).format("YYYY-MM-DD-hh:mm:ss")}
                          </td>
                          <td>
                            <p>{item?.booking_date}</p>
                            <p>{item?.calendar}</p>
                          </td>
                          <td>{item.service_name}</td>
                          <td>
                            <Badge
                              bg={`${changeColor(item?.booking_status.name)}`}
                            >
                              {item.booking_status.name}
                            </Badge>
                          </td>
                          <td>
                            <Button
                              type="primary"
                              onClick={() => handleDetailClick(item?.id)}
                            >
                              Detail
                            </Button>
                            <Modal
                              title="Update Status"
                              open={isModalOpenUpdateStatus}
                              onOk={() => handleOkUpdateStatus()}
                              onCancel={handleCancelUpdateStatus}
                              width={600}
                            >
                              <div className={styles["update-booking-status"]}>
                                <div
                                  className={styles["admin-order-input-item"]}
                                >
                                  <p>Booking ID</p>
                                  <input
                                    type="text"
                                    disabled
                                    value={selectedBooking?.id}
                                  />
                                </div>
                                <div
                                  className={styles["admin-order-input-item"]}
                                >
                                  <p>Name</p>
                                  <input
                                    type="text"
                                    disabled
                                    value={selectedBooking?.name}
                                  />
                                </div>
                                <div
                                  className={styles["admin-order-input-item"]}
                                >
                                  <p>Phone</p>
                                  <input
                                    type="text"
                                    disabled
                                    value={selectedBooking?.phone}
                                  />
                                </div>
                                <div
                                  className={styles["admin-order-input-item"]}
                                >
                                  <p>Booking Time</p>
                                  <input
                                    type="text"
                                    disabled
                                    value={moment(selectedBooking?.date).format(
                                      "YYYY-MM-DD-hh:mm:ss"
                                    )}
                                  />
                                </div>
                                <div
                                  className={styles["admin-order-input-item"]}
                                >
                                  <p>Booking Date</p>
                                  <input
                                    type="text"
                                    disabled
                                    value={selectedBooking?.booking_date}
                                  />
                                </div>
                                <div
                                  className={styles["admin-order-input-item"]}
                                >
                                  <p>Booking Calendar</p>
                                  <input
                                    type="text"
                                    disabled
                                    value={selectedBooking?.calendar}
                                  />
                                </div>
                                <div
                                  className={styles["admin-order-input-item"]}
                                >
                                  <p>Booking Service</p>
                                  <input
                                    type="text"
                                    disabled
                                    value={selectedBooking?.service_name}
                                  />
                                </div>
                                <div
                                  className={styles["admin-order-input-item"]}
                                >
                                  <p>Booking Price</p>
                                  <input
                                    type="text"
                                    disabled
                                    value={`${`$`}${
                                      selectedBooking?.service_price
                                    }`}
                                  />
                                </div>
                                <div
                                  className={styles["admin-order-input-item"]}
                                >
                                  <p>Booking Status</p>

                                  <select
                                    name=""
                                    id=""
                                    disabled={
                                      selectedBooking?.booking_status.name ===
                                        "Cancel" ||
                                      selectedBooking?.booking_status.name ===
                                        "Shipped"
                                        ? true
                                        : false
                                    }
                                    // defaultValue={shippingStatus}
                                    onChange={(event) =>
                                      setStatus(event.target.value)
                                    }
                                  >
                                    <option
                                      value={4}
                                      selected={
                                        selectedBooking?.booking_status.name ===
                                        "Cancel"
                                          ? true
                                          : false
                                      }
                                    >
                                      Cancel
                                    </option>
                                    <option
                                      value={3}
                                      selected={
                                        selectedBooking?.booking_status.name ===
                                        "Done"
                                          ? true
                                          : false
                                      }
                                    >
                                      Done
                                    </option>
                                    <option
                                      value={2}
                                      selected={
                                        selectedBooking?.booking_status.name ===
                                        "Processing"
                                          ? true
                                          : false
                                      }
                                    >
                                      Processing
                                    </option>
                                    <option
                                      value={1}
                                      selected={
                                        selectedBooking?.booking_status.name ===
                                        "Pending"
                                          ? true
                                          : false
                                      }
                                    >
                                      Pending
                                    </option>
                                  </select>
                                </div>
                              </div>
                            </Modal>
                          </td>
                        </tr>
                      </>
                    );
                  })}
              </tbody>
            </Table>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default DetailBooking;
