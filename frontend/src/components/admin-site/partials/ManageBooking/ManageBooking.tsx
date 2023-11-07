import React, { useEffect, useState } from "react";
import styles from "../../AdminPage.module.css";
import DetailBooking from "../ManageBooking/Button/DetailBooking/DetailBooking";
import { filterGroupBookingDate } from "../../../../api/bookings.api";

// -----------------------------------------------------
function ManageBooking() {
  document.title = "Manage Booking | PetShop";

  const [searchText, setSearchText] = useState<string>("");
  const [groupBookingDate, setGroupBookingDate] = useState<any>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const fetchGroupBookingDate = async () => {
    const result = await filterGroupBookingDate();
    return setGroupBookingDate(result);
  };

  useEffect(() => {
    fetchGroupBookingDate();
  }, []);
  // -----------------------------------------------------

  // Hanlde Search
  const handleSearchBooking = () => {
    if (!searchText) {
      fetchGroupBookingDate();
    } else {
      const filteredBooking = groupBookingDate.filter((booking: any) => {
        if (
          booking.booking_date
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
  // -----------------------------------------------------

  const changeColor = (status: string) => {
    switch (status) {
      case "Done":
        return "success";
      case "Processing":
        return "primary";
      case "Cancel":
        return "secondary";
      default:
        return;
    }
  };

  return (
    <>
      <div className={styles["breadcrumb"]}>
        <h2 className={styles["page-title"]}>Manage Booking</h2>
        <p className={styles["page-description"]}>PetShop Admin Panel</p>
      </div>

      <div className={styles["product-panel"]}>
        <div className="d-flex" role="search">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            id={styles["search-bar"]}
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
      </div>

      <div className={styles["main-content"]}>
        <h3 className={styles["main-title-content"]}>List Booking</h3>
        <table
          className="table table-striped"
          id={styles["table-products-manage-page"]}
        >
          <thead>
            <tr>
              <th>Booking Date</th>
              <th>Available</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {groupBookingDate &&
              groupBookingDate?.map((item: any) => {
                return (
                  <tr key={1}>
                    <td>{item?.date}</td>
                    <td>{item?.total_bookings} / 20</td>
                    <td className={styles["group-btn-admin"]}>
                      <DetailBooking
                        value="Detail"
                        title="Detail Product"
                        className={styles["detail-product-btn"]}
                        getBookingId={item.id}
                        getBookingDate={item?.date}
                        // getBooking={booking.listBookings}
                      ></DetailBooking>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
}
export default ManageBooking;
