import React, { useEffect, useState } from "react";
import { Button, Modal, Select } from "antd";
import axios from "axios";
import styles from "../../../../AdminPage.module.css";
import { Badge, Table } from "react-bootstrap";

interface DetailModalProps {
  className?: string; // Thêm khai báo cho thuộc tính className
  value?: string; // Thêm khai báo cho thuộc tính className
  title?: string;
  handleFunctionOk?: any;
  handleFunctionBtn?: any;
  getBookingId: number;
}
const DetailBooking: React.FC<DetailModalProps> = ({
  className,
  value,
  title,
  handleFunctionOk,
  handleFunctionBtn,
  getBookingId,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [booking, setBooking] = useState<any>(null);
  const [listBooking, setListBooking] = useState<any>(null);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [bookingStatus, setBookingStatus] = useState("");
  const [status, setStatus] = useState("");
  const [isModalOpenUpdateStatus, setIsModalOpenUpdateStatus] = useState(false);

  useEffect(() => {
    const fetchBookings = () => {
      axios
        .get(`http://localhost:7373/bookings/${getBookingId}`)
        .then((response) => {
          setBooking(response.data);
          setListBooking(response.data.listBookings);
        })
        .catch((error) => {
          console.log(error.message);
        });
    };

    fetchBookings();
  }, [getBookingId]);
  console.log(booking);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    // console.log(getBookingId);
    // const updateBookingStatus = {
    //   status: bookingStatus,
    // };
    // axios
    //   .patch(
    //     `http://localhost:7373/bookings/${getBookingId}`,
    //     updateBookingStatus
    //   )
    //   .then((response) => {
    //     setBooking(response.data);
    //   });

    setIsModalOpen(false);
    // if (handleFunctionOk) {
    //   handleFunctionOk();
    // }
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
      default:
        return;
    }
  };

  const handleDetailClick = (item: any) => {
    setSelectedBooking(item);
    setIsModalOpenUpdateStatus(true);
    console.log(selectedBooking);
  };

  const handleOkUpdateStatus = (bookingId: number) => {
    console.log("Bla", bookingId);
    setIsModalOpenUpdateStatus(false);
  };

  const handleCancelUpdateStatus = () => {
    setIsModalOpenUpdateStatus(false);
  };

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
        <Table striped bordered hover variant="dark" responsive>
          <thead>
            <tr>
              <th>ID</th>
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
            {listBooking &&
              listBooking.map((item: any) => {
                return (
                  <>
                    <tr>
                      <td>{item.bookingId}</td>
                      <td>{item.userName}</td>
                      <td>{item.userPhone}</td>
                      <td>{item.time}</td>
                      <td>
                        <p>{item.bookingDate}</p>
                        <p>{item.calendar}</p>
                      </td>
                      <td>{item.serviceName}</td>
                      <td>
                        <Badge bg={`${changeColor(item.status)}`}>
                          {item.status}
                        </Badge>
                      </td>
                      <td>
                        <Button
                          type="primary"
                          onClick={() => handleDetailClick(item)}
                        >
                          Detail
                        </Button>
                        <Modal
                          title="Update Status"
                          open={isModalOpenUpdateStatus}
                          onOk={() =>
                            handleOkUpdateStatus(selectedBooking.bookingId)
                          }
                          onCancel={handleCancelUpdateStatus}
                          width={600}
                        >
                          <div className={styles["update-booking-status"]}>
                            <div className={styles["admin-order-input-item"]}>
                              <p>Booking ID</p>
                              <input
                                type="text"
                                disabled
                                value={selectedBooking?.bookingId}
                              />
                            </div>
                            <div className={styles["admin-order-input-item"]}>
                              <p>Name</p>
                              <input
                                type="text"
                                disabled
                                value={selectedBooking?.userName}
                              />
                            </div>
                            <div className={styles["admin-order-input-item"]}>
                              <p>Phone</p>
                              <input
                                type="text"
                                disabled
                                value={selectedBooking?.userPhone}
                              />
                            </div>
                            <div className={styles["admin-order-input-item"]}>
                              <p>Booking Time</p>
                              <input
                                type="text"
                                disabled
                                value={selectedBooking?.time}
                              />
                            </div>
                            <div className={styles["admin-order-input-item"]}>
                              <p>Booking Date</p>
                              <input
                                type="text"
                                disabled
                                value={selectedBooking?.bookingDate}
                              />
                            </div>
                            <div className={styles["admin-order-input-item"]}>
                              <p>Booking Calendar</p>
                              <input
                                type="text"
                                disabled
                                value={selectedBooking?.calendar}
                              />
                            </div>
                            <div className={styles["admin-order-input-item"]}>
                              <p>Booking Service</p>
                              <input
                                type="text"
                                disabled
                                value={selectedBooking?.serviceName}
                              />
                            </div>
                            <div className={styles["admin-order-input-item"]}>
                              <p>Booking Price</p>
                              <input
                                type="text"
                                disabled
                                value={`${`$`}${selectedBooking?.servicePrice}`}
                              />
                            </div>
                            <div className={styles["admin-order-input-item"]}>
                              <p>Booking Status</p>
                              <select
                                name=""
                                id=""
                                onChange={(event) =>
                                  setBookingStatus(event.target.value)
                                }
                                disabled={
                                  selectedBooking?.status === "Done" ||
                                  selectedBooking?.status === "Cancel"
                                    ? true
                                    : false
                                }
                              >
                                <option
                                  value="Done"
                                  selected={
                                    selectedBooking?.status === "Done"
                                      ? true
                                      : false
                                  }
                                >
                                  Done
                                </option>
                                <option
                                  value="Processing"
                                  selected={
                                    selectedBooking?.status === "Processing"
                                      ? true
                                      : false
                                  }
                                >
                                  Processing
                                </option>
                                <option
                                  value="Cancel"
                                  selected={
                                    selectedBooking?.status === "Cancel"
                                      ? true
                                      : false
                                  }
                                >
                                  Cancel
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
      </Modal>
    </>
  );
};

export default DetailBooking;
