import { useEffect, useState } from "react";
import styles from "../../AdminPage.module.css";
import AddButtonService from "./Button/AddService/AddButtonService";
import { Button, message } from "antd";
import DetailButtonService from "./Button/DetailService/DetailButtonService";
import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import { deleteService, getAllServices } from "../../../../api/services.api";
import ReactPaginate from "react-paginate";

// ------------------------------------------------

function ManageServices() {
  document.title = "Manage Services | PetShop";
  const [services, setServices] = useState<any>([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [searchText, setSearchText] = useState<string>("");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  // Fetch API
  const fetchServices = async () => {
    const result = await getAllServices();
    return setServices(result);
  };

  useEffect(() => {
    fetchServices();
  }, []);
  // ------------------------------------------------

  // Handle Search
  const handleSearchServices = () => {
    if (!searchText) {
      fetchServices();
    } else {
      const filterServices = services.filter((service: any) => {
        if (
          service.name.toLowerCase().includes(searchText.trim().toLowerCase())
        ) {
          return true;
        }
        return false;
      });

      setServices(filterServices);
    }
  };
  // ------------------------------------------------

  // Handle Delete
  const handleDeleteService = async (serviceId: number) => {
    messageApi.open({
      type: "loading",
      content: "Deleting...",
      duration: 0,
    });
    const result = await deleteService(serviceId);
    if (result) {
      fetchServices(); // Cập nhật lại dữ liệu products sau khi xóa
      messageApi.destroy();
    }
  };
  // ------------------------------------------------

  // Handle Update
  const handleUpdateService = () => {
    fetchServices();
  };
  // ------------------------------------------------

  // Pagination
  const itemsPerPage = Number(searchParams.get("limit")) || 5;
  // const itemsPerPage = 5;
  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(services.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(services.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, services]);

  const handlePageClick = (event: any) => {
    const newPage = event.selected + 1;
    const newOffset = event.selected * itemsPerPage;
    setItemOffset(newOffset);
    navigate(`/admin/manage-services?page=${newPage}&limit=${itemsPerPage}`);
  };

  return (
    <>
      {contextHolder}
      <div className={styles["breadcrumb"]}>
        <h2 className={styles["page-title"]}>Manage Services</h2>
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
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button
            className={`btn  ${styles["btn-outline-success"]}`}
            type="submit"
            id={styles["search-btn"]}
            onClick={handleSearchServices}
          >
            Search
          </button>
        </div>
        <AddButtonService
          className={styles["add-service-btn"]}
          value="Add Service"
          title="Add Service"
          handleClickOk={handleUpdateService}
        />
      </div>

      <div className={styles["search-result"]}></div>

      <div className={styles["main-content"]}>
        <h3 className={styles["main-title-content"]}>List Services</h3>
        <table
          className="table table-striped"
          id={styles["table-products-manage-page"]}
        >
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentItems &&
              currentItems.map((service: any, index: number) => (
                <tr key={service.id}>
                  <td>{service.id}</td>
                  <td>
                    <img src={service.service_image} alt="" />
                  </td>
                  <td>{service.name}</td>
                  <td>{service.price}</td>
                  <td>
                    <p>{service.working_time.morning_time}</p>
                    <p>{service.working_time.afternoon_time}</p>
                  </td>
                  <td className={styles["group-btn-admin-manage-product"]}>
                    <NavLink to={`/services/${service.id}`} target="_blank">
                      <Button
                        type="primary"
                        style={{ backgroundColor: "#0c337c" }}
                      >
                        View
                      </Button>
                    </NavLink>
                    <DetailButtonService
                      value="Detail"
                      title="Detail Service"
                      getServiceId={service.id}
                      handleFunctionOk={handleUpdateService}
                    ></DetailButtonService>
                    <Button
                      type="primary"
                      className={styles["delete-product-btn"]}
                      onClick={() => handleDeleteService(service.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
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
export default ManageServices;
