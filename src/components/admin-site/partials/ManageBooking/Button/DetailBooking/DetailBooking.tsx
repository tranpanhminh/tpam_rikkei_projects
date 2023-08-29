import React, { useEffect, useState } from "react";
import { Button, Modal } from "antd";
import axios from "axios";
import { Booking } from "../../../../../../database";
import styles from "../../../../AdminPage.module.css";

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
  const [bookings, setBookings] = useState<any>(null);
  const [bookingStatus, setBookingStatus] = useState("");

  useEffect(() => {
    const fetchProduct = () => {
      axios
        .get(`http://localhost:7373/bookings/${getBookingId}`)
        .then((response) => {
          setBookings(response.data);
          setBookingStatus(response.data.status);
        })
        .catch((error) => {
          console.log(error.message);
        });
    };

    fetchProduct();
  }, [getBookingId]);
  console.log(bookings);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    console.log(getBookingId);
    const updateBookingStatus = {
      status: bookingStatus,
    };
    axios
      .patch(
        `http://localhost:7373/bookings/${getBookingId}`,
        updateBookingStatus
      )
      .then((response) => {
        setBookings(response.data);
      });

    setIsModalOpen(false);
    // if (handleFunctionOk) {
    //   handleFunctionOk();
    // }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
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
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className={styles["list-input-manage-booking"]}>
          <div className={styles["manage-booking-input-item"]}>
            <p>Phone</p>
            <input type="text" disabled value={bookings?.phone} />
          </div>
          <div className={styles["manage-booking-input-item"]}>
            <p>Booking Date</p>
            <input type="text" disabled value={bookings?.date} />
          </div>
          <div className={styles["manage-booking-input-item"]}>
            <p>Service Name</p>
            <input type="text" disabled value={bookings?.booking.serviceName} />
          </div>
          <div className={styles["manage-booking-input-item"]}>
            <p>Service Time</p>
            <input type="text" disabled value={bookings?.booking.serviceTime} />
          </div>
          <div className={styles["manage-booking-input-item"]}>
            <p>Service Price</p>
            <input
              type="text"
              disabled
              value={bookings?.booking.servicePrice}
            />
          </div>
          <div className={styles["manage-booking-input-item"]}>
            <p>Status</p>
            <select
              name=""
              id=""
              disabled={
                bookings?.status === "Done" ||
                (bookings?.status === "Cancel" && true)
              }
              value={bookingStatus}
              onChange={(event) => setBookingStatus(event?.target.value)}
            >
              <option value="" disabled>
                -- Choose Status --
              </option>
              <option
                value="Done"
                selected={bookings?.status === "Done" ? true : false}
              >
                Done
              </option>
              <option
                value="Processing"
                selected={bookings?.status === "Processing" ? true : false}
              >
                Processing
              </option>
              <option
                value="Cancel"
                selected={bookings?.status === "Cancel" ? true : false}
              >
                Cancel
              </option>
            </select>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default DetailBooking;
