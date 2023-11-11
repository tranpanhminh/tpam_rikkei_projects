import React, { useEffect, useState } from "react";
import styles from "../../AdminPage.module.css";
import DetailBooking from "../ManageBooking/Button/DetailBooking/DetailBooking";
import { filterGroupBookingDate } from "../../../../api/bookings.api";
import ReactPaginate from "react-paginate";
import { useNavigate, useSearchParams } from "react-router-dom";

// -----------------------------------------------------
function ManageBooking() {
  document.title = "Manage Booking | PetShop";

  const [searchText, setSearchText] = useState<string>("");
  const [groupBookingDate, setGroupBookingDate] = useState<any>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

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

  // Pagination
  const itemsPerPage = Number(searchParams.get("limit")) || 5;
  // const itemsPerPage = 5;
  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(groupBookingDate.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(groupBookingDate.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, groupBookingDate]);

  const handlePageClick = (event: any) => {
    const newPage = event.selected + 1;
    const newOffset = event.selected * itemsPerPage;
    setItemOffset(newOffset);
    navigate(`/admin/manage-bookings?page=${newPage}&limit=${itemsPerPage}`);
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
            {currentItems &&
              currentItems?.map((item: any) => {
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
      <div className={styles["pagination-form"]}>
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          onPageChange={handlePageClick}
          containerClassName="pagination"
          pageLinkClassName="page-number"
          previousLinkClassName="page-number"
          nextLinkClassName="page-number"
          activeLinkClassName={styles["active"]}
        />
      </div>
    </>
  );
}
export default ManageBooking;
