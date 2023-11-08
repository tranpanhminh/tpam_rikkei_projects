import { useEffect, useState } from "react";
import styles from "../../AdminPage.module.css";
import AddButtonService from "./Button/AddService/AddButtonService";
import { Button, message } from "antd";
import DetailButtonService from "./Button/DetailService/DetailButtonService";
import { NavLink } from "react-router-dom";
import { deleteService, getAllServices } from "../../../../api/services.api";

// ------------------------------------------------

function ManageServices() {
  document.title = "Manage Services | PetShop";
  const [services, setServices] = useState<any>(null);
  const [messageApi, contextHolder] = message.useMessage();
  const [searchText, setSearchText] = useState<string>("");

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
            {services &&
              services.map((service: any, index: number) => (
                <tr key={service.id}>
                  <td>{index + 1}</td>
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
    </>
  );
}
export default ManageServices;
