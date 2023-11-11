import { useEffect } from "react";
import { useState } from "react";
import styles from "../UserProfile.module.css";
import "../../../../../assets/bootstrap-5.3.0-dist/css/bootstrap.min.css";
import { Badge } from "react-bootstrap";
import DetailOrderButton from "./Button/DetailOrderButtonClient";
import { getDataLogin } from "../../../../../api/users.api";
import { getUserOrder } from "../../../../../api/orders.api";
import ReactPaginate from "react-paginate";
import { useNavigate, useSearchParams } from "react-router-dom";
const moment = require("moment");

// -----------------------------------------------------
function ClientOrder() {
  document.title = "My Orders | PetShop";
  const [searchText, setSearchText] = useState<string>("");
  const [userOrder, setUserOrder] = useState<any>([]);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  const fetchUserOrder = async () => {
    const getUser = await getDataLogin();
    const result = await getUserOrder(getUser.id);
    return setUserOrder(result);
  };

  useEffect(() => {
    fetchUserOrder();
  }, []);
  // -----------------------------------------------------------

  const hanldeSearchOrder = () => {
    if (!searchText) {
      fetchUserOrder();
    } else {
      const filterOrder = userOrder?.filter((item: any) => {
        if (
          item.order_date
            .toLowerCase()
            .includes(searchText.trim().toLowerCase()) ||
          item.order_statuses.name
            .toLowerCase()
            .includes(searchText.trim().toLowerCase())
        ) {
          return true;
        }
        return false;
      });
      setUserOrder(filterOrder);
    }
  };

  const changeColor = (status: string) => {
    switch (status) {
      case "Shipped":
        return "success";
      case "Shipping":
        return "primary";
      case "Processing":
        return "info";
      case "Pending":
        return "warning";
      case "Cancel":
        return "danger";
      default:
        return;
    }
  };

  const handleUpdateStatus = () => {
    fetchUserOrder();
  };

  // Pagination
  const itemsPerPage = Number(searchParams.get("limit")) || 5;
  // const itemsPerPage = 5;
  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(userOrder.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(userOrder.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, userOrder]);

  const handlePageClick = (event: any) => {
    const newPage = event.selected + 1;
    const newOffset = event.selected * itemsPerPage;
    setItemOffset(newOffset);
    navigate(`/user/my-orders?page=${newPage}&limit=${itemsPerPage}`);
  };

  return (
    <div>
      <div className={styles.breadcrumb}>
        <h2 className={styles["page-title"]}>My Order</h2>
        <p className={styles["page-description"]}>PetShop User Panel</p>
      </div>

      <div className={styles["user-board"]}>
        <div className="d-flex" role="search">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            id="search-bar"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button
            className="btn btn-outline-success"
            type="submit"
            id={styles["search-btn"]}
            onClick={hanldeSearchOrder}
          >
            Search
          </button>
        </div>
      </div>

      <div className={styles["main-content"]}>
        <h3 className={styles["main-title-content"]}>List Orders</h3>
        <table className="table table-striped" id="table-user">
          <thead>
            <tr>
              <th>#</th>
              <th>Date</th>
              <th>Total</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentItems &&
              currentItems?.map((order: any, index: number) => {
                return (
                  <tr>
                    <td>{order.id}</td>
                    <td>
                      {moment(order.order_date).format("YYYY-MM-DD-hh:mm:ss")}
                    </td>
                    <td>${order.total_bill}</td>
                    <td>
                      <Badge bg={changeColor(order.order_statuses.name)}>
                        {order.order_statuses.name}
                      </Badge>
                    </td>
                    <td>
                      <DetailOrderButton
                        orderId={order.id}
                        handleFunctionOk={handleUpdateStatus}
                      ></DetailOrderButton>
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
    </div>
  );
}

export default ClientOrder;
