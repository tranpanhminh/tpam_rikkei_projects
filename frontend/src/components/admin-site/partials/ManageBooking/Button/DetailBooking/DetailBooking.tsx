import React, { useEffect, useState } from "react";
import { Button, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import styles from "../../../../AdminPage.module.css";
import { Badge, Table } from "react-bootstrap";
import {
  filterBookingByDate,
  getAllBookingStatus,
  getDetailBooking,
  updateBookingStatus,
} from "../../../../../../api/bookings.api";
const moment = require("moment");

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
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [isModalOpenUpdateStatus, setIsModalOpenUpdateStatus] = useState(false);
  const [groupBookingDate, setGroupBookingDate] = useState<any>([]);
  const [bookingStatus, setBookingStatus] = useState<any>([]);
  const [status, setStatus] = useState("");

  // Fetch API
  const fetchBookingByDate = async () => {
    const result = await filterBookingByDate(getBookingDate);
    return setGroupBookingDate(result);
  };

  const fetchBookingStatus = async () => {
    const result = await getAllBookingStatus();
    return setBookingStatus(result);
  };

  useEffect(() => {
    fetchBookingStatus();
    fetchBookingByDate();
  }, []);
  // -----------------------------------------------------

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

  const handleDetailClick = async (bookingId: any) => {
    navigate(
      `/admin/manage-booking/?date=${getBookingDate}/?bookingId=${bookingId}`
    );
    setStatus(selectedBooking?.status_id);
    const result = await getDetailBooking(bookingId);
    setSelectedBooking(result);
    setIsModalOpenUpdateStatus(true);
  };

  const handleOkUpdateStatus = async () => {
    const updateBooking = {
      status_id: status,
    };

    const result = await updateBookingStatus(
      selectedBooking?.id,
      updateBooking
    );
    if (result) {
      fetchBookingByDate();
      setIsModalOpenUpdateStatus(false);
    }
  };

  const handleCancelUpdateStatus = () => {
    setStatus(selectedBooking?.status_id);
    setIsModalOpenUpdateStatus(false);
  };

  const handleSearchBooking = () => {
    if (!searchText) {
      fetchBookingByDate();
    } else {
      const filteredBooking = groupBookingDate?.filter((booking: any) => {
        if (
          booking.id.toString().includes(searchText.trim().toLowerCase()) ||
          booking.name
            .toLowerCase()
            .includes(searchText.trim().toLowerCase()) ||
          booking.phone.toString().includes(searchText.trim().toLowerCase()) ||
          booking.service_name
            .toLowerCase()
            .includes(searchText.trim().toLowerCase())
        ) {
          return true;
        }
        return false;
      });
      setGroupBookingDate(filteredBooking);
    }
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
                  onClick={handleSearchBooking}
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
                              bg={`${changeColor(item?.booking_statuses.name)}`}
                            >
                              {item.booking_statuses.name}
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
                                      selectedBooking?.status_id === 3 ||
                                      selectedBooking?.status_id === 4
                                        ? true
                                        : false
                                    }
                                    value={status}
                                    onChange={(event) =>
                                      setStatus(event.target.value)
                                    }
                                  >
                                    <option
                                      value={4}
                                      selected={
                                        selectedBooking?.booking_statuses
                                          .name === "Cancel"
                                          ? true
                                          : false
                                      }
                                    >
                                      Cancel
                                    </option>
                                    <option
                                      value={3}
                                      selected={
                                        selectedBooking?.booking_statuses
                                          .name === "Done"
                                          ? true
                                          : false
                                      }
                                    >
                                      Done
                                    </option>
                                    <option
                                      value={2}
                                      selected={
                                        selectedBooking?.booking_statuses
                                          .name === "Processing"
                                          ? true
                                          : false
                                      }
                                    >
                                      Processing
                                    </option>
                                    <option
                                      value={1}
                                      selected={
                                        selectedBooking?.booking_statuses
                                          .name === "Pending"
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
