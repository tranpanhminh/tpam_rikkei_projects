import React, { useEffect, useState } from "react";

import styles from "../../ClientPage.module.css";
import { Service } from "../../../../database";
import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import { getAllServices } from "../../../../api/services.api";
import ReactPaginate from "react-paginate";

// ------------------------------------------------------------------

function ClientListServices() {
  const [services, setServices] = useState<Service[]>([]);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [currentItems, setCurrentItems] = useState<any>([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  const fetchServices = async () => {
    const result = await getAllServices();
    return setServices(result);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // Pagination
  const itemsPerPage = Number(searchParams.get("limit")) || 3;
  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(services.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(services.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, services]);

  const handlePageClick = (event: any) => {
    const newPage = event.selected + 1;
    const newOffset = event.selected * itemsPerPage;
    setItemOffset(newOffset);
    navigate(`/services/?page=${newPage}&limit=${itemsPerPage}`);
  };
  return (
    <>
      <div
        className={styles["for-your-pet"]}
        style={{ marginTop: 0, marginBottom: 100 }}
      >
        <div className="container text-center">
          <div className="row align-items-start">
            {currentItems &&
              currentItems?.map((service: any) => {
                return (
                  <div className="col-12 col-sm-12 col-md-6 col-xl-4 px-3 my-2">
                    <div className={styles["collection-item"]}>
                      <img
                        src={service.service_image}
                        alt=""
                        className="collection-image"
                      />
                      <div className={styles["collection-caption"]}>
                        <NavLink to={`/services/${service.id}`}>
                          <p className={styles["collection-title"]}>
                            {service.name}
                          </p>
                        </NavLink>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
          <div className={styles["pagination-form"]} style={{ marginTop: 50 }}>
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
      </div>
    </>
  );
}

export default ClientListServices;
